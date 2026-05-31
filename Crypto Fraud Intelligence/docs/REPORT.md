# Crypto Fraud Intelligence — Visual Project Report

> Generated: 2026-05-28 | Project: `crypto/` | Author: Himanshu Goyal

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Backend API — Graph Endpoint](#1-backend-api--graph-endpoint)
3. [Live Dashboard — Full View](#2-live-dashboard--full-view)
4. [Power BI — Default (Low Risk) View](#3-power-bi--default-low-risk-view)
5. [Power BI — Community Tooltip](#4-power-bi--community-tooltip)
6. [Power BI — High Risk Filter](#5-power-bi--high-risk-filter)
7. [KNIME — Joiner Node & Joined Schema](#6-knime--joiner-node--joined-schema)
8. [KNIME — Full Workflow & Community Histogram](#7-knime--full-workflow--community-histogram)
9. [KNIME — Pie Chart Node (Risk Prediction Split)](#8-knime--pie-chart-node-risk-prediction-split)
10. [KNIME — Bar Chart Node (Risk Score by Prediction)](#9-knime--bar-chart-node-risk-score-by-prediction)
11. [KNIME — Histogram Node (Transaction Distribution)](#10-knime--histogram-node-transaction-distribution)

---

## Project Overview

The **Crypto Fraud Intelligence (CFI)** system is an end-to-end data pipeline and interactive dashboard for detecting fraudulent Bitcoin transactions. It is built on the **Elliptic Bitcoin Dataset** and combines:

| Layer | Technology | Purpose |
|---|---|---|
| Data & ML | Python + Jupyter | Feature engineering, anomaly detection, risk scoring, graph/community analysis |
| ETL Workflow | KNIME Analytics Platform | Visual data pipeline for filtering, joining, and charting |
| Business Intelligence | Power BI | Executive-level dashboard with interactive risk-level slicers |
| REST API | FastAPI + Uvicorn | Serves processed CSVs as JSON endpoints; deployed on Render |
| Frontend | Next.js (TypeScript) | Real-time intelligence terminal UI; deployed on Netlify |

---

## 1. Backend API — Graph Endpoint

**File:** `Screenshot 2026-05-27 171350.png`

![Backend Graph Endpoint](Screenshot%202026-05-27%20171350.png)

**What it shows:**  
The VS Code editor is open alongside a browser tab pointing to `http://localhost:8000/graph`. The FastAPI `/graph` endpoint returns a raw JSON payload listing all **nodes** (unique Bitcoin transaction IDs) and **links** (directed edges between transactions) extracted from `sample_edges.csv`. The payload is displayed in pretty-print format, showing hundreds of node IDs such as `232344069`, `232453639`, and their corresponding source→target link pairs. The left Explorer panel confirms the full project structure: `backend/app/data/` holding `anomalies.csv`, `centrality_results.csv`, `community_analysis.csv`, `risk_scores.csv`, and `sample_edges.csv`.

**Key insight:** The graph data powers the **Fraud Network Visualization** panel in the frontend, rendered via the `GraphView.tsx` component using a force-directed graph layout.

---

## 2. Live Dashboard — Full View

**File:** `Screenshot 2026-05-27 183948.png`

![Live Dashboard](Screenshot%202026-05-27%20183948.png)

**What it shows:**  
The Next.js frontend running at `localhost:3000` — the **CFI Terminal** dashboard in full operation. The dark-themed, terminal-style interface displays:

| Metric Card | Value |
|---|---|
| Transactions | **1,678** |
| Anomalies | **4,076** (red) |
| Communities | **678** (orange) |
| Average Risk | **0.07%** (yellow) |

**Panels visible:**

- **Risk Exposure Profile (Risk Analysis):** An area chart showing risk score % across the top 8 transactions (TX 1–TX 8). TX 1 peaks at ~32%, sharply dropping toward 0% for subsequent transactions — indicating one dominant high-risk outlier.
- **Fraud Network Visualization (Network Graph):** An interactive force-directed graph showing Bitcoin transaction nodes (red dots) connected by edges. Clusters and isolated nodes are both visible, indicating tight fraud clusters and peripheral participants.
- **Community Analysis:** A table listing community IDs `0`, `1`, `2` with sizes `47`, `30`, `22` — the largest detected fraud communities.
- **Centrality Intelligence (Top Nodes):** Transactions `89273` (1.85%), `2881273` (1.07%), `2758467` (0.95%) — the highest betweenness-centrality nodes in the fraud graph.
- **Alert Distribution (Analytics):** A donut chart (partially visible) representing the ratio of flagged vs. observed transactions.

The left sidebar shows navigation links: Dashboard, Risk Analysis, Communities, Network Graph, Analytics. The system status indicator reads **"Monitoring Active"** (green dot).

---

## 3. Power BI — Default (Low Risk) View

**File:** `Screenshot 2026-05-28 004413.png`

![Power BI Default View](Screenshot%202026-05-28%20004413.png)

**What it shows:**  
The **Crypto Fraud Intelligence Dashboard** open in Power BI Desktop (Page 1). The right panel shows the Visualizations pane with data fields: `feature_88`–`feature_99`, `centrality_results`, `community_analysis`, `risk_scores`. The dashboard canvas displays:

| KPI Card | Value |
|---|---|
| Count of transactions | **1.672K** |
| Average risk_score | **0.05%** |
| Count of anomaly | **4.076K** |
| Count of community_id | **678** |

- **Top Risk Transactions (Bar Chart):** Horizontal bar chart ranking transactions by average `risk_score`. Top transactions include `232438397`, `43560505`, `232029206`, `1913117`, `2880930`.
- **Fraud Communities (Treemap):** Color-coded treemap of community IDs (668–677). Larger tiles = larger communities. Community 668 appears dominant.
- **Centrality Table:** Lists transactions with their Sum of Centrality: `232438397` (0.01), `43560505` (0.01), `232029206` (0.00) — Total: **0.02**.
- **Risk Distribution (Donut Chart):** 100% "Low Risk" (dark blue ring) — this is the unfiltered default view showing the overall population is classified as low-risk.
- **Risk Level Slicer:** Checkboxes for High Risk, Low Risk, Medium Risk. "Low Risk" is currently selected.

---

## 4. Power BI — Community Tooltip

**File:** `Screenshot 2026-05-28 004422.png`

![Power BI Community Tooltip](Screenshot%202026-05-28%20004422.png)

**What it shows:**  
A zoomed-in view of the same Power BI dashboard with a **tooltip popup** active on the Fraud Communities treemap. Hovering over community tile **668** reveals:

```
community_id  668
Sum of size   2
```

This confirms community 668 has only 2 members, making it a small but distinct cluster. The donut chart at bottom right confirms **100% Low Risk (1.67K transactions)** across the full dataset. This view is unfiltered.

---

## 5. Power BI — High Risk Filter

**File:** `Screenshot 2026-05-28 004444.png`

![Power BI High Risk Filter](Screenshot%202026-05-28%20004444.png)

**What it shows:**  
The Power BI dashboard filtered to **High Risk** transactions only (via the Risk Level slicer). The KPI cards now read:

| KPI Card | Value |
|---|---|
| Count of transactions | **2** |
| Average risk_score | **15.67%** |
| Count of anomaly | **4.076K** |
| Count of community_id | **678** |

**Key findings from this filter:**
- Only **2 transactions** are classified as High Risk out of 1,672 total — a very small fraction (~0.12%).
- Those 2 transactions have an average risk score of **15.67%**, compared to 0.05% for the full dataset.
- **Top Risk Transactions bar chart** now shows only transactions `232947878` and `89273`, with `232947878` having a much higher average risk score (~0.3).
- **Centrality table:** Only `89273` appears with centrality **0.02**.
- **Risk Distribution donut:** 100% High Risk (blue) — confirming the filter isolates only these 2 records.

---

## 6. KNIME — Joiner Node & Joined Schema

**File:** `Screenshot 2026-05-28 010914.png`

![KNIME Joiner](Screenshot%202026-05-28%20010914.png)

**What it shows:**  
A partial view of the KNIME workflow with the **Joiner node** selected. The configuration panel on the right shows:

- **Matching Criterion 1:** Join on `RowID` (Top/left table) = `RowID` (Bottom/right table)

The result table preview at the bottom confirms the joined schema has **5 columns**:

| Column | Type |
|---|---|
| RowID | — |
| transaction | Number (Integer) |
| risk_score | Number (Float) |
| prediction | String |
| community_id | Number (Integer) |
| size | Number (Integer) |

This join merges the `risk_scores.csv` data with the `community_analysis.csv` data, combining per-transaction risk scores, ML predictions, and community membership into a single enriched table for downstream charting.

---

## 7. KNIME — Full Workflow & Community Histogram

**File:** `Screenshot 2026-05-28 011310.png`

![KNIME Full Workflow](Screenshot%202026-05-28%20011310.png)

**What it shows:**  
The complete **Crypto Fraud Intelligence Workflow** in KNIME Analytics Platform. The workflow canvas (at 67% zoom) contains two parallel data pipelines:

**Pipeline 1 (top):**
```
CSV Reader → Row Filter → Rule Engine → Histogram
                                     → Bar Chart
                                     → Pie Chart
```

**Pipeline 2 (bottom):**
```
CSV Reader → Sorter → Top k Row Filter → Histogram
```

The **Histogram** node for Pipeline 2 is currently selected, displaying its output in the View panel below:

- **X-axis:** `community_id` values (668, 670, 672, 674, 676, 677)
- **Y-axis:** Count (all bars reach height ~1.0)
- This uniform histogram confirms that each community ID in the top-k filtered results appears exactly once — a distribution quality check.

---

## 8. KNIME — Pie Chart Node (Risk Prediction Split)

**File:** `Screenshot 2026-05-28 011330.png`

![KNIME Pie Chart](Screenshot%202026-05-28%20011330.png)

**What it shows:**  
The **Pie Chart node** is selected in the KNIME workflow (Pipeline 1). Configuration panel shows:

- **Category dimension:** `prediction` (String)
- **Aggregation:** None
- **Frequency dimension:** `transaction` (Number/Integer)

The Pie Chart view below shows a 3-segment pie:
- 🔵 **High Risk** — roughly 50% (blue)
- 🟢 **Medium Risk** — roughly 48% (green)
- 🟡 **Other** — ~2% (small yellow sliver)

**Key insight:** Among the filtered/top-risk subset, transactions are nearly evenly split between High Risk and Medium Risk labels, with a tiny fraction classified as "Other." This reflects the ML model's risk classification distribution on the extreme tail of high-risk transactions.

---

## 9. KNIME — Bar Chart Node (Risk Score by Prediction)

**File:** `Screenshot 2026-05-28 011340.png`

![KNIME Bar Chart](Screenshot%202026-05-28%20011340.png)

**What it shows:**  
The **Bar Chart node** configuration in KNIME (Pipeline 1). Settings:

- **Category dimension:** `prediction` (String)
- **Aggregation:** None
- **Frequency dimensions:** Manual selection

The bar chart view shows:
- **X-axis:** `risk_score` values (ranging from near 0 to ~0.30)
- **Y-axis:** Count (None)
- **Legend:** 🔵 Medium Risk | 🟢 High Risk

High Risk transactions (green bar) are concentrated at **risk_score ≈ 0.30**, while Medium Risk (blue bars) are scattered at very low risk score values (near 0). This validates that the Rule Engine correctly separates High vs. Medium Risk by risk score thresholds.

---

## 10. KNIME — Histogram Node (Transaction Distribution)

**File:** `Screenshot 2026-05-28 011351.png`

![KNIME Histogram Transaction](Screenshot%202026-05-28%20011351.png)

**What it shows:**  
The **Histogram node** for Pipeline 2 (top-k filtered transactions). Configuration panel shows:

- **Dimension:** `transaction` (Number/Integer)
- **Binning Type:** Equal width (selected) vs. Equal frequency

The histogram view shows:
- **X-axis:** Transaction ID range from `89,273` to `~2.33×10⁸`
- **Y-axis:** Count (0–4)
- Two visible bins: a tall bar at the lower end (~89273, count = 4) and a smaller bar at the upper end (~2.33×10⁸, count = 2)

This shows the top-k highest-risk transactions are **not evenly distributed by transaction ID** — a cluster of 4 are low-ID transactions (likely older in the blockchain), and 2 are much higher-ID (newer).

---

## Summary

| Screenshot | Layer | Insight |
|---|---|---|
| `171350` | Backend API | `/graph` endpoint correctly serves node+edge JSON from `sample_edges.csv` |
| `183948` | Frontend Dashboard | Live CFI terminal with 1,678 txns, 4,076 anomalies, 678 communities, 0.07% avg risk |
| `004413` | Power BI | Full dataset: 1.672K txns, 0.05% avg risk, 100% Low Risk distribution |
| `004422` | Power BI | Community 668 tooltip: size = 2 members |
| `004444` | Power BI | High Risk filter: only 2 txns at 15.67% avg risk score |
| `010914` | KNIME | Joiner schema: 5-column enriched table (txn + risk + prediction + community + size) |
| `011310` | KNIME | Full workflow canvas; community histogram — equal distribution across top-k |
| `011330` | KNIME | Pie chart: ~50% High Risk, ~48% Medium Risk among top-k subset |
| `011340` | KNIME | Bar chart: High Risk txns cluster at risk_score ≈ 0.30, Medium Risk near 0 |
| `011351` | KNIME | Histogram: top-k txns bimodal — cluster at low IDs (count=4) and high IDs (count=2) |

---

*This report was auto-generated from visual assets in `crypto/docs/`. All data references the Elliptic Bitcoin Dataset.*
