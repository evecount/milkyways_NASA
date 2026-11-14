# MilkyWays — Official Submission Page Draft
*Structured after 2025 Global Winner (Best Use of Data) — Resonant Exoplanets*

---

## Project Name
**MilkyWays**

## High-Level Summary
**MilkyWays** is an explainable decision-support tool for an industrial dairy farm located next to an AI data centre. Using live NASA Earth observations (`NASA POWER`) alongside `GPM IMERG`, `SMAP`, `MODIS MOD13Q1`, `Landsat/HLS`, and local soil data, it ranks fodder crop rotations (energy silage ↔ nitrogen-fixing legumes) by soil health, water efficiency, heat resilience, and dairy feed quality — while pairing milk pasteurisation (`72–78 °C`) and cold storage (`~7 °C`) with indirect data centre waste heat (*"the coolant never touches the milk"*).

## Final Project Link
- **Live App:** `https://evecount.github.io/milkyways_NASA/app/`
- **Project Documentation & Architecture:** `https://evecount.github.io/milkyways_NASA/`
- **Source Repository:** `https://github.com/evecount/milkyways_NASA`

## Project Demo
- **Format:** 30-second video *(to be linked in `03-submission/demo/`)*

---

## Detailed Project Description

### 1. The Problem
Industrial dairy farms must balance two pressures at once:
1. **In the field:** Shifting temperatures, erratic rainfall, and soil degradation make fodder crop rotation decisions high-stakes.
2. **In the dairy plant:** Milk processing is ~70% thermal energy (pasteurisation, CIP washing) and ~30% electricity (chilling), while nearby AI data centres reject low-grade heat continuously.

### 2. Our Domain-First Approach (Why Not a Black Box)
Instead of opaque machine learning predictions, **MilkyWays** pairs **NASA Earth observations** directly with **agronomic rotation rules** and **dairy thermodynamics**:
- **Agronomic engine:** Evaluates C3 protein legumes (alfalfa/lucerne, red clover, cowpea, berseem) rotated with C4 energy silage (maize, sorghum), reducing nitrogen fertiliser demand by **25–30%** compared with continuous cereal monocrops.
- **Priority-weighted ranking:** Farmers adjust weights for Soil Health, Water Efficiency, Heat Resilience, and Dairy Feed Quality to see transparent trade-offs (`0–100` score per dimension).
- **Waste-heat & food-safety loop:** Models low-grade data centre heat (`30–45 °C` air / `55–70 °C` liquid) boosted by a heat pump to `70–90 °C` for HTST pasteurisation (`72–78 °C`) and driving single-effect absorption chilling (`~7.2 °C`, COP `0.4–0.73`). A **closed primary coolant loop + double-wall heat exchanger + separate food-grade water loop** guarantees the coolant never touches the milk (modeled on the commercial **Gais, Switzerland** cheese dairy at `1.5 GWh/year`).

---

## Space Agency Data (Best Use of Data)

| Dataset | Exact Variables | How MilkyWays Uses It | Honest Scope / Limits |
|---|---|---|---|
| **NASA POWER** (`community=AG`) — *Live in App* | `T2M`, `T2M_MAX`, `T2M_MIN`, `PRECTOTCORR`, `ALLSKY_SFC_SW_DWN`, `WS2M` | Queried live in-browser to score growing-season heat stress, solar irradiance (PAR proxy), and baseline water balance | `~50 km` regional climate grid; not paddock-level |
| **NASA GPM IMERG** | Satellite precipitation rate | Resolves rainfall onset and planting-window timing | `~10 km` resolution |
| **NASA SMAP** (`SPL3SMP_E` L3/L4) | Surface & root-zone soil moisture | Flags current moisture deficit before seeding deep-rooted legumes | `9 km` daily, `2015–present` (current conditions only, not 20-year trends) |
| **MODIS `MOD13Q1`** | 16-day NDVI / EVI | Compares multi-season crop vigour across rotation cycles | `250 m` resolution (`2000–present`) |
| **Landsat / HLS** | Surface reflectance | Field-level bare-ground and residue verification | `30 m` resolution |

**Supporting Non-NASA Data:** ISRIC SoilGrids (`250 m` clay/sand/silt, organic carbon, pH) + farmer-entered milk volume (`L/day`) and priority weights.

---

## References
- NASA POWER Agroclimatology API: `https://power.larc.nasa.gov/api/temporal/daily/point`
- NASA Earthdata Agriculture Production: `https://www.earthdata.nasa.gov/topics/human-dimensions/agriculture-production/data-access-tools`
- Bytes2Heat Best-Practice Overview (Gais, Switzerland cheese dairy, `1.5 GWh/yr`): `https://www.bytes2heat.de/static/files/20240403_BP%C3%9C_V2404_eng.pdf`
- Sunniva Encon Milk Pasteurisation (`20,000 L/day`, `817 kWh/day`): `https://www.sunnivaencon.com/applications/milk-pasteurisation`
- Dairy Fodder Rotation Legume N-Reduction (`25–30%`): `https://agriculture.institute/livestock-pasture-management/best-practices-growing-irrigated-fodder-crops/`
