# 📊 Dataset Directory

## Overview
This directory contains datasets used in the Crypto Fraud Intelligence (CFI) project, including both raw source data and processed features.

## Files

### Raw Data (Not Committed to Git)
- **`elliptic-data-set.zip`** - Original Elliptic Bitcoin Dataset from Kaggle
- **`elliptic_bitcoin_dataset/`** - Extracted raw data files
  - `elliptic_txs_classes.csv` - Transaction class labels (licit vs illicit)
  - `elliptic_txs_edgelist.csv` - Transaction network edges/relationships
  - `elliptic_txs_features.csv` - Raw transaction features

> ⚠️ **Note:** Raw data files are excluded from Git to keep repository size manageable. Download from [Kaggle Elliptic Dataset](https://www.kaggle.com/datasets/ellipticco/elliptic-data-set).

### Processed Data (Committed to Git)
- **`anomalies.csv`** - Detected anomalous transactions and their scores
- **`centrality_results.csv`** - Graph centrality metrics for each transaction node
- **`community_analysis.csv`** - Community detection results and cluster assignments
- **`risk_scores.csv`** - Computed fraud risk scores for transactions
- **`data.py`** - Python module for data loading and preprocessing

## Data Pipeline

```
elliptic_bitcoin_dataset/ (Raw)
         │
         ▼
    02_feature_engineering.py
         │
         ▼
  Processed Outputs
  ├── anomalies.csv
  ├── centrality_results.csv
  ├── community_analysis.csv
  └── risk_scores.csv
```

## Setup Instructions

### Download Raw Data
1. Register/login at [Kaggle](https://www.kaggle.com)
2. Download the [Elliptic Bitcoin Dataset](https://www.kaggle.com/datasets/ellipticco/elliptic-data-set)
3. Unzip to `elliptic/elliptic_bitcoin_dataset/`

```bash
cd dataset/elliptic
unzip elliptic-data-set.zip
```

### Process Data
```bash
cd ../..  # Back to crypto root
python python-analysis/02_feature_engineering.py
```

This generates the processed CSV files automatically.

## Data Dictionary

See [Elliptic Dataset Documentation](https://www.kaggle.com/datasets/ellipticco/elliptic-data-set) for detailed feature descriptions.

**Key Attributes:**
- Transaction ID: Unique identifier
- Class: 1 (illicit), 2 (licit), 3 (unknown)
- Features: 166 anonymized features per transaction
