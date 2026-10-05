"""Sinh báo cáo Word BTCN1 — AIN503."""

from pathlib import Path

import matplotlib.pyplot as plt
import pandas as pd
from docx import Document
from docx.enum.table import WD_TABLE_ALIGNMENT
from docx.enum.text import WD_ALIGN_PARAGRAPH, WD_LINE_SPACING
from docx.oxml.ns import qn
from docx.shared import Cm, Pt, RGBColor
from mlxtend.frequent_patterns import apriori, association_rules
from sklearn.cluster import KMeans
from sklearn.preprocessing import StandardScaler

BASE = Path(__file__).resolve().parent
DATA = BASE / "data"
OUT = BASE / "outputs"
OUT.mkdir(exist_ok=True)

df = pd.read_csv(DATA / "fpt_chi_nhanh.csv")
df["muc_do_rui_ro"] = df["do_tre_gio"] * df["ty_le_loi"]
cot_so = [
    "do_tre_gio",
    "ty_le_loi",
    "yeu_cau_ho_tro",
    "hai_long_nld",
    "kpi_dat",
    "chi_phi_bi",
    "uptime",
]
scaler = StandardScaler()
X_scaled = scaler.fit_transform(df[cot_so])
kmeans = KMeans(n_clusters=3, random_state=42, n_init=10)
df["cum"] = kmeans.fit_predict(X_scaled)
df["chi_phi_tren_kpi"] = df["chi_phi_bi"] / df["kpi_dat"]

ten_cum = {
    2: "Chuẩn mực vận hành",
    0: "Cảnh báo — cần can thiệp",
    1: "Khủng hoảng — đầu tư gấp",
}
mau_cum = {2: "#2E7D32", 0: "#F9A825", 1: "#C62828"}

giao_dich = pd.read_csv(DATA / "fpt_dich_vu_giao_dich.csv")
gio_hang = pd.crosstab(giao_dich["ma_giao_dich"], giao_dich["dich_vu"]) > 0
frequent_itemsets = apriori(gio_hang, min_support=0.2, use_colnames=True)
rules = association_rules(frequent_itemsets, metric="confidence", min_threshold=0.5)

# --- Biểu đồ ---
plt.figure(figsize=(9, 5.4))
rank = df.sort_values("muc_do_rui_ro")
bar_colors = [mau_cum[c] for c in rank["cum"]]
plt.barh(rank["chi_nhanh"], rank["muc_do_rui_ro"], color=bar_colors)
plt.xlabel("Mức độ rủi ro = Độ trễ (giờ) × Tỷ lệ lỗi (%)")
plt.title("Xếp hạng rủi ro dữ liệu–báo cáo theo chi nhánh")
plt.tight_layout()
plt.savefig(OUT / "b1_xep_hang_rui_ro.png", dpi=170)
plt.close()

plt.figure(figsize=(9, 6))
for cum_id, group in df.groupby("cum"):
    plt.scatter(
        group["chi_phi_bi"],
        group["kpi_dat"],
        s=160,
        c=mau_cum[cum_id],
        label=f"Cụm {cum_id}: {ten_cum[cum_id]}",
        edgecolors="white",
        linewidths=0.8,
    )
    for _, row in group.iterrows():
        plt.annotate(
            row["chi_nhanh"],
            (row["chi_phi_bi"], row["kpi_dat"]),
            textcoords="offset points",
            xytext=(6, 5),
            fontsize=8,
        )
plt.xlabel("Chi phí vận hành BI (triệu VNĐ/tháng)")
plt.ylabel("Tỷ lệ KPI đạt mục tiêu (%)")
plt.title("Chi phí–Hiệu quả BI theo cụm chi nhánh FPT Telecom")
plt.legend(loc="lower right", fontsize=8)
plt.grid(True, alpha=0.28)
plt.tight_layout()
plt.savefig(OUT / "b2_2_scatter_chi_phi_kpi.png", dpi=170)
plt.close()

# --- Word helpers ---
doc = Document()
section = doc.sections[0]
section.top_margin = Cm(2)
section.bottom_margin = Cm(2)
section.left_margin = Cm(2.2)
section.right_margin = Cm(2.2)

style = doc.styles["Normal"]
style.font.name = "Times New Roman"
style.font.size = Pt(12)
style.element.rPr.rFonts.set(qn("w:eastAsia"), "Times New Roman")
style.paragraph_format.space_after = Pt(8)
style.paragraph_format.line_spacing_rule = WD_LINE_SPACING.ONE_POINT_FIVE


