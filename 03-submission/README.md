# MilkyWays — Submission & Build Shell

**Challenge:** NASA Space Apps Challenge 2026 — Challenge 7 (*Field Shift: Adapting Farms with NASA Data*)  
**Repo initialized:** Sat 14 Nov 2026 (after 09:00 SGT official start)  
**Submission deadline:** Sun 15 Nov 2026, 23:59 SGT  

## Structure
- `app/data/` — NASA POWER / SMAP / MODIS / SoilGrids data adapters & fodder crop profiles (energy silage vs. N-fixing legumes).
- `app/engine/` — Explainable rule-based rotation scorer & data-centre waste-heat balance (pasteurization + absorption cooling, closed double-wall heat exchanger).
- `app/ui/` — Plain-language farmer decision-support UI (location, soil, farmer priorities → ranked rotations + trade-offs).
- `demo/` — 30-second demo video script, assets, and final export.

## NASA Datasets
- **NASA POWER** (`https://power.larc.nasa.gov/api/temporal/daily/point`) — Temperature, precipitation, solar irradiance, wind.
- **NASA GPM IMERG** — ~10 km rainfall onset & season timing.
- **NASA SMAP (`SPL3SMP_E` L3 / L4)** — Surface & root-zone soil moisture (2015–present).
- **MODIS `MOD13Q1`** — 250 m 16-day NDVI/EVI crop vigor.
- **Landsat / HLS** — 30 m field-level reflectance.
