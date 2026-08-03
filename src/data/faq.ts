export type FaqItem = {
  question: string;
  answer: string;
};

export type FaqCategory = {
  title: string;
  items: FaqItem[];
};

export const faqCategories: FaqCategory[] = [
  {
    title: "Dịch vụ",
    items: [
      {
        question: "Làm sao để đặt lịch?",
        answer:
          "Đặt tại cửa hàng, qua app Face Wash Fox hoặc hotline 0889 866 666.",
      },
      {
        question: "Giá thẻ Foxie khác giá niêm yết thế nào?",
        answer:
          "Giá niêm yết dành cho khách thường. Chủ thẻ Foxie được ưu đãi, tiết kiệm đến khoảng 35%.",
      },
      {
        question: "Mỗi liệu trình mất bao lâu?",
        answer:
          "Khoảng 30–40 phút tùy dịch vụ. Combo có thể lâu hơn.",
      },
      {
        question: "Nam giới và trẻ em có dùng được không?",
        answer:
          "Có. Dịch vụ phù hợp mọi đối tượng. Khách dưới 12 tuổi nên hỏi nhân viên để được tư vấn.",
      },
      {
        question: "Cửa hàng mở cửa lúc nào?",
        answer:
          "Thường từ 9h30–21h30, có thể khác theo chi nhánh. Xem chi tiết tại trang Cửa hàng.",
      },
      {
        question: "Thẻ Foxie dùng như thế nào?",
        answer:
          "Dùng để hưởng giá ưu đãi toàn hệ thống, có thể chia sẻ với người thân. Liên hệ cửa hàng để kích hoạt.",
      },
    ],
  },
  {
    title: "Đặt hàng & Giao nhận",
    items: [
      {
        question: "Đơn hàng của tôi được giao như thế nào?",
        answer:
          "Đơn được xác nhận qua app hoặc hotline, rồi giao theo địa chỉ bạn cung cấp trong khung thời gian đã chọn.",
      },
      {
        question: "Mã vận đơn ghi giao trong 1–3 ngày nghĩa là gì?",
        answer:
          "Đây là ước tính thời gian giao theo đơn vị vận chuyển. Thời gian thực tế có thể sớm hoặc muộn hơn tùy khu vực.",
      },
      {
        question: "Mất bao lâu để nhận hàng?",
        answer:
          "Nội thành thường 1–3 ngày làm việc. Ngoại tỉnh có thể lâu hơn tùy đơn vị giao hàng.",
      },
      {
        question: "Ngày làm việc là gì?",
        answer:
          "Từ thứ Hai đến thứ Sáu, không gồm thứ Bảy, Chủ nhật và ngày lễ.",
      },
      {
        question: "Làm sao biết đơn đã được gửi?",
        answer:
          "Bạn nhận thông báo qua app, SMS hoặc email kèm mã vận đơn khi đơn bắt đầu giao.",
      },
      {
        question: "Vì sao một số sản phẩm không giao quốc tế?",
        answer:
          "Do quy định vận chuyển và bảo quản sản phẩm. Hiện Face Wash Fox ưu tiên giao trong Việt Nam.",
      },
      {
        question: "Vì sao mã vận đơn chưa cập nhật?",
        answer:
          "Đơn vị vận chuyển có thể cập nhật chậm vài giờ. Nếu quá 24 giờ vẫn chưa đổi, hãy liên hệ hotline 0889 866 666.",
      },
    ],
  },
  {
    title: "Đổi trả",
    items: [
      {
        question: "Làm sao biết đơn đã được gửi đi?",
        answer:
          "Bạn sẽ nhận thông báo và mã vận đơn khi đơn được bàn giao cho đơn vị giao hàng.",
      },
      {
        question: "Sản phẩm nào không hỗ trợ giao quốc tế?",
        answer:
          "Một số mặt hàng bị hạn chế do điều kiện bảo quản hoặc quy định vận chuyển. Nhân viên sẽ báo khi bạn đặt hàng.",
      },
      {
        question: "Mã vận đơn không cập nhật thì làm sao?",
        answer:
          "Chờ thêm một chu kỳ cập nhật của đơn vị giao. Nếu vẫn không đổi, liên hệ cửa hàng hoặc hotline để được kiểm tra.",
      },
    ],
  },
  {
    title: "Ưu đãi",
    items: [
      {
        question: "Làm sao nhận ưu đãi / mã giảm giá?",
        answer:
          "Theo dõi app, fanpage hoặc chương trình tại cửa hàng. Chủ thẻ Foxie cũng được giá ưu đãi cố định.",
      },
      {
        question: "Ưu đãi có áp dụng mọi dịch vụ không?",
        answer:
          "Tùy chương trình. Một số gói hoặc combo có thể không áp dụng đồng thời nhiều ưu đãi.",
      },
      {
        question: "Mã ưu đãi không dùng được thì sao?",
        answer:
          "Kiểm tra hạn sử dụng, điều kiện áp dụng hoặc liên hệ hotline 0889 866 666 để được hỗ trợ.",
      },
    ],
  },
];

export const consumerFaqItems: FaqItem[] = faqCategories.flatMap((category) =>
  category.items.map((item) => ({
    question: item.question,
    answer: item.answer,
  })),
);