def set_run_font(run, size=12, bold=False, color=None):
    run.font.name = "Times New Roman"
    run._element.rPr.rFonts.set(qn("w:eastAsia"), "Times New Roman")
    run.font.size = Pt(size)
    run.bold = bold
    if color:
        run.font.color.rgb = RGBColor(*color)


def add_heading_vn(text, level=1):
    p = doc.add_heading(text, level=level)
    for run in p.runs:
        run.font.color.rgb = RGBColor(0x1B, 0x3A, 0x4B)
        run.font.name = "Times New Roman"
        run._element.rPr.rFonts.set(qn("w:eastAsia"), "Times New Roman")
    return p


def add_p(text, *, bold=False, italic=False, center=False, size=12, space_after=8):
    p = doc.add_paragraph()
    p.paragraph_format.space_after = Pt(space_after)
    p.paragraph_format.line_spacing = 1.5
    if center:
        p.alignment = WD_ALIGN_PARAGRAPH.CENTER
    run = p.add_run(text)
    set_run_font(run, size=size, bold=bold)
    run.italic = italic
    return p


def add_body(text):
    p = doc.add_paragraph()
    p.paragraph_format.first_line_indent = Cm(1)
    p.paragraph_format.space_after = Pt(8)
    p.paragraph_format.line_spacing = 1.5
    p.alignment = WD_ALIGN_PARAGRAPH.JUSTIFY
    run = p.add_run(text)
    set_run_font(run)
    return p


def add_bullet(text):
    p = doc.add_paragraph(style="List Bullet")
    p.clear()
    p.paragraph_format.space_after = Pt(4)
    p.paragraph_format.line_spacing = 1.15
    run = p.add_run(text)
    set_run_font(run, size=12)
    return p


def shade_header(table):
    for cell in table.rows[0].cells:
        shading = cell._tePr if False else cell._tc.get_or_add_tcPr()
        # python-docx: set shading via XML
        from docx.oxml import OxmlElement

        tcPr = cell._tc.get_or_add_tcPr()
        shd = OxmlElement("w:shd")
        shd.set(qn("w:fill"), "1B3A4B")
        shd.set(qn("w:val"), "clear")
        tcPr.append(shd)
        for p in cell.paragraphs:
            for run in p.runs:
                run.font.color.rgb = RGBColor(255, 255, 255)
                run.bold = True


def fill_table(rows):
    table = doc.add_table(rows=len(rows), cols=len(rows[0]))
    table.style = "Table Grid"
    table.alignment = WD_TABLE_ALIGNMENT.CENTER
    for i, row in enumerate(rows):
        for j, val in enumerate(row):
            cell = table.cell(i, j)
            cell.text = ""
            p = cell.paragraphs[0]
            p.alignment = WD_ALIGN_PARAGRAPH.CENTER if i == 0 or j > 0 else WD_ALIGN_PARAGRAPH.LEFT
            run = p.add_run(str(val))
            set_run_font(run, size=10, bold=(i == 0))
    shade_header(table)
    doc.add_paragraph()
    return table


# =============================================================================
# TRANG BÌA / MỞ ĐẦU
# =============================================================================
add_p("ĐẠI HỌC FPT — FSB TP.HCM", center=True, bold=True, size=13, space_after=2)
add_p("Chương trình Thạc sĩ Kỹ thuật Phần mềm", center=True, italic=True, size=12, space_after=16)
add_p(
    "BÀI TẬP CÁ NHÂN",
    center=True,
    bold=True,
    size=18,
    space_after=4,
)
add_p(
    "Phân khúc khách hàng, luật kết hợp dịch vụ\nvà đầu tư hạ tầng Business Intelligence",
    center=True,
    bold=True,
    size=14,
    space_after=10,
)
add_p("Môn học: AIN503 — Trí tuệ nhân tạo trong ra quyết định", center=True, size=12, space_after=2)
add_p("Giảng viên: TS. Đoàn Xuân Huy Minh", center=True, size=12, space_after=2)
add_p("Sinh viên: Lê Hoàng Anh", center=True, size=12, space_after=2)
add_p("Ngày nộp: 13/09/2026", center=True, size=12, space_after=18)

