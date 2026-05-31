import kagglehub

path = kagglehub.dataset_download(
    "ealtman2019/ibm-transactions-for-anti-money-laundering-aml"
)

print("Dataset downloaded to:")
print(path)