type SiteLanguage = "vi" | "zh" | "en" | "ja" | "ko" | "th";
type Dict = Record<string, string>;

const termsVi: Dict = {
  "terms.title": "Điều khoản & Điều kiện",
  "terms.updated": "Cập nhật: 08/09/2026",
  "terms.intro":
    "Nội dung dưới đây quy định cách khách hàng truy cập website, đặt lịch, sử dụng dịch vụ, nhận ưu đãi và tương tác với hệ thống cửa hàng Face Wash Fox.",
  "terms.summaryAria": "Tóm tắt điều khoản",
  "terms.contentAria": "Nội dung điều khoản",
  "terms.sum.1.title": "Dịch vụ",
  "terms.sum.1.body": "Thông tin đặt lịch, sử dụng liệu trình và phối hợp với cửa hàng.",
  "terms.sum.2.title": "Thanh toán",
  "terms.sum.2.body": "Giá, ưu đãi, voucher, thẻ dịch vụ và xử lý giao dịch phát sinh.",
  "terms.sum.3.title": "Dữ liệu",
  "terms.sum.3.body": "Cách Face Wash Fox tiếp nhận, sử dụng và bảo vệ thông tin khách hàng.",
  "terms.s1.title": "1. Phạm vi áp dụng",
  "terms.s1.i1":
    "Các điều khoản này áp dụng khi khách hàng truy cập website, đặt lịch, sử dụng dịch vụ, mua thẻ, nhận voucher hoặc tham gia chương trình ưu đãi của Face Wash Fox.",
  "terms.s1.i2":
    "Khi tiếp tục sử dụng website hoặc dịch vụ, khách hàng được hiểu là đã đọc, hiểu và đồng ý với các điều khoản đang được công bố tại thời điểm sử dụng.",
  "terms.s2.title": "2. Đặt lịch và sử dụng dịch vụ",
  "terms.s2.i1":
    "Khách hàng cần cung cấp thông tin liên hệ chính xác để Face Wash Fox xác nhận lịch hẹn, hỗ trợ thay đổi lịch hoặc xử lý các yêu cầu liên quan.",
  "terms.s2.i2":
    "Face Wash Fox có thể điều chỉnh thời gian phục vụ trong trường hợp cửa hàng quá tải, bảo trì thiết bị, sự kiện bất khả kháng hoặc phát sinh vận hành ngoài dự kiến.",
  "terms.s2.i3":
    "Khách hàng nên thông báo trước nếu cần đổi hoặc hủy lịch để cửa hàng có thể sắp xếp nhân sự và khung giờ phù hợp.",
  "terms.s2.i4":
    "Khách dưới 16 tuổi cần người giám hộ đi cùng và đồng ý trước khi sử dụng dịch vụ cũng như khi cung cấp dữ liệu cá nhân.",
  "terms.s3.title": "3. Thẻ Foxie, voucher và ưu đãi",
  "terms.s3.i1":
    "Thẻ thành viên Foxie là thẻ trả trước để hưởng giá thành viên tại hệ thống cửa hàng, khác với voucher/mã khuyến mãi. Hai hình thức này không áp dụng chung một quy chế.",
  "terms.s3.i2":
    "Voucher và mã ưu đãi chỉ có giá trị trong thời hạn, phạm vi cửa hàng và điều kiện công bố kèm chương trình; không quy đổi thành tiền mặt và không hoàn tiền, trừ khi pháp luật bắt buộc hoặc Face Wash Fox có thông báo riêng.",
  "terms.s3.i3":
    "Thẻ Foxie không phải phương tiện thanh toán không dùng tiền mặt, không phát hành dưới dạng tiền ảo và không tự động quy đổi thành tiền mặt.",
  "terms.s3.i4":
    "Thời hạn sử dụng thẻ Foxie là 36 tháng kể từ ngày kích hoạt, trừ khi điều kiện kèm theo thẻ ghi khác. Hết hạn, số dư chưa dùng không tự động gia hạn.",
  "terms.s3.i5":
    "Thẻ có thể được dùng chung với người thân hoặc bạn bè theo sự đồng ý của chủ thẻ. Việc dùng chung không làm thay đổi quyền sở hữu số dư và không biến thẻ thành phương tiện thanh toán giữa các bên.",
  "terms.s3.i6":
    "Nếu một cửa hàng đóng cửa, số dư còn lại được sử dụng tại cửa hàng khác trong hệ thống. Nếu toàn hệ thống ngừng hoạt động, số dư chưa sử dụng được hoàn theo quy định pháp luật bảo vệ người tiêu dùng.",
  "terms.s4.title": "4. Giá, thanh toán và hoàn hủy",
  "terms.s4.i1":
    "Giá dịch vụ gồm hai mức: giá thành viên (chủ thẻ Foxie) và giá lẻ (khách chưa có thẻ). Giá được niêm yết trên kênh chính thức và có thể thay đổi theo thời điểm hoặc chương trình.",
  "terms.s4.i2":
    "Khách hàng cần kiểm tra kỹ thông tin dịch vụ, gói mua và số tiền thanh toán trước khi xác nhận giao dịch.",
  "terms.s4.i3":
    "Hủy lịch dịch vụ: trước giờ hẹn ít nhất 24 giờ — hoàn 100% phần buổi chưa dùng; trong khoảng 24 giờ đến trước 2 giờ — hoàn 50%; sát giờ hoặc không đến — không hoàn phần buổi đó.",
  "terms.s4.i4":
    "Số dư thẻ Foxie chưa sử dụng: khách gửi yêu cầu bằng văn bản qua email info@facewashfox.com hoặc hotline 0889 866 666. Face Wash Fox phản hồi trong 15 ngày làm việc và hoàn số dư chưa dùng theo quy chế thẻ, trừ chi phí hợp lý đã phát sinh (nếu có và được thông báo trước).",
  "terms.s4.i5":
    "Khiếu nại về thanh toán hoặc hoàn hủy được tiếp nhận bằng văn bản trong 30 ngày kể từ ngày phát sinh. Kết quả được thông báo bằng văn bản qua email hoặc số điện thoại đã đăng ký.",
  "terms.s5.title": "5. Trách nhiệm của khách hàng",
  "terms.s5.i1":
    "Khách hàng cần thông báo cho nhân viên nếu có tiền sử dị ứng, đang điều trị da liễu, đang dùng hoạt chất mạnh hoặc có tình trạng da cần lưu ý trước khi sử dụng dịch vụ.",
  "terms.s5.i2":
    "Khách hàng không sử dụng website hoặc hệ thống đặt lịch để gửi thông tin sai lệch, gây gián đoạn vận hành, giả mạo người khác hoặc thực hiện hành vi trái pháp luật.",
  "terms.s5.i3":
    "Khách hàng chịu trách nhiệm bảo mật thông tin cá nhân, thiết bị và tài khoản liên hệ của mình khi tương tác với các kênh trực tuyến của Face Wash Fox.",
  "terms.s6.title": "6. Bảo mật thông tin",
  "terms.s6.i1":
    "Việc thu thập và xử lý dữ liệu cá nhân được quy định chi tiết tại Chính sách bảo vệ dữ liệu cá nhân, là một phần không tách rời của các điều khoản này.",
  "terms.s6.i2":
    "Face Wash Fox chỉ xử lý dữ liệu khi có cơ sở pháp lý phù hợp, gồm sự đồng ý của khách hàng, thực hiện hợp đồng dịch vụ hoặc nghĩa vụ pháp luật.",
  "terms.s6.i3":
    "Khách hàng thực hiện quyền truy cập, sửa, xóa, rút đồng ý hoặc khiếu nại qua email info@facewashfox.com hoặc hotline 0889 866 666.",
  "terms.s7.title": "7. Miễn trừ và giới hạn trách nhiệm",
  "terms.s7.i1":
    "Face Wash Fox nỗ lực duy trì thông tin chính xác trên website nhưng không cam kết mọi nội dung luôn không có sai sót kỹ thuật, lỗi hiển thị hoặc gián đoạn truy cập tạm thời.",
  "terms.s7.i2":
    "Face Wash Fox không chịu trách nhiệm đối với thiệt hại phát sinh từ việc khách hàng cung cấp thông tin không chính xác, không tuân thủ hướng dẫn sử dụng dịch vụ hoặc tự ý áp dụng thông tin ngoài tư vấn chuyên môn.",
  "terms.s7.i3":
    "Các liên kết, nền tảng hoặc dịch vụ của bên thứ ba, nếu có, được điều chỉnh bởi chính sách riêng của bên thứ ba đó.",
  "terms.s8.title": "8. Thay đổi điều khoản",
  "terms.s8.i1":
    "Face Wash Fox có thể cập nhật điều khoản để phù hợp với thay đổi về dịch vụ, pháp luật, chính sách vận hành hoặc chương trình ưu đãi.",
  "terms.s8.i2":
    "Phiên bản mới có hiệu lực khi được công bố trên website. Khách hàng nên kiểm tra định kỳ để nắm được các cập nhật mới nhất.",
  "terms.contact.need": "Cần hỗ trợ thêm?",
  "terms.contact.title": "Liên hệ Face Wash Fox",
  "terms.contact.findStore": "Tìm cửa hàng gần bạn",
};