add_heading_vn("Tóm tắt", 1)
add_body(
    "Bài tập vận dụng ba kỹ thuật buổi 2 — tiền xử lý, K-Means và Apriori — trên dữ liệu "
    "mô phỏng FPT Telecom. Kết quả cho thấy 8 chi nhánh tách thành 3 cụm vận hành rõ rệt. "
    "Nghệ An và Đắk Lắk thuộc nhóm cần đầu tư gấp; Hà Nội, TP.HCM và Bình Dương là nhóm "
    "chuẩn mực. Luật kết hợp xác nhận Internet Cáp Quang và Truyền Hình FPT Play thường "
    "đăng ký cùng nhau (support 55%, confidence tối đa 91,7%, lift 1,31). Báo cáo đề xuất "
    "chia ngân sách 12 tỷ đồng theo mức độ cấp thiết và triển khai gói combo Foxie Connect "
    "theo lộ trình 12 tháng, đồng thời nêu rõ giới hạn của mẫu nhỏ và K cố định."
)

add_heading_vn("1. Bối cảnh và mục tiêu", 1)
add_body(
    "FPT Telecom dự kiến đầu tư 12 tỷ đồng để nâng cấp hạ tầng Business Intelligence cho "
    "8 chi nhánh tỉnh, đồng thời muốn (1) phân nhóm chi nhánh theo mức độ cần đầu tư và "
    "(2) tìm cặp dịch vụ khách hàng thường đăng ký cùng nhau để tổng đài gợi ý combo. "
    "Ngưỡng vận hành chuẩn của tập đoàn gồm: độ trễ báo cáo dưới 3 giờ, tỷ lệ dữ liệu lỗi "
    "dưới 1,5%, điểm hài lòng người lao động trên 7,0, KPI trên 80% và uptime trên 98%."
)

# =============================================================================
# PHẦN A
# =============================================================================
add_heading_vn("2. Phần A — Phân tích vấn đề (trước khi dùng AI)", 1)

add_heading_vn("Câu A1. Chi nhánh vi phạm từ 3 ngưỡng trở lên", 2)
add_body(
    "Đối chiếu trực tiếp 5 ngưỡng tiêu chuẩn với bảng hiệu suất tháng 5/2025, năm chi nhánh "
    "đang vi phạm đồng thời cả năm ngưỡng. Bình Dương chỉ trễ hạn mức ở độ trễ báo cáo "
    "(3,5 giờ) và KPI (79%), tức 2 ngưỡng. Hà Nội và TP.HCM không vi phạm ngưỡng nào."
)

fill_table(
    [
        ["Chi nhánh", "Số ngưỡng vi phạm", "Các ngưỡng bị vi phạm"],
        [
            "Đà Nẵng",
            "5/5",
            "Độ trễ 4,2h; lỗi 2,3%; hài lòng 6,1; KPI 72%; uptime 97,2%",
        ],
        [
            "Hải Phòng",
            "5/5",
            "Độ trễ 5,8h; lỗi 3,1%; hài lòng 5,4; KPI 68%; uptime 96,1%",
        ],
        [
            "Cần Thơ",
            "5/5",
            "Độ trễ 7,3h; lỗi 4,2%; hài lòng 4,8; KPI 61%; uptime 94,8%",
        ],
        [
            "Nghệ An",
            "5/5",
            "Độ trễ 9,1h; lỗi 5,7%; hài lòng 4,2; KPI 55%; uptime 93,2%",
        ],
        [
            "Đắk Lắk",
            "5/5",
            "Độ trễ 11,4h; lỗi 7,2%; hài lòng 3,5; KPI 48%; uptime 91,4%",
        ],
        [
            "Bình Dương",
            "2/5",
            "Độ trễ 3,5h; KPI 79% (chưa đủ 3 ngưỡng)",
        ],
    ]
)
add_body(
    "Như vậy nhóm “cần để ý ngay” theo trực giác là Đà Nẵng, Hải Phòng, Cần Thơ, Nghệ An "
    "và Đắk Lắk. Mức độ nghiêm trọng tăng dần từ Đà Nẵng đến Đắk Lắk, gợi ý rằng không "
    "nên chia đều ngân sách cho cả 8 chi nhánh."
)

add_heading_vn("Câu A2. Vì sao độ trễ báo cáo và tỷ lệ dữ liệu lỗi thường đi cùng nhau", 2)
add_body(
    "Hai chỉ số này thường cùng xấu vì chúng dùng chung một đường ống dữ liệu. Khi nguồn "
    "tác nghiệp bẩn hoặc thiếu khóa đối soát, job ETL phải dừng, chạy lại hoặc bỏ qua bản "
    "ghi — báo cáo vì thế ra muộn. Ngược lại, khi deadline báo cáo bị siết, đội vận hành "
    "dễ tắt bước kiểm tra chất lượng để “ra số cho kịp”, khiến tỷ lệ lỗi tăng."
)
add_body(
    "Từ góc độ kiến trúc BI, đây là dấu hiệu thiếu lớp staging/data quality, thiếu data "
    "contract giữa hệ thống nguồn và kho, và thiếu giám sát pipeline (freshness, schema "
    "drift, late arriving data). Chi nhánh càng xa trung tâm thường dùng hạ tầng cũ hơn, "
    "nên cả độ trễ lẫn tỷ lệ lỗi cùng leo thang — đúng như thứ tự Đà Nẵng → Hải Phòng → "
    "Cần Thơ → Nghệ An → Đắk Lắk trên bảng dữ liệu."
)

