import pandas as pd


#read
df = pd.read_csv("../cleaned-data/aml_features.csv")


#prepare dashboard dataset
dashboard_df = df[
    [
        'Timestamp',
        'From Bank',
        'Account',
        'To Bank',
        'Account.1',
        'Amount Paid',
        'Payment Currency',
        'Payment Format',
        'Is Laundering',
        'Cross_Border',
        'Large_Transaction',
        'Round_Amount',
        'Sender_Frequency',
        'Risk_Score'
    ]
]


#export for Power BI
dashboard_df.to_csv(
    "../cleaned-data/powerbi_aml_dataset.csv",
    index=False
)


#export top risk accounts summary
top_risk_accounts = (
    dashboard_df.groupby('Account')
    .agg({
        'Amount Paid':'sum',
        'Risk_Score':'mean',
        'Is Laundering':'sum'
    })
    .sort_values(by='Risk_Score', ascending=False)
)


#export top risk accounts summary
top_risk_accounts.to_csv(
    "../reports/top_risk_accounts.csv"
)

print("\nDashboard dataset exported successfully!")

print("\nFiles Created:")
print("1. powerbi_aml_dataset.csv")
print("2. top_risk_accounts.csv")