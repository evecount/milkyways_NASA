"""
MilkyWays — Physics-Informed Deep Learning Weather-to-Fodder Predictor
Trains a PyTorch MLP (FodderWeatherNet) on real 10-year daily NASA POWER data (2016-2025)
across 6 global dairy regions using a strict temporal split (train 2016-2022, test 2023-2025).
Exports trained weights and real validation metrics to JSON for browser inference.
"""

import json
import os
import urllib.request
import numpy as np
import pandas as pd
import torch
import torch.nn as nn
from sklearn.linear_model import Ridge
from sklearn.metrics import mean_absolute_error, r2_score, root_mean_squared_error
from sklearn.preprocessing import StandardScaler

REGIONS = [
    ("Ontario_CA", 44.08, -79.88),
    ("Gais_CH", 47.36, 9.45),
    ("Singapore_SG", 1.42, 103.72),
    ("Wisconsin_US", 43.78, -88.78),
    ("Waikato_NZ", -37.78, 175.28),
    ("Punjab_IN", 30.90, 75.85),
]

PARAMS = "T2M,T2M_MAX,T2M_MIN,PRECTOTCORR,ALLSKY_SFC_SW_DWN,WS2M"
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_DIR = os.path.abspath(os.path.join(BASE_DIR, "..", "data"))
os.makedirs(DATA_DIR, exist_ok=True)


def fetch_nasa_power_daily(name: str, lat: float, lon: float) -> pd.DataFrame:
    cache_path = os.path.join(DATA_DIR, f"nasa_power_{name}_2016_2025.json")
    if os.path.exists(cache_path):
        with open(cache_path, "r", encoding="utf-8") as f:
            raw = json.load(f)
    else:
        url = (
            f"https://power.larc.nasa.gov/api/temporal/daily/point"
            f"?parameters={PARAMS}&community=AG&longitude={lon}&latitude={lat}"
            f"&start=20160101&end=20251231&format=JSON"
        )
        req = urllib.request.Request(url, headers={"User-Agent": "MilkyWays-SpaceApps/1.0"})
        with urllib.request.urlopen(req, timeout=30) as resp:
            raw = json.loads(resp.read().decode("utf-8"))
        with open(cache_path, "w", encoding="utf-8") as f:
            json.dump(raw, f)

    p = raw["properties"]["parameter"]
    df = pd.DataFrame(p)
    df.index = pd.to_datetime(df.index, format="%Y%m%d")
    df = df.replace(-999.0, np.nan).dropna()
    df["year"] = df.index.year
    df["month"] = df.index.month
    return df


def compute_annual_features(df: pd.DataFrame, region: str) -> pd.DataFrame:
    rows = []
    for yr, g in df.groupby("year"):
        if len(g) < 300:
            continue
        t2m = g["T2M"].mean()
        tmax = g["T2M_MAX"].max()
        tmin = g["T2M_MIN"].min()
        rain = g["PRECTOTCORR"].mean()
        solar = g["ALLSKY_SFC_SW_DWN"].mean()
        wind = g["WS2M"].mean()
        gdd10 = np.maximum(0.0, g["T2M"] - 10.0).sum()
        frost_days = float((g["T2M_MIN"] < 0.0).sum())
        heat_days = float((g["T2M_MAX"] > 30.0).sum())
        dry_ratio = float((g["PRECTOTCORR"] < 1.0).mean())

        # Agronomic domain targets (0-100) derived from physical thresholds
        # 1) C3 Temperate Fodder Suitability (Maize silage / Alfalfa / Red Clover)
        c3_temp = np.clip(100.0 - abs(t2m - 10.5) * 4.2 - max(0.0, heat_days - 25) * 0.45, 10.0, 98.0)
        c3_water = np.clip(60.0 + (rain - 2.0) * 14.0 - dry_ratio * 25.0, 15.0, 98.0)
        c3_score = float(np.clip(0.55 * c3_temp + 0.45 * c3_water, 10.0, 98.0))

        # 2) C4 Warm-Season Fodder Suitability (Sorghum / Cowpea / Berseem)
        c4_temp = np.clip(55.0 + (gdd10 / 4500.0) * 40.0 - max(0.0, frost_days - 120) * 0.25, 15.0, 98.0)
        c4_solar = np.clip(50.0 + (solar - 10.0) * 4.5, 20.0, 98.0)
        c4_score = float(np.clip(0.6 * c4_temp + 0.4 * c4_solar, 15.0, 98.0))

        # 3) Heat & Drought Risk Index (higher = more stress)
        stress_score = float(np.clip(heat_days * 0.55 + dry_ratio * 45.0 - rain * 3.5, 5.0, 95.0))

        rows.append({
            "region": region,
            "year": int(yr),
            "t2m": float(t2m),
            "tmax": float(tmax),
            "tmin": float(tmin),
            "rain": float(rain),
            "solar": float(solar),
            "wind": float(wind),
            "gdd10": float(gdd10),
            "frost_days": frost_days,
            "heat_days": heat_days,
            "dry_ratio": dry_ratio,
            "c3_suitability": c3_score,
            "c4_suitability": c4_score,
            "stress_risk": stress_score,
        })
    return pd.DataFrame(rows)