add_heading_vn("Câu A3. Dự đoán cặp dịch vụ mua cùng nhau nhiều nhất", 2)
add_body(
    "Hai dịch vụ có khả năng được đăng ký cùng nhau nhiều nhất là Internet Cáp Quang và "
    "Truyền Hình FPT Play. Lý do trực giác: FPT Play là dịch vụ OTT, trải nghiệm xem phụ "
    "thuộc băng thông ổn định, nên nhân viên bán hàng và khách hàng đều có thói quen gắn "
    "kèm Internet. Camera An Ninh thường phát sinh từ nhu cầu an ninh riêng, không bắt "
    "buộc đi cùng truyền hình."
)
add_body(
    "Ở Phần B1.3, dự đoán này sẽ được kiểm chứng bằng ba chỉ số của luật kết hợp: support "
    "(tần suất đồng xuất hiện), confidence (xác suất có dịch vụ B khi đã có A) và lift "
    "(mức đồng xuất hiện vượt quá ngẫu nhiên). Luật được xem là có ý nghĩa kinh doanh khi "
    "lift > 1 và confidence đủ cao để tổng đài dám gợi ý chéo."
)

# =============================================================================
# PHẦN B1
# =============================================================================
add_heading_vn("3. Phần B1 — Kết quả code Python", 1)
add_body(
    "Code đầy đủ nằm trong file btcn1_phan_b1.ipynb (và bản script btcn1_phan_b1.py). "
    "Dưới đây là kết quả đã chạy."
)

add_heading_vn("B1.1. Tiền xử lý", 2)
add_body(
    "Kiểm tra missing: cả 8 cột đều bằng 0 — dữ liệu đã sạch, bước này là kiểm tra bắt "
    "buộc trước khi phân cụm chứ không phải vì thấy lỗi mới xử lý. Cột muc_do_rui_ro = "
    "do_tre_gio × ty_le_loi xếp hạng đúng như đề bài kỳ vọng: Đắk Lắk (82,08) và Nghệ An "
    "(51,87) cao nhất, tiếp đến Cần Thơ (30,66); Hà Nội và TP.HCM thấp nhất."
)
doc.add_picture(str(OUT / "b1_xep_hang_rui_ro.png"), width=Cm(15.2))
last = doc.paragraphs[-1]
last.alignment = WD_ALIGN_PARAGRAPH.CENTER
add_p("Hình 1. Xếp hạng mức độ rủi ro dữ liệu–báo cáo", center=True, italic=True, size=11)

add_heading_vn("B1.2. K-Means (K = 3, random_state = 42)", 2)
add_body(
    "Bảy cột số được chuẩn hoá bằng StandardScaler rồi đưa vào K-Means. Kết quả gán cụm:"
)

fill_table(
    [
        ["Chi nhánh", "Cụm", "Nhận xét nhanh"],
        ["Hà Nội", "2", "Đạt cả 5 ngưỡng"],
        ["TP.HCM", "2", "Đạt cả 5 ngưỡng"],
        ["Bình Dương", "2", "Vi phạm 2 ngưỡng, gần nhóm tốt"],
        ["Đà Nẵng", "0", "Vi phạm 5 ngưỡng, mức trung"],
        ["Hải Phòng", "0", "Vi phạm 5 ngưỡng, mức trung"],
        ["Cần Thơ", "0", "Vi phạm 5 ngưỡng, sát nhóm yếu"],
        ["Nghệ An", "1", "Rủi ro rất cao"],
        ["Đắk Lắk", "1", "Rủi ro cao nhất"],
    ]
)

