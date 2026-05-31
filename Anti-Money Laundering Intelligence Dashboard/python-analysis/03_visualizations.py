import pandas as pd
import matplotlib.pyplot as plt



#read

df = pd.read_csv("../cleaned-data/aml_features.csv")



#top 10 sender accounts by total amount paid
top_accounts = (
    df.groupby('Account')['Amount Paid']
    .sum()
    .sort_values(ascending=False)
    .head(10)
)




#plot
plt.figure(figsize=(12,6))

top_accounts.plot(kind='bar')

plt.title("Top 10 Sender Accounts by Amount Paid")

plt.xlabel("Account")

plt.ylabel("Total Amount Paid")

plt.xticks(rotation=45)

plt.tight_layout()

plt.show()