class FodderWeatherNet(nn.Module):
    def __init__(self, in_dim: int, out_dim: int = 3):
        super().__init__()
        self.net = nn.Sequential(
            nn.Linear(in_dim, 32),
            nn.ReLU(),
            nn.Linear(32, 16),
            nn.ReLU(),
            nn.Linear(16, out_dim),
        )

    def forward(self, x: torch.Tensor) -> torch.Tensor:
        return self.net(x)


def main():
    torch.manual_seed(42)
    np.random.seed(42)

    all_annual = []
    for name, lat, lon in REGIONS:
        print(f"Fetching/loading NASA POWER daily 2016-2025 for {name} ({lat}, {lon})...")
        df = fetch_nasa_power_daily(name, lat, lon)
        ann = compute_annual_features(df, name)
        all_annual.append(ann)

    full = pd.concat(all_annual, ignore_index=True)

    obs_path = os.path.join(DATA_DIR, "community_observations.json")
    if os.path.exists(obs_path):
        with open(obs_path, "r", encoding="utf-8") as f:
            obs_list = json.load(f)
        print(f"Loaded {len(obs_list)} community farm observations from {obs_path}")

    # Pair year t features -> year t+1 targets (true predictive next-season setup)
    feature_cols = ["t2m", "rain", "solar", "wind", "gdd10", "frost_days", "heat_days", "dry_ratio"]
    target_cols = ["c3_suitability", "c4_suitability", "stress_risk"]

    pairs = []
    for region, g in full.groupby("region"):
        g = g.sort_values("year").reset_index(drop=True)
        for i in range(len(g) - 1):
            row = {f"x_{c}": g.loc[i, c] for c in feature_cols}
            for t in target_cols:
                row[f"y_{t}"] = g.loc[i + 1, t]
            row["target_year"] = int(g.loc[i + 1, "year"])
            row["region"] = region
            pairs.append(row)

    ds = pd.DataFrame(pairs)
    train_df = ds[ds["target_year"] <= 2022].copy()
    test_df = ds[ds["target_year"] >= 2023].copy()

    X_train = train_df[[f"x_{c}" for c in feature_cols]].values
    y_train = train_df[[f"y_{t}" for t in target_cols]].values
    X_test = test_df[[f"x_{c}" for c in feature_cols]].values
    y_test = test_df[[f"y_{t}" for t in target_cols]].values

    scaler = StandardScaler()
    X_train_s = scaler.fit_transform(X_train)
    X_test_s = scaler.transform(X_test)

    # Ridge baseline
    ridge = Ridge(alpha=1.0).fit(X_train_s, y_train)
    ridge_pred = ridge.predict(X_test_s)
    ridge_r2 = float(r2_score(y_test, ridge_pred))
    ridge_mae = float(mean_absolute_error(y_test, ridge_pred))

    # PyTorch MLP (FodderWeatherNet)
    model = FodderWeatherNet(in_dim=len(feature_cols), out_dim=len(target_cols))
    opt = torch.optim.Adam(model.parameters(), lr=0.015, weight_decay=1e-4)
    loss_fn = nn.MSELoss()

    Xt = torch.tensor(X_train_s, dtype=torch.float32)
    yt = torch.tensor(y_train, dtype=torch.float32)
    Xte = torch.tensor(X_test_s, dtype=torch.float32)

    for epoch in range(450):
        model.train()
        opt.zero_grad()
        pred = model(Xt)
        loss = loss_fn(pred, yt)
        loss.backward()
        opt.step()

    model.eval()
    with torch.no_grad():
        nn_pred = model(Xte).numpy()

    nn_r2 = float(r2_score(y_test, nn_pred))
    nn_mae = float(mean_absolute_error(y_test, nn_pred))
    nn_rmse = float(root_mean_squared_error(y_test, nn_pred))

    print(f"\n=== Temporal Out-of-Sample Evaluation (Train 2016-2022 n={len(train_df)}, Test 2023-2025 n={len(test_df)}) ===")
    print(f"Ridge Baseline  -> R2: {ridge_r2:.4f} | MAE: {ridge_mae:.2f}")
    print(f"FodderWeatherNet -> R2: {nn_r2:.4f} | MAE: {nn_mae:.2f} | RMSE: {nn_rmse:.2f}")

    # Export weights for browser inference
    layers = []
    for layer in model.net:
        if isinstance(layer, nn.Linear):
            layers.append({
                "weight": layer.weight.detach().numpy().tolist(),
                "bias": layer.bias.detach().numpy().tolist(),
            })

    export = {
        "model_name": "FodderWeatherNet (PyTorch 3-Layer MLP)",
        "feature_cols": feature_cols,
        "target_cols": target_cols,
        "scaler_mean": scaler.mean_.tolist(),
        "scaler_scale": scaler.scale_.tolist(),
        "layers": layers,
        "metrics": {
            "train_years": "2016-2022",
            "test_years": "2023-2025",
            "n_train": int(len(train_df)),
            "n_test": int(len(test_df)),
            "regions": [r[0] for r in REGIONS],
            "nn_r2": round(nn_r2, 4),
            "nn_mae": round(nn_mae, 2),
            "nn_rmse": round(nn_rmse, 2),
            "ridge_r2": round(ridge_r2, 4),
            "ridge_mae": round(ridge_mae, 2),
        },
    }

    out_path = os.path.join(BASE_DIR, "model_weights.json")
    with open(out_path, "w", encoding="utf-8") as f:
        json.dump(export, f, indent=2)
    print(f"Saved trained weights & metrics to {out_path}")


if __name__ == "__main__":
    main()
