# MilkyWays
## Product Specification
### NASA Space Apps Challenge Singapore 2026

**Team:** MilkyWays
**Event:** NASA Space Apps Challenge Singapore 2026
**Hackathon:** Sat 14 Nov 2026, 09:00 SGT to Sun 15 Nov 2026, 23:59 SGT, virtual
**Submission deadline:** Sun 15 Nov 2026, 23:59 SGT
**Challenge:** Challenge 7 — Field Shift: Adapting Farms with NASA Data
**Owner:** Gwen (Gwendalynn Lim Wan Ting)
**Document date:** Sat 14 Nov 2026
**Status:** Spec v1 — for build

---

## 1. Problem

Farmers must choose crop rotations that protect soil, conserve water, and stay resilient as temperatures, rainfall, and soil health shift [6][7].

> "Farmers around the world navigate shifting temperatures, changing rainfall patterns, water shortages, extreme weather, and declining soil health. These pressures make it difficult to choose crop rotations that protect fields, conserve water, and support long-term resilience."

## 2. Product

**MilkyWays** is a decision-support tool for an industrial dairy farm located next to an AI data centre.

It answers one question:

**What fodder rotation should this dairy farm plant next?**

Official description, for the team page and submission:
> MilkyWays uses NASA Earth observations to help an industrial dairy farm choose what fodder to plant next.
>
> NASA data on temperature, rainfall, soil moisture and crop vigour, together with local soil and what matters most to the farmer, ranks each rotation for soil health, water use and feed quality.
>
> The farm sits next to an AI data centre, so its waste heat pasteurises the milk, then cools it after. Heat that would have been thrown away does the farm's hardest job instead.

Demo format, decided 14 Nov 2026: 30-second video, not 7 slides.

## Framing — why the data centre stays

Winning a hackathon is not just about the idea, sometimes it is the framing.

The idea, on its own, is solid and novel: a dairy farm is a farm, so it fits Field Shift, and no other team found so far, globally, has used dairy in Challenge 7. But a fodder rotation tool, on its own, is quiet. Judges will see many rotation tools.

The data centre is the framing that makes it memorable: cows and servers, milk and heat, a farm next to an AI data centre. That is the story, the poster, the video line.

Keep the framing, keep the facts honest underneath. The data centre is a model, a what-if, not a claim about a specific real-world farm. Gais cheese dairy in Switzerland is the real proof that waste heat can heat milk, at scale. Use Gais as the proof, a representative Ontario dairy farm as the fodder example, and the data centre as the framing.

## Trust — milk and coolant

People do not want their milk next to AI coolant. That is a real objection, and the pitch must say it out loud, not hide it.

No coolant ever touches the milk. Heat is indirect, in separate loops:
- Data centre coolant loop, closed, never leaves the data centre side.
- Food-grade water loop, the only thing that touches the milk heat exchanger.
- A double-wall heat exchanger in between, so even if one side leaks, the other side cannot mix.

That is how Gais cheese dairy does it: water in at 20 C, out at 14 C, the dairy takes heat from the water, the data centre water never goes near the cheese.

Video line: "the coolant never touches the milk".

## Value — both sides

This is also a pitch to the data centre, not only to the farmer. The farm gets heat it would otherwise have to pay for. The data centre gets a local, community use for heat it would otherwise throw away. Milk sits in the middle of that exchange.

Keep the claim small. A dairy farm is a farm, so it fits the Field Shift challenge, and no other team found so far, globally, has used dairy in Challenge 7. That makes dairy a differentiator, but it is still one farm, one use of heat, not a general claim about data centres changing their image.

## Back-pocket idea — solar film lamination

Not v1, do not build it this weekend. Save it for later.

Chemical lamination of films, including solar films, uses heat to bond the layers, usually around 100 to 150 C. Data centre waste heat, boosted up, could laminate solar films. Those films then go on the farm, barn roof, greenhouse, and make power back. Same heat, second job, same circular idea as MilkyWays.

Inputs: NASA Earth observations, local soil data, crop characteristics, farmer priorities.
Output: a ranked rotation recommendation, with trade-offs in soil health, water use, heat risk, and feed quality.

## 3. User

Industrial dairy farm operator, with a dairy processing plant on site, located next to an AI data centre.

The farm grows its own fodder. It does not grow coffee, oil palm, or greenhouse vegetables as its main crop.

Example farm profile: 600-acre, 75-cow industrial dairy farm in the Loretto, Ontario, Canada region (44.08°N, 79.88°W). See Section 12.

