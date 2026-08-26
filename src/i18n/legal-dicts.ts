type SiteLanguage = "vi" | "zh" | "en" | "ja" | "ko" | "th";
type Dict = Record<string, string>;

const termsVi: Dict = {
  "terms.title": "Điều khoản & Điều kiện",
  "terms.updated": "Cập nhật: 19/08/2026",
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
  "terms.s3.title": "3. Thẻ dịch vụ, voucher và ưu đãi",
  "terms.s3.i1":
    "Thẻ dịch vụ, voucher và mã ưu đãi chỉ có giá trị trong thời hạn, phạm vi cửa hàng và điều kiện sử dụng được công bố kèm theo từng chương trình.",
  "terms.s3.i2":
    "Ưu đãi không tự động quy đổi thành tiền mặt, không hoàn tiền phần chưa sử dụng và không cộng dồn với chương trình khác, trừ khi Face Wash Fox có thông báo riêng.",
  "terms.s3.i3":
    "Face Wash Fox có quyền từ chối áp dụng voucher hoặc ưu đãi nếu phát hiện thông tin không hợp lệ, hết hạn, bị chỉnh sửa hoặc sử dụng sai điều kiện.",
  "terms.s4.title": "4. Giá, thanh toán và hoàn hủy",
  "terms.s4.i1":
    "Giá dịch vụ được niêm yết trên các kênh chính thức của Face Wash Fox và có thể thay đổi theo từng thời điểm, chi nhánh hoặc chương trình khuyến mãi.",
  "terms.s4.i2":
    "Khách hàng cần kiểm tra kỹ thông tin dịch vụ, gói mua và số tiền thanh toán trước khi xác nhận giao dịch.",
  "terms.s4.i3":
    "Chính sách hoàn hủy, đổi dịch vụ hoặc xử lý giao dịch phát sinh sẽ được xem xét theo tình trạng sử dụng thực tế, điều kiện của chương trình và quy định vận hành tại thời điểm yêu cầu.",
  "terms.s5.title": "5. Trách nhiệm của khách hàng",
  "terms.s5.i1":
    "Khách hàng cần thông báo cho nhân viên nếu có tiền sử dị ứng, đang điều trị da liễu, đang dùng hoạt chất mạnh hoặc có tình trạng da cần lưu ý trước khi sử dụng dịch vụ.",
  "terms.s5.i2":
    "Khách hàng không sử dụng website hoặc hệ thống đặt lịch để gửi thông tin sai lệch, gây gián đoạn vận hành, giả mạo người khác hoặc thực hiện hành vi trái pháp luật.",
  "terms.s5.i3":
    "Khách hàng chịu trách nhiệm bảo mật thông tin cá nhân, thiết bị và tài khoản liên hệ của mình khi tương tác với các kênh trực tuyến của Face Wash Fox.",
  "terms.s6.title": "6. Bảo mật thông tin",
  "terms.s6.i1":
    "Face Wash Fox thu thập và xử lý thông tin khách hàng nhằm xác nhận lịch hẹn, chăm sóc khách hàng, cải thiện dịch vụ và thực hiện các nghĩa vụ vận hành cần thiết.",
  "terms.s6.i2":
    "Thông tin cá nhân được bảo vệ theo quy trình nội bộ và chỉ được chia sẻ cho bên liên quan khi cần thiết để cung cấp dịch vụ, tuân thủ pháp luật hoặc có sự đồng ý phù hợp.",
  "terms.s6.i3":
    "Khách hàng có thể liên hệ Face Wash Fox để yêu cầu hỗ trợ về thông tin cá nhân đã cung cấp qua các kênh liên hệ chính thức.",
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
  "terms.updated": "Updated: 19/08/2026",
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
  "terms.s3.title": "3. Service cards, vouchers, and offers",
  "terms.s3.i1":
    "Service cards, vouchers, and promo codes are valid only within the period, store scope, and conditions stated for each program.",
  "terms.s3.i2":
    "Offers are not automatically convertible to cash, unused portions are non-refundable, and they cannot be stacked with other programs unless Face Wash Fox states otherwise.",
  "terms.s3.i3":
    "Face Wash Fox may refuse vouchers or offers that are invalid, expired, altered, or used outside stated conditions.",
  "terms.s4.title": "4. Pricing, payment, and cancellation",
  "terms.s4.i1":
    "Service prices are listed on Face Wash Fox official channels and may change by time, branch, or promotion.",
  "terms.s4.i2":
    "Please carefully check service details, packages, and amounts before confirming payment.",
  "terms.s4.i3":
    "Cancellation, exchange, or dispute handling depends on actual usage, program conditions, and operating rules at the time of the request.",
  "terms.s5.title": "5. Customer responsibilities",
  "terms.s5.i1":
    "Tell staff about allergies, dermatology treatment, strong actives, or skin concerns before service.",
  "terms.s5.i2":
    "Do not use the website or booking system to send false information, disrupt operations, impersonate others, or break the law.",
  "terms.s5.i3":
    "Customers are responsible for securing personal information, devices, and contact accounts when using Face Wash Fox online channels.",
  "terms.s6.title": "6. Information security",
  "terms.s6.i1":
    "Face Wash Fox collects and processes customer information to confirm bookings, provide care, improve services, and meet operational obligations.",
  "terms.s6.i2":
    "Personal data is protected under internal processes and shared with relevant parties only when needed for service delivery, legal compliance, or with appropriate consent.",
  "terms.s6.i3":
    "Customers may contact Face Wash Fox via official channels for help regarding personal information they provided.",
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
  "terms.s3.title": "3. 服务卡、代金券与优惠",
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
  "terms.s3.title": "3. サービスカード、バウチャー、特典",
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
  "terms.s3.title": "3. 서비스 카드, 바우처, 혜택",
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
  "terms.s3.title": "3. บัตรบริการ วอยเชอร์ และสิทธิพิเศษ",
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

export const legalDictionaries: Record<SiteLanguage, Dict> = {
  vi: { ...termsVi, ...cookiePageVi },
  en: { ...termsEn, ...cookiePageEn },
  zh: { ...termsZh, ...cookiePageZh },
  ja: { ...termsJa, ...cookiePageJa },
  ko: { ...termsKo, ...cookiePageKo },
  th: { ...termsTh, ...cookiePageTh },
};
