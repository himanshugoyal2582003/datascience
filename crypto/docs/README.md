# 📚 Documentation

## Overview
This directory contains comprehensive documentation for the Crypto Fraud Intelligence (CFI) system.

## Files

### Project Report
- **`REPORT.md`** - Detailed visual project report with screenshots and findings
  - Backend API functionality
  - Live dashboard overview
  - Power BI analytics dashboard
  - KNIME workflow screenshots
  - Key insights and metrics

## Quick Links

- 📖 **Main README** - See [../README.md](../README.md) for project overview
- 🚀 **Backend Docs** - See [../backend/README.md](../backend/README.md) for API documentation
- 🎨 **Frontend Docs** - See [../frontend/README.md](../frontend/README.md) for dashboard guide
- 📊 **Dataset Info** - See [../dataset/README.md](../dataset/README.md) for data setup
- ⚙️ **KNIME Guide** - See [../knime/README.md](../knime/README.md) for workflow details

## Architecture Overview

```
Elliptic Dataset
    ↓
[Python Analysis]  ← Feature Engineering, Anomaly Detection
    ↓
Processed Data (CSVs)
    ↓
[KNIME Workflow]  ← Visual ETL, Rule Engine, Charting
    ↓
[FastAPI Backend]  ← JSON API Endpoints
    ↓
[Next.js Frontend]  ← Interactive Terminal Dashboard
    ↓
[Power BI]  ← Executive BI Report
```

## System Components

| Component | Technology | Purpose |
|-----------|-----------|---------|
| **Data Pipeline** | Python + Jupyter | Feature engineering, risk scoring, anomaly detection |
| **ETL** | KNIME Analytics | Visual workflow for data processing and validation |
| **API** | FastAPI (Render) | REST endpoints serving processed data |
| **Dashboard** | Next.js + TypeScript (Netlify) | Real-time fraud detection terminal UI |
| **BI** | Power BI | Interactive executive dashboard |

## Key Metrics

- **Transactions Analyzed**: ~200K
- **Network Edges**: ~234K
- **Feature Dimensions**: 166
- **Risk Classes**: Illicit vs Licit
- **Detection Accuracy**: [See REPORT.md](REPORT.md)

## Getting Started

1. **Setup Environment**
   ```bash
   python -m venv .venv
   source .venv/bin/activate  # Windows: .venv\Scripts\activate
   pip install -r backend/requirements.txt
   ```

2. **Download & Process Data**
   ```bash
   cd dataset/elliptic
   # Download from Kaggle and unzip
   unzip elliptic-data-set.zip
   ```

3. **Run Analysis**
   ```bash
   cd ../..
   python python-analysis/02_feature_engineering.py
   ```

4. **Start Backend API**
   ```bash
   cd backend
   python main.py
   ```

5. **Start Frontend Dashboard**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

## Deployment

- **Backend**: Deployed on [Render](https://render.com) - [cfiback.onrender.com](https://cfiback.onrender.com)
- **Frontend**: Deployed on [Netlify](https://netlify.com)
- **See** [../backend/DEPLOYMENT.md](../backend/DEPLOYMENT.md) for detailed deployment guide
