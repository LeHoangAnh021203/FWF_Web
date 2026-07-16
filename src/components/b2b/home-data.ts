export type CaseStudy = {
  eyebrow: string;
  eyebrowClassName: string;
  iconClassName: string;
  dialogBorderClassName: string;
  title: string;
  description: string;
  image: string;
  previewImages?: string[];
  tags: string[];
  detailPoints: string[];
  voucherImages?: string[];
};

export type FoxNewsItem = {
  slug: string;
  date: string;
  title: string;
  image: string;
  excerpt?: string;
  href?: string;
  article?: {
    intro?: string;
    lead?: string;
    paragraphs: ArticleBlock[];
    bullets?: string[];
    quote?: string;
    cta?: string;
  };
};

export type ArticleBlock =
  | {
      type: "paragraph";
      content: string;
    }
  | {
      type: "image";
      src: string;
      alt: string;
    };

export const caseStudies: CaseStudy[] = [
  {
    eyebrow: "FOX CASH",
    eyebrowClassName: "border-lime-300 text-lime-500",
    iconClassName: "text-lime-500",
    dialogBorderClassName: "border-lime-300",
    title: "Gói linh hoạt, cá nhân hóa tối đa",
    description:
      "Cash Voucher là giải pháp quà tặng quy đổi như tiền mặt, linh hoạt và đơn giản nhất dành cho doanh nghiệp muốn tri ân nhân viên hay đối tác.",
    image: "/Fox Swat/fx3.webp",
    tags: [
      "Cá nhân hóa 100%",
      "Không giới hạn loại dịch vụ",
      "Dễ dàng sử dụng",
    ],
    detailPoints: [
      "Mệnh giá đa dạng: 50.000 VNĐ – 100.000 VNĐ – 200.000 VNĐ – 500.000 VNĐ (có thể tùy chỉnh theo nhu cầu doanh nghiệp).",
      "Cách sử dụng: Nhân viên nhận voucher như một khoản tiền mặt, mang đến bất kỳ cửa hàng Face Wash Fox nào trên toàn quốc để trừ trực tiếp vào chi phí dịch vụ chăm sóc da",
    ],
    voucherImages: [
      "/voucher/voucher 1.png",
      "/voucher/voucher 2.png",
      "/voucher/voucher 3.png",
      "/voucher/voucher 4.png",
      "/voucher/voucher 5.png",
      "/voucher/voucher 6.png",
    ],
  },
  {
    eyebrow: "FOX GIFT CARD",
    eyebrowClassName: "border-sky-300 text-sky-500",
    iconClassName: "text-sky-500",
    dialogBorderClassName: "border-sky-300",
    title: "Gói liệu trình chuyên gia",
    description:
      "Card Voucher dịch vụ là quà tặng với mệnh giá cố định, tương ứng trực tiếp một liệu trình trọn gói tại Face Wash Fox, mang đến trải nghiệm chuyên sâu ngay lập tức.",
    image: "/voucher/voucher 7.png",
    previewImages: [
      "/voucher/voucher 7.png",
      "/voucher/voucher 8.jpg",
      "/voucher/voucher 9.jpg",
    ],
    tags: [
      "Trải nghiệm chăm sóc da chuẩn chuyên gia",
      "Tạo cảm giác được chăm sóc thực sự",
      "Dễ dàng sử dụng",
    ],
    detailPoints: [
      "Doanh nghiệp chọn sẵn các liệu trình khuyên dùng từ nhà Cáo để làm quà tặng chăm sóc cho nhân viên",
      "Nhân viên mang card đến bất kỳ cửa hàng nào trong hệ thống để sử dụng đầy đủ quy trình: soi da, tư vấn và thực hiện liệu trình chuyên nghiệp.",
    ],
    voucherImages: [
      "/voucher/voucher 7.png",
      "/voucher/voucher 8.jpg",
      "/voucher/voucher 9.jpg",
    ],
  },
  {
    eyebrow: "FOX SWAT",
    eyebrowClassName: "border-orange-300 text-orange-500",
    iconClassName: "text-orange-500",
    dialogBorderClassName: "border-orange-300",
    title: "Gói chăm sóc ngay tại văn phòng",
    description:
      "Fox SWAT mang toàn bộ spa công nghệ cao của Face Wash Fox đến ngay tại doanh nghiệp, setup booth chuyên nghiệp để nhân viên thư giãn và chăm sóc da mà không cần di chuyển",
    image: "/Fox Swat/fx3-office.webp",
    tags: [
      "Tạo điểm nhấn cho văn hóa doanh nghiệp",
      "Trải nghiệm thư giãn ngay trong giờ làm việc",
    ],
    detailPoints: [
      "Đội ngũ chuyên gia cùng thiết bị hiện đại (máy soi da AI, các đầu máy rửa mặt) đến tận văn phòng.",
      "Phù hợp cho Brand Day, sự kiện nội bộ, team building",
      "Linh hoạt chăm sóc ngắn hạn, biến một ngày làm việc thành ngày trải nghiệm đáng nhớ và gắn kết đội nhóm",
    ],
  },
];

