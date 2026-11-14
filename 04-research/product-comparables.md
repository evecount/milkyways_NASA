# MilkyWays — Product Comparables
Research, 14 Nov 2026, before the build. For Anti-Gravity / product design.

## The gap
No tool found combines all three: (1) dairy fodder rotation choice, (2) NASA Earth observation data, (3) data centre waste heat for milk pasteurisation / cooling, in one plain-language tool for one farm.

## 1. Direct competitors — dairy pasture / rotation

### Pasture.io
- https://pasture.io/
- Satellite-backed pasture measurement, growth rate predictions, Target Rotation Tool and Rotation Right Tool.
- Tells a farmer grazing available (days) and pasture available (kgDM/animal/day), surplus / deficit, whether to shut paddocks for silage.
- What it does NOT do: no fodder crop choice for next season, no NASA POWER / SMAP / NDVI ranking of rotations, no heat reuse, no farmer-priority weighting. It is grazing management, not rotation planning.
- Lesson for MilkyWays: copy its plain metrics — days, kgDM, surplus / deficit — and its "indicator and a guide, not a prescription" tone.

### FarmFlow (New Zealand)
- https://farmflow.co.nz/
- Dairy farm management: grazing records, rotation days, pasture cover kgDM/ha, spring rotation planner, N application linkage, herd health.
- What it does NOT do: no satellite data, no crop rotation choice, no heat. It is a record system with a planner, not a NASA-data tool.
- Lesson: copy the spring rotation planner idea, and the advisor-ready CSV export.

### PaddockPal — Rotation Planner
- Facebook reel, 13 Oct 2026, https://www.facebook.com/reel/1367048232169786/
- Sets up a grazing rotation, calculates grazings per paddock to hit a target rotation length, auto-selects paddocks, excludes reseeding / silage / spray paddocks, adjusts cow numbers and intake, prints a paddock map.
- What it does NOT do: no satellite data, no fodder choice, no heat.
- Lesson: copy the paddock map print view, and the exclude-a-paddock control.

### Pasture Ai (app)
- https://www.appbrain.com/app/pasture-ai/pasture.app
- Photo of grass, AI gives nutritional value, dry matter, feed calculator, paddock history.
- What it does NOT do: no rotation ranking, no NASA data, no heat.
- Lesson: phone-photo input is a good future feature, not for this weekend.

### SEPATOU (INRA, France)
- Academic simulator, discrete-event, models a dairy farmer's day-to-day grazing decisions, grass growth, animal consumption, milk production, under different weather.
- What it does NOT do: not a farmer-facing product, no satellite data, no heat.
- Lesson: simulation to compare strategies is the right model, but keep it to a simple ranked list, not a full simulator.

## 2. Same challenge, NASA Space Apps 2026, Challenge 7 — Field Shift

These are the closest comparables, and the ones judges will compare MilkyWays with.

### RotaShift
- https://github.com/XtremeseOISHEE/RotaShift
- Bangladesh haor basin. Measures how far the growing window has moved from 22 years of NASA rainfall data, shows which rotations survive that shift while improving soil.
- Data: GPM IMERG rainfall, NASA POWER temperature / growing degree days, SMAP soil moisture (current only, record starts 2015), Sentinel-2 / Landsat NDVI, Sentinel-1 SAR.
- Honest limits, stated plainly: prototype, sample values, not an agronomic recommendation. POWER is a ~50 km grid, onset runs on IMERG ~10 km.
- Difference from MilkyWays: rice / Bangladesh smallholder, no dairy, no fodder, no heat, no farmer priorities. MilkyWays is dairy fodder, Canada, and heat reuse.

### Aboho (Team RAMT, Bangladesh)
- https://field-shift-agrinomy.vercel.app/
- Decision-support tool, explores and compares crop-rotation options based on field conditions and historical climate.
- Data: NASA POWER, GPM IMERG, CHIRPS. Rule-based evaluation, crop suitability, planting-window analysis.
- Difference: same NASA stack, different crop / country, no dairy, no fodder, no heat.