const termsEn: Dict = {
  "terms.title": "Terms & Conditions",
  "terms.updated": "Updated: 08/09/2026",
  "terms.intro":
    "The content below sets out how customers access the website, book appointments, use services, receive offers, and interact with the Face Wash Fox store network.",
  "terms.summaryAria": "Terms summary",
  "terms.contentAria": "Terms content",
  "terms.sum.1.title": "Services",
  "terms.sum.1.body": "Booking, treatment use, and coordination with stores.",
  "terms.sum.2.title": "Payment",
  "terms.sum.2.body": "Pricing, offers, vouchers, service cards, and related transactions.",
  "terms.sum.3.title": "Data",
  "terms.sum.3.body": "How Face Wash Fox collects, uses, and protects customer information.",
  "terms.s1.title": "1. Scope",
  "terms.s1.i1":
    "These terms apply when customers visit the website, book, use services, buy cards, receive vouchers, or join Face Wash Fox promotions.",
  "terms.s1.i2":
    "By continuing to use the website or services, customers are deemed to have read, understood, and agreed to the terms published at the time of use.",
  "terms.s2.title": "2. Booking and service use",
  "terms.s2.i1":
    "Customers must provide accurate contact details so Face Wash Fox can confirm appointments, support rescheduling, or handle related requests.",
  "terms.s2.i2":
    "Face Wash Fox may adjust service times in case of store overload, equipment maintenance, force majeure, or unexpected operations.",
  "terms.s2.i3":
    "Please notify us in advance if you need to change or cancel so the store can arrange staff and time slots.",
  "terms.s2.i4":
    "Guests under 16 must be accompanied by a guardian who consents before service and before any personal data is provided.",
  "terms.s3.title": "3. Foxie cards, vouchers, and offers",
  "terms.s3.i1":
    "The Foxie membership card is a prepaid card for member pricing at stores. It is distinct from promotional vouchers/codes and is governed by a separate set of rules.",
  "terms.s3.i2":
    "Vouchers and promo codes are valid only for the stated period, stores, and conditions. They are not convertible to cash and are non-refundable unless required by law or Face Wash Fox states otherwise.",
  "terms.s3.i3":
    "Foxie cards are not an unlawful payment instrument, not a virtual currency, and are not automatically convertible to cash.",
  "terms.s3.i4":
    "Foxie cards are valid for 36 months from activation unless the card states otherwise. Unused value does not auto-renew after expiry.",
  "terms.s3.i5":
    "Cards may be shared with family or friends with the cardholder’s consent. Sharing does not transfer ownership of the remaining balance and does not make the card a payment instrument between parties.",
  "terms.s3.i6":
    "If a store closes, remaining value can be used at other Face Wash Fox stores. If the entire network ceases operation, unused value is refunded as required by consumer-protection law.",
  "terms.s4.title": "4. Pricing, payment, and cancellation",
  "terms.s4.i1":
    "Services have two prices: member price (Foxie cardholders) and walk-in price. Prices are listed on official channels and may change by time or campaign.",
  "terms.s4.i2":
    "Please carefully check service details, packages, and amounts before confirming payment.",
  "terms.s4.i3":
    "Appointment cancellation: at least 24 hours before — 100% refund of the unused session; between 24 hours and 2 hours before — 50%; within 2 hours or no-show — no refund for that session.",
  "terms.s4.i4":
    "Unused Foxie card balance: send a written request to info@facewashfox.com or hotline 0889 866 666. We respond within 15 business days and refund unused value under the card rules, minus any reasonable costs disclosed in advance.",
  "terms.s4.i5":
    "Payment or refund complaints are accepted in writing within 30 days of the event. The outcome is sent in writing to the registered email or phone number.",
  "terms.s5.title": "5. Customer responsibilities",
  "terms.s5.i1":
    "Tell staff about allergies, dermatology treatment, strong actives, or skin concerns before service.",
  "terms.s5.i2":
    "Do not use the website or booking system to send false information, disrupt operations, impersonate others, or break the law.",
  "terms.s5.i3":
    "Customers are responsible for securing personal information, devices, and contact accounts when using Face Wash Fox online channels.",
  "terms.s6.title": "6. Information security",
  "terms.s6.i1":
    "How personal data is collected and processed is set out in the Personal Data Protection Policy, which forms part of these terms.",
  "terms.s6.i2":
    "Face Wash Fox processes data only on a lawful basis, including customer consent, performing the service contract, or legal obligations.",
  "terms.s6.i3":
    "Customers may access, correct, delete, withdraw consent, or complain via info@facewashfox.com or hotline 0889 866 666.",
  "terms.s7.title": "7. Disclaimer and liability limits",
  "terms.s7.i1":
    "Face Wash Fox strives for accurate website information but does not guarantee content is always free of technical errors, display issues, or temporary outages.",
  "terms.s7.i2":
    "Face Wash Fox is not liable for damages from inaccurate customer information, failure to follow service guidance, or applying information outside professional advice.",
  "terms.s7.i3":
    "Third-party links, platforms, or services, if any, are governed by those parties’ own policies.",
  "terms.s8.title": "8. Changes to terms",
  "terms.s8.i1":
    "Face Wash Fox may update terms to match changes in services, law, operations, or promotions.",
  "terms.s8.i2":
    "New versions take effect when published on the website. Customers should check periodically for updates.",
  "terms.contact.need": "Need more help?",
  "terms.contact.title": "Contact Face Wash Fox",
  "terms.contact.findStore": "Find a store near you",
};

