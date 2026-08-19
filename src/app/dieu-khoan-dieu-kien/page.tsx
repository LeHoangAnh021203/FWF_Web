import type { Metadata } from "next";
import Link from "next/link";

import { SiteFooter, SiteHeader } from "../site-chrome";

const policySections = [
  {
    title: "1. Phạm vi áp dụng",
    items: [
      "Các điều khoản này áp dụng khi khách hàng truy cập website, đặt lịch, sử dụng dịch vụ, mua thẻ, nhận voucher hoặc tham gia chương trình ưu đãi của Face Wash Fox.",
      "Khi tiếp tục sử dụng website hoặc dịch vụ, khách hàng được hiểu là đã đọc, hiểu và đồng ý với các điều khoản đang được công bố tại thời điểm sử dụng.",
    ],
  },
  {
    title: "2. Đặt lịch và sử dụng dịch vụ",
    items: [
      "Khách hàng cần cung cấp thông tin liên hệ chính xác để Face Wash Fox xác nhận lịch hẹn, hỗ trợ thay đổi lịch hoặc xử lý các yêu cầu liên quan.",
      "Face Wash Fox có thể điều chỉnh thời gian phục vụ trong trường hợp cửa hàng quá tải, bảo trì thiết bị, sự kiện bất khả kháng hoặc phát sinh vận hành ngoài dự kiến.",
      "Khách hàng nên thông báo trước nếu cần đổi hoặc hủy lịch để cửa hàng có thể sắp xếp nhân sự và khung giờ phù hợp.",
    ],
  },
  {
    title: "3. Thẻ dịch vụ, voucher và ưu đãi",
    items: [
      "Thẻ dịch vụ, voucher và mã ưu đãi chỉ có giá trị trong thời hạn, phạm vi cửa hàng và điều kiện sử dụng được công bố kèm theo từng chương trình.",
      "Ưu đãi không tự động quy đổi thành tiền mặt, không hoàn tiền phần chưa sử dụng và không cộng dồn với chương trình khác, trừ khi Face Wash Fox có thông báo riêng.",
      "Face Wash Fox có quyền từ chối áp dụng voucher hoặc ưu đãi nếu phát hiện thông tin không hợp lệ, hết hạn, bị chỉnh sửa hoặc sử dụng sai điều kiện.",
    ],
  },
  {
    title: "4. Giá, thanh toán và hoàn hủy",
    items: [
      "Giá dịch vụ được niêm yết trên các kênh chính thức của Face Wash Fox và có thể thay đổi theo từng thời điểm, chi nhánh hoặc chương trình khuyến mãi.",
      "Khách hàng cần kiểm tra kỹ thông tin dịch vụ, gói mua và số tiền thanh toán trước khi xác nhận giao dịch.",
      "Chính sách hoàn hủy, đổi dịch vụ hoặc xử lý giao dịch phát sinh sẽ được xem xét theo tình trạng sử dụng thực tế, điều kiện của chương trình và quy định vận hành tại thời điểm yêu cầu.",
    ],
  },
  {
    title: "5. Trách nhiệm của khách hàng",
    items: [
      "Khách hàng cần thông báo cho nhân viên nếu có tiền sử dị ứng, đang điều trị da liễu, đang dùng hoạt chất mạnh hoặc có tình trạng da cần lưu ý trước khi sử dụng dịch vụ.",
      "Khách hàng không sử dụng website hoặc hệ thống đặt lịch để gửi thông tin sai lệch, gây gián đoạn vận hành, giả mạo người khác hoặc thực hiện hành vi trái pháp luật.",
      "Khách hàng chịu trách nhiệm bảo mật thông tin cá nhân, thiết bị và tài khoản liên hệ của mình khi tương tác với các kênh trực tuyến của Face Wash Fox.",
    ],
  },
  {
    title: "6. Bảo mật thông tin",
    items: [
      "Face Wash Fox thu thập và xử lý thông tin khách hàng nhằm xác nhận lịch hẹn, chăm sóc khách hàng, cải thiện dịch vụ và thực hiện các nghĩa vụ vận hành cần thiết.",
      "Thông tin cá nhân được bảo vệ theo quy trình nội bộ và chỉ được chia sẻ cho bên liên quan khi cần thiết để cung cấp dịch vụ, tuân thủ pháp luật hoặc có sự đồng ý phù hợp.",
      "Khách hàng có thể liên hệ Face Wash Fox để yêu cầu hỗ trợ về thông tin cá nhân đã cung cấp qua các kênh liên hệ chính thức.",
    ],
  },
  {
    title: "7. Miễn trừ và giới hạn trách nhiệm",
    items: [
      "Face Wash Fox nỗ lực duy trì thông tin chính xác trên website nhưng không cam kết mọi nội dung luôn không có sai sót kỹ thuật, lỗi hiển thị hoặc gián đoạn truy cập tạm thời.",
      "Face Wash Fox không chịu trách nhiệm đối với thiệt hại phát sinh từ việc khách hàng cung cấp thông tin không chính xác, không tuân thủ hướng dẫn sử dụng dịch vụ hoặc tự ý áp dụng thông tin ngoài tư vấn chuyên môn.",
      "Các liên kết, nền tảng hoặc dịch vụ của bên thứ ba, nếu có, được điều chỉnh bởi chính sách riêng của bên thứ ba đó.",
    ],
  },
  {
    title: "8. Thay đổi điều khoản",
    items: [
      "Face Wash Fox có thể cập nhật điều khoản để phù hợp với thay đổi về dịch vụ, pháp luật, chính sách vận hành hoặc chương trình ưu đãi.",
      "Phiên bản mới có hiệu lực khi được công bố trên website. Khách hàng nên kiểm tra định kỳ để nắm được các cập nhật mới nhất.",
    ],
  },
];