fill_table(
    [
        ["Chỉ số (trung bình)", "Cụm 2", "Cụm 0", "Cụm 1"],
        ["Độ trễ báo cáo (giờ)", "2,47", "5,77", "10,25"],
        ["Tỷ lệ dữ liệu lỗi (%)", "0,93", "3,20", "6,45"],
        ["Yêu cầu hỗ trợ / tháng", "13,0", "36,7", "73,0"],
        ["Hài lòng NLĐ", "8,07", "5,43", "3,85"],
        ["KPI đạt (%)", "85,67", "67,00", "51,50"],
        ["Chi phí BI (triệu)", "47,0", "38,3", "31,0"],
        ["Uptime (%)", "98,93", "96,03", "92,30"],
    ]
)

add_heading_vn("B1.3. Apriori (minsup = 20%, minconf = 50%)", 2)
add_body(
    "Ma trận giỏ hàng có 20 dòng (một giao dịch) và 3 cột dịch vụ, đúng kỳ vọng đề bài. "
    "Internet Cáp Quang xuất hiện 70% giao dịch, FPT Play 60%, Camera An Ninh 45%. "
    "Cặp Internet + FPT Play có support 55% — cao nhất trong các tập 2-item. "
    "Camera không tạo tập phổ biến 2-item đạt ngưỡng 20% khi ghép với từng dịch vụ còn lại "
    "theo cách đủ mạnh để sinh luật cạnh tranh."
)

fill_table(
    [
        ["Tiền đề → Hệ quả", "Support", "Confidence", "Lift"],
        ["FPT Play → Internet Cáp Quang", "0,55", "0,917", "1,310"],
        ["Internet Cáp Quang → FPT Play", "0,55", "0,786", "1,310"],
    ]
)
add_body(
    "Dự đoán ở câu A3 là đúng: Internet và FPT Play đồng xuất hiện nhiều nhất, với "
    "confidence và lift cao hơn mọi cặp còn lại."
)

# =============================================================================
# PHẦN B2
# =============================================================================
add_heading_vn("4. Phần B2 — Phân tích hỗ trợ bằng AI", 1)
add_p(
    "Artifact AI: các phân tích B2.1–B2.4 dưới đây được sinh bởi Cursor (mô hình Grok) "
    "trên kết quả B1. Prompt đại diện ghi ở mục C4.",
    italic=True,
    size=11,
)

add_heading_vn("B2.1. Diễn giải cụm và xếp hạng ưu tiên đầu tư", 2)
add_body(
    "Với vai trò tư vấn BI cho tập đoàn viễn thông Đông Nam Á, ba cụm được đặt tên và "
    "xếp hạng như sau."
)

fill_table(
    [
        ["Cụm", "Tên gợi nhớ", "Chi nhánh", "Ưu tiên đầu tư"],
        ["1", "Chi nhánh khủng hoảng — đầu tư gấp", "Nghệ An, Đắk Lắk", "1 — cao nhất"],
        ["0", "Chi nhánh cảnh báo — cần can thiệp", "Đà Nẵng, Hải Phòng, Cần Thơ", "2 — trung bình"],
        ["2", "Chi nhánh chuẩn mực vận hành", "Hà Nội, TP.HCM, Bình Dương", "3 — duy trì"],
    ]
)

add_body(
    "Cụm 1 có độ trễ hơn 10 giờ, lỗi trên 6%, gần 73 ticket/tháng, hài lòng dưới 4 và "
    "uptime 92,3%. Đây là nơi báo cáo điều hành gần như mất giá trị tác nghiệp. Cụm 0 "
    "đã vỡ cả 5 ngưỡng nhưng vẫn còn “cứu được” nếu chuẩn hóa kho dữ liệu và giám sát "
    "pipeline. Cụm 2 đang vận hành đúng chuẩn; đầu tư thêm chủ yếu để nhân rộng mô hình, "
    "không phải chữa cháy."
)
add_body(
    "Đề xuất phân bổ 12 tỷ đồng: 6,0 tỷ (50%) cho cụm 1 — làm lại ETL, lớp chất lượng "
    "dữ liệu, giám sát uptime và đào tạo tại chỗ; 4,2 tỷ (35%) cho cụm 0 — nâng cấp kho, "
    "chuẩn hóa từ điển dữ liệu, giảm ticket; 1,8 tỷ (15%) cho cụm 2 — hardening, catalog "
    "dùng chung và trở thành hub hỗ trợ các chi nhánh yếu. Không chia đều 1,5 tỷ/chi nhánh "
    "vì chi phí cơ hội của Đắk Lắk khác hẳn Hà Nội. Trong cụm 1, Đắk Lắk nên nhận phần "
    "lớn hơn Nghệ An vì chỉ số rủi ro tổng hợp gần gấp 1,6 lần (82 so với 52)."
)

