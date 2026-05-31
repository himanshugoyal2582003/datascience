import pandas as pd
import networkx as nx
import matplotlib.pyplot as plt



#read
df = pd.read_csv("../cleaned-data/aml_features.csv")


#create graph
high_risk_df = df[df['Risk_Score'] >= 70]

sample_df = high_risk_df.head(100)

G = nx.from_pandas_edgelist(
    sample_df,
    source='Account',
    target='Account.1',
    edge_attr='Amount Paid',
    create_using=nx.DiGraph()
)

plt.figure(figsize=(14,10))

pos = nx.spring_layout(G, seed=42)

nx.draw(
    G,
    pos,
    with_labels=True,
    node_size=700,
    font_size=8,
    arrows=True
)

plt.title("High Risk Transaction Network")

plt.show()