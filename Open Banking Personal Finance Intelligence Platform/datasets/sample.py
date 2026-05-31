import pandas as pd

print("Loading dataset...")

df = pd.read_csv(
    r"D:\aml_dataset\HI-Small_Trans.csv"
)

print("Dataset Loaded")

print(df.head())

print(df.shape)

sample = df.sample(200000, random_state=42)

sample.to_csv(
    r"E:\datascience\open\datasets\sample_transactions.csv",
    index=False
)

print("Sample dataset created successfully")