# FodderWeatherNet — One-Page Model Card

`FodderWeatherNet` is a lightweight 3-layer Multi-Layer Perceptron (MLP) trained offline in **PyTorch** and exported to [`docs/app/model_weights.json`](app/model_weights.json) so the browser application executes a deterministic, zero-backend JavaScript forward pass (`StandardScaler` normalization + `ReLU` hidden layers) without external API keys.

---

## 1. Architecture & Browser Execution

- **Model type:** Feedforward MLP (`8 → 32 → 16 → 3`, `ReLU` activations on hidden layers, `Adam` optimizer).
- **Training vs. Inference split:** Weights and `StandardScaler` parameters (`scaler_mean`, `scaler_scale`) were trained offline in PyTorch and serialized to `docs/app/model_weights.json`. At runtime, `docs/app/index.html` loads `model_weights.json` and runs the linear-algebra forward pass directly in client-side JavaScript.
- **Inputs (8 annual/climatological features from NASA POWER, `community=AG`):**
  1. `t2m` — Mean temperature (`°C`)
  2. `rain` — Mean precipitation (`mm/day`)
  3. `solar` — All-sky surface shortwave downward irradiance (`MJ/m²/day`)
  4. `wind` — 2 m wind speed (`m/s`)
  5. `gdd10` — Growing degree days above `10 °C`
  6. `frost_days` — Annual days `< 0 °C`
  7. `heat_days` — Annual heat-stress days `> 30 °C`
  8. `dry_ratio` — Fraction of dry days (`< 1 mm/day`)
- **Outputs (3 continuous scores, `0–100`):**
  1. `c3_suitability` — Temperate C3 fodder suitability (e.g., alfalfa, red clover)
  2. `c4_suitability` — Warm-season C4 fodder suitability (e.g., sorghum, cowpea)
  3. `stress_risk` — Combined thermal/moisture stress risk

---

## 2. Dataset, Temporal Split & Evaluation Metrics

- **Source data:** 10 years of daily **NASA POWER** observations (`2016–2025`, `~50 km` grid) across **6 global dairy regions**:
  - `Ontario_CA` (`44.08, -79.88`)
  - `Gais_CH` (`47.36, 9.45`)
  - `Singapore_SG` (`1.42, 103.72`)
  - `Wisconsin_US` (`43.07, -89.40`)
  - `Waikato_NZ` (`-37.79, 175.28`)
  - `Punjab_IN` (`22.56 / 30.90` regional climate)
- **Strict temporal out-of-sample split:**
  - **Train:** `2016–2022` (`n = 36` region-years)
  - **Test:** `2023–2025` (`n = 18` region-years)
- **Out-of-sample test metrics (`n = 18`):**
  - **Ridge Regression baseline:** `R² = 0.8553` | `MAE = 6.04`
  - **FodderWeatherNet (PyTorch MLP):** `R² = 0.8740` | `MAE = 5.27` | `RMSE = 7.75`

---

## 3. Honest Limitations & Guardrails

1. **Small sample size (`n = 54` region-years):** `FodderWeatherNet` is a compact hackathon prototype trained on regional climate summaries rather than multi-thousand-farm harvest ground truth.
2. **Domain-derived targets:** Ground-truth suitability targets are derived from agronomic temperature/moisture response curves rather than proprietary farm yield ledgers; user-entered **Dairy Diary** logs calibrate local context in-browser (`localStorage`).
3. **Hard deterministic guardrails:** `FodderWeatherNet` outputs are *advisory* and never override the **4 Mandatory Domain Checks** (Heat/PAR, Water/Soil, 25–30% N-Fixation Cycle, and Double-Wall Heat-Exchanger Safety) or the **Open-Water Hard Exclusion Gate**.
