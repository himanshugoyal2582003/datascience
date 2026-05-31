import pandas as pd
import numpy as np

print("Loading dataset...")


#read
df = pd.read_csv(
    "../raw-data/trans_3000p2_list.txt",
    nrows=100000
)





# we use the same dataset as before, but now we will create new features to help our model learn better patterns.
# like we will create features like:
# -cross-border transaction flag
# -large transaction flag
# -round amount flag
# -transaction frequency per sender
# - risk prediction: cross-border transactions get 30 points, large transactions get 40 points, round amounts get 10 points, and senders with more than 20 transactions get 20 points. The total risk score is the sum of these factors.









# Convert timestamp


df['Timestamp'] = pd.to_datetime(df['Timestamp'])

# Extract time features
df['Hour'] = df['Timestamp'].dt.hour
df['Day'] = df['Timestamp'].dt.day
df['Month'] = df['Timestamp'].dt.month





# Cross-border transaction flag


df['Cross_Border'] = (
    df['Receiving Currency'] != df['Payment Currency']
).astype(int)








# Large transaction flag


threshold = df['Amount Paid'].quantile(0.95)

df['Large_Transaction'] = (
    df['Amount Paid'] > threshold
).astype(int)











# Round amount flag


df['Round_Amount'] = (
    df['Amount Paid'] % 1000 == 0
).astype(int)












# Transaction frequency per sender

sender_freq = df['Account'].value_counts()

df['Sender_Frequency'] = df['Account'].map(sender_freq)










# Risk Score

df['Risk_Score'] = (
    df['Cross_Border'] * 30 +
    df['Large_Transaction'] * 40 +
    df['Round_Amount'] * 10 +
    (df['Sender_Frequency'] > 20).astype(int) * 20
)

# cross-border transactions get 30 points, large transactions get 40 points, round amounts get 10 points, and senders with more than 20 transactions get 20 points. The total risk score is the sum of these factors.













# Save cleaned dataset

df.to_csv(
    "../cleaned-data/aml_features.csv",
    index=False
)

print("\nFeature engineering complete!")


print("\nTop Risk Transactions:")


print(
    df[['Account', 'Amount Paid', 'Risk_Score']]
    .sort_values(by='Risk_Score', ascending=False)
    .head(10)
)
