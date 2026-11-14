# NASA Earth Observations & Supporting Data

At least one NASA dataset is mandatory for Global Awards eligibility. **MilkyWays** uses **live NASA POWER** queries directly in the browser (no API key required) alongside complementary NASA Earth observation layers and local soil data.

## Primary NASA Datasets

| Dataset | Role in MilkyWays | Resolution / Coverage | Source |
|---|---|---|---|
| **NASA POWER** (`community=AG`) | Temperature (`T2M`, `T2M_MAX`, `T2M_MIN`), bias-corrected precipitation (`PRECTOTCORR`), solar irradiance (`ALLSKY_SFC_SW_DWN`), wind (`WS2M`) | ~50 km grid, daily & climatology | [power.larc.nasa.gov](https://power.larc.nasa.gov/api/temporal/daily/point) |
| **NASA GPM IMERG** | Rainfall onset and seasonal timing where sub-50 km precision matters | ~10 km satellite rainfall | [gpm.nasa.gov](https://gpm.nasa.gov/data/imerg) |
| **NASA SMAP** (`SPL3SMP_E` L3 / L4) | Surface & root-zone soil moisture baseline (2015–present; used for current conditions, not 20-year trends) | 9 km daily | [Earthdata Agriculture](https://www.earthdata.nasa.gov/topics/human-dimensions/agriculture-production/data-access-tools) |
| **MODIS `MOD13Q1`** | NDVI / EVI crop vigour across seasons (2000–present) to spot rotation effects | 250 m, 16-day | [Earthdata Agriculture](https://www.earthdata.nasa.gov/topics/human-dimensions/agriculture-production/data-access-tools) |
| **Landsat / HLS** | Field-level crop & bare-ground surface reflectance | 30 m | [Earthdata Agriculture](https://www.earthdata.nasa.gov/topics/human-dimensions/agriculture-production/data-access-tools) |

## Supporting Local & Agronomic Data

- **ISRIC SoilGrids (250 m, non-NASA):** Soil texture (clay/sand/silt), organic carbon, and pH.
- **Farmer Inputs:** Herd size, milk volume, soil drainage/type, and priority weights (Soil Health, Water Efficiency, Heat Resilience, Feed Quality).

## Verified Baseline: Ontario Dairy Region (`44.08°N, 79.88°W`)

Pulled live from NASA POWER (`community=AG`):
- **Solar Irradiance (`ALLSKY_SFC_SW_DWN`):** `13.05 MJ/m²/day` annual avg (Jan `4.84` → Jul `21.93`)
- **Precipitation (`PRECTOTCORR`):** `2.16 mm/day` annual avg (May `2.35`, Jul `2.24`, Oct `2.50`)
- **Air Temperature (`T2M`):** `7.00 °C` annual avg (Jan `-7.25 °C` → Jul `21.20 °C`)
- **Wind Speed (`WS2M`):** `2.98 m/s` annual avg