const termsZh: Dict = {
  ...termsEn,
  "terms.title": "条款与条件",
  "terms.updated": "更新：19/08/2026",
  "terms.intro":
    "以下内容规定客户如何访问网站、预约、使用服务、获取优惠并与 Face Wash Fox 门店网络互动。",
  "terms.summaryAria": "条款摘要",
  "terms.contentAria": "条款内容",
  "terms.sum.1.title": "服务",
  "terms.sum.1.body": "预约、疗程使用及与门店配合的相关信息。",
  "terms.sum.2.title": "支付",
  "terms.sum.2.body": "价格、优惠、代金券、服务卡及相关交易处理。",
  "terms.sum.3.title": "数据",
  "terms.sum.3.body": "Face Wash Fox 如何接收、使用并保护客户信息。",
  "terms.s1.title": "1. 适用范围",
  "terms.s2.title": "2. 预约与服务使用",
  "terms.s3.title": "3. Foxie 卡、代金券与优惠",
  "terms.s4.title": "4. 价格、支付与取消",
  "terms.s5.title": "5. 客户责任",
  "terms.s6.title": "6. 信息安全",
  "terms.s7.title": "7. 免责与责任限制",
  "terms.s8.title": "8. 条款变更",
  "terms.contact.need": "需要更多帮助？",
  "terms.contact.title": "联系 Face Wash Fox",
  "terms.contact.findStore": "查找附近门店",
};

