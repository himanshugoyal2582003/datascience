# Financial Intelligence Data Science Projects

This workspace contains data-science and BI projects for financial risk,
fraud detection, transaction monitoring, and digital payment intelligence.

## Projects

| Project | Focus | Main outputs |
| --- | --- | --- |
| [Anti-Money Laundering Intelligence Dashboard](Anti-Money%20Laundering%20Intelligence%20Dashboard/README.md) | AML risk scoring and transaction monitoring | Python analysis, KNIME workflow, Power BI dashboard |
| [Crypto Fraud Intelligence](Crypto%20Fraud%20Intelligence/README.md) | Blockchain fraud detection on Elliptic-style data | FastAPI backend, Next.js dashboard, KNIME workflow, Power BI report |
| [Open Banking Personal Finance Intelligence Platform](Open%20Banking%20Personal%20Finance%20Intelligence%20Platform/README.md) | Personal finance behavior, spending, and payment insights | Synthetic open banking data, analytics scripts, KNIME workflow, Power BI report |
| [UPI Ecosystem Intelligence](UPI%20Ecosystem%20Intelligence/README.md) | UPI transaction, merchant, user, risk, and geographic analytics | Analysis notebooks, KNIME workflow, Power BI dashboard |

## Repository Notes

- Raw/unprocessed datasets, generated CSV outputs, local environments, logs,
  and build artifacts are excluded from Git.
- Project documentation lives inside each project folder, with screenshots and
  visual references under each project's `docs/` directory.
- Power BI files are kept with the project folders so dashboards can be opened
  directly after the data outputs are regenerated.

## Getting Started

Open the README for the project you want to run first. Most projects follow the
same pattern:

1. Place the required raw dataset in that project's `raw-data/`, `dataset/raw/`,
   or equivalent local data folder.
2. Run the notebooks or scripts to generate cleaned and dashboard-ready CSVs.
3. Open the KNIME workflow or Power BI file for visual analysis and reporting.