## 4. Fodder system

### 4.1 Crops

| Role | Crops |
|---|---|
| Energy silage | Maize, sorghum |
| Protein / nitrogen-fixing legumes | Alfalfa / lucerne, clover, cowpea, berseem |

### 4.2 Rotation rule

Rotate energy cereals with protein legumes. Example rotation: corn → soybeans → wheat → alfalfa.

Legumes fix nitrogen in the soil. In mixed legume / cereal systems, nitrogen fertiliser use can be reduced by 25–30% compared with cereal monocrops [40].

### 4.3 What the tool must compare

For each candidate rotation, show:
- Soil health impact
- Water use
- Heat risk
- Feed quality for dairy cows
- Nitrogen benefit from legumes

## 5. NASA data — required

At least one NASA dataset is mandatory for Global Awards eligibility. Name it, link it, and explain how it supports the solution [2][3].

### 5.1 Primary datasets

**1. NASA POWER** [5][9]
- Use: temperature, rainfall, solar radiation baseline for the farm location.
- API: https://power.larc.nasa.gov/api/temporal/daily/point
- Parameters: T2M, T2M_MAX, T2M_MIN, PRECTOTCORR, WS2M, solar radiation.
- No API key required.

**2. NASA GPM IMERG** [8]
- Use: satellite rainfall, ~10 km, for rainfall onset and season timing.
- Use instead of POWER rainfall where timing matters.

**3. NASA SMAP** [10]
- Use: surface soil moisture, 9 km, daily, since 2015.
- Product: SPL3SMP_E Enhanced L3.
- Use L4 for root-zone soil moisture.
- Limit: record starts 2015, use for current conditions, not a 20-year trend.

**4. MODIS MOD13Q1** [11]
- Use: NDVI / EVI crop vigour, 16-day, 250 m, since 2000.
- Use to compare crop vigour across seasons and rotation effects.

**5. Landsat / Harmonized Landsat Sentinel-2 (HLS)**
- Use: 30 m field-level crop and bare-ground analysis.
- Landsat is NASA / USGS. Sentinel-2 is ESA.

### 5.2 Supporting data

- **GLDAS:** soil moisture and hydrology, backup to SMAP.
- **NASA Earthdata Search / AppEEARS** [4][12]: discovery and download for MODIS, Landsat, SMAP.
  - https://www.earthdata.nasa.gov/topics/human-dimensions/agriculture-production/data-access-tools
- **Local soil, non-NASA:** SoilGrids (ISRIC, 250 m), FAO soil maps.
- **Farmer priorities and crop characteristics:** user inputs, entered in the tool.

## 6. Optimisation

### 6.1 Function

Rotation choice is a combinatorial problem: many crops, fields, seasons, soil states, weather, heat availability, and feed requirements.

The tool searches that space and ranks rotations, using open-source, classical optimisation in the submission.

### 6.2 Irradiation

NASA Earth observations are irradiation measurements: reflected sunlight, thermal infrared, and microwave radiation from soil and vegetation. NDVI, land surface temperature, and soil moisture are derived from that radiation.

## 7. Data centre waste heat

The dairy farm is next to an AI data centre. The data centre rejects heat all day. The dairy plant needs heat all day.

### 7.1 Dairy heat demand

Dairy plants are about 70% thermal energy, 30% electricity [36].

| Use | Temperature |
|---|---|
| Washing / cleaning | 40–60°C |
| Pasteurisation, HTST | 72–78°C |
| Sterilisation / evaporation | 100–120°C |
| Spray drying | 120°C |
| Chilling / cold storage | below 5°C |

Reference load: a 20,000 litre/day dairy needs about 817 kWh/day useful heat, about 82 kW averaged, for pasteuriser, CIP cleaning, and crate washing [37].

Dairy cows' optimum environment is 283–298 K (10–25°C) [39].

### 7.2 Heat source

Data centre waste heat is low-grade: 30–45°C air, 55–70°C liquid cooling. A heat pump boost is normally required to reach 70–90°C for pasteurisation. State this in the submission.

### 7.3 Proven reference cases

- **Gais, Switzerland, mountain cheese dairy** [38]: water heated to 20°C by data centre waste heat, dairy extracts energy, water cools to 14°C and returns. About 1.5 GWh/year, up to about 800 kW, about 18 million litres of milk heated annually.
- **Zhongwei, China, Brain Green Data Center ecological farm** [39]: dairy farming is the main animal husbandry, optimum cow environment 283–298 K. Payback about 3.4 years, save 676 MWh for the data centre and 88 MWh for the farm per year.