const termsJa: Dict = {
  ...termsEn,
  "terms.title": "利用規約",
  "terms.updated": "更新：19/08/2026",
  "terms.intro":
    "以下は、ウェブサイトへのアクセス、予約、サービス利用、特典の受け取り、Face Wash Fox 店舗ネットワークとのやり取りに関する規定です。",
  "terms.summaryAria": "規約の概要",
  "terms.contentAria": "規約本文",
  "terms.sum.1.title": "サービス",
  "terms.sum.1.body": "予約、施術利用、店舗との連携に関する情報。",
  "terms.sum.2.title": "お支払い",
  "terms.sum.2.body": "価格、特典、バウチャー、サービスカード、関連取引。",
  "terms.sum.3.title": "データ",
  "terms.sum.3.body": "Face Wash Fox が顧客情報を受け取り、利用、保護する方法。",
  "terms.s1.title": "1. 適用範囲",
  "terms.s2.title": "2. 予約とサービス利用",
  "terms.s3.title": "3. Foxieカード、バウチャー、特典",
  "terms.s4.title": "4. 価格、支払い、キャンセル",
  "terms.s5.title": "5. お客様の責任",
  "terms.s6.title": "6. 情報セキュリティ",
  "terms.s7.title": "7. 免責と責任制限",
  "terms.s8.title": "8. 規約の変更",
  "terms.contact.need": "さらにサポートが必要ですか？",
  "terms.contact.title": "Face Wash Fox に連絡",
  "terms.contact.findStore": "近くの店舗を探す",
};