add_heading_vn("B2.2. Phân tích chi phí–hiệu quả", 2)
add_body(
    "Tỷ lệ Chi phí BI / KPI đạt đo số triệu đồng phải bỏ ra để “mua” mỗi điểm phần trăm "
    "KPI. Tỷ lệ càng cao, mỗi điểm KPI càng đắt."
)

cmp = df.sort_values("chi_phi_tren_kpi", ascending=False)
rows = [["Chi nhánh", "Cụm", "Chi phí BI", "KPI (%)", "Chi phí / KPI"]]
for _, r in cmp.iterrows():
    rows.append(
        [
            r["chi_nhanh"],
            f"{int(r['cum'])} — {ten_cum[int(r['cum'])]}",
            f"{int(r['chi_phi_bi'])}",
            f"{int(r['kpi_dat'])}",
            f"{r['chi_phi_tren_kpi']:.3f}",
        ]
    )
fill_table(rows)

doc.add_picture(str(OUT / "b2_2_scatter_chi_phi_kpi.png"), width=Cm(15.2))
last = doc.paragraphs[-1]
last.alignment = WD_ALIGN_PARAGRAPH.CENTER
add_p(
    "Hình 2. Scatter chi phí BI (X) và KPI đạt (Y), tô màu theo cụm K-Means",
    center=True,
    italic=True,
    size=11,
)

add_body(
    "Chi nhánh “đắt mà không hiệu quả” rõ nhất là Hải Phòng: chi 41 triệu/tháng — gần bằng "
    "nhóm chuẩn — nhưng KPI chỉ 68% (tỷ lệ 0,603). Đắk Lắk và Nghệ An cũng có tỷ lệ cao "
    "(0,604 và 0,600) dù chi phí tuyệt đối thấp: tiền ít nhưng “mua” được rất ít KPI, tức "
    "hiệu quả vốn kém. Ngược lại, Hà Nội là điểm “rẻ mà vẫn hiệu quả”: 45 triệu cho KPI 87% "
    "(tỷ lệ tốt nhất 0,517). Đà Nẵng cũng tương đối hiệu quả trong nhóm cảnh báo (38 triệu, "
    "KPI 72%, tỷ lệ 0,528) — đây là ứng viên nâng cấp có suất đầu tư hợp lý. TP.HCM chi "
    "nhiều nhất (52 triệu) nhưng KPI 91% nên đắt mà hiệu quả, không phải đối tượng cắt giảm."
)

add_heading_vn("B2.3. Đề xuất gói combo từ luật kết hợp", 2)
add_body(
    "Luật có lift cao nhất (1,31) là FPT Play → Internet Cáp Quang, confidence 91,7%. "
    "Ý nghĩa kinh doanh: khi khách đã có ý định lấy truyền hình, khả năng họ cũng cần "
    "Internet cao hơn nhiều so với tỷ lệ Internet chung trong mẫu (70%). Ngược lại, "
    "Internet → FPT Play có confidence 78,6% — vẫn đủ để tổng đài chủ động gắn Play khi "
    "khách gọi đăng ký Internet. Lift > 1 cho thấy đây không phải đồng xuất hiện tình cờ."
)
add_bullet(
    "Tên gói: Foxie Connect — Internet Cáp Quang + Truyền Hình FPT Play."
)
add_bullet(
    "Cách chào: nếu khách gọi đăng ký một trong hai dịch vụ, tổng đài viên đề xuất gói "
    "kép với giảm 15% sáu tháng đầu (hoặc 20% nếu cam kết 12 tháng). Camera An Ninh giữ "
    "là upsell tùy chọn, không gộp cứng vào combo vì support ghép cặp thấp hơn."
)
add_bullet(
    "Kịch bản tổng đài: “Anh/chị đang lấy Internet thì thêm FPT Play chỉ còn …/tháng "
    "trong 6 tháng đầu, xem phim không tốn data.”"
)
add_body(
    "Cảnh báo mẫu: 20 giao dịch là quá nhỏ để triển khai toàn quốc. Một vài đơn hàng thay "
    "đổi là support và lift đảo chiều. Để tự tin hơn ở cấp tỉnh cần tối thiểu khoảng "
    "1.000–2.000 giao dịch/khu vực; để ra quyết định toàn quốc nên có 20.000–50.000 giao "
    "dịch (vài tháng vận hành thật), cộng kiểm định ổn định theo thời gian và theo vùng. "
    "Trước mắt chỉ A/B test combo tại 1–2 chi nhánh cụm 2, nơi dữ liệu vận hành đã sạch."
)

add_heading_vn("B2.4. Kế hoạch triển khai 3 giai đoạn (12 tháng)", 2)