### 7.4 Hot-country heat use — drying and cooling, not heating

In a hot country, waste heat is not used to heat a greenhouse. It is used to dry, and to make cold from heat.

- **Drying:** waste heat can dry produce that would otherwise spoil in humid conditions. Coffee drying in Costa Rica is the published case [23]. Generalise to produce drying: dried produce is lighter, keeps longer, and is easier to ship. One line in the submission, not a profit claim.
- **Absorption cooling:** an absorption chiller uses heat, not electricity, to make chilled water at about 7.2°C. Single-effect needs hot water 60–100°C, COP 0.4–0.73. Double-effect COP 0.73–1.24 [27].
  - Singapore case [28]: waste heat at 90°C via absorption chillers to district cooling, COP 0.7, CO2 down 11.5% in 2030 vs business-as-usual.
  - Limit [29]: chilled water generation was economically unfavourable in Philadelphia. Hot water generation was especially favourable in Singapore when replacing gas heating.
  - Farm use: cold store at 7°C to prevent spoilage, dehumidification to prevent mould in a humid greenhouse.

## 8. System architecture

1. **Data layer:** NASA POWER, GPM IMERG, SMAP, MODIS, Landsat / HLS, SoilGrids. Fetch and cache per farm location.
2. **Rotation engine:** candidate fodder rotations, scored on soil, water, heat risk, feed quality.
3. **Optimiser:** open-source classical optimisation to rank rotations.
4. **Heat module:** data centre waste heat availability vs dairy heat demand, pasteurisation, drying, absorption cooling.
5. **UI:** farmer enters location, soil, crops, priorities. Tool returns ranked rotations with trade-offs and NASA data sources shown.

## 9. Submission deliverables

Deadline: Sun 15 Nov 2026, 23:59 SGT, via the official NASA Space Apps Challenge website [2].

- Project Summary
- Project Demo: 30-second video OR 7-slide presentation
- Final Project Link: publicly accessible
- Project Details: approach, tools, technologies, NASA datasets used, with links and explanation
- Repo: created and written during the event. First commit after 09:00 SGT Sat 14 Nov 2026. Commit history is the eligibility check.

## 10. Judging

NASA awards 10 Global Awards, not medals [1].

Phases:
1. Local / Universal judges → Global Nominees, about 1 per 10 projects.
2. NASA / partner experts → Global Finalists (45 in 2025) plus Honorable Mentions.
3. Executive committee → 10 Global Awards.

2025 scale: 10 winners from 11,500+ submissions, 114,000+ participants, 551 events, 167 countries [1].

Criteria, each scored 1–5: Impact, Creativity, Validity, Relevance, Presentation.

Design for these criteria:
- **Impact:** a real dairy farm can use this to choose a rotation.
- **Creativity:** dairy + data centre is a combination no other team is likely to build.
- **Validity:** NASA data named and linked, heat numbers cited, no unproven export profit claim.
- **Relevance:** the tool answers the Field Shift question directly, for a named farmer.
- **Presentation:** specific, local, usable in plain language, with live NASA data.

## 11. Acceptance criteria

The submission is complete when:
- [ ] It is for Challenge 7, Field Shift.
- [ ] It is ONLY an industrial dairy fodder rotation tool.
- [ ] At least one NASA dataset is named, linked, and explained.
- [ ] The tool compares at least two rotations, with soil, water, heat, and feed trade-offs.
- [ ] The data centre heat link is shown, with temperatures and limits stated.
- [ ] Demo is 30 seconds of video OR 7 slides.
- [ ] Repo was created after 09:00 SGT Sat 14 Nov 2026.
- [ ] Submission is in by Sun 15 Nov 2026, 23:59 SGT.

## 12. Example Farm Profile (Ontario Dairy Region)

- **Region:** Loretto, Ontario, Canada (44.08°N, 79.88°W)
- **Scale:** 75 milking Holstein cows, 600 acres growing on-farm fodder
- **Note:** Representative public-safe example profile used for climate, soil, and fodder rotation modeling.

## 13. Team and contacts

- **Team:** MilkyWays
- **Singapore Local Lead:** Cory Meilany, nasa.spaceapps.sg@gmail.com
- **Technical Mentor:** Roman Shirochenko
- **Organiser site:** https://nasa-spaceapps-sg.site
- **Discord:** https://discord.gg/aTnrtr2uYh
- **Zoom support:** Sat 14 Nov 20:00 SGT, Sun 15 Nov 17:00 SGT

