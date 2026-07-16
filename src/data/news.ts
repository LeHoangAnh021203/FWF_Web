export type NewsArticle = {
  slug: string;
  category: string;
  date: string;
  title: string;
  image: string;
  sourceUrl: string;
  intro: string;
  sections: Array<{
    heading?: string;
    paragraphs?: string[];
    items?: string[];
    images?: string[];
  }>;
};

export const newsArticles: NewsArticle[] = [
  {
    slug: "gift-voucher-da-sach-sau-rang-ro-ngay-tu-lan-dau",
    category: "Tin tức",
    date: "21/10/2025",
    title: "GIFT VOUCHER - DA SẠCH SÂU, RẠNG RỠ NGAY TỪ LẦN ĐẦU!",
    sourceUrl:
      "https://facewashfox.com/gift-voucher-da-sach-sau-rang-ro-ngay-tu-lan-dau/",
    image: "/voucher/voucher 1.png",
    intro:
      "Face Wash Fox mang đến chương trình gift voucher với nhiều ưu đãi dành cho khách hàng muốn trải nghiệm dịch vụ rửa mặt công nghệ và chăm sóc da tại cửa hàng.",
    sections: [
      {
        heading: "Mua 1 tặng 1",
        paragraphs: [
          "Khi sử dụng dịch vụ từ 399.000 đồng, khách hàng nhận thêm một buổi trải nghiệm dịch vụ rửa mặt công nghệ Deep Clean tại Face Wash Fox.",
        ],
      },
      {
        heading: "Deal chồng deal",
        items: [
          "Giảm 5% combo hoặc dịch vụ chăm da trên giá niêm yết khi đặt lịch và sử dụng dịch vụ tại cửa hàng.",
          "Giảm 2% khi mua thẻ Foxie.",
          "Nhận set mini sample Elravie Pro khi check-in tại cửa hàng và tag Face Wash Fox trên Facebook.",
          "Giảm thêm 10% trên giá đã giảm khi mua thêm sản phẩm Elravie tại cửa hàng.",
        ],
      },
      {
        heading: "Điều kiện áp dụng",
        items: [
          "Chương trình áp dụng đến hết ngày 31/12/2025.",
          "Voucher không quy đổi thành tiền mặt và có thể bị từ chối nếu rách, hư hỏng hoặc không rõ thông tin.",
          "Không áp dụng đồng thời với một số chương trình khuyến mãi khác và dịch vụ Aqua Peel.",
          "Khuyến khích đặt lịch trước qua hotline 08898 66666.",
          "Không áp dụng vào dịp lễ, Tết và cuối tuần.",
        ],
      },
      {
        heading: "Cửa hàng áp dụng",
        items: [
          "Thi Sách - Số 26 Thi Sách, P. Bến Nghé, Quận 1",
          "Nguyễn Du - 149 - 151 Nguyễn Du, P. Bến Thành, Quận 1",
          "Hạ Long, Vũng Tàu - Số 136 Hạ Long, Phường 2, TP Vũng Tàu",
          "Riviera Point - Toà 3, Đường số 2, Nguyễn Văn Tưởng, P. An Phú, Quận 7",
          "Xuân Thuỷ - 43A - 43B Xuân Thủy, P. Thảo Điền, Thủ Đức",
          "Imperia Sky Garden - 423 Minh Khai, Phường Vĩnh Tuy, Quận Hai Bà Trưng, TP Hà Nội",
          "Yên Hoa - Số 46 Yên Hoa, Tây Hồ, Hà Nội",
          "Vinhomes Green Bay - Số 7 Đại Lộ Thăng Long, Phường Đại Mỗ, TP Hà Nội",
          "Saigon Pearl - 92 Nguyễn Hữu Cảnh, Saigon Pearl, Bình Thạnh, TP Hồ Chí Minh",
        ],
      },
    ],
  },
  {
    slug: "face-wash-fox-da-dep-bat-dau-tu-viec-rua-mat",
    category: "Bài viết mới",
    date: "11/12/2023",
    title: "Face Wash Fox - Da đẹp bắt đầu từ việc rửa mặt",
    sourceUrl: "https://facewashfox.com/face-wash-fox-da-dep-bat-dau-tu-viec-rua-mat/",
    image: "/news/news2.JPG",
    intro:
      "Rửa mặt là bước nền tảng trong chăm sóc da. Face Wash Fox phát triển dịch vụ rửa mặt công nghệ để giúp khách hàng Việt Nam làm sạch và chăm sóc da dễ dàng hơn.",
    sections: [
      {
        paragraphs: [
          "Nếu làn da không được làm sạch đúng cách, các bước skincare phía sau khó phát huy hiệu quả. Vì vậy Face Wash Fox xem rửa mặt là một bước quan trọng trong hành trình xây dựng làn da khỏe và đẹp.",
          "Với niềm tin làn da đẹp không phân biệt tuổi tác hay giới tính, Face Wash Fox hướng đến nhiều nhóm khách hàng khác nhau: người trẻ, người đi làm, học sinh sinh viên và cả khách hàng trung niên.",
        ],
        images: [
          "/news/news2.JPG",
          "/PR/pr1/pr1_1.PNG",
        ],
      },
      {
        heading: "Trải nghiệm tại cửa hàng",
        paragraphs: [
          "Khách hàng không chỉ đến để rửa mặt mà còn được thư giãn trong không gian thân thiện, thoải mái và gần gũi.",
          "Dịch vụ được xây dựng với cam kết về chất lượng, quy trình rõ ràng và mức giá minh bạch để khách hàng dễ tiếp cận hơn.",
        ],
        images: [
          "/PR/pr2/pr2_1.JPG",
          "/PR/pr2/pr2_2.JPG",
        ],
      },
      {
        heading: "Lựa chọn cho chăm sóc da hiện đại",
        paragraphs: [
          "Nếu bạn đang tìm một địa điểm rửa mặt công nghệ hiện đại trên toàn quốc, Face Wash Fox là một lựa chọn phù hợp để bắt đầu chăm sóc da từ bước làm sạch.",
        ],
        images: [
          "/PR/pr3/pr3_1.jpg",
        ],
      },
    ],
  },
  {
    slug: "kham-pha-chuoi-rua-mat-cong-nghe-face-wash-fox-facial-washing-bar-day-moi-me-tren-toan-quoc",
    category: "Bài viết mới",
    date: "11/12/2023",
    title:
      "Khám phá chuỗi rửa mặt công nghệ Face Wash Fox - Facial Washing Bar đầy mới mẻ trên toàn quốc",
    sourceUrl:
      "https://facewashfox.com/kham-pha-chuoi-rua-mat-cong-nghe-face-wash-fox-facial-washing-bar-day-moi-me-tren-toan-quoc/",
    image: "/news/news3.JPG",
    intro:
      "Face Wash Fox - Facial Cleansing Bar là chuỗi cửa hàng rửa mặt công nghệ cao, tập trung mang đến trải nghiệm chăm sóc da mặt chuyên nghiệp bằng máy móc hiện đại.",
    sections: [
      {
        paragraphs: [
          "Tại Face Wash Fox, khách hàng được trải nghiệm dịch vụ rửa mặt bằng công nghệ, giúp làn da được làm sạch ngay từ bước đầu tiên.",
          "Quy trình Hydra Facial kết hợp thiết bị hiện đại và sản phẩm dược mỹ phẩm Hàn Quốc, hỗ trợ làm sạch bã nhờn và giúp da sẵn sàng hấp thụ các bước chăm sóc tiếp theo.",
        ],
        images: [
          "/news/news3.JPG",
          "/PR/pr1/pr1_3.jpg",
        ],
      },
      {
        heading: "Không gian và đội ngũ",
        paragraphs: [
          "Đội ngũ kỹ thuật viên được định hướng phục vụ chuyên nghiệp, vui vẻ và tận tâm với khách hàng.",
          "Không gian mở của Face Wash Fox được thiết kế thân thiện, thoải mái và tạo cảm giác thư giãn trong suốt quá trình trải nghiệm.",
        ],
        images: [
          "/PR/pr3/pr3_2.jpg",
          "/PR/pr3/pr3_3.jpg",
        ],
      },
      {
        heading: "Mục tiêu dịch vụ",
        paragraphs: [
          "Face Wash Fox hướng đến việc trở thành cửa hàng rửa mặt công nghệ dễ tiếp cận với chất lượng dịch vụ ổn định, quy trình tối ưu và mức giá hợp lý.",
          "Các gói dịch vụ linh hoạt cùng ưu đãi định kỳ giúp khách hàng có thêm lựa chọn khi duy trì thói quen chăm sóc da thường xuyên.",
        ],
        images: [
          "/PR/pr2/pr2_3.jpg",
        ],
      },
    ],
  },
];

export const getNewsArticle = (slug: string) =>
  newsArticles.find((article) => article.slug === slug);
