# MilkyWays — Research & Dataset Verification Brief
**Challenge:** NASA Space Apps Challenge Singapore 2026 — *Field Shift: Adapting Farms with NASA Data* (Challenge 7)  
**Submission Deadline:** Sun 15 Nov 2026, 23:59 SGT  

---

## 1. Official Challenge Overview (*Field Shift: Adapting Farms with NASA Data*)
- **Problem:** Farmers face shifting temperatures, unpredictable rainfall, extreme weather events, water scarcity, and degrading soil health.
- **Task:** Build a **decision-support tool** that combines:
  1. **NASA Earth observations** (temperature, precipitation, solar irradiance, soil moisture, crop vigour)
  2. **Local soil information** (texture, organic carbon, pH, drainage)
  3. **Crop characteristics** (nitrogen fixation, root depth, water demand, feed quality)
  4. **Farmer priorities & constraints** (soil health, water efficiency, heat risk, feed quality)
- **Core Objective:** Let dairy farmers compare **fodder rotation strategies** (energy silage like maize/sorghum rotated with N-fixing legumes like alfalfa/lucerne, clover, cowpea, berseem).

---

## 2. Live-Verified NASA POWER Baseline (Loretto, Ontario Region: `44.08°N, 79.88°W`)
Tested live against `https://power.larc.nasa.gov/api/temporal/climatology/point?community=AG` (no API key required):
- **`ALLSKY_SFC_SW_DWN` (All-sky surface shortwave downward irradiance):** `13.05 MJ/m²/day` annual avg (Jan `4.84`, May `19.84`, Jul `21.93`, Oct `8.59`)
- **`PRECTOTCORR` (Bias-corrected precipitation):** `2.16 mm/day` annual avg (Jan `1.83`, May `2.35`, Jul `2.24`, Oct `2.50`)
- **`T2M` (Air temperature at 2 m):** `7.00 °C` annual avg (Jan `-7.25 °C`, May `11.67 °C`, Jul `21.20 °C`, Oct `8.84 °C`; extreme range `-28.42 °C` to `35.71 °C`)
- **`WS2M` (Wind speed at 2 m):** `2.98 m/s` annual avg (Jan `3.89`, May `2.57`, Jul `2.20`, Oct `2.74`)

### Complementary NASA & Local Soil Datasets
- **NASA GPM IMERG:** ~10 km satellite rainfall for onset and season timing.
- **NASA SMAP (`SPL3SMP_E` L3 / L4):** 9 km daily surface and root-zone soil moisture (2015–present; current conditions only).
- **MODIS `MOD13Q1`:** 250 m 16-day NDVI/EVI vegetation greenness (2000–present).
- **Landsat / HLS:** 30 m field-level crop and bare-ground reflectance.
- **ISRIC SoilGrids (250 m, non-NASA):** Local soil texture, organic carbon, and pH.

---

## 3. Data Centre Waste Heat & Safety Framing
- **Dairy heat demand:** ~70% thermal energy, ~30% electricity; pasteurisation (HTST) requires `72–78 °C`, CIP washing `40–60 °C`, cold storage `< 5 °C`.
- **Data centre supply:** Low-grade waste heat (`30–45 °C` air, `55–70 °C` liquid cooling), boosted via heat pump to `70–90 °C` for pasteurisation, and paired with absorption chilling (`~7.2 °C`) for cooling.
- **Safety / trust design:** Closed data centre coolant loop + double-wall heat exchanger + food-grade water loop (**"the coolant never touches the milk"**), modeled on the Gais, Switzerland mountain cheese dairy (`1.5 GWh/year`, `20 °C → 14 °C`).
