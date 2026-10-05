"""
AIN503 — Bài tập cá nhân BTCN1
Phần B1: Tiền xử lý, K-Means, Apriori
"""

from pathlib import Path

import matplotlib.pyplot as plt
import pandas as pd
from mlxtend.frequent_patterns import apriori, association_rules
from sklearn.cluster import KMeans
from sklearn.preprocessing import StandardScaler

BASE = Path(__file__).resolve().parent
DATA = BASE / "data"
OUT = BASE / "outputs"
OUT.mkdir(exist_ok=True)

# ---------------------------------------------------------------------------
# B1.1 — Tiền xử lý dữ liệu chi nhánh
# ---------------------------------------------------------------------------
df = pd.read_csv(DATA / "fpt_chi_nhanh.csv")

missing_counts = df.isna().sum()
print("=== B1.1 missing_counts ===")
print(missing_counts)

df["muc_do_rui_ro"] = df["do_tre_gio"] * df["ty_le_loi"]
print("\n=== B1.1 muc_do_rui_ro ===")
print(df[["chi_nhanh", "muc_do_rui_ro"]].sort_values("muc_do_rui_ro", ascending=False))

# ---------------------------------------------------------------------------
# B1.2 — Phân cụm 8 chi nhánh bằng K-Means
# ---------------------------------------------------------------------------
cot_so = [
    "do_tre_gio",
    "ty_le_loi",
    "yeu_cau_ho_tro",
    "hai_long_nld",
    "kpi_dat",
    "chi_phi_bi",
    "uptime",
]
X = df[cot_so]

scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

kmeans = KMeans(n_clusters=3, random_state=42, n_init=10)
df["cum"] = kmeans.fit_predict(X_scaled)

print("\n=== B1.2 chi_nhanh + cum ===")
print(df[["chi_nhanh", "cum"]])
print("\n=== B1.2 mean theo cụm ===")
print(df.groupby("cum")[cot_so].mean())

# ---------------------------------------------------------------------------
# B1.3 — Luật kết hợp dịch vụ bằng Apriori
# ---------------------------------------------------------------------------
giao_dich = pd.read_csv(DATA / "fpt_dich_vu_giao_dich.csv")

gio_hang = pd.crosstab(giao_dich["ma_giao_dich"], giao_dich["dich_vu"]) > 0
print("\n=== B1.3 gio_hang.head() ===")
print(gio_hang.head())
print(f"Kích thước ma trận giỏ hàng: {gio_hang.shape}")

frequent_itemsets = apriori(gio_hang, min_support=0.2, use_colnames=True)
rules = association_rules(frequent_itemsets, metric="confidence", min_threshold=0.5)

print("\n=== B1.3 frequent_itemsets ===")
print(frequent_itemsets.sort_values("support", ascending=False))
print("\n=== B1.3 association rules ===")
print(rules[["antecedents", "consequents", "support", "confidence", "lift"]])

# ---------------------------------------------------------------------------
# B2.2 — Chi phí / KPI và scatter plot
# ---------------------------------------------------------------------------
df["chi_phi_tren_kpi"] = df["chi_phi_bi"] / df["kpi_dat"]
print("\n=== B2.2 Chi phí BI / KPI đạt ===")
print(
    df[["chi_nhanh", "cum", "chi_phi_bi", "kpi_dat", "chi_phi_tren_kpi"]].sort_values(
        "chi_phi_tren_kpi", ascending=False
    )
)

plt.figure(figsize=(9, 6))
colors = {0: "#2E7D32", 1: "#F9A825", 2: "#C62828"}
for cum_id, group in df.groupby("cum"):
    plt.scatter(
        group["chi_phi_bi"],
        group["kpi_dat"],
        s=140,
        c=colors.get(cum_id, "#546E7A"),
        label=f"Cụm {cum_id}",
        edgecolors="white",
        linewidths=0.8,
    )
    for _, row in group.iterrows():
        plt.annotate(
            row["chi_nhanh"],
            (row["chi_phi_bi"], row["kpi_dat"]),
            textcoords="offset points",
            xytext=(6, 6),
            fontsize=8,
        )

plt.xlabel("Chi phí vận hành BI (triệu VNĐ/tháng)")
plt.ylabel("Tỷ lệ KPI đạt mục tiêu (%)")
plt.title("Chi phí–Hiệu quả BI theo cụm chi nhánh FPT Telecom")
plt.legend()
plt.grid(True, alpha=0.3)
plt.tight_layout()
plt.savefig(OUT / "b2_2_scatter_chi_phi_kpi.png", dpi=160)
plt.close()

df.to_csv(OUT / "ket_qua_phan_cum.csv", index=False)
frequent_itemsets.to_csv(OUT / "frequent_itemsets.csv", index=False)
rules.to_csv(OUT / "association_rules.csv", index=False)
print(f"\nĐã lưu artifact vào {OUT}")
