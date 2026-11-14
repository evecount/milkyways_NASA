# Data Center Waste Heat & Safety Architecture

## Why Dairy + Data Centers Fit Together

Dairy processing plants consume roughly **70% thermal energy and 30% electricity**:

| Dairy Process | Temperature Required |
|---|---|
| CIP Washing / Cleaning | `40–60 °C` |
| Pasteurization (HTST) | `72–78 °C` |
| Sterilisation / Evaporation | `100–120 °C` |
| Spray Drying | `120 °C` |
| Chilling / Cold Storage | `< 5 °C` |

A reference **20,000 L/day** dairy plant requires ~**817 kWh/day** of useful heat (~**82 kW** average) for pasteurization, CIP cleaning, and crate washing.

## Heat Source & Honest Engineering Limits

- **Data center waste heat is low-grade:** `30–45 °C` (air-cooled) or `55–70 °C` (liquid-cooled).
- **Heat pump boost:** A heat pump is normally required to lift `55–70 °C` water up to `70–90 °C` for HTST pasteurization.
- **Double-wall isolation:** Closed data center coolant loop → double-wall heat exchanger → food-grade water loop. **The coolant never touches the milk.**

## Proven Reference Cases

- **Gais, Switzerland (Mountain Cheese Dairy):** Data center waste heat warms water to `20 °C`, the dairy extracts energy and returns it at `14 °C` — delivering **~1.5 GWh/year** (up to ~800 kW) to heat ~18 million liters of milk annually.
- **Zhongwei, China (Brain Green Data Center Ecological Farm):** Pairs data center waste heat with dairy farming (optimum cow environment `10–25 °C`), achieving ~3.4-year payback and saving **676 MWh/yr** (data center) + **88 MWh/yr** (farm).
- **Hot-country / humid adaptation:** Waste heat is used for **produce drying** and **absorption cooling** (`60–100 °C` hot water → `~7.2 °C` chilled water at COP `0.4–0.73` single-effect), preventing milk spoilage without electric chillers.
