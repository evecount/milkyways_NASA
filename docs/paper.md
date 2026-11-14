# MilkyWays: Physics- and Agronomy-Informed Dairy Fodder Rotation and Waste-Heat Decision Support Using NASA Earth Observations

**Team:** MilkyWays (Gwendalynn Lim Wan Ting)  
**Event:** NASA Space Apps Challenge Singapore 2026 &mdash; Challenge 7: *Field Shift: Adapting Farms with NASA Data*  
**Live Tool:** [https://evecount.github.io/milkyways_NASA/app/](https://evecount.github.io/milkyways_NASA/app/)  

---

## Abstract

We present **MilkyWays**, an explainable decision-support system for an industrial dairy farm co-located with an AI data center. Dairy farms face two coupled challenges: (1) adapting fodder crop rotations to shifting temperature, precipitation, and soil moisture regimes, and (2) supplying high thermal energy loads (~70% thermal, ~30% electricity) for pasteurization and cold storage. **MilkyWays** queries the live **NASA POWER Agroclimatology API** (`T2M`, `T2M_MAX`, `T2M_MIN`, `PRECTOTCORR`, `ALLSKY_SFC_SW_DWN`, `WS2M`) directly in the browser, pairs it with **GPM IMERG**, **SMAP**, **MODIS MOD13Q1**, **Landsat/HLS**, and **ISRIC SoilGrids**, and enforces **four mandatory agronomic and thermodynamic checks** alongside explicit **positive and negative controls**. On the verified Ontario Dairy Region baseline (`44.08°N, 79.88°W`), legume-cereal rotations (`Maize → Alfalfa → Red Clover`) reduce synthetic nitrogen fertilizer requirements by **25–30%** compared with continuous maize monocropping, while closed-loop liquid data center heat (`55–70 °C`) boosted by a heat pump (`70–90 °C`) satisfies HTST pasteurization (`72–78 °C`) via a double-wall heat exchanger (*"the coolant never touches the milk"*).

---

## 1. Introduction & Problem Statement

Agricultural decision-support tools frequently fail farmers in two ways: generic crop calendars ignore local climate shifts, while opaque black-box machine learning recommenders cannot explain *why* a rotation is recommended or verify physical safety constraints.

**MilkyWays** couples open NASA Earth observations with deterministic domain constraints:

1. **In the field:** Evaluate candidate dairy fodder rotations—balancing C4 energy silage (maize, sorghum) with C3 nitrogen-fixing legumes (alfalfa/lucerne, red clover, cowpea, berseem)—against live climate, soil drainage, and farmer priority weights.
2. **In the dairy plant:** Model daily thermal pasteurization demand (`~817 kWh/day` or `~82 kW` averaged for a `20,000 L/day` reference plant) and absorption chilling (`~7.2 °C`) powered by indirect AI data center waste heat.

---

## 2. NASA Earth Observations & Data Pipeline

| Dataset | Exact Variables | Spatial / Temporal Scope | Role in MilkyWays |
| --- | --- | --- | --- |
| **NASA POWER** (`community=AG`) | `T2M`, `T2M_MAX`, `T2M_MIN`, `PRECTOTCORR`, `ALLSKY_SFC_SW_DWN`, `WS2M` | `~50 km` grid, daily & Jan–Dec climatology | Queried live in-browser to score growing-season heat stress, solar PAR proxy, and precipitation balance |
| **NASA GPM IMERG** | Satellite precipitation rate | `~10 km` grid | Resolves rainfall onset and planting-window timing where 50 km POWER is coarse |
| **NASA SMAP** (`SPL3SMP_E` L3/L4) | Surface & root-zone soil moisture (`m³/m³`) | `9 km` daily (`2015–present`) | Current moisture deficit check prior to seeding deep-rooted legumes *(not used for 20-year trends)* |
| **MODIS `MOD13Q1`** | 16-day NDVI / EVI | `250 m` (`2000–present`) | Multi-season crop vigor comparison across rotation cycles |
| **Landsat / HLS** | Surface reflectance | `30 m` | Field-level bare-ground and residue cover verification |
| **ISRIC SoilGrids** *(non-NASA)* | Texture (clay/sand/silt), organic carbon, pH | `250 m` global grid | Local water-holding capacity combined with farmer priority sliders |

### Live Verified Baseline (`44.08°N, 79.88°W`, Ontario Dairy Region)

- **Mean Annual Temperature (`T2M`):** `7.00 °C` (Jan `-7.25 °C`, May `11.67 °C`, Jul `21.20 °C`, Oct `8.84 °C`; extreme range `-28.42 °C` to `35.71 °C`)
- **Annual Precipitation (`PRECTOTCORR`):** `2.16 mm/day` (Jan `1.83`, May `2.35`, Jul `2.24`, Oct `2.50`)
- **Solar Irradiance (`ALLSKY_SFC_SW_DWN`):** `13.05 MJ/m²/day` (Jan `4.84`, May `19.84`, Jul `21.93`, Oct `8.59`)
- **Wind Speed (`WS2M`):** `2.98 m/s`

---

### 2b. Anti-Hallucination Infrastructure & Dairy Grounding (Separate Facility Tables)

Because both hyperscale AI facilities (proprietary infrastructure) and dairy farm addresses (protected under agricultural privacy laws in many countries) lack a single unified government registry, **MilkyWays** sources and documents two separate, verifiable open-data tables:

1. **AI Data Center Table (How Sourced):** Built from satellite-verified and DOE/open-source facility registries — **IM3 Open Source Data Center Atlas** (PNNL/DOE, filtered to `≥ 250,000 sq ft` campuses with water/transmission layers), **Data Center Atlas (`kiankyars/datacenter-atlas`)** (announced/under-construction mega-projects), **ATLAS (`Ringmast4r/Global-Data-Center-Map`)** (`18,110+` facilities / `6,100+` exact GPS coords across `116` countries), and **PeeringDB** (`5,200+` interconnection hubs).
2. **Dairy Farm Table (How Sourced):** Built separately by combining **FAO Gridded Livestock of the World (`GLW 4`, ~10 km)**, **Cal-FF Factory Farm Census** (`2,121` aerial-CV barn/lagoon polygons), **State CAFO Permit Registries** (ArcGIS Hub for NY, MI, WI), **OpenStreetMap Overpass** (`landuse=farmyard`, `building=cowshed`), **UK Registered Dairy Establishments** (`data.gov.uk` CSV), and **NASA CMS / Vista-CA** (aerial AI dairy & manure lagoon CH₄ mapping for biogas co-generation).
3. **Metric Buffer Join:** Reprojecting both layers into `EPSG:3857` / local UTM and running `gpd.sjoin(dairy_farms, datacenters.buffer(12000))` enforces our **`12 km` viable pipe cutoff** (rendering dashed pipe connectors `≤ 12 km` and co-location **Position Beacons** beyond `12 km`), then samples **NASA GRACE-FO** and **ECOSTRESS** at each intersection.

---

## 3. Four Mandatory Domain Checks

Every candidate configuration in **MilkyWays** must pass four explicit checks:

1. **Heat & Solar PAR Check:** Evaluates peak monthly `T2M` and `ALLSKY_SFC_SW_DWN` to balance C3 temperate legumes (alfalfa/clover) against heat-tolerant C4 silage/legumes (sorghum/cowpea).
2. **Water & Soil Drainage Check:** Evaluates `PRECTOTCORR` against local soil texture (Clay Loam, Sandy Loam, Heavy Clay) to flag drought-prone combinations.
3. **Nitrogen-Fixation Cycle Check:** Verifies that energy silage is rotated with nitrogen-fixing legumes, reducing synthetic nitrogen fertilizer demand by **25–30%** compared with cereal monocropping.
4. **Waste-Heat Temperature & Double-Wall Isolation Check:** Verifies whether the data center heat source reaches HTST pasteurization (`72–78 °C`) via a heat-pump boost (`70–90 °C`) across a **double-wall heat exchanger** isolating the closed primary coolant loop from the food-grade water loop.

---

## 4. Validation with Positive & Negative Controls

| Control Case | Configuration | Outcome | Benchmark Reference |
| --- | --- | --- | --- |
| **Positive Control 1 (Field)** | `Maize Silage → Alfalfa (3 yr) → Red Clover` | **PASS** — Highest soil health (`92/100`) & feed quality (`94/100`), `25–30%` N reduction | Irrigated fodder rotation literature |
| **Positive Control 2 (Thermal)** | `55–70 °C` liquid cooling + heat pump (`70–90 °C`) + double-wall HX | **PASS** — Meets `72–78 °C` HTST & `~7.2 °C` absorption chilling; zero coolant contact | Gais, Switzerland cheese dairy (`1.5 GWh/yr`, `20 °C → 14 °C`) |
| **Negative Control 1 (Field)** | `Continuous Maize Monocrop` | **FAIL (Flagged)** — Soil score `32/100`; fails N-fixation cycle & increases erosion risk | Monoculture baseline |
| **Negative Control 2 (Thermal)** | `30–45 °C` air waste heat (unboosted) | **FAIL** — Cannot reach `72–78 °C` HTST pasteurization without heat-pump boost | Dairy thermal engineering limits |

---

## 5. Honest Limits & Future Work

- **Spatial resolution:** NASA POWER (`~50 km`) models regional climate, not individual paddocks; field-scale deployment pairs it with `10 km` GPM IMERG, `9 km` SMAP, `250 m` MODIS, and `30 m` HLS.
- **Temporal record:** SMAP begins in `2015` and is restricted to current soil-moisture conditions.
- **Next horizon:** Generalize the closed-loop heat-recovery model and predictive weather pipeline to a second farm type (broiler poultry houses requiring `32–34 °C` brooding heat and NASA heat-stress alerts).
- **Future efficiency & rural grid symbiosis:** AI data centers are increasingly sited in rural agricultural regions for land, water, and high-voltage transmission access—putting them directly alongside livestock and dairy operations (e.g., ~4,925 active/under-construction U.S. data centers sharing rural grids and aquifers with 11,000–15,000+ regulated livestock operations). Existing GIS-based Spatial Decision Support Systems (SDSS) with Multi-Criteria Decision Analysis (MCDA) (such as Esri ArcGIS, LUCIS, UrbanFootprint, and Latapult) focus on *pre-construction site selection* for developers and planners. **MilkyWays** brings open, zero-cost SDSS + MCDA directly to the **farmer's and municipality's side of the fence** after co-location—using NASA POWER, SMAP, and `FodderWeatherNet` to optimize fodder rotations and closed-loop dairy waste-heat recovery on the shared watershed. Together, farms and local planners can export auditable, non-black-box climate and thermal-balance evidence to argue in tandem for closed-loop co-location zoning rather than farmland conversion.

---

## 5. Predictive Deep Learning Model (`FodderWeatherNet`)

To make **MilkyWays** a predictive decision-support tool rather than a static lookup, we trained **FodderWeatherNet**, a PyTorch 3-layer Multi-Layer Perceptron (`8 → 32 → 16 → 3`, ReLU activations, Adam optimizer) on **10 years of real daily NASA POWER observations (`2016–2025`)** across **6 global dairy regions** (`Ontario_CA`, `Gais_CH`, `Singapore_SG`, `Wisconsin_US`, `Waikato_NZ`, `Punjab_IN`).

- **Predictive setup:** Annual weather features at year `t` (`T2M`, `PRECTOTCORR`, `ALLSKY_SFC_SW_DWN`, `WS2M`, `GDD_base10`, frost days `<0 °C`, heat-stress days `>30 °C`, dry-day ratio `<1 mm`) predict next-season (`t+1`) **C3 Temperate Fodder Suitability**, **C4 Warm-Season Fodder Suitability**, and **Heat/Drought Stress Risk**.
- **Strict temporal out-of-sample split:** Trained on `2016–2022` (`n = 36` region-years) and evaluated on `2023–2025` (`n = 18` region-years).
- **Verified results:**
  - **Ridge Regression Baseline:** `R² = 0.8553` | `MAE = 6.04`
  - **FodderWeatherNet (PyTorch MLP):** `R² = 0.8740` | `MAE = 5.27` | `RMSE = 7.75`
- **Live browser inference:** Trained weights (`model_weights.json`) execute a real forward pass directly in JavaScript inside the web app, guarded by the four mandatory agronomic and thermodynamic checks.

---

## 6. Municipal Replicability & Next-Horizon Agricultural Extensions

While **MilkyWays** keeps its validated baseline focused on **dairy farms** (where `55–70 °C` liquid cooling + heat pump boost meets `72–78 °C` HTST pasteurization and `~7.2 °C` chilling), the underlying **NASA Earth-observation + 6-criterion MCDA + Double-Wall Heat Exchanger + Municipal Feasibility Packet** architecture is modular. Other municipalities can adapt the same siting workflow to additional high-heat agricultural verticals:

| Agricultural Vertical | Target Thermal Band | Data-Center Waste-Heat Match | Municipal Land/Water/Energy Synergy |
| :--- | :--- | :--- | :--- |
| **Dairy Processing & Fodder** *(Validated Baseline)* | `72–78 °C` HTST + `~7.2 °C` chill | `55–70 °C` liquid + heat pump boost | Cuts synthetic N `25–30%` via legume rotations; year-round milk cooling & pasteurization |
| **Heated Greenhouses & Glasshouses** | `18–25 °C` space & root-zone | Direct `30–55 °C` (no HP needed) | Highest total thermal sink per hectare; extends local vegetable seasons |
| **Warm-Water Aquaculture (RAS)** | `26–30 °C` tank water | Direct `35–55 °C` via plate HX | High thermal mass baseload; pairs well with peri-urban water treatment |
| **Broiler Poultry & Hatcheries** | `32–34 °C` brooding / `37.5 °C` | Direct `35–50 °C` hydronic floor | Continuous 24/7 brooding heat; lowers fossil propane/LPG use |
| **Swine Farrowing & Nursery** | `30–35 °C` creep / floor | Direct `35–45 °C` radiant loops | Targeted zone heating while keeping sow housing cool |
| **Grain, Hay & Forage Drying** | `40–65 °C` warm dry air | Direct `40–45 °C` or light boost | Seasonal harvest load reduction for maize, paddy, and silage |
| **Mining & Industrial Compression** *(Arid / North Africa)* | `~7.2 °C` chilling + `72–78 °C` HTST | Direct `80–150 °C` compression heat | Replaces `2.8–4.0 MW` electric chillers (per `10 MW` heat) with absorption chilling + desalination |

---

## References

1. NASA POWER Agroclimatology API: `https://power.larc.nasa.gov/api/temporal/daily/point`
2. NASA Earthdata Agriculture Production: `https://www.earthdata.nasa.gov/topics/human-dimensions/agriculture-production/data-access-tools`
3. Bytes2Heat Best-Practice Overview (Gais, Switzerland Cheese Dairy, `1.5 GWh/yr`): `https://www.bytes2heat.de/static/files/20240403_BP%C3%9C_V2404_eng.pdf`
4. Sunniva Encon Milk Pasteurization (`20,000 L/day`, `817 kWh/day`): `https://www.sunnivaencon.com/applications/milk-pasteurisation`
5. Dairy Fodder Rotation Legume Nitrogen Reduction (`25–30%`): `https://agriculture.institute/livestock-pasture-management/best-practices-growing-irrigated-fodder-crops/`
6. Control-validation methodology inspired by NASA Space Apps 2025 *Best Use of Data* winner *Resonant Exoplanets*: `https://www.spaceappschallenge.org/2025/find-a-team/resonant-exoplanets/`