const termsKo: Dict = {
  ...termsEn,
  "terms.title": "이용약관",
  "terms.updated": "업데이트: 19/08/2026",
  "terms.intro":
    "아래 내용은 웹사이트 접속, 예약, 서비스 이용, 혜택 수령 및 Face Wash Fox 매장 네트워크와의 상호작용에 관한 규정입니다.",
  "terms.summaryAria": "약관 요약",
  "terms.contentAria": "약관 본문",
  "terms.sum.1.title": "서비스",
  "terms.sum.1.body": "예약, 시술 이용, 매장 협조 관련 정보.",
  "terms.sum.2.title": "결제",
  "terms.sum.2.body": "가격, 혜택, 바우처, 서비스 카드 및 관련 거래.",
  "terms.sum.3.title": "데이터",
  "terms.sum.3.body": "Face Wash Fox가 고객 정보를 수집·이용·보호하는 방식.",
  "terms.s1.title": "1. 적용 범위",
  "terms.s2.title": "2. 예약 및 서비스 이용",
  "terms.s3.title": "3. Foxie 카드, 바우처, 혜택",
  "terms.s4.title": "4. 가격, 결제, 취소",
  "terms.s5.title": "5. 고객 책임",
  "terms.s6.title": "6. 정보 보안",
  "terms.s7.title": "7. 면책 및 책임 제한",
  "terms.s8.title": "8. 약관 변경",
  "terms.contact.need": "추가 도움이 필요하신가요?",
  "terms.contact.title": "Face Wash Fox에 문의",
  "terms.contact.findStore": "가까운 매장 찾기",
};

const termsTh: Dict = {
  ...termsEn,
  "terms.title": "ข้อกำหนดและเงื่อนไข",
  "terms.updated": "อัปเดต: 19/08/2026",
  "terms.intro":
    "เนื้อหาด้านล่างกำหนดวิธีที่ลูกค้าเข้าถึงเว็บไซต์ จองคิว ใช้บริการ รับสิทธิพิเศษ และโต้ตอบกับเครือข่ายร้าน Face Wash Fox",
  "terms.summaryAria": "สรุปข้อกำหนด",
  "terms.contentAria": "เนื้อหาข้อกำหนด",
  "terms.sum.1.title": "บริการ",
  "terms.sum.1.body": "ข้อมูลการจอง การใช้ทรีตเมนต์ และการประสานกับร้าน",
  "terms.sum.2.title": "การชำระเงิน",
  "terms.sum.2.body": "ราคา สิทธิพิเศษ วอยเชอร์ บัตรบริการ และการทำธุรกรรมที่เกี่ยวข้อง",
  "terms.sum.3.title": "ข้อมูล",
  "terms.sum.3.body": "วิธีที่ Face Wash Fox รับ ใช้ และปกป้องข้อมูลลูกค้า",
  "terms.s1.title": "1. ขอบเขตการบังคับใช้",
  "terms.s2.title": "2. การจองและการใช้บริการ",
  "terms.s3.title": "3. บัตร Foxie วอยเชอร์ และสิทธิพิเศษ",
  "terms.s4.title": "4. ราคา การชำระเงิน และการยกเลิก",
  "terms.s5.title": "5. ความรับผิดชอบของลูกค้า",
  "terms.s6.title": "6. ความปลอดภัยของข้อมูล",
  "terms.s7.title": "7. ข้อจำกัดความรับผิด",
  "terms.s8.title": "8. การเปลี่ยนแปลงข้อกำหนด",
  "terms.contact.need": "ต้องการความช่วยเหลือเพิ่มเติม?",
  "terms.contact.title": "ติดต่อ Face Wash Fox",
  "terms.contact.findStore": "ค้นหาร้านใกล้คุณ",
};