### Farmyza (Team Solven, Bangladesh)
- SaaS platform, click a field map, ML evaluates micro-history, generates ideal crop rotations, restorative crops like pulses to cut irrigation, AI agent in plain language.
- Data: NASA POWER, SMAP Level-4 root-zone moisture, Landsat 8/9, ECOSTRESS, GIBS.
- Difference: ML black box, no dairy, no fodder, no heat. MilkyWays should stay rule-based and explainable, not ML.

## 3. NASA / public tools

### Crop-CASMA (USDA NASS / George Mason / NASA)
- https://nsidc.org/news-analyses/news-stories/sensing-soil-moisture-better-crops
- Free web tool, SMAP soil moisture at 9 km, difference from average since 2015, zoom to county, irrigation / planting decisions.
- Difference: visualisation only, no rotation ranking, no dairy, no heat.
- Lesson: copy the "difference from average" presentation, it is instantly readable.

### AgroPredict
- https://www.agropredict.app/
- NASA POWER climate + FAO EcoCrop + ISRIC SoilGrids, 0-100 growing-success index, Ukraine / Slovakia / Portugal.
- Difference: crop suitability check, not a rotation ranking, no dairy, no heat.
- Lesson: copy the visible, deterministic scoring method, and the honest limitation statement.

### NASA Harvest / ACES Crop Rotation MRV (Ukraine)
- https://www.seeds.org.ua/ukraine-tests-satellite-crop-rotation-verification-system-that-could-improve-access-to-green-finance/
- Satellite crop history from 2017, monoculture frequency, rotation diversity, compliance, for banks / green finance. 98% F1 on five crops in Sumy / Chernihiv pilot.
- Difference: backward-looking verification, not forward-looking choice, no dairy, no heat.
- Lesson: rotation diversity is a score judges understand.

## 4. Data centre waste heat — dairy

### Gais cheese dairy, Switzerland
- Bytes2Heat best practice, https://www.bytes2heat.de/static/files/20240403_BP%C3%9C_V2404_eng.pdf
- Water heated to 20 C by waste heat, cheese dairy extracts energy, water cools to 14 C and flows back. ~1.5 GWh/year, up to ~800 kW, ~18 million litres milk/year. High-temperature heat pumps raise temperature for cheesemaking up to 100 C.
- This is MilkyWays' proof case. It is real, measured, and dairy.

### HP Labs — cow-powered data centres
- https://trellis.net/article/hp-envisions-cow-powered-data-centers/
- 10,000 cows, manure to biogas, 1 MW data centre, heat back to anaerobic digester. Paper: Design of Farm Waste-Driven Supply Side Infrastructure for Data Centers, ASME.
- Difference: opposite direction — farm powers data centre, via manure, not data centre heat powers farm. Useful context, do not confuse the two.

### Thermal cascading
- Data centre heat in sequence: pasteurisation 60 C, office heating 45 C, aquaculture 30 C, swimming pool 30 C, greenhouse 20 C, return cold water 20 C.
- Lesson: pasteurisation is the first, hottest use in the cascade. That is why MilkyWays puts milk first.

## What to steal, what to avoid
Steal: Pasture.io plain metrics, FarmFlow spring planner, PaddockPal map, Crop-CASMA difference-from-average, AgroPredict visible scoring, RotaShift honest limits.
Avoid: Farmyza ML black box, SEPATOU full simulator, NASA Harvest backward-only verification, HP manure direction.

## Product shape for the build
One farm, one location, one screen:
1. Pick a rotation, see its score on soil health, water, feed quality.
2. See why, in NASA data: temperature, rainfall, soil moisture, crop vigour.
3. See the heat: waste heat pasteurises, then cools.
4. Farmer priorities change the ranking.
That is the whole product. Nothing else in v1.
