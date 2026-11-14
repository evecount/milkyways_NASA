# MilkyWays — Official Submission Page Draft
*Aligned to `submission_details.pdf` (2026 Project Submission Guide) & modeled on 2025 Best Use of Data winner `Resonant Exoplanets`*

---

## 1. Project Name
**MilkyWays**

## 2. High-Level Project Summary
**MilkyWays** is an explainable decision-support tool for an industrial dairy farm located next to an AI data centre. Using live **NASA POWER** Earth observations alongside **GPM IMERG**, **SMAP**, **MODIS MOD13Q1**, **Landsat/HLS**, and local soil data, it ranks fodder crop rotations (energy silage ↔ nitrogen-fixing legumes) across soil health, water efficiency, heat resilience, and dairy feed quality — while pairing milk pasteurisation (`72–78 °C`) and cold storage (`~7.2 °C`) with indirect data centre waste heat (*"the coolant never touches the milk"*).

## 3. Link to Project Demo
- **Format:** `<= 30 seconds` video *(script & storyboard in `03-submission/demo/30s-video-script.md`)*
- **Hosting:** Publicly accessible link (YouTube / GitHub / Google Drive — no login or password required).

## 4. Link to Final Project
- **Live Interactive Tool:** `https://evecount.github.io/milkyways_NASA/app/`
- **Project Documentation & Architecture:** `https://evecount.github.io/milkyways_NASA/`
- **Source Repository:** `https://github.com/evecount/milkyways_NASA`

---

## 5. Detailed Project Description

### What exactly does it do?
MilkyWays answers one practical question for an industrial dairy farm next to an AI data centre: **What fodder rotation should this farm plant next?** Farmers select their location, soil profile, daily milk volume, and priority weights (Soil Health, Water Efficiency, Heat Resilience, Dairy Feed Quality), and MilkyWays returns a ranked list of fodder rotations with transparent trade-offs and a matched waste-heat balance for the dairy plant.

### How does it work?
Instead of a black-box ML model, MilkyWays pairs **NASA Earth observations** with **deterministic agronomic and thermodynamic checks** (inspired by 2025 *Best Use of Data* winner *Resonant Exoplanets*):
1. **Live NASA POWER Query:** Fetches `T2M`, `PRECTOTCORR`, `ALLSKY_SFC_SW_DWN`, and `WS2M` directly in the browser (`community=AG`).
2. **4 Mandatory Domain Checks:**
   - *Growing-Season Heat & Frost Check* (`T2M` / solar irradiance vs. C3 vs. C4 fodder thresholds)
   - *Water-Balance Check* (`PRECTOTCORR` + soil drainage)
   - *Nitrogen-Fixation Cycle Check* (rotating maize/sorghum silage with alfalfa/clover/cowpea legumes to cut N fertiliser by **25–30%**)
   - *Waste-Heat & Double-Wall Isolation Check* (`55–70 °C` liquid data-centre heat → heat-pump boost `70–90 °C` → `72–78 °C` HTST pasteurisation & `~7.2 °C` absorption chilling; closed primary coolant loop).
3. **Positive & Negative Controls:** Validated against published benchmarks — **Positive controls:** Gais, Switzerland mountain cheese dairy (`1.5 GWh/year`, `20 °C → 14 °C`) and Maize→Alfalfa→Clover (`25–30%` N reduction); **Negative controls:** Continuous Maize Monocrop (soil N depletion) and unboosted `30–45 °C` air waste heat (insufficient for `72–78 °C` HTST without a heat-pump boost).

### What benefits does it have?
- Helps dairy farmers protect soil organic matter and cut synthetic nitrogen fertiliser by `25–30%` via legume rotations.
- Turns low-grade data centre waste heat into useful thermal energy for a dairy plant (~70% thermal demand), with explicit double-wall food-safety isolation.

### What do you hope to achieve?
A plain-language, zero-lock-in template that any dairy farm near a data centre can run against live NASA climate data to evaluate fodder resilience and circular waste-heat reuse.

### What tools, coding languages, hardware, or software did you use?
- **Frontend & Live API:** HTML5, CSS3, Vanilla JavaScript calling `NASA POWER` REST API (`power.larc.nasa.gov`)
- **Documentation & Hosting:** Python, `MkDocs Material`, GitHub Actions, GitHub Pages
- **Diagrams:** Mermaid.js

---

## 6. Use of Super Intelligence (SI)
- **Code & Text Assistance:** AI coding/writing assistants were used to accelerate documentation structuring, MkDocs scaffolding, and frontend boilerplate. All architecture, dataset selection, agronomic rules, and thermodynamic limits were authored and verified by the team.
- **Branding / Images:** No NASA logos, flags, or mission identifiers were generated or modified.

---

## 7. NASA Data
- **NASA POWER (`community=AG`):** `T2M`, `T2M_MAX`, `T2M_MIN`, `PRECTOTCORR`, `ALLSKY_SFC_SW_DWN`, `WS2M` (`https://power.larc.nasa.gov/api/temporal/daily/point`) — *queried live in the app*.
- **NASA GPM IMERG:** ~10 km satellite rainfall for onset timing (`https://gpm.nasa.gov/data/imerg`).
- **NASA SMAP (`SPL3SMP_E` L3 / L4):** 9 km surface & root-zone soil moisture, `2015–present` (used for current conditions only).
- **MODIS `MOD13Q1`:** 250 m 16-day NDVI/EVI crop vigour (`2000–present`).
- **Landsat / HLS:** 30 m field-level surface reflectance (`https://www.earthdata.nasa.gov/topics/human-dimensions/agriculture-production/data-access-tools`).

---

## 8. Space Agency Partner Data and Other References
- **ISRIC SoilGrids (`250 m`):** Soil texture, organic carbon, pH (`https://soilgrids.org/`).
- **Bytes2Heat (Gais, Switzerland cheese dairy, `1.5 GWh/yr`):** `https://www.bytes2heat.de/static/files/20240403_BP%C3%9C_V2404_eng.pdf`
- **Sunniva Encon (Milk Pasteurisation, `20,000 L/day`, `817 kWh/day`):** `https://www.sunnivaencon.com/applications/milk-pasteurisation`
- **Dairy Fodder Rotation Legume N-Reduction (`25–30%`):** `https://agriculture.institute/livestock-pasture-management/best-practices-growing-irrigated-fodder-crops/`