const cookiePageVi: Dict = {
  "cookiePage.title": "Chính sách Cookie",
  "cookiePage.intro":
    "Face Wash Fox sử dụng cookie và công nghệ tương tự để duy trì hoạt động website, ghi nhớ lựa chọn của bạn, phân tích cách khách truy cập sử dụng trang và cải thiện trải nghiệm tìm cửa hàng, xem dịch vụ.",
  "cookiePage.s1.title": "Cookie cần thiết",
  "cookiePage.s1.body":
    "Các cookie này giúp website hoạt động ổn định, lưu lựa chọn cookie và hỗ trợ những tính năng cơ bản của trang.",
  "cookiePage.s2.title": "Cookie phân tích",
  "cookiePage.s2.body":
    "Chúng tôi có thể dùng dữ liệu tổng hợp để hiểu nội dung nào hữu ích với khách hàng và tối ưu trải nghiệm truy cập.",
  "cookiePage.s3.title": "Quản lý lựa chọn",
  "cookiePage.s3.body":
    "Bạn có thể chấp nhận hoặc từ chối cookie không cần thiết trên banner cookie. Bạn cũng có thể xoá cookie trong cài đặt trình duyệt.",
};

const cookiePageEn: Dict = {
  "cookiePage.title": "Cookie Policy",
  "cookiePage.intro":
    "Face Wash Fox uses cookies and similar technologies to keep the website running, remember your choices, analyze how visitors use the site, and improve finding stores and browsing services.",
  "cookiePage.s1.title": "Essential cookies",
  "cookiePage.s1.body":
    "These cookies keep the website stable, store cookie preferences, and support basic site features.",
  "cookiePage.s2.title": "Analytics cookies",
  "cookiePage.s2.body":
    "We may use aggregated data to understand which content helps customers and to optimize the browsing experience.",
  "cookiePage.s3.title": "Managing your choices",
  "cookiePage.s3.body":
    "You can accept or decline non-essential cookies on the cookie banner. You can also delete cookies in your browser settings.",
};

const cookiePageZh: Dict = {
  "cookiePage.title": "Cookie 政策",
  "cookiePage.intro":
    "Face Wash Fox 使用 cookie 及类似技术维持网站运行、记住您的选择、分析访问方式，并改进查找门店与浏览服务的体验。",
  "cookiePage.s1.title": "必要 Cookie",
  "cookiePage.s1.body": "这些 cookie 帮助网站稳定运行、保存 cookie 偏好，并支持基本功能。",
  "cookiePage.s2.title": "分析 Cookie",
  "cookiePage.s2.body": "我们可能使用汇总数据了解哪些内容对顾客有用，并优化访问体验。",
  "cookiePage.s3.title": "管理您的选择",
  "cookiePage.s3.body":
    "您可以在 cookie 横幅上接受或拒绝非必要 cookie，也可在浏览器设置中删除 cookie。",
};

const cookiePageJa: Dict = {
  "cookiePage.title": "Cookieポリシー",
  "cookiePage.intro":
    "Face Wash Fox は Cookie 等の技術を使い、サイト運営、選択の記憶、利用状況の分析、店舗検索やサービス閲覧の改善を行います。",
  "cookiePage.s1.title": "必須Cookie",
  "cookiePage.s1.body":
    "これらの Cookie はサイトの安定動作、Cookie設定の保存、基本機能を支えます。",
  "cookiePage.s2.title": "分析Cookie",
  "cookiePage.s2.body":
    "集計データを使い、どの内容が役立つかを把握し、閲覧体験を最適化することがあります。",
  "cookiePage.s3.title": "選択の管理",
  "cookiePage.s3.body":
    "Cookieバナーで不要なCookieを承諾または拒否できます。ブラウザ設定で削除も可能です。",
};

const cookiePageKo: Dict = {
  "cookiePage.title": "쿠키 정책",
  "cookiePage.intro":
    "Face Wash Fox는 쿠키 및 유사 기술로 웹사이트 운영, 선택 기억, 방문 분석, 매장 찾기·서비스 탐색 개선을 합니다.",
  "cookiePage.s1.title": "필수 쿠키",
  "cookiePage.s1.body":
    "이 쿠키는 사이트 안정 운영, 쿠키 선택 저장, 기본 기능을 지원합니다.",
  "cookiePage.s2.title": "분석 쿠키",
  "cookiePage.s2.body":
    "집계 데이터로 어떤 콘텐츠가 유용한지 파악하고 방문 경험을 최적화할 수 있습니다.",
  "cookiePage.s3.title": "선택 관리",
  "cookiePage.s3.body":
    "쿠키 배너에서 비필수 쿠키를 수락하거나 거부할 수 있으며, 브라우저 설정에서 쿠키를 삭제할 수도 있습니다.",
};

