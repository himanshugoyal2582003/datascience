# Data Science Projects

## Anti-Money Laundering Intelligence Dashboard

This repository contains an exploratory AML transaction monitoring project
using Python, Power BI, and KNIME on IBM synthetic anti-money laundering data.

![AML Power BI Dashboard](aml/reports/dashboard.png)

### Project Links

- [AML project README](aml/README.md)
- [Detailed AML analysis report](aml/reports/AML_PROJECT_REPORT.md)
- [Python analysis scripts](aml/python-analysis/)
- [Power BI dashboard file](aml/powerbi-dashboard/)
- [KNIME workflow](aml/knime-workflow/AML_Fraud_Detection_Workflow/)

### Highlights

| Metric | Full 100,000-Transaction Analysis |
| --- | ---: |
| Total amount paid | 26,308,200.17 |
| Transactions with risk score >= 70 | 58 |
| Isolation Forest anomalies | 1,942 |
| Labeled laundering transactions | 7 |

The project documents a key validation limitation: the current high-risk rule
and anomaly model do not identify the labeled laundering examples in the
analyzed sample. It is therefore presented as an analytical prototype, not a
production alerting system.

### Data Note

The full IBM synthetic transaction source file is too large for standard
GitHub storage and is intentionally excluded from this repository. The
feature-engineered sample and Power BI-ready exported data are included for
review and dashboard use.
