import pandas as pd
from sklearn.ensemble import IsolationForest
import matplotlib.pyplot as plt



#read
df = pd.read_csv("../cleaned-data/aml_features.csv")



#select features for anomaly detection
features = df[
    [
        'Amount Paid',
        'Sender_Frequency',
        'Risk_Score'
    ]
]



#train isolation forest model
model = IsolationForest(
    contamination=0.02,
    random_state=42
)

df['Anomaly'] = model.fit_predict(features)

anomalies = df[df['Anomaly'] == -1]

print("\nTotal Anomalies Found:")
print(len(anomalies))

print("\nTop Suspicious Transactions:")
print(
    anomalies[
        [
            'Account',
            'Amount Paid',
            'Risk_Score'
        ]
    ].head(10)
)


#visualize anomalies
plt.figure(figsize=(12,6))

plt.scatter(
    df['Amount Paid'],
    df['Risk_Score'],
    alpha=0.3
)

plt.scatter(
    anomalies['Amount Paid'],
    anomalies['Risk_Score']
)

plt.xlabel("Amount Paid")

plt.ylabel("Risk Score")

plt.title("AML Anomaly Detection")

plt.tight_layout()

plt.show()