const cookiePageTh: Dict = {
  "cookiePage.title": "นโยบายคุกกี้",
  "cookiePage.intro":
    "Face Wash Fox ใช้คุกกี้และเทคโนโลยีคล้ายกันเพื่อให้เว็บไซต์ทำงาน จดจำตัวเลือกของคุณ วิเคราะห์การใช้งาน และปรับปรุงการค้นหาร้านกับดูบริการ",
  "cookiePage.s1.title": "คุกกี้ที่จำเป็น",
  "cookiePage.s1.body":
    "คุกกี้เหล่านี้ช่วยให้เว็บไซต์ทำงานเสถียร บันทึกการเลือกคุกกี้ และรองรับฟีเจอร์พื้นฐาน",
  "cookiePage.s2.title": "คุกกี้วิเคราะห์",
  "cookiePage.s2.body":
    "เราอาจใช้ข้อมูลรวมเพื่อเข้าใจว่าเนื้อหาใดมีประโยชน์ และปรับประสบการณ์การเข้าชม",
  "cookiePage.s3.title": "จัดการตัวเลือกของคุณ",
  "cookiePage.s3.body":
    "คุณสามารถยอมรับหรือปฏิเสธคุกกี้ที่ไม่จำเป็นบนแบนเนอร์ และลบคุกกี้ในการตั้งค่าเบราว์เซอร์ได้",
};

const privacyVi: Dict = {
  "privacy.title": "Chính sách bảo vệ dữ liệu cá nhân",
  "privacy.updated": "Cập nhật: 08/09/2026",
  "privacy.intro":
    "Chính sách này giải thích cách Công ty Cổ phần FB Network (thương hiệu Face Wash Fox) thu thập, sử dụng, lưu trữ và bảo vệ dữ liệu cá nhân theo Luật Bảo vệ dữ liệu cá nhân số 91/2025/QH15.",
  "privacy.contentAria": "Nội dung chính sách bảo vệ dữ liệu cá nhân",
  "privacy.s1.title": "1. Bên kiểm soát dữ liệu",
  "privacy.s1.body":
    "Công ty Cổ phần FB Network, mã số thuế 0316806815, người đại diện pháp luật Ngô Thúy Hằng, địa chỉ Lầu 2, Số 2 Song Hành, Phường Bình Trưng, TP Hồ Chí Minh. Email: info@facewashfox.com. Hotline: 0889 866 666.",
  "privacy.s2.title": "2. Mục đích xử lý",
  "privacy.s2.body":
    "Xác nhận đặt lịch, liên hệ chăm sóc khách hàng, kích hoạt và quản lý thẻ Foxie, xử lý yêu cầu hoàn hủy, cải thiện dịch vụ, tuân thủ nghĩa vụ pháp luật và gửi thông tin khi khách đã đồng ý.",
  "privacy.s3.title": "3. Dữ liệu được thu thập",
  "privacy.s3.body":
    "Họ tên, số điện thoại, email, chi nhánh mong muốn, ghi chú về nhu cầu chăm sóc da, lịch sử đặt lịch/mua thẻ và dữ liệu kỹ thuật cần thiết để vận hành website (cookie theo Chính sách Cookie).",
  "privacy.s4.title": "4. Thời gian lưu",
  "privacy.s4.body":
    "Dữ liệu đặt lịch và liên hệ được lưu tối đa 36 tháng kể từ lần tương tác gần nhất, hoặc lâu hơn nếu pháp luật yêu cầu (hóa đơn, khiếu nại, nghĩa vụ kế toán). Khi hết thời hạn, dữ liệu được xóa hoặc ẩn danh hóa.",
  "privacy.s5.title": "5. Bên thứ ba nhận dữ liệu",
  "privacy.s5.body":
    "Dữ liệu có thể được chia sẻ với nhà cung cấp hệ thống đặt lịch, email, lưu trữ máy chủ, đơn vị thanh toán (nếu có) và cơ quan nhà nước khi pháp luật yêu cầu. Face Wash Fox không bán dữ liệu cá nhân.",
  "privacy.s6.title": "6. Quyền của chủ thể dữ liệu",
  "privacy.s6.body":
    "Khách hàng có quyền được biết, đồng ý, truy cập, chỉnh sửa, xóa, hạn chế xử lý, phản đối, rút đồng ý và khiếu nại. Yêu cầu gửi tới info@facewashfox.com hoặc hotline 0889 866 666; phản hồi trong 15 ngày làm việc.",
  "privacy.s7.title": "7. Trẻ em dưới 16 tuổi",
  "privacy.s7.body":
    "Đối với khách dưới 16 tuổi, Face Wash Fox chỉ xử lý dữ liệu khi có sự đồng ý của người giám hộ đi cùng. Người giám hộ chịu trách nhiệm về tính chính xác của sự đồng ý đó.",
  "privacy.s8.title": "8. Chuyển dữ liệu ra nước ngoài",
  "privacy.s8.body":
    "Nếu nhà cung cấp công nghệ đặt máy chủ ngoài Việt Nam, việc chuyển dữ liệu (nếu có) được thực hiện theo quy định về chuyển dữ liệu cá nhân ra nước ngoài và chỉ ở phạm vi cần thiết để vận hành website.",
  "privacy.s9.title": "9. Liên hệ",
  "privacy.s9.body":
    "Mọi yêu cầu về dữ liệu cá nhân gửi Công ty Cổ phần FB Network qua info@facewashfox.com, hotline 0889 866 666, hoặc tại cửa hàng Face Wash Fox.",
  "privacy.contact.need": "Cần hỗ trợ về dữ liệu cá nhân?",
  "privacy.contact.title": "Liên hệ Face Wash Fox",
};