fill_table(
    [
        ["Giai đoạn", "Thời gian", "Chi nhánh", "Hạng mục nâng cấp"],
        [
            "1 — Cấp cứu",
            "Tháng 1–4",
            "Đắk Lắk, Nghệ An",
            "Làm lại ETL, DQ, giám sát uptime 24/7, dashboard vận hành tối thiểu, đào tạo tại chỗ",
        ],
        [
            "2 — Chuẩn hóa",
            "Tháng 5–8",
            "Cần Thơ, Hải Phòng, Đà Nẵng",
            "Nâng cấp kho, từ điển dữ liệu dùng chung, giảm ticket, A/B test Foxie Connect",
        ],
        [
            "3 — Nhân rộng",
            "Tháng 9–12",
            "Hà Nội, TP.HCM, Bình Dương + toàn mạng",
            "Biến cụm 2 thành hub chuẩn, catalog BI tập đoàn, rollout combo có kiểm soát",
        ],
    ]
)

add_p("Rủi ro lớn nhất và biện pháp giảm thiểu", bold=True, size=12)
add_bullet(
    "Rủi ro lớn nhất: dữ liệu lịch sử bẩn và kháng cự quy trình mới làm dự án trễ, "
    "gói combo bán sai đối tượng vì tin luật từ 20 dòng."
)
add_bullet(
    "Giảm thiểu 1: tuần 1–2 mỗi chi nhánh giai đoạn 1 phải có audit nguồn → staging → "
    "mart trước khi mua thêm phần cứng; không nâng cấp “mù”."
)
add_bullet(
    "Giảm thiểu 2: combo chỉ thí điểm ở cụm chuẩn, có nhóm đối chứng, dừng rollout nếu "
    "lift thực tế < 1,05 sau 8 tuần."
)

add_p("Ba chỉ số thành công sau 12 tháng", bold=True, size=12)
add_bullet(
    "Độ trễ báo cáo trung bình toàn mạng ≤ 3 giờ; ít nhất 6/8 chi nhánh đạt đủ 5 ngưỡng chuẩn."
)
add_bullet(
    "KPI đạt trung bình ≥ 80% và uptime trung bình ≥ 98% (kéo cụm 1 khỏi vùng 51–92%)."
)
add_bullet(
    "Tỷ lệ khách hàng đăng ký mới Internet đồng thời lấy Foxie Connect ≥ 30% "
    "(baseline mẫu ~55% nhưng mẫu nhỏ; mục tiêu thực tế 30% là mức hành động được)."
)

# =============================================================================
# PHẦN C
# =============================================================================
add_heading_vn("5. Phần C — Báo cáo quyết định", 1)

