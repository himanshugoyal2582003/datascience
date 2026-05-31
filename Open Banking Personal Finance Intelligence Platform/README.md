# Open Banking Personal Finance Intelligence Platform

An analytics project for open banking style personal finance intelligence. It
uses synthetic transaction data to study spending behavior, payment channels,
merchant categories, cash-flow patterns, and dashboard-ready personal finance
metrics.

![Open Banking dashboard preview](docs/Screenshot%202026-05-30%20212511.png)

## Highlights

- Generates and analyzes synthetic open banking transaction data.
- Builds summary datasets for payment behavior, hourly activity, and processed
  transaction views.
- Includes a KNIME workflow for low-code data preparation and exploration.
- Includes a Power BI report for stakeholder-facing finance insights.
- Stores screenshots and visual references in [docs/](docs/README.md).

## Project Structure

| Path | Purpose |
| --- | --- |
| `analytics/scripts/` | Python scripts for data generation and analysis |
| `analytics/notebooks/` | Exploratory notebook work |
| `datasets/` | Local generated CSV outputs and helper scripts |
| `knime/` | KNIME workflow for visual analytics |
| `powerbi/` | Power BI dashboard file |
| `docs/` | Screenshots and documentation images |

## Data

The tracked repository should not depend on large raw exports. Keep
unprocessed source files in a local raw-data folder and regenerate the
dashboard-ready CSVs from the scripts when needed.

Current generated data outputs include:

- `datasets/sample_transactions.csv`
- `datasets/processed_transactions.csv`
- `datasets/payment_summary.csv`
- `datasets/hour_summary.csv`

## Workflow

1. Generate or refresh the sample data from `analytics/scripts/generate_data.py`.
2. Run analysis from `analytics/scripts/analysis.py` or the EDA notebook.
3. Open the KNIME workflow for visual transformations.
4. Open the Power BI file and refresh it against the generated CSV outputs.

## Documentation

Visual documentation is available in [docs/README.md](docs/README.md). The
images show dashboard pages, KNIME views, and analysis outputs used to explain
the project.
