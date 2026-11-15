# MilkyWays
**NASA Space Apps Challenge Singapore 2026** (14–15 Nov 2026)  
**Challenge 7:** *Field Shift: Adapting Farms with NASA Data*

## Demo Video
https://github.com/evecount/milkyways_NASA/raw/main/03-submission/demo/milkyway_video.mp4

- **Direct File:** [03-submission/demo/milkyway_video.mp4](./03-submission/demo/milkyway_video.mp4)

## What is this?
**MilkyWays** is a farmer-centered decision-support tool built for *Field Shift: Adapting Farms with NASA Data*. Using **live NASA POWER** 25-year agroclimatology alongside local soil type, acreage, and **farmer-chosen priorities** (soil health, water efficiency, heat resilience, feed quality, and waste-heat proximity), MilkyWays compares **4 candidate fodder crop rotations**—including the farm's existing baseline—showing why each is suggested, its bare-field vulnerability window, synthetic nitrogen savings (`25–30%`), and key gaps/risks. Complementary NASA GIBS/MODIS/SMAP/Landsat layers are mapped as planned/visual overlays, while **FodderWeatherNet** (PyTorch MLP, `R² = 0.8740`, `MAE = 5.27`, reproducible training script & model card in the repo) learns from farmer-logged Dairy Diary seasons. Separately, inspired by Gais, Switzerland (`1.5 GWh/yr`), MilkyWays models closed-loop double-wall heat-exchanger pasteurisation (*"the coolant never touches the milk"*) for co-located dairy–data-centre sites. *Advisory decision support only—validate with local agronomists and soil tests; does not replace farmer judgment.*

- **Live App:** https://evecount.github.io/milkyways_NASA/app/
- **Project Home & Technical Paper:** https://evecount.github.io/milkyways_NASA/paper/
- **7-Slide Demo:** https://evecount.github.io/milkyways_NASA/slides/

## Challenge 7 Brief Alignment

| Challenge 7 Goal | What **MilkyWays** Delivers Live |
| :--- | :--- |
| **Compare rotations & reveal tradeoffs** | 4 rotations (incl. N-fixing & negative control) + **6 Farm & Municipal MCDA sliders** (Soil, Water, Heat, Feed, Grid Proximity, Flood Buffer) that visibly re-rank winners |
| **Understand risk & make uncertainty visible** | **4 Mandatory Checks**, **Open-Water Hard Exclusion Gate**, `FodderWeatherNet` Stress Risk, and honest `~50 km` POWER / `2015+` SMAP limits |
| **Build an AI model** | **PyTorch `FodderWeatherNet`** (`R² = 0.8740`, `MAE = 5.27` vs. Ridge `0.8553`), running live in browser ([`model_weights.json`](./docs/app/model_weights.json), [`train_weather_predictor.py`](./03-submission/app/engine/train_weather_predictor.py), [`model-card.md`](./docs/model-card.md)) + transparent **Inside the Tuning** WLC formula |
| **An interactive map** | **Leaflet Satellite + Topo World View** with **13 global farms**, dynamic **NASA MCDA raster grid**, & **Zoom-Out Synergy Spider** |
| **Web app & decision support tool** | **Zero-install browser SDSS**, **12-Month Calendar**, **Dairy Diary**, & **Symbiotic Co-Location** (`55–70 °C` data-center loop → `72–78 °C` HTST) |

## Repository & Folder Structure
- `01-spec/` — The single source-of-truth product specification (`milkyways-product-spec.md`).
- `02-brand/final/` — Final approved MilkyWays brand stickers (`milkyways-sticker-galaxy-fade.png`, `milkyways-sticker-diecut-dark.png`).
- `03-submission/` — Reserved for the hackathon build, demo video, and submission assets (no code committed before **09:00 SGT Sat 14 Nov 2026**).
- `04-research/` — NASA dataset verification, product comparables, and waste-heat reference literature.

## Ground Rules
- No code or commits before **09:00 SGT Sat 14 Nov 2026**.
- Submission deadline: **Sun 15 Nov 2026, 23:59 SGT**.
- No NASA logo on the submission demo or project page.
- Demo format: **30-second video**.
- Keep all private contacts, unapproved farm names, and internal drafts out of the public repo (enforced via `.gitignore`).
