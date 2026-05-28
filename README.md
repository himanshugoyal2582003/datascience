# Data Science Projects

This workspace contains multiple data-science projects and prototypes focused
on financial risk and fraud intelligence. Two featured projects are:

- Anti-Money Laundering Intelligence Dashboard (AML)
- Crypto Fraud Intelligence (CFI)

## Anti-Money Laundering Intelligence Dashboard

An exploratory AML transaction-monitoring prototype using Python, KNIME, and
Power BI on the IBM synthetic AML transactions dataset. The analysis focuses
on interpretable rule-based risk scoring, anomaly detection, and preparing
dashboard-ready data for investigation and reporting.

- Read the full project details: [aml/README.md](aml/README.md)
- Key outputs: cleaned CSVs for Power BI, analysis notebooks, and a KNIME
	workflow in `aml/knime-workflow/`.
- Data: download the IBM AML dataset from Kaggle and place the source file in
	`aml/raw-data/` (see `aml/README.md` for exact filenames and run steps).

## Crypto Fraud Intelligence (CFI)

An end-to-end system for blockchain transaction fraud detection built on the
Elliptic Bitcoin dataset. The project includes data preprocessing and
feature engineering notebooks, a KNIME visual ETL, a FastAPI backend serving
CSV-derived endpoints, and a Next.js interactive dashboard plus a Power BI
report for executive views.

- Read the full project details: [crypto/README.md](crypto/README.md)
- Key outputs: `dataset/*` CSV exports, `backend` API, `frontend` dashboard,
	and `powerbi/` report.

## Getting started

- See the individual project READMEs for run instructions:
	- [aml/README.md](aml/README.md)
	- [crypto/README.md](crypto/README.md)
- Large raw datasets and generated CSV outputs are intentionally excluded from
	version control. Download the required datasets (Kaggle / Elliptic) and
	place them in the respective `raw-data` or `dataset` folders before running
	the notebooks or scripts.

If you'd like, I can also tidy and expand the project READMEs with quick-start
commands, badges, and short examples — tell me which project to prioritize.
