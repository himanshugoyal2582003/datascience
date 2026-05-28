# ⚙️ KNIME Workflow - Crypto Fraud Intelligence

## Overview
This directory contains the **KNIME Analytics Platform** workflow for the Crypto Fraud Intelligence (CFI) system. KNIME provides a visual, no-code interface for data processing, transformation, and analysis.

## Workflow: `Crypto Fraud Intelligence Workflow`

### Purpose
The KNIME workflow implements the data ETL pipeline that:
- Reads processed transaction data
- Applies rule-based classification
- Performs statistical analysis
- Generates visual outputs (charts, histograms)
- Prepares data for dashboard visualization

### Workflow Components

| Node | Type | Function |
|------|------|----------|
| **CSV Reader (#1)** | Input | Loads main transaction dataset with features |
| **CSV Reader (#4)** | Input | Loads secondary data source (risk scores / anomalies) |
| **Row Filter (#2)** | Processing | Filters transactions by risk level or category |
| **Rule Engine (#3)** | Processing | Applies business rules for fraud classification |
| **Sorter (#5)** | Sorting | Organizes data by risk score or category |
| **Top k Row Filter (#6)** | Filtering | Extracts top-N highest-risk transactions |
| **Bar Chart (#7)** | Visualization | Risk score distribution by transaction type |
| **Pie Chart (#8)** | Visualization | Fraud vs licit classification breakdown |
| **Histogram (#9)** | Visualization | Transaction feature distribution |
| **Histogram (#10)** | Visualization | Community detection cluster sizes |

### Data Flow

```
CSV Reader (#1)          CSV Reader (#4)
     │                        │
     └────────┬───────────────┘
              │
         Row Filter (#2)
              │
         Rule Engine (#3)
              │
         ┌────┴────┬────────┬──────────┐
         │          │        │          │
       Sorter    Bar Chart  Pie Chart  Histogram
       (#5)       (#7)       (#8)      (#9/10)
```

## Getting Started

### Requirements
- KNIME Analytics Platform (free, open-source)
- Download from: [https://www.knime.com/download](https://www.knime.com/download)

### Installation
1. Install KNIME Analytics Platform
2. Open KNIME Workbench
3. Import this workflow: `File → Import → KNIME Workflow`
4. Select the `Crypto Fraud Intelligence Workflow` directory

### Running the Workflow
1. **Configure CSV Readers**: Point to your processed data files
   - Data sources in `../dataset/`
2. **Execute**: Right-click workflow → `Execute All`
3. **View Results**: Right-click visualization nodes → `View`

## Key Features

### Rule Engine Node
Implements business logic for fraud detection:
```
IF risk_score > 0.8 AND activity_type = "high_velocity" 
   THEN classification = "HIGH_RISK"
```

### Visualizations
- **Bar Chart**: Risk distribution across transaction types
- **Pie Chart**: Overall fraud/licit ratio
- **Histograms**: Feature distributions and community sizes

## Customization

### Adding New Rules
1. Double-click **Rule Engine (#3)** node
2. Add new rule conditions
3. Execute workflow to see results

### Adding New Data Sources
1. Drag **CSV Reader** node
2. Configure file path
3. Connect to existing pipeline

### Creating New Visualizations
1. Drag visualization node (Chart, Table, etc.)
2. Connect to data output
3. Configure axes and appearance
4. Execute to view

## Workflow Files

```
Crypto Fraud Intelligence Workflow/
├── workflow.knime              ← Main workflow definition
├── workflow-metadata.xml       ← Metadata and versioning
├── workflowset.meta            ← Workflow set configuration
├── [Nodes]/                    ← Individual node configurations
│   ├── Bar Chart (#7)/
│   ├── CSV Reader (#1)/
│   ├── CSV Reader (#4)/
│   ├── Histogram (#9)/
│   ├── Histogram (#10)/
│   ├── Pie Chart (#8)/
│   ├── Row Filter (#2)/
│   ├── Rule Engine (#3)/
│   ├── Sorter (#5)/
│   └── Top k Row Filter (#6)/
└── Color Manager (#5)/         ← Styling configuration
```

## Exporting Results

### Export to CSV
1. Add **CSV Writer** node
2. Connect to output node
3. Configure output path
4. Execute

### Export to Excel
1. Add **Excel Writer** node
2. Connect to desired output
3. Execute

### Generate Report
1. Right-click workflow → **Generate Report**
2. Select output format (PDF/HTML)
3. View report

## Troubleshooting

| Issue | Solution |
|-------|----------|
| CSV Reader can't find file | Check file path and permissions; ensure file exists in `../dataset/` |
| Nodes show red errors | Right-click node → **View Errors**; check input data format |
| Visualization won't render | Ensure node is executed; check data contains expected columns |
| Memory issues | Use **Row Filter** to reduce dataset size; execute partial workflow |

## Documentation Links

- 📖 [KNIME Official Documentation](https://docs.knime.com/)
- 📚 [KNIME Tutorials](https://www.knime.com/knime-introductory-course)
- 🔗 [KNIME Community Forum](https://forum.knime.com/)

## Integration with Pipeline

This KNIME workflow integrates with:
- **Upstream**: Python analysis (`../python-analysis/`) generates input CSVs
- **Downstream**: Processed outputs feed FastAPI backend (`../backend/`)

See [../README.md](../README.md) for full architecture overview.
