# 🔐 Crypto Fraud Intelligence (CFI)

> An end-to-end blockchain transaction fraud detection system — from raw graph data to a live intelligence terminal dashboard.

[![Dataset](https://img.shields.io/badge/Dataset-Elliptic%20Bitcoin-blue)](https://www.kaggle.com/datasets/ellipticco/elliptic-data-set)
[![Backend](https://img.shields.io/badge/Backend-FastAPI%20on%20Render-009688)](https://cfiback.onrender.com)
[![Frontend](https://img.shields.io/badge/Frontend-Next.js%20on%20Netlify-black)](https://netlify.com)
[![BI](https://img.shields.io/badge/BI-Power%20BI-F2C811?logo=powerbi&logoColor=black)](powerbi/)
[![ETL](https://img.shields.io/badge/ETL-KNIME-yellow)](knime/)
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)
[![Python](https://img.shields.io/badge/Python-3.10+-blue?logo=python)](https://www.python.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green?logo=node.js)](https://nodejs.org/)

---

## 📋 Table of Contents

- [🧠 Project Overview](#-project-overview)
- [⚡ Key Features](#-key-features)
- [🏗️ Architecture](#️-architecture)
- [📁 Folder Structure](#-folder-structure)
- [🚀 Quick Start](#-quick-start)
- [📚 Documentation](#-documentation)
- [🔧 Tech Stack](#-tech-stack)
- [📊 Dataset](#-dataset)
- [🤝 Contributing](#-contributing)
- [📝 License](#-license)
- [🔗 Links](#-links)

---

## 🧠 Project Overview

The **Crypto Fraud Intelligence** system detects fraudulent Bitcoin transactions using graph analytics, machine learning, and visual business intelligence. It is built on the publicly available **Elliptic Bitcoin Dataset**, which contains ~200K labeled transactions and 234K directed edges representing fund flows.

The system covers the full data pipeline:

1. **Data ingestion & feature engineering** — Jupyter notebook
2. **Visual ETL & rule-based classification** — KNIME Analytics Platform
3. **REST API** — FastAPI serving processed data as JSON
4. **Interactive terminal dashboard** — Next.js frontend
5. **Executive BI dashboard** — Power BI `.pbix` report

---

## 🏗️ Architecture

```
Elliptic Bitcoin Dataset (.zip / .csv)
          │
          ▼
┌─────────────────────┐
│  Jupyter Notebook   │  ← Feature analysis, risk scoring,
│  (01_elliptic_      │    anomaly detection, community &
│   analysis.ipynb)   │    centrality computation
└────────┬────────────┘
         │ produces CSVs
         ├── risk_scores.csv
         ├── anomalies.csv
         ├── community_analysis.csv
         ├── centrality_results.csv
         └── sample_edges.csv
              │
    ┌─────────┴──────────────────────────┐
    │                                    │
    ▼                                    ▼
┌──────────────────┐          ┌──────────────────────┐
│   KNIME Workflow │          │   Power BI Dashboard  │
│  (Visual ETL,    │          │  (crypto fraud        │
│   Rule Engine,   │          │   detect.pbix)        │
│   Charts)        │          └──────────────────────┘
└──────────────────┘
         │
         ▼
┌──────────────────────────────┐
│  FastAPI Backend             │
│  (backend/app/main.py)       │
│  Endpoints:                  │
│   GET /risk-scores           │
│   GET /top-risk              │
│   GET /anomalies             │
│   GET /communities           │
│   GET /centrality            │
│   GET /stats                 │
│   GET /graph                 │
│  Deployed on: Render         │
└──────────────┬───────────────┘
               │ REST JSON
               ▼
┌──────────────────────────────┐
│  Next.js Frontend            │
│  (frontend/)                 │
│  Components:                 │
│   BackendGate.tsx            │
│   DashboardTerminal.tsx      │
│   GraphView.tsx              │
│  Deployed on: Netlify        │
└──────────────────────────────┘
```

---

## 📁 Folder Structure

```
crypto/
├── backend/                        # FastAPI REST API
│   ├── app/
│   │   ├── data/                   # Processed CSVs served by the API
│   │   │   ├── anomalies.csv
│   │   │   ├── centrality_results.csv
│   │   │   ├── community_analysis.csv
│   │   │   ├── risk_scores.csv
│   │   │   └── sample_edges.csv
│   │   └── main.py                 # FastAPI app with all endpoints
│   ├── requirements.txt            # fastapi, pandas, uvicorn
│   ├── render.yaml                 # Render Blueprint for deployment
│   └── DEPLOYMENT.md               # Deploy guide (local + Render)
│
├── dataset/                        # Raw Elliptic dataset
│   ├── elliptic/
│   │   └── elliptic_bitcoin_dataset/
│   ├── elliptic-data-set.zip       # ~146 MB original archive
│   ├── anomalies.csv               # ~12 MB anomaly data
│   ├── risk_scores.csv
│   ├── centrality_results.csv
│   ├── community_analysis.csv
│   └── data.py
│
├── docs/                           # 📸 Screenshots & visual report
│   ├── REPORT.md                   # Full annotated screenshot report
│   └── Screenshot *.png            # 10 project screenshots
│
├── frontend/                       # Next.js dashboard
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── loading.tsx
│   │   └── globals.css
│   ├── components/
│   │   ├── BackendGate.tsx         # Backend wake + data fetch logic
│   │   ├── DashboardTerminal.tsx   # Main dashboard UI with charts
│   │   └── GraphView.tsx           # Force-directed network graph
│   ├── netlify.toml
│   └── README.md                   # Frontend deploy guide
│
├── knime/
│   └── Crypto Fraud Intelligence Workflow/
│       ├── workflow.knime           # KNIME workflow definition
│       ├── workflow.svg             # Workflow diagram export
│       ├── CSV Reader (#1, #4)
│       ├── Row Filter (#2)
│       ├── Rule Engine (#3)
│       ├── Sorter (#5)
│       ├── Top k Row Filter (#6)
│       ├── Bar Chart (#7)
│       ├── Pie Chart (#8)
│       ├── Histogram (#9, #10)
│       └── workflow-metadata.xml
│
├── notebooks/
│   └── 01_elliptic_analysis.ipynb  # Main analysis notebook (~720 KB)
│
├── powerbi/
│   └── crypto fraud detect.pbix    # Power BI report (~3 MB)
│
└── README.md                       # ← You are here
```

---

## 📊 Dataset

**Source:** [Elliptic Bitcoin Dataset](https://www.kaggle.com/datasets/ellipticco/elliptic-data-set)

| File | Size | Description |
|---|---|---|
| `elliptic-data-set.zip` | ~146 MB | Full raw dataset archive |
| `anomalies.csv` | ~12 MB | Flagged anomalous transactions |
| `risk_scores.csv` | ~52 KB | Per-transaction risk scores (0–1 float) |
| `community_analysis.csv` | ~4.5 KB | Community ID + size per transaction |
| `centrality_results.csv` | ~329 B | Top nodes by betweenness centrality |

**Dataset stats (as seen in the live dashboard):**

| Metric | Value |
|---|---|
| Total transactions | 1,678 |
| Total anomalies | 4,076 |
| Detected communities | 678 |
| Average risk score | 0.07% |
| High-risk transactions | 2 (15.67% avg risk score) |

---

## ⚙️ Backend API

**Tech:** Python 3 · FastAPI · Pandas · Uvicorn  
**Deployed at:** `https://cfiback.onrender.com`

### Endpoints

| Method | Path | Description |
|---|---|---|
| `GET` | `/` | Health message |
| `GET` | `/health` | `{ "status": "ok" }` — used by frontend for wake check |
| `GET` | `/stats` | Aggregate stats (total txns, anomalies, communities, avg risk) |
| `GET` | `/risk-scores` | Top 20 transactions by risk score |
| `GET` | `/top-risk` | Top 20 highest-risk transactions (sorted desc) |
| `GET` | `/anomalies` | Top 20 anomalous transactions |
| `GET` | `/communities` | Top 20 community records |
| `GET` | `/centrality` | All centrality records |
| `GET` | `/graph` | Nodes + directed edges from `sample_edges.csv` |

### Local Development

```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload
# API available at http://127.0.0.1:8000
# Interactive docs at http://127.0.0.1:8000/docs
```

### Environment Variables

| Variable | Purpose | Default |
|---|---|---|
| `FRONTEND_ORIGINS` | Comma-separated allowed CORS origins | `*` (unrestricted) |

See [`backend/DEPLOYMENT.md`](backend/DEPLOYMENT.md) for full Render deploy steps.

---

## 🖥️ Frontend Dashboard

**Tech:** Next.js 14 (App Router) · TypeScript · Recharts · Lucide Icons  
**Deployed at:** Netlify via `netlify.toml`

### Features

| Panel | Description |
|---|---|
| **KPI Cards** | Transactions · Anomalies · Communities · Average Risk |
| **Risk Exposure Profile** | Area chart of top-risk transaction scores (%) |
| **Fraud Network Visualization** | Interactive force-directed graph of transaction edges |
| **Community Analysis** | Table of community IDs and cluster sizes |
| **Centrality Intelligence** | Top nodes by betweenness centrality (%) |
| **Alert Distribution** | Donut chart — Flagged vs. Observed transactions |
| **Search** | Live search across wallet/transaction IDs |

### Architecture Notes

- **`BackendGate.tsx`** — Handles Render cold-start wake sequence (up to 6 retry attempts over 20s timeout each), shows a countdown timer while waiting, and fetches all 4 data endpoints in parallel once alive.
- **`DashboardTerminal.tsx`** — Main dashboard layout with sidebar navigation, metric cards, Recharts area chart, Recharts pie chart, community table, and centrality table.
- **`GraphView.tsx`** — Renders the force-directed fraud network from `/graph` endpoint data.

### Local Development

```bash
cd frontend
cp .env.example .env.local
# Edit .env.local: NEXT_PUBLIC_BACKEND_URL=https://cfiback.onrender.com
npm install
npm run dev
# Dashboard at http://localhost:3000
```

---

## 📈 Power BI Dashboard

**File:** [`powerbi/crypto fraud detect.pbix`](powerbi/crypto%20fraud%20detect.pbix)

The Power BI report provides an executive-level view of the fraud intelligence data with interactive slicers.

### Visuals

| Visual | Description |
|---|---|
| **KPI Cards (×4)** | Count of transactions · Avg risk_score · Count of anomaly · Count of community_id |
| **Top Risk Transactions** | Vertical bar chart ranked by `avg(risk_score)` per transaction |
| **Fraud Communities** | Treemap of community IDs (668–677) color-coded by size |
| **Centrality Table** | Transaction → Sum of Centrality matrix |
| **Risk Distribution** | Donut chart showing High / Low / Medium Risk breakdown |
| **Risk Level Slicer** | Interactive filter: High Risk / Low Risk / Medium Risk |

### Key Insights from Filters

| Filter | Transactions | Avg Risk Score | Distribution |
|---|---|---|---|
| None (All) / Low Risk | 1,672 | 0.05% | 100% Low Risk |
| High Risk | **2** | **15.67%** | 100% High Risk |

---

## 🔄 KNIME Workflow

**File:** [`knime/Crypto Fraud Intelligence Workflow/workflow.knime`](knime/Crypto%20Fraud%20Intelligence%20Workflow/workflow.knime)

The KNIME workflow implements a visual ETL pipeline in two parallel branches:

### Pipeline 1 — Risk Classification & Charting

```
CSV Reader → Row Filter → Rule Engine ─┬→ Histogram
                                        ├→ Bar Chart
                                        └→ Pie Chart
```

- **CSV Reader:** Loads `risk_scores.csv`
- **Row Filter:** Filters to relevant transactions
- **Rule Engine:** Classifies each transaction as `High Risk`, `Medium Risk`, or `Other` based on `risk_score` thresholds
- **Histogram / Bar Chart / Pie Chart:** Visual outputs of the classification

### Pipeline 2 — Top-K Community Analysis

```
CSV Reader → Sorter → Top k Row Filter → Histogram
```

- **CSV Reader:** Loads `community_analysis.csv`
- **Sorter:** Sorts by community size descending
- **Top k Row Filter:** Keeps the top-k largest communities
- **Histogram:** Distribution of `community_id` values

### Joined Output Schema

The **Joiner node** merges both pipelines by `RowID`, producing:

| Column | Type |
|---|---|
| transaction | Integer |
| risk_score | Float |
| prediction | String (`High Risk` / `Medium Risk` / `Other`) |
| community_id | Integer |
| size | Integer |

---

## 📓 Jupyter Notebook

**File:** [`notebooks/01_elliptic_analysis.ipynb`](notebooks/01_elliptic_analysis.ipynb) (~720 KB)

This is the core analytical notebook covering:

- Loading and exploring the Elliptic Bitcoin Dataset
- Feature engineering on 166 node features
- Graph construction and edge traversal
- Anomaly detection and risk score computation
- Community detection (Louvain / connected components)
- Betweenness centrality computation
- Exporting processed results to CSV files for the API

---

## 📸 Screenshots

> All screenshots are stored in [`docs/`](docs/). See [`docs/REPORT.md`](docs/REPORT.md) for the full annotated visual report.

### Backend API — `/graph` Endpoint (localhost:8000)

![Backend Graph JSON](docs/Screenshot%202026-05-27%20171350.png)

*FastAPI `/graph` endpoint returning raw node + edge JSON from `sample_edges.csv`, viewed in VS Code's integrated browser.*

---

### Live Dashboard — CFI Terminal (localhost:3000)

![Live Dashboard](docs/Screenshot%202026-05-27%20183948.png)

*The Next.js CFI Terminal showing 1,678 transactions · 4,076 anomalies · 678 communities · 0.07% average risk. Risk Exposure Profile area chart, Fraud Network force-directed graph, Community Analysis table, Centrality Intelligence, and Alert Distribution donut chart.*

---

### Power BI — Full Dashboard (Low Risk / All)

![Power BI Default View](docs/Screenshot%202026-05-28%20004413.png)

*Power BI Desktop with `crypto fraud detect.pbix` open. KPIs: 1.672K txns · 0.05% avg risk · 4.076K anomalies · 678 communities. All transactions are classified as Low Risk in the unfiltered view.*

---

### Power BI — Community Tooltip

![Power BI Tooltip](docs/Screenshot%202026-05-28%20004422.png)

*Zoomed-in view with tooltip active on Community 668 in the Fraud Communities treemap: `community_id = 668`, `Sum of size = 2`.*

---

### Power BI — High Risk Filter Applied

![Power BI High Risk](docs/Screenshot%202026-05-28%20004444.png)

*Dashboard filtered to "High Risk" only: **2 transactions** found with an average risk score of **15.67%**. Top transaction `232947878` dominates the bar chart. Risk Distribution donut shows 100% High Risk.*

---

### KNIME — Joiner Node & Schema

![KNIME Joiner](docs/Screenshot%202026-05-28%20010914.png)

*Joiner node configuration (match on `RowID`) merging risk scores + community data. Output schema: `transaction · risk_score · prediction · community_id · size`.*

---

### KNIME — Full Workflow & Community Histogram

![KNIME Workflow](docs/Screenshot%202026-05-28%20011310.png)

*Complete KNIME workflow canvas at 67% zoom, showing both pipelines. Histogram output shows uniform distribution of top-k community IDs (668–677), each appearing exactly once.*

---

### KNIME — Pie Chart (Risk Prediction Split)

![KNIME Pie Chart](docs/Screenshot%202026-05-28%20011330.png)

*Pie Chart node output: ~50% High Risk (blue) · ~48% Medium Risk (green) · ~2% Other (yellow) among the rule-engine classified top-risk subset.*

---

### KNIME — Bar Chart (Risk Score by Prediction Class)

![KNIME Bar Chart](docs/Screenshot%202026-05-28%20011340.png)

*Bar Chart node output: High Risk transactions (green) cluster at `risk_score ≈ 0.30`; Medium Risk transactions (blue) scatter near 0. Validates Rule Engine threshold logic.*

---

### KNIME — Histogram (Transaction ID Distribution)

![KNIME Histogram](docs/Screenshot%202026-05-28%20011351.png)

*Histogram of transaction IDs in the top-k filtered set: bimodal distribution — 4 low-ID transactions (older) near `89,273` and 2 high-ID transactions (newer) near `2.33×10⁸`.*

---

## 🔍 Key Findings

| Finding | Detail |
|---|---|
| **Extreme class imbalance** | Only **2 out of 1,672** transactions are High Risk (~0.12%) |
| **High Risk score gap** | High Risk avg: **15.67%** vs. Low Risk avg: **0.05%** — 300× difference |
| **Top centrality node** | Transaction `89273` — betweenness centrality **1.85%** |
| **Largest community** | Community ID `0` — **47 members** |
| **Graph size** | 1,678 unique nodes, multiple directed edges from `sample_edges.csv` |
| **Risk split (top-k)** | ~50/50 High Risk vs. Medium Risk among extreme-risk tail |

---

## 🚀 Quick Start

### 1. Backend

```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload
# Docs: http://localhost:8000/docs
```

### 2. Frontend

```bash
cd frontend
cp .env.example .env.local
# Set NEXT_PUBLIC_BACKEND_URL=http://localhost:8000
npm install
npm run dev
# Dashboard: http://localhost:3000
```

### 3. KNIME

Open KNIME Analytics Platform and import:
```
knime/Crypto Fraud Intelligence Workflow/
```

### 4. Power BI

Open with Power BI Desktop:
```
powerbi/crypto fraud detect.pbix
```

### 5. Notebook

```bash
cd notebooks
jupyter notebook 01_elliptic_analysis.ipynb
```

---

## 📝 Full Visual Report

For a detailed, screenshot-by-screenshot walkthrough of every component:

👉 **[View Full Report → docs/REPORT.md](docs/REPORT.md)**

---

## ⚡ Key Features

### 🔍 Data Analysis
- ✅ Transaction feature engineering (166+ features)
- ✅ Risk scoring algorithms
- ✅ Anomaly detection (Isolation Forest, Statistical)
- ✅ Graph analytics (centrality, communities)
- ✅ Network visualization

### 📊 Dashboard
- ✅ Real-time fraud detection terminal
- ✅ Transaction network visualization
- ✅ Risk distribution charts
- ✅ Anomaly alerts
- ✅ Account search and filtering
- ✅ Community detection visualization

### 📈 Business Intelligence
- ✅ Executive KPI dashboard (Power BI)
- ✅ Risk heatmaps
- ✅ Fraud trends over time
- ✅ Comparative analysis

### 🤖 ML/AI
- ✅ Decision Tree classification (KNIME)
- ✅ Rule-based fraud detection
- ✅ Ensemble risk scoring
- ✅ Continuous model monitoring

### 🌐 API
- ✅ RESTful JSON endpoints
- ✅ Automatic API documentation (Swagger)
- ✅ Pagination & filtering
- ✅ Error handling & validation

---

## 🔧 Tech Stack

| Layer | Technology | Purpose |
|---|---|---|
| **Data Processing** | Python 3.10+, pandas, numpy, scikit-learn | Feature engineering, ML models |
| **ETL** | KNIME Analytics Platform | Visual workflow orchestration |
| **Backend API** | FastAPI, Uvicorn, Pydantic | REST API, validation, docs |
| **Frontend** | Next.js 14+, TypeScript, React | Dashboard UI, components |
| **Visualization** | Recharts, D3.js | Network graphs, charts |
| **Business Intelligence** | Power BI | Executive dashboards |
| **Deployment** | Render (Backend), Netlify (Frontend) | Cloud hosting |
| **Database** | CSV (current) / PostgreSQL (future) | Data persistence |

---

## 📚 Documentation

| Document | Purpose |
|----------|---------|
| [backend/README.md](backend/README.md) | API endpoints, configuration, authentication |
| [backend/DEPLOYMENT.md](backend/DEPLOYMENT.md) | Deploy to Render, environment setup |
| [frontend/README.md](frontend/README.md) | Dashboard features, components, customization |
| [dataset/README.md](dataset/README.md) | Data download, processing, dictionary |
| [knime/README.md](knime/README.md) | KNIME workflow guide, nodes, customization |
| [docs/README.md](docs/README.md) | Full architecture overview |
| [docs/REPORT.md](docs/REPORT.md) | Visual project report with screenshots |
| [CONTRIBUTING.md](CONTRIBUTING.md) | Contribution guidelines, code style |

---

## 🤝 Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for:
- Code style guidelines
- Pull request process
- Development setup
- Bug reporting
- Feature requests

**Quick start for contributors:**
```bash
git checkout -b feature/your-feature
# Make changes
git commit -m "feat: description"
git push origin feature/your-feature
# Create Pull Request
```

**Key areas for contribution:**
- 🔍 ML Models — Improve fraud detection algorithms
- 🎨 UI/UX — Enhance frontend dashboard
- 📊 Analytics — Add new analysis and metrics
- 📖 Documentation — Improve clarity and completeness
- 🧪 Testing — Increase test coverage
- 🐛 Bug Fixes — Address existing issues

---

## 📝 License

This project is licensed under the **MIT License** — see [LICENSE](LICENSE) for details.

**Dataset License**: The Elliptic Bitcoin Dataset is provided under **CC BY-NC-SA 4.0** (Creative Commons Attribution-NonCommercial-ShareAlike). Attribution is required. See dataset [terms](https://www.kaggle.com/datasets/ellipticco/elliptic-data-set) for details.

---

## 🔗 Links

### Live Deployments
- 🌐 **Frontend**: [Netlify Link]
- 🔌 **Backend API**: [https://cfiback.onrender.com](https://cfiback.onrender.com)
- 📊 **Power BI**: Available in `powerbi/` directory

### External Resources
- 📚 [Elliptic Dataset](https://www.kaggle.com/datasets/ellipticco/elliptic-data-set)
- 🔗 [FastAPI Documentation](https://fastapi.tiangolo.com/)
- ⚛️ [Next.js Documentation](https://nextjs.org/docs)
- 🧩 [KNIME Hub](https://www.knime.com/)
- 📊 [Power BI Documentation](https://docs.microsoft.com/power-bi/)

### Source Code Repositories
- Project Root: `e:\datascience\crypto\`

---

## 📈 Roadmap

- [ ] Real-time streaming data support
- [ ] PostgreSQL integration
- [ ] Advanced ML models (GNNs, Transformers)
- [ ] Mobile dashboard
- [ ] REST API rate limiting
- [ ] Database transaction history
- [ ] Advanced anomaly detection
- [ ] Pattern-based rule engine
- [ ] Multi-blockchain support (Ethereum, Monero)
- [ ] Regulatory compliance reporting

---

**Made with ❤️ by the CFI Team**

⭐ If you find this project useful, please star it!

*Dataset: [Elliptic Bitcoin Dataset](https://www.kaggle.com/datasets/ellipticco/elliptic-data-set) · Project: `e:\datascience\crypto\`*
