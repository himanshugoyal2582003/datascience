# UPI Ecosystem Intelligence

A data-science and BI project for analyzing UPI transaction behavior across
users, merchants, banks, geography, risk signals, and fraud/anomaly patterns.

![UPI dashboard preview](docs/Screenshot%202026-05-31%20223124.png)

## Highlights

- Cleans and prepares UPI transaction data for analytics.
- Builds merchant, user, geographic, risk, and transaction summary datasets.
- Uses notebooks for focused analysis across seven workstreams.
- Includes a KNIME workflow for repeatable visual data processing.
- Includes a Power BI dashboard for interactive ecosystem intelligence.
- Stores screenshots and visual references in [docs/](docs/README.md).

## Project Structure

| Path | Purpose |
| --- | --- |
| `dataset/` | Local generated analytics outputs and source helper script |
| `notebooks/` | Jupyter analysis notebooks for UPI workstreams |
| `knime/` | KNIME analytics workflow |
| `powerbi/` | Power BI dashboard file |
| `docs/` | Screenshots and documentation images |

## Notebook Workstreams

| Notebook | Focus |
| --- | --- |
| `01_data_cleaning.ipynb` | Transaction cleaning and preparation |
| `02_merchant_analysis.ipynb` | Merchant behavior and revenue patterns |
| `03_user_analysis.ipynb` | User summaries, segments, and premium users |
| `04_risk_analysis.ipynb` | Fraud, anomaly, and high-risk activity |
| `05_segmentation.ipynb` | User and transaction segmentation |
| `06_geographic_analysis.ipynb` | Geo-risk and bank penetration insights |
| `07_transaction_analytics.ipynb` | Transaction trends and operational metrics |

## Data

Raw and unprocessed UPI files should stay local and outside Git. Generated
CSV outputs can be recreated from the notebooks and scripts as needed. The
local dataset folder currently contains outputs such as transaction summaries,
merchant insights, fraud hotspots, geo-risk scores, and user segments.

## Workflow

1. Put the source UPI dataset in the local `dataset/` or raw-data location.
2. Run the notebooks in order to clean, enrich, and summarize the data.
3. Open the KNIME workflow to inspect the repeatable analytics pipeline.
4. Open `powerbi/UPI_Ecosystem_Dashboard.pbix` and refresh the report.

## Documentation

Visual documentation is available in [docs/README.md](docs/README.md). The
images capture dashboard pages, charts, and KNIME/analysis evidence for the
project.
