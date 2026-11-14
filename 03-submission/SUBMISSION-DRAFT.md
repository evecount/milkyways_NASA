# MilkyWays — Official Submission Page Copy

*Modeled directly on the clarity, prose structure, and link formatting of 2025 Global Winner (Best Use of Data) — Resonant Exoplanets*

---

## Project Name

**MilkyWays**

## Summary

MilkyWays is a decision-support tool that queries **live NASA POWER 25-year agroclimatology (`2001–2025`, `~50 km` grid)** in the browser to help an industrial dairy farm located next to an AI data center decide what fodder crop rotation to plant next. Unlike generic crop calendars or black-box ML recommenders, our system pairs NASA POWER climate data with deterministic agronomic rules, dairy thermodynamics, and a transparent PyTorch-trained MLP (`FodderWeatherNet`, exported to `model_weights.json` for client-side JS inference)—testing growing-season heat stress, water balance, nitrogen-fixation cycles, and indirect waste-heat recovery without opaque guesswork. We built an end-to-end browser pipeline: querying NASA POWER (`2001–2025` climatology) live in the browser (with GPM IMERG, SMAP, MODIS MOD13Q1, Landsat/HLS, and ISRIC SoilGrids documented as planned field-scale integration layers), scoring candidate fodder rotations against farmer-chosen priorities, and matching dairy plant thermal loads with closed-loop data center waste heat. Results are presented in an interactive web interface with trade-off bars and an explicit double-wall heat-exchanger safety model (*"the coolant never touches the milk"*). This matters because dairy farms face shifting weather and high thermal energy demand (~70% thermal, ~30% electricity), while nearby data centers reject low-grade heat continuously; combining NASA open data in the field with circular heat in the plant cuts synthetic nitrogen fertilizer needs by 25–30% and turns wasted heat into safe pasteurization and cold storage.

## Project Demonstration

- **Link to Project Demo (`<= 30s` video):** *(to be added from `03-submission/demo/`)*

## Project

- `https://evecount.github.io/milkyways_NASA/app/` *(Live Interactive Tool)*
- `https://evecount.github.io/milkyways_NASA/` *(Documentation & Architecture)*

## Project Details

MilkyWays is a web-based decision-support application that combines NASA Earth observations, agronomic rotation rules, and dairy thermal engineering to guide fodder planting and waste-heat reuse for an industrial dairy farm next to an AI data center. The system queries live NASA POWER agroclimatology data (`T2M`, `T2M_MAX`, `T2M_MIN`, `PRECTOTCORR`, `ALLSKY_SFC_SW_DWN`, `WS2M`) for any farm coordinate, incorporates soil texture and farmer priority weights (Soil Health, Water Efficiency, Heat Resilience, Dairy Feed Quality), and ranks candidate rotations of energy silage (maize, sorghum) and nitrogen-fixing legumes (alfalfa, clover, cowpea, berseem). Alongside the field score, it calculates the dairy plant's daily thermal demand (`~817 kWh/day` for a `20,000 L/day` reference plant) and models how low-grade data center heat (`30–45 °C` air / `55–70 °C` liquid) is boosted by a heat pump to `70–90 °C` for HTST pasteurization (`72–78 °C`) and absorption chilling (`~7.2 °C`).

The benefits are transparency, agronomic validity, and food-safety clarity: black-box AI recommendations are hard for farmers to trust, whereas MilkyWays shows exact `0–100` trade-off scores per criterion and validates against real benchmarks—including the commercial Gais, Switzerland mountain cheese dairy (`1.5 GWh/year`, `20 °C → 14 °C`) as a positive control and continuous maize monocropping or unboosted low-grade air heat as negative controls. The intended impact is to give dairy operators a practical, zero-cost tool to reduce synthetic nitrogen fertilizer use by `25–30%`, protect soil organic matter, and evaluate circular waste-heat integration without risking milk safety.

We built the project with HTML5, CSS3, and Vanilla JavaScript calling the live `NASA POWER` REST API directly in the browser, paired with `MkDocs Material` (Python), `Mermaid.js` architecture diagrams, and `GitHub Actions` / `GitHub Pages` for zero-backend public deployment.

The project is creative because it bridges space-based Earth observation with a real industrial symbiosis—cows and servers, milk and heat—turning complex climate, soil, and thermodynamic constraints into an interactive, plain-language workflow accessible to any farmer without logins or API keys.

## Use of Artificial Intelligence (AI)

- We used AI-assisted coding and documentation tools during the hackathon to accelerate `MkDocs Material` scaffolding, frontend layout boilerplate, and submission copy drafting.
- The core rotation-scoring engine and thermodynamic heat-balance model are deterministic and rule-based, paired with `FodderWeatherNet` (a PyTorch-trained MLP exported to `model_weights.json` executing a client-side JS forward pass, documented in `docs/model-card.md`) that is always guarded by our four mandatory deterministic checks.
- Any AI-generated code or documentation was reviewed, tested, and refined by the team before integration.
- No AI-generated images, logos, or NASA branding were used or modified.
- All AI involvement is documented transparently in the repository.

## NASA Data

- [NASA POWER (Prediction Of Worldwide Energy Resources) Agroclimatology API](https://power.larc.nasa.gov/api/temporal/daily/point)
- [NASA GPM IMERG (Integrated Multi-satellitE Retrievals for GPM)](https://gpm.nasa.gov/data/imerg)
- [NASA SMAP (Soil Moisture Active Passive, SPL3SMP_E L3/L4)](https://www.earthdata.nasa.gov/topics/human-dimensions/agriculture-production/data-access-tools)
- [MODIS/Terra Vegetation Indices 16-Day L3 Global 250m (MOD13Q1)](https://www.earthdata.nasa.gov/topics/human-dimensions/agriculture-production/data-access-tools)
- [Landsat / Harmonized Landsat Sentinel-2 (HLS)](https://www.earthdata.nasa.gov/topics/human-dimensions/agriculture-production/data-access-tools)

## Space Agency Partner & Other Data

- [ESA Sentinel-2 (via Harmonized Landsat Sentinel-2)](https://sentinel.esa.int/web/sentinel/missions/sentinel-2)
- [ISRIC SoilGrids (250m Global Soil Information)](https://soilgrids.org/)
- [Bytes2Heat Best-Practice Overview (Gais, Switzerland Cheese Dairy, 1.5 GWh/yr)](https://www.bytes2heat.de/static/files/20240403_BP%C3%9C_V2404_eng.pdf)
- [Sunniva Encon Milk Pasteurization Thermal Benchmark (20,000 L/day, 817 kWh/day)](https://www.sunnivaencon.com/)
- [MkDocs Material (Static Documentation Framework)](https://squidfunk.github.io/mkdocs-material/)
- [Mermaid.js (Architecture & Loop Diagrams)](https://mermaid.js.org/)
