import pandas as pd
import matplotlib.pyplot as plt




#read
df = pd.read_csv("../cleaned-data/aml_features.csv")





#plot risk score distribution
plt.figure(figsize=(10,6))

plt.hist(
    df['Risk_Score'],
    bins=20
)

plt.title("AML Risk Score Distribution")

plt.xlabel("Risk Score")

plt.ylabel("Number of Transactions")

plt.tight_layout()

plt.show()