## 13. Poster and LinkedIn post

**LinkedIn draft, Gwen posts herself:**
> Hey everybody, I'm taking part in the NASA Space Apps Challenge Singapore 2026 this weekend, 14 to 15 November. My team is MilkyWays. We're building MilkyWays, a decision support tool to help dairy farmers choose their fodder rotation, using NASA Earth observations, local soil and crop data, and what matters most to each farmer. We're currently looking for anyone who would like to join us. If you are interested in space data, agriculture, or just building something useful together, please reach out. I would love to work as a team on this, and I am keen to learn from others and share what I know too. Solo is welcome in this challenge, and I am happy to go ahead on my own if needed, but I would much rather build this with a team. If this sounds like you, please message me or join us through the team page. Thank you so much. #NASASpaceApps #SpaceAppsChallenge #Singapore

Tag Cory Meilany by typing @Cory Meilany on LinkedIn. Do not guess a profile URL.

---

## References

[1] NASA 2025 Global Winners: https://www.nasa.gov/learning-resources/stem-engagement-at-nasa/nasa-announces-2025-international-space-apps-challenge-global-winners/
[2] NASA Space Apps Challenge 2026: https://www.spaceappschallenge.org/2026/
[3] NASA Space Apps Participant FAQs: https://www.spaceappschallenge.org/resources/participant-faqs/
[4] NASA Earthdata, Agriculture Production: https://www.earthdata.nasa.gov/topics/human-dimensions/agriculture-production/data-access-tools
[5] NASA POWER API, daily point: https://power.larc.nasa.gov/api/temporal/daily/point
[6] 2026 challenges, Field Shift summary: https://www.spaceappsulaanbaatar.com/challenges
[7] 2026 challenges, Field Shift summary: https://nasaspaceapps.ae/challenges
[8] Other 2026 Field Shift teams, dataset patterns: https://www.youtube.com/watch?v=Gz45BCBR3dM ; https://github.com/XtremeseOISHEE/RotaShift ; https://github.com/hamza0312615/AgriTwin
[9] NASA POWER Agroclimatology API: https://spacedata.swapniltamse.com/datasets/
[10] SMAP Enhanced L3 Radiometer Global Daily 9 km Soil Moisture (SPL3SMP_E) V006: https://spacedata.swapniltamse.com/datasets/
[11] MODIS/Terra Vegetation Indices 16-Day L3 Global 250m (MOD13Q1) V061: https://spacedata.swapniltamse.com/datasets/
[12] NASA Harvest / Earthdata API: https://www.buildstudio.com.ng/apis/nasa-harvest--earthdata-api
[23] Terenius, Garraghan and Harper, 2020, Using data centre waste heat to dry coffee, Lancaster, Costa Rica: https://eprints.lancs.ac.uk/id/eprint/147405/
[27] Absorption chiller operating conditions, COP 0.4–0.73 single-effect, chilled water 7.2°C: https://ufdcimages.uflib.ufl.edu/AA/00/03/87/51/00001/thermoeconomicso00lees_0120.txt
[28] Dominkovic et al., DTU, 2017, Waste heat recovery in Singapore for district cooling: https://backend.orbit.dtu.dk/ws/files/139719671/Extended_Abstract_Potential_of_waste_heat_and_waste_cold_energy_recovery_in_Singapore_for_district_cooling_applications.pdf
[29] Villanova / NSF, Data Center Waste Heat Reuse, 2025: https://par.nsf.gov/servlets/purl/10631900
[36] Waasol, Dairy, 70% thermal, 30% electricity: https://www.waasol.com/waasol_dairy
[37] Sunniva Encon, Milk Pasteurisation, 20,000 litre/day, 817 kWh/day: https://www.sunnivaencon.com/applications/milk-pasteurisation
[38] Bytes2Heat, Gais cheese dairy, 1.5 GWh/year: https://www.bytes2heat.de/static/files/20240403_BP%C3%9C_V2404_eng.pdf
[39] Complementary waste heat utilization from data center to ecological farm, Journal of Cleaner Production 435 (2024) 140495: https://www.researchgate.net/publication/377094756_Complementary_waste_heat_utilization_from_data_center_to_ecological_farm_A_technical_economic_and_environmental_perspective
[40] Dairy fodder rotation, legumes reduce nitrogen 25–30%: https://agriculture.institute/livestock-pasture-management/best-practices-growing-irrigated-fodder-crops/
