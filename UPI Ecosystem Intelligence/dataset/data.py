import os
import zipfile

# Dataset identifier
DATASET = "skullagos5246/upi-transactions-2024-dataset"

# Download location
DOWNLOAD_DIR = "dataset"

os.makedirs(DOWNLOAD_DIR, exist_ok=True)

# Download dataset
os.system(
    f'kaggle datasets download -d {DATASET} -p {DOWNLOAD_DIR}'
)

# Extract zip
zip_path = os.path.join(
    DOWNLOAD_DIR,
    "upi-transactions-2024-dataset.zip"
)

with zipfile.ZipFile(zip_path, "r") as zip_ref:
    zip_ref.extractall(DOWNLOAD_DIR)

print("Dataset downloaded and extracted successfully.")