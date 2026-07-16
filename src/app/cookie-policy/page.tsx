import Link from "next/link";

export default function CookiePolicyPage() {
  return (
    <main className="policy-page">
      <Link href="/">Face Wash Fox</Link>
      <h1>Chính sách Cookie</h1>
      <p>
        Face Wash Fox sử dụng cookie và công nghệ tương tự để duy trì hoạt động
        website, ghi nhớ lựa chọn của bạn, phân tích cách khách truy cập sử dụng
        trang và cải thiện trải nghiệm tìm cửa hàng, xem dịch vụ.
      </p>
      <section>
        <h2>Cookie cần thiết</h2>
        <p>
          Các cookie này giúp website hoạt động ổn định, lưu lựa chọn cookie và
          hỗ trợ những tính năng cơ bản của trang.
        </p>
      </section>
      <section>
        <h2>Cookie phân tích</h2>
        <p>
          Chúng tôi có thể dùng dữ liệu tổng hợp để hiểu nội dung nào hữu ích
          với khách hàng và tối ưu trải nghiệm truy cập.
        </p>
      </section>
      <section>
        <h2>Quản lý lựa chọn</h2>
        <p>
          Bạn có thể chấp nhận hoặc từ chối cookie không cần thiết trên banner
          cookie. Bạn cũng có thể xoá cookie trong cài đặt trình duyệt.
        </p>
      </section>
    </main>
  );
}