export const faqItems = [
  {
    question: "Doanh nghiệp có thể triển khai dịch vụ cho bao nhiêu nhân viên?",
    answer:
      "Face Wash Fox có thể linh hoạt triển khai từ nhóm nhỏ khoảng 10-50 nhân viên đến các chương trình lớn cho 300-500 nhân viên trong cùng một ngày, tùy theo gói dịch vụ và không gian tại doanh nghiệp.",
  },
  {
    question:
      "Dịch vụ chăm sóc da tại văn phòng có ảnh hưởng đến giờ làm việc không?",
    answer:
      "Các liệu trình được thiết kế gọn và tối ưu thời gian. Mỗi lượt trải nghiệm thường chỉ khoảng 10-15 phút, giúp nhân viên thư giãn và chăm sóc da mà vẫn không ảnh hưởng đến tiến độ công việc.",
  },
  {
    question:
      "Doanh nghiệp cần chuẩn bị gì khi triển khai Fox SWAT tại văn phòng?",
    answer:
      "Doanh nghiệp chỉ cần bố trí một khu vực phù hợp để setup booth trải nghiệm. Face Wash Fox sẽ chuẩn bị thiết bị, sản phẩm, quy trình vận hành và đội ngũ chuyên viên đi kèm.",
  },
  {
    question:
      "Voucher hoặc gift card có thể sử dụng linh hoạt theo thời gian của nhân viên không?",
    answer:
      "Có. Nhân viên có thể chủ động sắp xếp thời gian sử dụng voucher hoặc gift card tại hệ thống Face Wash Fox, giúp doanh nghiệp dễ triển khai mà không cần gom lịch cố định cho toàn bộ đội ngũ.",
  },
  {
    question: "Doanh nghiệp có thể tùy chỉnh gói dịch vụ theo ngân sách không?",
    answer:
      "Có. Face Wash Fox có thể thiết kế gói chăm sóc phù hợp với ngân sách, mục tiêu và quy mô từng doanh nghiệp, từ voucher linh hoạt, gift card cố định đến trải nghiệm chăm sóc ngay tại văn phòng.",
  },
];