const privacyEn: Dict = {
  "privacy.title": "Personal Data Protection Policy",
  "privacy.updated": "Updated: 08/09/2026",
  "privacy.intro":
    "This policy explains how FB Network Joint Stock Company (Face Wash Fox) collects, uses, stores, and protects personal data under Vietnam’s Personal Data Protection Law No. 91/2025/QH15.",
  "privacy.contentAria": "Personal data protection policy content",
  "privacy.s1.title": "1. Data controller",
  "privacy.s1.body":
    "FB Network Joint Stock Company, tax code 0316806815, legal representative Ngo Thuy Hang, address Floor 2, No. 2 Song Hanh, Binh Trung Ward, Ho Chi Minh City. Email: info@facewashfox.com. Hotline: 0889 866 666.",
  "privacy.s2.title": "2. Purposes of processing",
  "privacy.s2.body":
    "Confirming bookings, customer care, activating and managing Foxie cards, handling refunds, improving services, meeting legal duties, and sending information when the customer has consented.",
  "privacy.s3.title": "3. Data we collect",
  "privacy.s3.body":
    "Name, phone number, email, preferred store, notes about skincare needs, booking/card history, and technical data needed to run the website (cookies under the Cookie Policy).",
  "privacy.s4.title": "4. Retention",
  "privacy.s4.body":
    "Booking and contact data are kept for up to 36 months after the last interaction, or longer if required by law (invoices, complaints, accounting). After that, data is deleted or anonymized.",
  "privacy.s5.title": "5. Recipients",
  "privacy.s5.body":
    "Data may be shared with booking, email, hosting, and payment providers (if any), and with authorities when required by law. Face Wash Fox does not sell personal data.",
  "privacy.s6.title": "6. Your rights",
  "privacy.s6.body":
    "You may be informed, consent, access, correct, delete, restrict, object, withdraw consent, and complain. Send requests to info@facewashfox.com or hotline 0889 866 666; we respond within 15 business days.",
  "privacy.s7.title": "7. Children under 16",
  "privacy.s7.body":
    "For guests under 16, we process data only with the accompanying guardian’s consent. The guardian is responsible for the accuracy of that consent.",
  "privacy.s8.title": "8. Cross-border transfer",
  "privacy.s8.body":
    "If a technology provider hosts servers outside Vietnam, any transfer is limited to what is needed to operate the website and follows rules on transferring personal data abroad.",
  "privacy.s9.title": "9. Contact",
  "privacy.s9.body":
    "Send personal-data requests to FB Network Joint Stock Company at info@facewashfox.com, hotline 0889 866 666, or any Face Wash Fox store.",
  "privacy.contact.need": "Need help with personal data?",
  "privacy.contact.title": "Contact Face Wash Fox",
};

export const legalDictionaries: Record<SiteLanguage, Dict> = {
  vi: { ...termsVi, ...cookiePageVi, ...privacyVi },
  en: { ...termsEn, ...cookiePageEn, ...privacyEn },
  zh: { ...termsZh, ...cookiePageZh, ...privacyEn },
  ja: { ...termsJa, ...cookiePageJa, ...privacyEn },
  ko: { ...termsKo, ...cookiePageKo, ...privacyEn },
  th: { ...termsTh, ...cookiePageTh, ...privacyEn },
};
