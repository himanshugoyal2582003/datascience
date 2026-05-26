import pandas as pd

print("Loading dataset...")

# Load first 100000 rows
df = pd.read_csv(
    "../raw-data/trans_3000p2_list.txt",
    nrows=100000
)

print("\n===== FIRST 5 ROWS =====")
print(df.head())

print("\n===== SHAPE =====")
print(df.shape)

print("\n===== COLUMNS =====")
print(df.columns)

print("\n===== MISSING VALUES =====")
print(df.isnull().sum())

print("\n===== DATA TYPES =====")
print(df.dtypes)