export const metadata: Metadata = {
  title: "Điều khoản & Điều kiện Face Wash Fox",
  description:
    "Điều khoản sử dụng website, đặt lịch, dịch vụ, voucher, thanh toán và bảo mật thông tin tại Face Wash Fox.",
};

export default function TermsPage() {
  return (
    <main className="terms-page">
      <SiteHeader />

      <section className="terms-hero">
        <div>
          <h1>Điều khoản & Điều kiện</h1>
          <span>Cập nhật: 19/08/2026</span>
        </div>
        <p>
          Nội dung dưới đây quy định cách khách hàng truy cập website, đặt lịch,
          sử dụng dịch vụ, nhận ưu đãi và tương tác với hệ thống cửa hàng Face
          Wash Fox.
        </p>
      </section>

      <section className="terms-summary" aria-label="Tóm tắt điều khoản">
        <article>
          <span>01</span>
          <h2>Dịch vụ</h2>
          <p>Thông tin đặt lịch, sử dụng liệu trình và phối hợp với cửa hàng.</p>
        </article>
        <article>
          <span>02</span>
          <h2>Thanh toán</h2>
          <p>Giá, ưu đãi, voucher, thẻ dịch vụ và xử lý giao dịch phát sinh.</p>
        </article>
        <article>
          <span>03</span>
          <h2>Dữ liệu</h2>
          <p>Cách Face Wash Fox tiếp nhận, sử dụng và bảo vệ thông tin khách hàng.</p>
        </article>
      </section>

      <section className="terms-content" aria-label="Nội dung điều khoản">
        {policySections.map((section) => (
          <article key={section.title}>
            <h2>{section.title}</h2>
            <ul>
              {section.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        ))}
      </section>

      <section className="terms-contact">
        <div>
          <p>Cần hỗ trợ thêm?</p>
          <h2>Liên hệ Face Wash Fox</h2>
        </div>
        <div>
          <a href="tel:0889866666">0889 866 666</a>
          <a href="mailto:info@facewashfox.com">info@facewashfox.com</a>
          <Link href="/cua-hang">Tìm cửa hàng gần bạn</Link>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