c1 = (
    "Phân tích cho thấy BI của FPT Telecom phân hóa theo địa bàn chứ không “lỗi đều tám "
    "chi nhánh”. Phần A: Đà Nẵng, Hải Phòng, Cần Thơ, Nghệ An và Đắk Lắk vi phạm cả năm "
    "ngưỡng; Đắk Lắk và Nghệ An là hai điểm nóng khi nhân độ trễ với tỷ lệ lỗi. B1 xác "
    "nhận dữ liệu không thiếu giá trị. K-Means tách ba cụm: chuẩn (Hà Nội, TP.HCM, Bình "
    "Dương), cảnh báo (Đà Nẵng, Hải Phòng, Cần Thơ) và khủng hoảng (Nghệ An, Đắk Lắk). "
    "Thuật toán khớp hướng trực giác A1 nhưng không sao y: Cần Thơ đủ năm ngưỡng vẫn "
    "đứng với Đà Nẵng–Hải Phòng vì bảy biến được chuẩn hóa. Apriori khớp A3 — Internet "
    "và FPT Play là cặp mạnh nhất (support 55%, confidence 91,7%/78,6%, lift 1,31). "
    "Camera chưa đủ để đóng cứng vào combo. B2 biến cụm thành thứ tự đầu tư và một gói "
    "bán chéo có điều kiện thí điểm, không phải chia đều 12 tỷ."
)
c2 = (
    "Ban lãnh đạo nên chốt ba quyết định kèm nhau. Một, không chia đều: 6 tỷ cho Nghệ An "
    "và Đắk Lắk để phục hồi ETL, chất lượng dữ liệu và uptime; 4,2 tỷ cho Đà Nẵng, Hải "
    "Phòng, Cần Thơ để chuẩn hóa; 1,8 tỷ cho Hà Nội, TP.HCM, Bình Dương để giữ làm mô "
    "hình chuẩn. Hai, trong cụm khủng hoảng nghiêng vốn về Đắk Lắk vì rủi ro tổng hợp "
    "cao hơn. Ba, tổng đài chào Foxie Connect (Internet + FPT Play, giảm 15–20% sáu "
    "tháng đầu); Camera để upsell riêng. Tôi đồng ý hướng ưu tiên cụm yếu của AI, nhưng "
    "không bung combo toàn quốc ngay — luật từ 20 giao dịch chỉ đủ thí điểm ở cụm chuẩn."
)
c3 = (
    "Giới hạn lớn nhất là quy mô và thiết kế thí nghiệm. K cố định bằng 3, không Elbow "
    "hay Silhouette, nên số cụm có thể không tối ưu: K=2 dễ nuốt nhóm cảnh báo vào một "
    "cực và làm sai thứ tự giải ngân. Tám quan sát / bảy biến là mẫu mỏng; cụm hai điểm "
    "Nghệ An–Đắk Lắk dễ bị outlier chi phối. Apriori trên 20 giao dịch, ba mặt hàng rất "
    "dễ overfitting; lift 1,31 có thể mất ý nghĩa trên dữ liệu thật. Nếu có doanh thu, "
    "biên lợi nhuận, chi phí sự cố, số thuê bao, nhân sự BI và vài chục nghìn giao dịch "
    "theo vùng–tháng, tỷ lệ 50/35/15 lẫn cấu phần combo đều có thể đổi."
)
c4 = (
    "Công cụ AI đã sử dụng: Cursor (Grok 4.6) | mục đích: diễn giải cụm, phân tích "
    "chi phí–hiệu quả, thiết kế combo và lộ trình 3 giai đoạn (B2.1–B2.4), đồng thời "
    "hỗ trợ trình bày báo cáo | prompt đại diện: “Bạn là chuyên gia tư vấn Business "
    "Intelligence cho các tập đoàn viễn thông tại Đông Nam Á. Hãy đặt tên gợi nhớ cho "
    "từng cụm, xếp hạng ưu tiên đầu tư giữa 3 cụm, và đề xuất phân bổ ngân sách 12 tỷ "
    "đồng theo tỷ lệ hợp lý, có giải thích. Trình bày bằng tiếng Việt.”"
)

for title, text in [
    ("C1. Phân tích cho thấy điều gì?", c1),
    ("C2. Quyết định đề xuất cho ban lãnh đạo", c2),
    ("C3. Giới hạn của phân tích", c3),
    ("C4. Công cụ AI đã sử dụng", c4),
]:
    add_heading_vn(title, 2)
    add_body(text)

words = " ".join([c1, c2, c3, c4]).split()
add_p(f"(Phần C: khoảng {len(words)} từ.)", italic=True, size=10)

add_heading_vn("6. Kết luận", 1)
add_body(
    "Ba kỹ thuật buổi 2 đủ để trả lời hai câu hỏi quản trị: tiền nên chảy về đâu, và "
    "tổng đài nên bán kèm gì. Câu trả lời ngắn gọn: cứu Đắk Lắk và Nghệ An trước, chuẩn "
    "hóa nhóm miền Trung–Tây Nam Bộ, giữ nhóm Hà Nội–TP.HCM–Bình Dương làm chuẩn; đồng "
    "thời thí điểm Foxie Connect trước khi nhân rộng. Mọi con số trong báo cáo này là "
    "cơ sở ra quyết định có điều kiện, không phải chân lý vận hành toàn quốc."
)

add_heading_vn("Phụ lục. Ghi chú dữ liệu và nộp bài", 1)
add_bullet(
    "Nộp kèm: báo cáo này (.docx), notebook btcn1_phan_b1.ipynb hoặc script "
    "btcn1_phan_b1.py, thư mục outputs/ (biểu đồ và bảng kết quả)."
)
add_bullet(
    "File fpt_chi_nhanh.csv được dựng đúng bảng đề. File fpt_dich_vu_giao_dich.csv "
    "được dựng 20 giao dịch / 3 dịch vụ theo mô tả đề bài vì file Classroom trên Drive "
    "yêu cầu đăng nhập. Nếu giảng viên phát file CSV gốc, hãy thay vào thư mục data/ "
    "và chạy lại notebook."
)

out_docx = BASE / "BTCN1_AIN503_LeHoangAnh_BaoCao.docx"
doc.save(out_docx)
print(f"Đã ghi {out_docx}")
print(f"Số từ Phần C: {len(words)}")