export const foxNewsItems: FoxNewsItem[] = [
  {
    slug: "nam-2026-ung-vien-hoi-gi-truoc-khi-nhan-offer",
    date: "7 April 2026",
    title: "Năm 2026, ứng viên hỏi gì trước khi nhận offer?",
    image: "/Fox Swat/fx1.JPG",
    excerpt:
      "Câu hỏi tuyển dụng giờ không chỉ xoay quanh lương và title, mà là doanh nghiệp làm gì để nhân viên muốn gắn bó lâu dài.",
    article: {
      intro: "Không còn chỉ là lương. Không còn chỉ là title.",
      lead: 'Họ hỏi: "Công ty anh/chị làm gì để nhân viên muốn đi làm mỗi sáng?"',
      paragraphs: [
        {
          type: "paragraph",
          content:
            "Câu hỏi đó đang thay đổi cách doanh nghiệp cạnh tranh nhân tài, không phải bằng con số trên bảng lương, mà bằng trải nghiệm khiến họ cảm thấy được quan tâm thật sự.",
        },
        {
          type: "paragraph",
          content: "Lương giữ người ở lại tạm thời. Trải nghiệm khiến họ muốn ở lại lâu dài.",
        },
        {
          type: "paragraph",
          content:
            "Gen Z và Millennials là lực lượng chính năm 2026. Họ không rời đi vì thiếu lương tốt, mà thường vì cảm giác thiếu quan tâm, môi trường thiếu năng lượng và công ty không có gì để nhớ ngoài deadline.",
        },
        {
          type: "paragraph",
          content:
            "Xu hướng đang dịch chuyển: thay vì chờ Year End mới tổ chức event lớn, nhiều doanh nghiệp bắt đầu tạo ra những khoảnh khắc nhỏ, thường xuyên và cá nhân hơn để nhân viên được sạc pin giữa ngày làm việc.",
        },
        {
          type: "image",
          src: "/PR/pr1/pr2_2.jpg",
          alt: "Trải nghiệm chăm sóc da Face Wash Fox tại văn phòng",
        },
        {
          type: "paragraph",
          content:
            "Một hướng đang được chú ý là mang trải nghiệm chăm sóc bản thân trực tiếp vào văn phòng. Không cần di chuyển, không cần HR lo khâu tổ chức phức tạp, nhưng nhân viên vẫn cảm nhận rõ sự khác biệt.",
        },
        {
          type: "paragraph",
          content:
            "Face Wash Fox phát triển mô hình FOX SWAT dành riêng cho doanh nghiệp: mang thiết bị hydra facial công nghệ cao cùng đội ngũ chuyên nghiệp đến tận văn phòng. HR chỉ cần xác nhận lịch và danh sách, phần còn lại được setup và vận hành trọn gói.",
        },

        {
          type: "image",
          src: "/news/news2.JPG",
          alt: "Trải nghiệm chăm sóc da Face Wash Fox tại văn phòng",
        },
        {
          type: "paragraph",
          content:
            "Khác với những event wellness mang tính đại trà, FOX SWAT tập trung vào cá nhân hóa và tái tạo năng lượng nhanh để nhân viên quay lại bàn làm việc với mood tốt hơn hẳn.",
        },

        {
          type: "image",
          src: "/PR/pr1/pr1_4.png",
          alt: "Trải nghiệm chăm sóc da Face Wash Fox tại văn phòng",
        },
        {
          type: "paragraph",
          content:
            "Ngoài FOX SWAT, Face Wash Fox còn có voucher chăm sóc da để nhân viên chủ động đến hơn 50 cửa hàng trên toàn quốc theo lịch cá nhân, phù hợp với doanh nghiệp không muốn tổ chức event tập trung.",
        },
        {
          type: "paragraph",
          content:
            'Điều nhân viên nhớ không phải là một món quà, mà là khoảnh khắc họ cảm thấy: "Công ty đang quan tâm đến mình theo cách cụ thể, không hình thức."',
        },

        {
          type: "image",
          src: "/PR/pr1/pr1_3.jpg",
          alt: "Trải nghiệm chăm sóc da Face Wash Fox tại văn phòng",
        },
        {
          type: "paragraph",
          content:
            'Năm 2026, doanh nghiệp cạnh tranh nhân tài không chỉ bằng con số, mà bằng cảm giác: "Đây là nơi mình muốn gắn bó."',
        },
      ],
      bullets: [
        "Nhân viên ngồi xuống ghế thư giãn.",
        "Soi da bằng AI để phân tích tình trạng da cụ thể.",
        "Tư vấn cá nhân hóa theo từng loại da.",
        "Trải nghiệm rửa mặt sạch sâu và dưỡng chất giúp da thông thoáng, tinh thần sảng khoái.",
      ],
      quote:
        "Đây là lần đầu mình thật sự hiểu da đang cần gì, chứ không phải đoán mò. Lần đầu cảm thấy công ty quan tâm đến mình theo cách cụ thể, không hình thức.",
      cta: "Liên hệ Face Wash Fox qua hotline 088 986 6666 để nhận tư vấn chương trình phù hợp cho doanh nghiệp.",
    },
  },
  {
    slug: "cong-ty-ban-dang-giu-chan-nhan-tai-bang-gi-ngoai-luong-va-thuong",
    date: "7 April 2026",
    title: "Công ty bạn đang giữ chân nhân tài bằng gì - ngoài lương và thưởng?",
    image: "/news/news2.JPG",
    excerpt:
      "Wellness đang trở thành một phần của chiến lược giữ chân nhân sự, nơi trải nghiệm được quan tâm tạo ra khác biệt rõ rệt.",
    article: {
      intro:
        "Wellness không còn là một xu hướng nhất thời, mà đang trở thành chuẩn mực sống của thế hệ mới.",
      lead:
        "Trong bối cảnh áp lực hiệu suất và nhịp sống đô thị dày đặc, nhân viên không chỉ tìm kiếm thu nhập, mà còn tìm kiếm cảm giác được quan tâm thật sự.",
      paragraphs: [
        {
          type: "paragraph",
          content:
            "Khi deadline, áp lực và những kết nối số không ngừng nghỉ bủa vây, cơ thể và làn da bắt đầu phát tín hiệu quá tải. Xỉn màu, thiếu sức sống, tinh thần dễ kiệt quệ là những biểu hiện rất thực tế của trạng thái đó.",
        },
        {
          type: "paragraph",
          content:
            "Lúc này, thứ họ tìm không còn chỉ là mức lương tốt, mà là cảm giác được phục hồi, được chăm sóc và được đối xử như một con người, không chỉ là một nguồn lực.",
        },
        {
          type: "paragraph",
          content:
            "Face Wash Fox mang đến cho HR một công cụ để gửi sự quan tâm tinh tế ngay tại nơi làm việc, tạo ra những trải nghiệm khiến nhân viên nhớ lâu và muốn gắn bó hơn.",

        },

        {
          type: "image",
          src: "/PR/pr1/pr1_1.PNG",
          alt: "Trải nghiệm chăm sóc da Face Wash Fox tại văn phòng",
        },
        {
          type: "paragraph",
          content:
            "Doanh nghiệp có thể linh hoạt chọn gói phù hợp với quy mô và ngân sách, từ trải nghiệm tại văn phòng đến hình thức quà tặng để nhân viên chủ động sử dụng theo lịch cá nhân.",
        },
        {
          type: "paragraph",
          content:
            "Tất cả các giải pháp đều dùng công nghệ hydra facial hiện đại, mỹ phẩm Hàn Quốc cao cấp và đội ngũ được đào tạo bài bản, giúp đảm bảo an toàn và hiệu quả ngay từ lần đầu.",
        },
        {
          type: "image",
          src: "/PR/pr3/pr3_2.jpg",
          alt: "Trải nghiệm chăm sóc da Face Wash Fox tại văn phòng",
        },
        {
          type: "paragraph",
          content:
            "Đây không chỉ là một hoạt động phúc lợi. Đó là cách doanh nghiệp tạo ra một khoảnh khắc wow nhỏ nhưng có chiều sâu, giúp đội ngũ cảm thấy mình được quan tâm theo cách cá nhân hóa hơn.",
        },
        {
          type: "paragraph",
          content:
            "Khi doanh nghiệp làm tốt điều này, lợi ích không dừng ở trải nghiệm của nhân viên mà còn phản ánh lên thương hiệu tuyển dụng, mức độ gắn kết nội bộ và hiệu quả sử dụng ngân sách.",
        },
      ],
      bullets: [
        "Fox SWAT: thiết lập trạm chăm sóc da ngay tại văn phòng cho brand day, team building hoặc dịp đặc biệt.",
        "Voucher linh hoạt tiền mặt: nhân viên tự đặt lịch tại hơn 50 cửa hàng Face Wash Fox trên toàn quốc.",
        "Thẻ quà tặng chăm sóc da: phù hợp cho sinh nhật, lễ Tết hoặc ghi nhận hoàn thành KPI.",
        "Ngân sách linh hoạt, dễ chọn theo quy mô doanh nghiệp và mục tiêu triển khai.",
      ],
      quote:
        "Nhân viên thư giãn, da đẹp hơn, tự tin hơn và cảm thấy được quan tâm rõ ràng hơn ngay trong môi trường làm việc hàng ngày.",
      cta:
        "Inbox hoặc gọi 088 986 6666 để nhận tư vấn gói phù hợp với doanh nghiệp bạn. Face Wash Fox sẵn sàng hỗ trợ HR tạo khác biệt từ những điều nhỏ nhất.",
    },
  },
  {
    slug: "khi-trai-nghiem-nhan-vien-tro-thanh-chien-luoc-cua-doanh-nghiep-hien-dai",
    date: "7 April 2026",
    title: "Khi trải nghiệm nhân viên trở thành chiến lược của doanh nghiệp hiện đại",
    image: "/news/news3.JPG",
    excerpt:
      "Những hành động quan tâm cụ thể ngay tại văn phòng có thể trở thành nền tảng cho hiệu suất và sự gắn bó lâu dài.",
    article: {
      intro: "Nhân viên của bạn cảm thấy thế nào mỗi sáng đến văn phòng?",
      lead:
        "Không chỉ là hoàn thành deadline, mà là cảm giác được quan tâm, dù chỉ qua những điều nhỏ nhất.",
      paragraphs: [
        {
          type: "paragraph",
          content:
            "Trong nhiều năm, doanh nghiệp đầu tư mạnh vào trải nghiệm khách hàng. Nhưng hiện tại, ngày càng nhiều công ty nhận ra rằng trải nghiệm nhân viên mới là chìa khóa giữ chân tài năng và duy trì hiệu suất bền vững.",
        },
        {
          type: "paragraph",
          content:
            "Một nhân viên mệt mỏi, da xỉn màu vì điều hòa và màn hình 8 đến 10 tiếng mỗi ngày, năng lượng cạn kiệt và tự tin giảm sút sẽ rất khó duy trì sự sáng tạo hay gắn bó lâu dài.",
        },
        {
          type: "paragraph",
          content:
            "Áp lực công việc và trạng thái chạy hết pin không phải lúc nào cũng hiện rõ trên KPI, nhưng lại ảnh hưởng trực tiếp đến mood, mức độ tập trung và tương tác hàng ngày trong tổ chức.",
        },
        {
          type: "image",
          src: "/PR/pr2/pr2_1.JPG",
          alt: "Trải nghiệm chăm sóc da Face Wash Fox tại văn phòng",
        },
        {
          type: "paragraph",
          content:
            "Vì vậy, nhiều doanh nghiệp đang thử nghiệm cách mang well-being vào ngay trong văn phòng. Không cần sự kiện quá lớn hay chi phí khổng lồ, chỉ cần đúng lúc và đủ chân thành.",
        },
        {
          type: "paragraph",
          content:
            "Một ví dụ thực tế là Fox SWAT từ Face Wash Fox: mang thiết bị soi da công nghệ cao và liệu trình hydra facial chuyên sâu đến thẳng văn phòng trong các dịp brand day hoặc hoạt động nội bộ định kỳ.",
        },
        {
          type: "image",
          src: "/PR/pr2/pr2_3.jpg",
          alt: "Trải nghiệm chăm sóc da Face Wash Fox tại văn phòng",
        },
        {
          type: "paragraph",
          content:
            "Nhân viên được soi da, phân tích tình trạng ở tầng sâu, làm sạch và chăm sóc da ngay tại chỗ. Họ không cần rời khỏi công ty nhưng vẫn có thể quay lại bàn làm việc với tinh thần sảng khoái và tự tin hơn.",
        },
        {
          type: "paragraph",
          content:
            "Những hành động quan tâm cụ thể như vậy không chỉ giúp đội ngũ duy trì năng lượng, mà còn góp phần xây dựng hình ảnh công ty nhân văn, nơi mọi người thật sự muốn gắn bó lâu dài.",
        },
        {
          type: "image",
          src: "/PR/pr3/pr3_1.jpg",
          alt: "Trải nghiệm chăm sóc da Face Wash Fox tại văn phòng",
        },
        {
          type: "paragraph",
          content:
            "Đôi khi chỉ một thay đổi nhỏ như một buổi chăm sóc da tại chỗ cũng đủ tạo ra chuyển biến lớn: từ nhân viên mệt mỏi thành đội ngũ tích cực, từ làm việc vì lương thành làm việc vì cảm thấy được quan tâm.",
        },
      ],
      bullets: [
        "Mang một góc tái tạo năng lượng vào ngay nơi làm việc.",
        "Soi da và chăm sóc da tại chỗ bằng công nghệ hydra facial.",
        "Tạo khoảng nghỉ ngắn nhưng đúng lúc để cải thiện mood và sự tập trung.",
        "Tăng cảm giác được trân trọng, từ đó hỗ trợ hiệu suất và gắn kết lâu dài.",
      ],
      quote:
        "Chỉ một buổi thôi mà mood cả tuần lên hẳn, cảm giác được trân trọng thật sự.",
      cta:
        "Inbox Face Wash Fox hoặc gọi 088 986 6666 để nhận tư vấn gói phù hợp, từ team nhỏ đến chương trình định kỳ cho doanh nghiệp.",
    },
  },
];

export function getFoxNewsItemBySlug(slug: string) {
  return foxNewsItems.find((item) => item.slug === slug);
}
