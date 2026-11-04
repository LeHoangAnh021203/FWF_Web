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
  "terms.updated": "Last updated: 08/09/2026",
  "terms.intro":
    "These terms govern how customers access the website, book appointments, use our services, receive offers and interact with the Face Wash Fox store network.",
  "terms.summaryAria": "Summary of terms",
  "terms.contentAria": "Full terms",
  "terms.sum.1.title": "Services",
  "terms.sum.1.body": "Booking, using treatments and working with our stores.",
  "terms.sum.2.title": "Payments",
  "terms.sum.2.body": "Prices, offers, vouchers, service cards and transaction handling.",
  "terms.sum.3.title": "Data",
  "terms.sum.3.body": "How Face Wash Fox receives, uses and protects customer information.",
  "terms.s1.title": "1. Scope",
  "terms.s1.i1":
    "These terms apply when customers visit the website, book appointments, use services, purchase cards, receive vouchers or take part in Face Wash Fox promotions.",
  "terms.s1.i2":
    "By continuing to use the website or our services, customers are deemed to have read, understood and accepted the terms published at the time of use.",
  "terms.s2.title": "2. Booking and use of services",
  "terms.s2.i1":
    "Customers must provide accurate contact details so that Face Wash Fox can confirm appointments, assist with rescheduling and handle related requests.",
  "terms.s2.i2":
    "Face Wash Fox may adjust service times if a store is at capacity, equipment is under maintenance, a force majeure event occurs or unexpected operational issues arise.",
  "terms.s2.i3":
    "Customers should notify us in advance if they need to change or cancel an appointment so the store can arrange staff and time slots accordingly.",
  "terms.s2.i4":
    "Customers under 16 must be accompanied by a parent or guardian, whose consent is required before any service is performed and before any personal data is provided.",
  "terms.s3.title": "3. Foxie cards, vouchers and offers",
  "terms.s3.i1":
    "The Foxie membership card is a prepaid card that entitles the holder to member prices across our store network. It is distinct from promotional vouchers and codes, and the two are governed by separate rules.",
  "terms.s3.i2":
    "Vouchers and promo codes are valid only within the period, stores and conditions announced with each promotion. They cannot be exchanged for cash and are non-refundable, unless required by law or otherwise announced by Face Wash Fox.",
  "terms.s3.i3":
    "The Foxie card is not a non-cash payment instrument, is not issued as virtual currency and is not automatically convertible to cash.",
  "terms.s3.i4":
    "Foxie cards are valid for 36 months from activation unless the card's terms state otherwise. Upon expiry, any unused balance is not automatically extended.",
  "terms.s3.i5":
    "Cards may be shared with family or friends with the cardholder's consent. Sharing does not change ownership of the balance and does not turn the card into a means of payment between the parties.",
  "terms.s3.i6":
    "If a store closes, the remaining balance can be used at other stores in our network. If the entire network ceases operations, any unused balance will be refunded in accordance with consumer protection law.",
  "terms.s4.title": "4. Prices, payment and cancellations",
  "terms.s4.i1":
    "Services are offered at two price levels: member prices (Foxie cardholders) and standard prices (customers without a card). Prices are published on our official channels and may change over time or by promotion.",
  "terms.s4.i2":
    "Customers should carefully check the service details, package and payment amount before confirming a transaction.",
  "terms.s4.i3":
    "Appointment cancellations: at least 24 hours before — 100% refund of the unused session; between 24 hours and 2 hours before — 50% refund; less than 2 hours before or no-show — the session is non-refundable.",
  "terms.s4.i4":
    "Unused Foxie card balance: customers may submit a written request via info@facewashfox.com or hotline 0889 866 666. Face Wash Fox will respond within 15 business days and refund the unused balance in line with the card rules, less any reasonable costs incurred (if applicable and notified in advance).",
  "terms.s4.i5":
    "Complaints about payments or refunds are accepted in writing within 30 days of the event. The outcome will be communicated in writing to the registered email address or phone number.",
  "terms.s5.title": "5. Customer responsibilities",
  "terms.s5.i1":
    "Before using a service, customers should inform our staff of any history of allergies, ongoing dermatological treatment, use of strong active ingredients or any skin condition that requires attention.",
  "terms.s5.i2":
    "Customers must not use the website or booking system to submit false information, disrupt operations, impersonate others or engage in any unlawful activity.",
  "terms.s5.i3":
    "Customers are responsible for keeping their personal information, devices and contact accounts secure when interacting with Face Wash Fox's online channels.",
  "terms.s6.title": "6. Information security",
  "terms.s6.i1":
    "The collection and processing of personal data is set out in detail in our Personal Data Protection Policy, which forms an integral part of these terms.",
  "terms.s6.i2":
    "Face Wash Fox processes data only on an appropriate legal basis, including customer consent, performance of the service contract or compliance with legal obligations.",
  "terms.s6.i3":
    "Customers may exercise their rights to access, correct or delete data, withdraw consent or lodge a complaint via info@facewashfox.com or hotline 0889 866 666.",
  "terms.s7.title": "7. Disclaimers and limitation of liability",
  "terms.s7.i1":
    "Face Wash Fox makes every effort to keep website information accurate but does not guarantee that all content will always be free of technical errors, display issues or temporary interruptions.",
  "terms.s7.i2":
    "Face Wash Fox is not liable for any loss arising from inaccurate information provided by customers, failure to follow service instructions or the customer's own use of information outside professional advice.",
  "terms.s7.i3":
    "Third-party links, platforms or services, if any, are governed by the respective third party's own policies.",
  "terms.s8.title": "8. Changes to these terms",
  "terms.s8.i1":
    "Face Wash Fox may update these terms to reflect changes in our services, the law, operating policies or promotional programs.",
  "terms.s8.i2":
    "New versions take effect upon publication on the website. Customers are encouraged to check back regularly for the latest updates.",
  "terms.contact.need": "Need further assistance?",
  "terms.contact.title": "Contact Face Wash Fox",
  "terms.contact.findStore": "Find a store near you",
};

const termsZh: Dict = {
  "terms.title": "条款与条件",
  "terms.updated": "更新日期：08/09/2026",
  "terms.intro":
    "以下条款规定了顾客访问网站、预约、使用服务、领取优惠以及与 Face Wash Fox 门店网络互动的相关事项。",
  "terms.summaryAria": "条款摘要",
  "terms.contentAria": "条款全文",
  "terms.sum.1.title": "服务",
  "terms.sum.1.body": "预约、疗程使用及与门店协调的相关信息。",
  "terms.sum.2.title": "支付",
  "terms.sum.2.body": "价格、优惠、代金券、服务卡及相关交易处理。",
  "terms.sum.3.title": "数据",
  "terms.sum.3.body": "Face Wash Fox 如何接收、使用和保护顾客信息。",
  "terms.s1.title": "1. 适用范围",
  "terms.s1.i1":
    "本条款适用于顾客访问网站、预约、使用服务、购买会员卡、领取代金券或参与 Face Wash Fox 优惠活动的情形。",
  "terms.s1.i2": "顾客继续使用网站或服务，即视为已阅读、理解并同意使用时所公布的条款。",
  "terms.s2.title": "2. 预约与服务使用",
  "terms.s2.i1": "顾客须提供准确的联系方式，以便 Face Wash Fox 确认预约、协助改约或处理相关请求。",
  "terms.s2.i2": "如遇门店客满、设备维护、不可抗力或其他意外运营情况，Face Wash Fox 可调整服务时间。",
  "terms.s2.i3": "如需改约或取消预约，请提前告知，以便门店合理安排人员和时段。",
  "terms.s2.i4": "16 岁以下顾客须由监护人陪同，并在使用服务及提供个人数据前取得监护人同意。",
  "terms.s3.title": "3. Foxie 会员卡、代金券与优惠",
  "terms.s3.i1":
    "Foxie 会员卡是在门店网络享受会员价的预付卡，与促销代金券/优惠码不同，两者适用不同的规则。",
  "terms.s3.i2":
    "代金券和优惠码仅在活动公布的有效期、适用门店和条件范围内有效；不可兑换现金、不予退款，法律另有强制规定或 Face Wash Fox 另行通知的除外。",
  "terms.s3.i3": "Foxie 会员卡不属于非现金支付工具，不以虚拟货币形式发行，也不会自动兑换为现金。",
  "terms.s3.i4": "除卡片附带条款另有规定外，Foxie 会员卡自激活之日起有效期为 36 个月。到期后，未使用余额不会自动延期。",
  "terms.s3.i5":
    "经持卡人同意，会员卡可与亲友共享使用。共享使用不改变余额的所有权，也不会使会员卡成为各方之间的支付工具。",
  "terms.s3.i6":
    "如某家门店关闭，剩余余额可在系统内其他门店继续使用。如整个系统停止营业，未使用余额将依照消费者权益保护法律予以退还。",
  "terms.s4.title": "4. 价格、支付与取消",
  "terms.s4.i1":
    "服务价格分为两档：会员价（Foxie 持卡人）和门市价（未持卡顾客）。价格在官方渠道公布，并可能随时间或活动而调整。",
  "terms.s4.i2": "顾客在确认交易前，应仔细核对服务信息、所购套餐及付款金额。",
  "terms.s4.i3":
    "取消预约：提前至少 24 小时取消，退还未使用疗程 100% 费用；提前 24 小时至 2 小时取消，退还 50%；临近预约时间取消或未到店，该次疗程不予退款。",
  "terms.s4.i4":
    "Foxie 会员卡未使用余额：顾客可通过邮箱 info@facewashfox.com 或热线 0889 866 666 提交书面申请。Face Wash Fox 将在 15 个工作日内回复，并按会员卡规则退还未使用余额，扣除已产生的合理费用（如有且已事先告知）。",
  "terms.s4.i5": "有关支付或退款的投诉，须自事件发生之日起 30 日内以书面形式提出。处理结果将以书面形式通过注册邮箱或电话号码通知。",
  "terms.s5.title": "5. 顾客责任",
  "terms.s5.i1": "如有过敏史、正在接受皮肤科治疗、正在使用强效活性成分或存在需特别注意的皮肤状况，顾客应在使用服务前告知工作人员。",
  "terms.s5.i2": "顾客不得利用网站或预约系统提交虚假信息、干扰运营、冒充他人或从事违法行为。",
  "terms.s5.i3": "顾客在使用 Face Wash Fox 线上渠道时，应负责保护自身的个人信息、设备及联系账户安全。",
  "terms.s6.title": "6. 信息安全",
  "terms.s6.i1": "个人数据的收集和处理详见《个人数据保护政策》，该政策是本条款不可分割的组成部分。",
  "terms.s6.i2": "Face Wash Fox 仅在具备适当法律依据时处理数据，包括顾客同意、履行服务合同或履行法定义务。",
  "terms.s6.i3": "顾客可通过邮箱 info@facewashfox.com 或热线 0889 866 666 行使查阅、更正、删除、撤回同意或投诉的权利。",
  "terms.s7.title": "7. 免责与责任限制",
  "terms.s7.i1": "Face Wash Fox 尽力确保网站信息准确，但不保证所有内容始终不存在技术错误、显示问题或暂时性访问中断。",
  "terms.s7.i2": "因顾客提供不准确信息、未遵守服务使用指引或自行采用专业建议以外的信息而造成的损失，Face Wash Fox 不承担责任。",
  "terms.s7.i3": "第三方链接、平台或服务（如有）受该第三方自身政策约束。",
  "terms.s8.title": "8. 条款变更",
  "terms.s8.i1": "Face Wash Fox 可根据服务、法律、运营政策或优惠活动的变化更新本条款。",
  "terms.s8.i2": "新版本自在网站公布之日起生效。建议顾客定期查看，以了解最新更新。",
  "terms.contact.need": "需要更多帮助？",
  "terms.contact.title": "联系 Face Wash Fox",
  "terms.contact.findStore": "查找附近门店",
};

const termsJa: Dict = {
  "terms.title": "利用規約",
  "terms.updated": "最終更新日：08/09/2026",
  "terms.intro":
    "本規約は、ウェブサイトの閲覧、ご予約、サービスのご利用、特典の受け取り、および Face Wash Fox 店舗ネットワークとのやり取りについて定めるものです。",
  "terms.summaryAria": "規約の概要",
  "terms.contentAria": "規約本文",
  "terms.sum.1.title": "サービス",
  "terms.sum.1.body": "ご予約、施術のご利用、店舗との調整について。",
  "terms.sum.2.title": "お支払い",
  "terms.sum.2.body": "料金、特典、バウチャー、サービスカード、取引の取り扱いについて。",
  "terms.sum.3.title": "データ",
  "terms.sum.3.body": "Face Wash Fox がお客様情報を受領・利用・保護する方法について。",
  "terms.s1.title": "1. 適用範囲",
  "terms.s1.i1":
    "本規約は、お客様がウェブサイトの閲覧、ご予約、サービスのご利用、カードのご購入、バウチャーの受け取り、または Face Wash Fox のキャンペーンへのご参加を行う場合に適用されます。",
  "terms.s1.i2":
    "ウェブサイトまたはサービスを引き続きご利用いただいた場合、ご利用時点で公表されている規約を読み、理解し、同意したものとみなされます。",
  "terms.s2.title": "2. ご予約とサービスのご利用",
  "terms.s2.i1": "Face Wash Fox がご予約の確認、日時変更のサポート、関連するご要望への対応を行えるよう、正確な連絡先をご提供ください。",
  "terms.s2.i2": "店舗の混雑、機器のメンテナンス、不可抗力、または予期せぬ運営上の事情が生じた場合、Face Wash Fox はサービス時間を調整することがあります。",
  "terms.s2.i3": "ご予約の変更・キャンセルが必要な場合は、店舗がスタッフと時間枠を調整できるよう、事前にご連絡ください。",
  "terms.s2.i4": "16歳未満のお客様は保護者の同伴が必要であり、サービスのご利用および個人データのご提供前に保護者の同意が必要です。",
  "terms.s3.title": "3. Foxieカード、バウチャー、特典",
  "terms.s3.i1":
    "Foxie メンバーズカードは、店舗ネットワークで会員価格を受けるためのプリペイドカードであり、バウチャー／クーポンコードとは異なります。両者には別々の規定が適用されます。",
  "terms.s3.i2":
    "バウチャーおよびクーポンコードは、キャンペーンで告知された有効期間・対象店舗・条件の範囲内でのみ有効です。現金への交換および返金はできません。ただし、法令で義務付けられている場合や Face Wash Fox が別途告知した場合を除きます。",
  "terms.s3.i3": "Foxie カードはキャッシュレス決済手段ではなく、仮想通貨として発行されるものでもなく、自動的に現金へ交換されることもありません。",
  "terms.s3.i4": "カードに付随する条件に別段の定めがない限り、Foxie カードの有効期間は有効化日から36か月です。有効期限が切れた場合、未使用残高は自動的に延長されません。",
  "terms.s3.i5":
    "カード保有者の同意があれば、ご家族やご友人とカードを共有できます。共有によって残高の所有権が変わることはなく、当事者間の決済手段となるものでもありません。",
  "terms.s3.i6":
    "店舗が閉店した場合、残高はグループ内の他店舗で引き続きご利用いただけます。全店舗が営業を終了する場合は、未使用残高を消費者保護に関する法令に基づき返金いたします。",
  "terms.s4.title": "4. 料金、お支払い、キャンセル",
  "terms.s4.i1":
    "サービス料金は、会員価格（Foxie カード会員）と通常価格（カード未保有のお客様）の2種類です。料金は公式チャネルで公表され、時期やキャンペーンにより変更される場合があります。",
  "terms.s4.i2": "お取引を確定する前に、サービス内容、ご購入プラン、お支払い金額を十分にご確認ください。",
  "terms.s4.i3":
    "ご予約のキャンセル：予約の24時間前まで — 未利用分を100%返金、24時間前〜2時間前 — 50%返金、直前または無断キャンセル — 該当回分は返金不可。",
  "terms.s4.i4":
    "Foxie カードの未使用残高：メール（info@facewashfox.com）またはホットライン 0889 866 666 より書面でご請求ください。Face Wash Fox は15営業日以内に回答し、カード規定に基づき未使用残高を返金します（発生した合理的な費用がある場合、事前通知のうえ差し引きます）。",
  "terms.s4.i5": "お支払いまたは返金に関する苦情は、発生日から30日以内に書面にて受け付けます。結果はご登録のメールアドレスまたは電話番号宛てに書面でご連絡します。",
  "terms.s5.title": "5. お客様の責任",
  "terms.s5.i1": "アレルギー歴、皮膚科での治療中、強い有効成分の使用中、または注意が必要な肌状態がある場合は、サービスご利用前にスタッフへお知らせください。",
  "terms.s5.i2": "ウェブサイトや予約システムを利用して、虚偽情報の送信、運営の妨害、他人へのなりすまし、その他違法な行為を行わないでください。",
  "terms.s5.i3": "Face Wash Fox のオンラインチャネルをご利用の際は、ご自身の個人情報、端末、連絡用アカウントの安全管理にご留意ください。",
  "terms.s6.title": "6. 情報セキュリティ",
  "terms.s6.i1": "個人データの収集および取り扱いについては、本規約と一体をなす「個人データ保護方針」に詳しく定めています。",
  "terms.s6.i2": "Face Wash Fox は、お客様の同意、サービス契約の履行、または法的義務の遵守など、適切な法的根拠がある場合にのみデータを取り扱います。",
  "terms.s6.i3": "データの開示・訂正・削除、同意の撤回、苦情の申し立ては、メール（info@facewashfox.com）またはホットライン 0889 866 666 までご連絡ください。",
  "terms.s7.title": "7. 免責および責任の制限",
  "terms.s7.i1": "Face Wash Fox はウェブサイト上の情報の正確性維持に努めますが、すべての内容に技術的な誤り、表示の不具合、一時的なアクセス障害が生じないことを保証するものではありません。",
  "terms.s7.i2": "お客様が提供した不正確な情報、サービス利用上の案内に従わなかったこと、または専門的な助言以外の情報を自己判断で用いたことにより生じた損害について、Face Wash Fox は責任を負いません。",
  "terms.s7.i3": "第三者のリンク、プラットフォーム、サービス（ある場合）は、当該第三者の規定に従います。",
  "terms.s8.title": "8. 規約の変更",
  "terms.s8.i1": "Face Wash Fox は、サービス、法令、運営方針、キャンペーンの変更に合わせて本規約を更新することがあります。",
  "terms.s8.i2": "新しい規約はウェブサイトでの公表時点から効力を生じます。最新の内容を定期的にご確認ください。",
  "terms.contact.need": "その他ご不明な点はありますか？",
  "terms.contact.title": "Face Wash Fox へのお問い合わせ",
  "terms.contact.findStore": "お近くの店舗を探す",
};

const termsKo: Dict = {
  "terms.title": "이용약관",
  "terms.updated": "최종 업데이트: 08/09/2026",
  "terms.intro":
    "본 약관은 고객의 웹사이트 이용, 예약, 서비스 이용, 혜택 수령 및 Face Wash Fox 매장 네트워크와의 상호작용에 관한 사항을 규정합니다.",
  "terms.summaryAria": "약관 요약",
  "terms.contentAria": "약관 전문",
  "terms.sum.1.title": "서비스",
  "terms.sum.1.body": "예약, 케어 이용 및 매장과의 협의 관련 정보.",
  "terms.sum.2.title": "결제",
  "terms.sum.2.body": "가격, 혜택, 바우처, 서비스 카드 및 거래 처리.",
  "terms.sum.3.title": "데이터",
  "terms.sum.3.body": "Face Wash Fox가 고객 정보를 수집·이용·보호하는 방법.",
  "terms.s1.title": "1. 적용 범위",
  "terms.s1.i1":
    "본 약관은 고객이 웹사이트를 이용하거나, 예약, 서비스 이용, 카드 구매, 바우처 수령 또는 Face Wash Fox 프로모션에 참여하는 경우에 적용됩니다.",
  "terms.s1.i2": "웹사이트 또는 서비스를 계속 이용하는 경우, 고객은 이용 시점에 게시된 약관을 읽고 이해하며 동의한 것으로 간주됩니다.",
  "terms.s2.title": "2. 예약 및 서비스 이용",
  "terms.s2.i1": "Face Wash Fox가 예약 확인, 일정 변경 지원 및 관련 요청을 처리할 수 있도록 정확한 연락처를 제공해 주셔야 합니다.",
  "terms.s2.i2": "매장 혼잡, 장비 점검, 불가항력 또는 예기치 못한 운영상 문제가 발생한 경우 Face Wash Fox는 서비스 시간을 조정할 수 있습니다.",
  "terms.s2.i3": "예약 변경 또는 취소가 필요한 경우, 매장이 인력과 시간대를 조정할 수 있도록 미리 알려 주시기 바랍니다.",
  "terms.s2.i4": "16세 미만 고객은 보호자가 동행해야 하며, 서비스 이용 및 개인정보 제공 전에 보호자의 동의가 필요합니다.",
  "terms.s3.title": "3. Foxie 카드, 바우처 및 혜택",
  "terms.s3.i1":
    "Foxie 멤버십 카드는 매장 네트워크에서 회원가를 적용받는 선불카드로, 프로모션 바우처/할인 코드와는 구별되며 각각 별도의 규정이 적용됩니다.",
  "terms.s3.i2":
    "바우처와 할인 코드는 프로모션과 함께 공지된 기간, 매장 및 조건 내에서만 유효하며, 현금으로 교환하거나 환불할 수 없습니다. 단, 법령상 의무가 있거나 Face Wash Fox가 별도로 공지한 경우는 예외입니다.",
  "terms.s3.i3": "Foxie 카드는 비현금 결제 수단이 아니며, 가상화폐 형태로 발행되지 않고, 자동으로 현금으로 전환되지 않습니다.",
  "terms.s3.i4": "카드 이용 조건에 별도 명시가 없는 한 Foxie 카드의 유효기간은 활성화일로부터 36개월입니다. 유효기간이 만료되면 미사용 잔액은 자동으로 연장되지 않습니다.",
  "terms.s3.i5": "카드 소지자의 동의가 있으면 가족이나 친구와 카드를 함께 사용할 수 있습니다. 공동 사용으로 잔액의 소유권이 변경되지 않으며, 당사자 간 결제 수단이 되지도 않습니다.",
  "terms.s3.i6": "매장이 폐점하는 경우 남은 잔액은 다른 매장에서 계속 사용할 수 있습니다. 전체 매장이 영업을 중단하는 경우, 미사용 잔액은 소비자 보호 관련 법령에 따라 환불됩니다.",
  "terms.s4.title": "4. 가격, 결제 및 취소",
  "terms.s4.i1":
    "서비스 가격은 회원가(Foxie 카드 회원)와 일반가(카드 미보유 고객) 두 가지입니다. 가격은 공식 채널에 게시되며 시기나 프로모션에 따라 변경될 수 있습니다.",
  "terms.s4.i2": "거래를 확정하기 전에 서비스 내용, 구매 패키지 및 결제 금액을 꼼꼼히 확인해 주시기 바랍니다.",
  "terms.s4.i3":
    "예약 취소: 예약 24시간 전까지 — 미이용 회차 100% 환불, 24시간 전~2시간 전 — 50% 환불, 임박 취소 또는 노쇼 — 해당 회차 환불 불가.",
  "terms.s4.i4":
    "Foxie 카드 미사용 잔액: 이메일(info@facewashfox.com) 또는 고객센터 0889 866 666으로 서면 요청해 주시기 바랍니다. Face Wash Fox는 영업일 기준 15일 이내에 답변하며, 카드 규정에 따라 미사용 잔액을 환불합니다(발생한 합리적 비용이 있는 경우 사전 고지 후 공제).",
  "terms.s4.i5": "결제 또는 환불 관련 민원은 발생일로부터 30일 이내에 서면으로 접수합니다. 처리 결과는 등록된 이메일 또는 전화번호로 서면 안내드립니다.",
  "terms.s5.title": "5. 고객의 책임",
  "terms.s5.i1": "알레르기 이력, 피부과 치료 중, 강한 활성 성분 사용 중이거나 주의가 필요한 피부 상태가 있는 경우, 서비스 이용 전에 직원에게 알려 주셔야 합니다.",
  "terms.s5.i2": "웹사이트나 예약 시스템을 이용하여 허위 정보를 제출하거나, 운영을 방해하거나, 타인을 사칭하거나, 불법 행위를 해서는 안 됩니다.",
  "terms.s5.i3": "Face Wash Fox의 온라인 채널을 이용할 때 개인정보, 기기 및 연락 계정의 보안은 고객 본인의 책임입니다.",
  "terms.s6.title": "6. 정보 보안",
  "terms.s6.i1": "개인정보의 수집 및 처리는 본 약관의 불가분의 일부인 개인정보 보호정책에 자세히 규정되어 있습니다.",
  "terms.s6.i2": "Face Wash Fox는 고객 동의, 서비스 계약 이행 또는 법적 의무 준수 등 적절한 법적 근거가 있는 경우에만 데이터를 처리합니다.",
  "terms.s6.i3": "고객은 이메일(info@facewashfox.com) 또는 고객센터 0889 866 666을 통해 열람, 정정, 삭제, 동의 철회 또는 민원 제기 권리를 행사할 수 있습니다.",
  "terms.s7.title": "7. 면책 및 책임의 제한",
  "terms.s7.i1": "Face Wash Fox는 웹사이트 정보의 정확성을 유지하기 위해 노력하지만, 모든 콘텐츠에 기술적 오류, 표시 오류 또는 일시적인 접속 장애가 없음을 보장하지는 않습니다.",
  "terms.s7.i2": "고객이 부정확한 정보를 제공하거나, 서비스 이용 안내를 따르지 않거나, 전문 상담 외의 정보를 임의로 적용하여 발생한 손해에 대해 Face Wash Fox는 책임을 지지 않습니다.",
  "terms.s7.i3": "제3자 링크, 플랫폼 또는 서비스(있는 경우)는 해당 제3자의 자체 정책을 따릅니다.",
  "terms.s8.title": "8. 약관의 변경",
  "terms.s8.i1": "Face Wash Fox는 서비스, 법령, 운영 정책 또는 프로모션의 변경에 맞춰 약관을 업데이트할 수 있습니다.",
  "terms.s8.i2": "변경된 약관은 웹사이트에 게시된 시점부터 효력이 발생합니다. 최신 내용을 정기적으로 확인해 주시기 바랍니다.",
  "terms.contact.need": "추가 도움이 필요하신가요?",
  "terms.contact.title": "Face Wash Fox 문의하기",
  "terms.contact.findStore": "가까운 매장 찾기",
};

const termsTh: Dict = {
  "terms.title": "ข้อกำหนดและเงื่อนไข",
  "terms.updated": "อัปเดตล่าสุด: 08/09/2026",
  "terms.intro":
    "ข้อกำหนดนี้กำหนดหลักเกณฑ์การเข้าใช้เว็บไซต์ การจอง การใช้บริการ การรับสิทธิพิเศษ และการติดต่อกับเครือข่ายสาขา Face Wash Fox",
  "terms.summaryAria": "สรุปข้อกำหนด",
  "terms.contentAria": "ข้อกำหนดฉบับเต็ม",
  "terms.sum.1.title": "บริการ",
  "terms.sum.1.body": "การจอง การใช้ทรีตเมนต์ และการประสานงานกับสาขา",
  "terms.sum.2.title": "การชำระเงิน",
  "terms.sum.2.body": "ราคา สิทธิพิเศษ วอยเชอร์ บัตรบริการ และการดำเนินการธุรกรรม",
  "terms.sum.3.title": "ข้อมูล",
  "terms.sum.3.body": "วิธีที่ Face Wash Fox รับ ใช้ และคุ้มครองข้อมูลลูกค้า",
  "terms.s1.title": "1. ขอบเขตการบังคับใช้",
  "terms.s1.i1":
    "ข้อกำหนดนี้ใช้บังคับเมื่อลูกค้าเข้าใช้เว็บไซต์ จองคิว ใช้บริการ ซื้อบัตร รับวอยเชอร์ หรือเข้าร่วมโปรโมชั่นของ Face Wash Fox",
  "terms.s1.i2": "การใช้เว็บไซต์หรือบริการต่อไป ถือว่าลูกค้าได้อ่าน เข้าใจ และยอมรับข้อกำหนดที่เผยแพร่ ณ เวลาที่ใช้งานแล้ว",
  "terms.s2.title": "2. การจองและการใช้บริการ",
  "terms.s2.i1": "ลูกค้าต้องให้ข้อมูลติดต่อที่ถูกต้อง เพื่อให้ Face Wash Fox ยืนยันนัดหมาย ช่วยเปลี่ยนนัด หรือดำเนินการตามคำขอที่เกี่ยวข้อง",
  "terms.s2.i2": "Face Wash Fox อาจปรับเวลาให้บริการในกรณีที่สาขามีลูกค้าเต็ม อุปกรณ์อยู่ระหว่างบำรุงรักษา เกิดเหตุสุดวิสัย หรือมีปัญหาการดำเนินงานที่ไม่คาดคิด",
  "terms.s2.i3": "หากต้องการเปลี่ยนหรือยกเลิกนัด กรุณาแจ้งล่วงหน้า เพื่อให้สาขาจัดพนักงานและช่วงเวลาได้อย่างเหมาะสม",
  "terms.s2.i4": "ลูกค้าอายุต่ำกว่า 16 ปีต้องมีผู้ปกครองมาด้วย และต้องได้รับความยินยอมจากผู้ปกครองก่อนใช้บริการและก่อนให้ข้อมูลส่วนบุคคล",
  "terms.s3.title": "3. บัตร Foxie วอยเชอร์ และสิทธิพิเศษ",
  "terms.s3.i1":
    "บัตรสมาชิก Foxie เป็นบัตรเติมเงินล่วงหน้าสำหรับรับราคาสมาชิกในเครือข่ายสาขา ซึ่งแตกต่างจากวอยเชอร์/โค้ดโปรโมชั่น และใช้ระเบียบแยกกัน",
  "terms.s3.i2":
    "วอยเชอร์และโค้ดส่วนลดมีผลเฉพาะภายในระยะเวลา สาขา และเงื่อนไขที่ประกาศพร้อมโปรโมชั่น ไม่สามารถแลกเป็นเงินสดและไม่สามารถขอคืนเงินได้ เว้นแต่กฎหมายกำหนดหรือ Face Wash Fox ประกาศเป็นอย่างอื่น",
  "terms.s3.i3": "บัตร Foxie ไม่ใช่เครื่องมือชำระเงินแบบไม่ใช้เงินสด ไม่ได้ออกในรูปแบบสกุลเงินเสมือน และไม่ถูกแปลงเป็นเงินสดโดยอัตโนมัติ",
  "terms.s3.i4": "บัตร Foxie มีอายุ 36 เดือนนับจากวันที่เปิดใช้งาน เว้นแต่เงื่อนไขของบัตรระบุไว้เป็นอย่างอื่น เมื่อหมดอายุ ยอดคงเหลือที่ยังไม่ได้ใช้จะไม่ถูกต่ออายุโดยอัตโนมัติ",
  "terms.s3.i5": "บัตรสามารถใช้ร่วมกับครอบครัวหรือเพื่อนได้โดยความยินยอมของผู้ถือบัตร การใช้ร่วมกันไม่เปลี่ยนแปลงกรรมสิทธิ์ในยอดคงเหลือ และไม่ทำให้บัตรกลายเป็นเครื่องมือชำระเงินระหว่างคู่กรณี",
  "terms.s3.i6": "หากสาขาใดปิดตัว ยอดคงเหลือยังใช้ได้ที่สาขาอื่นในเครือ หากทั้งเครือยุติการดำเนินงาน ยอดที่ยังไม่ได้ใช้จะได้รับคืนตามกฎหมายคุ้มครองผู้บริโภค",
  "terms.s4.title": "4. ราคา การชำระเงิน และการยกเลิก",
  "terms.s4.i1":
    "ราคาบริการมีสองระดับ: ราคาสมาชิก (ผู้ถือบัตร Foxie) และราคาปกติ (ลูกค้าที่ยังไม่มีบัตร) ราคาประกาศบนช่องทางอย่างเป็นทางการ และอาจเปลี่ยนแปลงตามช่วงเวลาหรือโปรโมชั่น",
  "terms.s4.i2": "ลูกค้าควรตรวจสอบรายละเอียดบริการ แพ็กเกจที่ซื้อ และยอดชำระให้ถูกต้องก่อนยืนยันธุรกรรม",
  "terms.s4.i3":
    "การยกเลิกนัด: ล่วงหน้าอย่างน้อย 24 ชั่วโมง — คืนเงิน 100% สำหรับครั้งที่ยังไม่ได้ใช้ ระหว่าง 24 ถึง 2 ชั่วโมงก่อนนัด — คืนเงิน 50% ยกเลิกกระชั้นชิดหรือไม่มาตามนัด — ไม่คืนเงินสำหรับครั้งนั้น",
  "terms.s4.i4":
    "ยอดคงเหลือในบัตร Foxie ที่ยังไม่ได้ใช้: ลูกค้าส่งคำขอเป็นลายลักษณ์อักษรทางอีเมล info@facewashfox.com หรือสายด่วน 0889 866 666 Face Wash Fox จะตอบกลับภายใน 15 วันทำการ และคืนยอดที่ยังไม่ได้ใช้ตามระเบียบบัตร โดยหักค่าใช้จ่ายที่สมเหตุสมผลซึ่งเกิดขึ้นแล้ว (ถ้ามีและได้แจ้งล่วงหน้า)",
  "terms.s4.i5": "ข้อร้องเรียนเกี่ยวกับการชำระเงินหรือการคืนเงิน รับเป็นลายลักษณ์อักษรภายใน 30 วันนับจากวันที่เกิดเหตุ ผลการพิจารณาจะแจ้งเป็นลายลักษณ์อักษรทางอีเมลหรือเบอร์โทรศัพท์ที่ลงทะเบียนไว้",
  "terms.s5.title": "5. ความรับผิดชอบของลูกค้า",
  "terms.s5.i1": "ลูกค้าควรแจ้งพนักงานก่อนใช้บริการ หากมีประวัติแพ้ อยู่ระหว่างการรักษาทางผิวหนัง ใช้สารออกฤทธิ์เข้มข้น หรือมีสภาพผิวที่ต้องระมัดระวัง",
  "terms.s5.i2": "ลูกค้าต้องไม่ใช้เว็บไซต์หรือระบบจองเพื่อส่งข้อมูลเท็จ รบกวนการดำเนินงาน แอบอ้างเป็นผู้อื่น หรือกระทำการที่ผิดกฎหมาย",
  "terms.s5.i3": "ลูกค้ามีหน้าที่รักษาความปลอดภัยของข้อมูลส่วนบุคคล อุปกรณ์ และบัญชีติดต่อของตนเมื่อใช้ช่องทางออนไลน์ของ Face Wash Fox",
  "terms.s6.title": "6. ความปลอดภัยของข้อมูล",
  "terms.s6.i1": "การเก็บรวบรวมและประมวลผลข้อมูลส่วนบุคคลระบุไว้โดยละเอียดในนโยบายคุ้มครองข้อมูลส่วนบุคคล ซึ่งเป็นส่วนหนึ่งของข้อกำหนดนี้",
  "terms.s6.i2": "Face Wash Fox ประมวลผลข้อมูลเฉพาะเมื่อมีฐานทางกฎหมายที่เหมาะสม ได้แก่ ความยินยอมของลูกค้า การปฏิบัติตามสัญญาบริการ หรือหน้าที่ตามกฎหมาย",
  "terms.s6.i3": "ลูกค้าสามารถใช้สิทธิ์ขอเข้าถึง แก้ไข ลบ ถอนความยินยอม หรือร้องเรียนได้ทางอีเมล info@facewashfox.com หรือสายด่วน 0889 866 666",
  "terms.s7.title": "7. ข้อจำกัดความรับผิด",
  "terms.s7.i1": "Face Wash Fox พยายามรักษาความถูกต้องของข้อมูลบนเว็บไซต์ แต่ไม่รับประกันว่าเนื้อหาทั้งหมดจะปราศจากข้อผิดพลาดทางเทคนิค การแสดงผลผิดพลาด หรือการหยุดชะงักชั่วคราว",
  "terms.s7.i2": "Face Wash Fox ไม่รับผิดชอบต่อความเสียหายที่เกิดจากการที่ลูกค้าให้ข้อมูลไม่ถูกต้อง ไม่ปฏิบัติตามคำแนะนำการใช้บริการ หรือนำข้อมูลนอกเหนือจากคำแนะนำของผู้เชี่ยวชาญไปใช้เอง",
  "terms.s7.i3": "ลิงก์ แพลตฟอร์ม หรือบริการของบุคคลที่สาม (ถ้ามี) อยู่ภายใต้นโยบายของบุคคลที่สามนั้น",
  "terms.s8.title": "8. การเปลี่ยนแปลงข้อกำหนด",
  "terms.s8.i1": "Face Wash Fox อาจปรับปรุงข้อกำหนดให้สอดคล้องกับการเปลี่ยนแปลงของบริการ กฎหมาย นโยบายการดำเนินงาน หรือโปรโมชั่น",
  "terms.s8.i2": "ฉบับใหม่มีผลเมื่อเผยแพร่บนเว็บไซต์ ลูกค้าควรตรวจสอบเป็นระยะเพื่อรับทราบข้อมูลล่าสุด",
  "terms.contact.need": "ต้องการความช่วยเหลือเพิ่มเติม?",
  "terms.contact.title": "ติดต่อ Face Wash Fox",
  "terms.contact.findStore": "ค้นหาสาขาใกล้คุณ",
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
    "Face Wash Fox uses cookies and similar technologies to keep our website running, remember your preferences, understand how visitors use the site and make it easier to find stores and browse services.",
  "cookiePage.s1.title": "Essential cookies",
  "cookiePage.s1.body":
    "These cookies keep the website running smoothly, store your cookie preferences and support core site features.",
  "cookiePage.s2.title": "Analytics cookies",
  "cookiePage.s2.body":
    "We may use aggregated data to understand which content is most useful to customers and to improve the browsing experience.",
  "cookiePage.s3.title": "Managing your preferences",
  "cookiePage.s3.body":
    "You can accept or decline non-essential cookies via the cookie banner. You can also delete cookies at any time in your browser settings.",
};

const cookiePageZh: Dict = {
  "cookiePage.title": "Cookie 政策",
  "cookiePage.intro":
    "Face Wash Fox 使用 Cookie 及类似技术维持网站正常运行、记住您的偏好、分析访客使用网站的方式，并优化查找门店和浏览服务的体验。",
  "cookiePage.s1.title": "必要 Cookie",
  "cookiePage.s1.body": "此类 Cookie 确保网站稳定运行、保存您的 Cookie 偏好，并支持网站的基本功能。",
  "cookiePage.s2.title": "分析 Cookie",
  "cookiePage.s2.body": "我们可能使用汇总数据，了解哪些内容对顾客最有帮助，并持续优化浏览体验。",
  "cookiePage.s3.title": "管理您的偏好",
  "cookiePage.s3.body": "您可以通过 Cookie 提示栏接受或拒绝非必要 Cookie，也可以随时在浏览器设置中删除 Cookie。",
};

const cookiePageJa: Dict = {
  "cookiePage.title": "Cookie ポリシー",
  "cookiePage.intro":
    "Face Wash Fox は、ウェブサイトの運営、お客様の設定の保存、サイト利用状況の分析、店舗検索やサービス閲覧の利便性向上のために、Cookie および類似の技術を使用しています。",
  "cookiePage.s1.title": "必須 Cookie",
  "cookiePage.s1.body": "サイトを安定して動作させ、Cookie の設定を保存し、基本機能を提供するための Cookie です。",
  "cookiePage.s2.title": "分析用 Cookie",
  "cookiePage.s2.body": "集計データを用いて、お客様に役立つコンテンツを把握し、閲覧体験の改善に活用することがあります。",
  "cookiePage.s3.title": "設定の管理",
  "cookiePage.s3.body": "必須ではない Cookie は、Cookie バナーで許可または拒否できます。また、ブラウザの設定からいつでも Cookie を削除できます。",
};

const cookiePageKo: Dict = {
  "cookiePage.title": "쿠키 정책",
  "cookiePage.intro":
    "Face Wash Fox는 웹사이트 운영, 고객 설정 저장, 방문자 이용 행태 분석, 매장 찾기 및 서비스 탐색 경험 개선을 위해 쿠키 및 유사 기술을 사용합니다.",
  "cookiePage.s1.title": "필수 쿠키",
  "cookiePage.s1.body": "웹사이트의 안정적인 운영, 쿠키 설정 저장 및 기본 기능 제공을 위한 쿠키입니다.",
  "cookiePage.s2.title": "분석 쿠키",
  "cookiePage.s2.body": "통계 데이터를 활용해 고객에게 유용한 콘텐츠를 파악하고 이용 경험을 개선할 수 있습니다.",
  "cookiePage.s3.title": "설정 관리",
  "cookiePage.s3.body": "쿠키 배너에서 필수가 아닌 쿠키를 허용하거나 거부할 수 있으며, 브라우저 설정에서 언제든지 쿠키를 삭제할 수 있습니다.",
};

const cookiePageTh: Dict = {
  "cookiePage.title": "นโยบายคุกกี้",
  "cookiePage.intro":
    "Face Wash Fox ใช้คุกกี้และเทคโนโลยีที่คล้ายกันเพื่อให้เว็บไซต์ทำงานได้ จดจำการตั้งค่าของคุณ วิเคราะห์การใช้งานของผู้เข้าชม และช่วยให้ค้นหาสาขาและดูบริการได้สะดวกขึ้น",
  "cookiePage.s1.title": "คุกกี้ที่จำเป็น",
  "cookiePage.s1.body": "คุกกี้เหล่านี้ช่วยให้เว็บไซต์ทำงานได้อย่างราบรื่น บันทึกการตั้งค่าคุกกี้ และรองรับฟังก์ชันพื้นฐานของเว็บไซต์",
  "cookiePage.s2.title": "คุกกี้เพื่อการวิเคราะห์",
  "cookiePage.s2.body": "เราอาจใช้ข้อมูลในภาพรวมเพื่อทำความเข้าใจว่าเนื้อหาใดเป็นประโยชน์ต่อลูกค้า และปรับปรุงประสบการณ์การใช้งาน",
  "cookiePage.s3.title": "การจัดการการตั้งค่า",
  "cookiePage.s3.body": "คุณสามารถยอมรับหรือปฏิเสธคุกกี้ที่ไม่จำเป็นผ่านแบนเนอร์คุกกี้ และลบคุกกี้ได้ทุกเมื่อในการตั้งค่าเบราว์เซอร์",
};

const privacyVi: Dict = {
  "privacy.title": "Chính sách bảo vệ dữ liệu cá nhân",
  "privacy.updated": "Cập nhật: 08/09/2026",
  "privacy.intro":
    "Chính sách này giải thích cách Công ty Cổ phần FB Network (thương hiệu Face Wash Fox) thu thập, sử dụng, lưu trữ và bảo vệ dữ liệu cá nhân theo Luật Bảo vệ dữ liệu cá nhân số 91/2025/QH15.",
  "privacy.contentAria": "Nội dung chính sách bảo vệ dữ liệu cá nhân",
  "privacy.s1.title": "1. Bên kiểm soát dữ liệu",
  "privacy.s1.body":
    "Công ty Cổ phần FB Network, mã số thuế 0316806815, địa chỉ Số 71, Đường số 61 TML, Phường Cát Lái, Thành phố Hồ Chí Minh, Việt Nam. Email: info@facewashfox.com. Hotline: 0889 866 666.",
  "privacy.s2.title": "2. Mục đích xử lý",
  "privacy.s2.body":
    "Xác nhận đặt lịch, liên hệ chăm sóc khách hàng, kích hoạt và quản lý thẻ Foxie, cải thiện dịch vụ, tuân thủ nghĩa vụ pháp luật và gửi thông tin khi khách đã đồng ý.",
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
  "privacy.updated": "Last updated: 08/09/2026",
  "privacy.intro":
    "This policy explains how FB Network Joint Stock Company (operating the Face Wash Fox brand) collects, uses, stores and protects personal data in accordance with Vietnam's Law on Personal Data Protection No. 91/2025/QH15.",
  "privacy.contentAria": "Personal Data Protection Policy content",
  "privacy.s1.title": "1. Data controller",
  "privacy.s1.body":
    "FB Network Joint Stock Company, tax ID 0316806815, No. 71, Street 61 TML, Cat Lai Ward, Ho Chi Minh City, Vietnam. Email: info@facewashfox.com. Hotline: 0889 866 666.",
  "privacy.s2.title": "2. Purposes of processing",
  "privacy.s2.body":
    "Confirming bookings, customer care, activating and managing Foxie cards, improving our services, complying with legal obligations and sending information where the customer has given consent.",
  "privacy.s3.title": "3. Data we collect",
  "privacy.s3.body":
    "Full name, phone number, email, preferred store, notes on skincare needs, booking and card purchase history, and technical data required to operate the website (cookies, as described in our Cookie Policy).",
  "privacy.s4.title": "4. Retention period",
  "privacy.s4.body":
    "Booking and contact data are kept for up to 36 months from the most recent interaction, or longer where required by law (invoices, complaints, accounting obligations). After this period, data is deleted or anonymized.",
  "privacy.s5.title": "5. Third-party recipients",
  "privacy.s5.body":
    "Data may be shared with providers of booking systems, email, server hosting and payment services (if any), and with government authorities where required by law. Face Wash Fox does not sell personal data.",
  "privacy.s6.title": "6. Rights of data subjects",
  "privacy.s6.body":
    "Customers have the right to be informed, to give consent, to access, correct and delete their data, to restrict processing, to object, to withdraw consent and to lodge complaints. Send requests to info@facewashfox.com or hotline 0889 866 666; we will respond within 15 business days.",
  "privacy.s7.title": "7. Children under 16",
  "privacy.s7.body":
    "For customers under 16, Face Wash Fox processes data only with the consent of the accompanying parent or guardian, who is responsible for the accuracy of that consent.",
  "privacy.s8.title": "8. Cross-border data transfers",
  "privacy.s8.body":
    "Where a technology provider hosts servers outside Vietnam, any data transfer is carried out in accordance with regulations on transferring personal data abroad and only to the extent necessary to operate the website.",
  "privacy.s9.title": "9. Contact",
  "privacy.s9.body":
    "All personal data requests can be sent to FB Network Joint Stock Company via info@facewashfox.com, hotline 0889 866 666, or at any Face Wash Fox store.",
  "privacy.contact.need": "Need help with your personal data?",
  "privacy.contact.title": "Contact Face Wash Fox",
};

const privacyZh: Dict = {
  "privacy.title": "个人数据保护政策",
  "privacy.updated": "更新日期：08/09/2026",
  "privacy.intro":
    "本政策说明 FB Network 股份公司（Face Wash Fox 品牌运营方）如何依照越南第 91/2025/QH15 号《个人数据保护法》收集、使用、存储和保护个人数据。",
  "privacy.contentAria": "个人数据保护政策内容",
  "privacy.s1.title": "1. 数据控制者",
  "privacy.s1.body":
    "FB Network 股份公司（FB NETWORK JOINT STOCK COMPANY），税号 0316806815，地址：No. 71, Street 61 TML, Cat Lai Ward, Ho Chi Minh City, Vietnam。邮箱：info@facewashfox.com。热线：0889 866 666。",
  "privacy.s2.title": "2. 处理目的",
  "privacy.s2.body": "确认预约、客户服务联络、激活和管理 Foxie 会员卡、改进服务、履行法定义务，以及在顾客同意的情况下发送信息。",
  "privacy.s3.title": "3. 收集的数据",
  "privacy.s3.body":
    "姓名、电话号码、邮箱、意向门店、护肤需求备注、预约及购卡记录，以及运行网站所需的技术数据（Cookie，详见《Cookie 政策》）。",
  "privacy.s4.title": "4. 保存期限",
  "privacy.s4.body":
    "预约和联系数据自最近一次互动起最长保存 36 个月；如法律要求（发票、投诉、会计义务），保存期限可更长。期满后，数据将被删除或匿名化处理。",
  "privacy.s5.title": "5. 数据接收方",
  "privacy.s5.body":
    "数据可能会提供给预约系统、电子邮件、服务器托管及支付服务（如有）的供应商，以及在法律要求时提供给国家主管机关。Face Wash Fox 不出售个人数据。",
  "privacy.s6.title": "6. 数据主体的权利",
  "privacy.s6.body":
    "顾客享有知情、同意、查阅、更正、删除、限制处理、反对、撤回同意及投诉的权利。请将请求发送至 info@facewashfox.com 或拨打热线 0889 866 666，我们将在 15 个工作日内回复。",
  "privacy.s7.title": "7. 16 岁以下儿童",
  "privacy.s7.body": "对于 16 岁以下顾客，Face Wash Fox 仅在取得陪同监护人同意后处理其数据。监护人对该同意的准确性负责。",
  "privacy.s8.title": "8. 数据跨境传输",
  "privacy.s8.body":
    "如技术服务商的服务器位于越南境外，数据传输（如有）将依照个人数据跨境传输的相关规定进行，且仅限于运行网站所必需的范围。",
  "privacy.s9.title": "9. 联系方式",
  "privacy.s9.body": "有关个人数据的任何请求，请通过 info@facewashfox.com、热线 0889 866 666 或在 Face Wash Fox 门店联系 FB Network 股份公司。",
  "privacy.contact.need": "需要个人数据相关帮助？",
  "privacy.contact.title": "联系 Face Wash Fox",
};

const privacyJa: Dict = {
  "privacy.title": "個人データ保護方針",
  "privacy.updated": "最終更新日：08/09/2026",
  "privacy.intro":
    "本方針は、FB Network 株式会社（Face Wash Fox ブランド運営会社）が、ベトナム個人データ保護法（第91/2025/QH15号）に基づき、個人データをどのように収集・利用・保管・保護するかを説明するものです。",
  "privacy.contentAria": "個人データ保護方針の内容",
  "privacy.s1.title": "1. データ管理者",
  "privacy.s1.body":
    "FB Network 株式会社（FB NETWORK JOINT STOCK COMPANY）、税番号 0316806815、所在地：No. 71, Street 61 TML, Cat Lai Ward, Ho Chi Minh City, Vietnam。メール：info@facewashfox.com。ホットライン：0889 866 666。",
  "privacy.s2.title": "2. 取り扱いの目的",
  "privacy.s2.body": "ご予約の確認、お客様対応のためのご連絡、Foxie カードの有効化・管理、サービスの改善、法的義務の遵守、およびお客様の同意がある場合の情報配信。",
  "privacy.s3.title": "3. 収集するデータ",
  "privacy.s3.body":
    "氏名、電話番号、メールアドレス、ご希望の店舗、スキンケアに関するご要望のメモ、ご予約・カード購入履歴、およびウェブサイト運営に必要な技術データ（Cookie ポリシーに基づく Cookie）。",
  "privacy.s4.title": "4. 保管期間",
  "privacy.s4.body":
    "ご予約および連絡先のデータは、最終のやり取りから最長36か月間保管します。法令で求められる場合（請求書、苦情、会計上の義務）はそれ以上保管することがあります。期間経過後、データは削除または匿名化されます。",
  "privacy.s5.title": "5. データの提供先",
  "privacy.s5.body":
    "データは、予約システム、メール、サーバーホスティング、決済サービス（該当する場合）の提供事業者、および法令により求められた場合の行政機関に提供されることがあります。Face Wash Fox が個人データを販売することはありません。",
  "privacy.s6.title": "6. データ主体の権利",
  "privacy.s6.body":
    "お客様には、情報を知る権利、同意する権利、開示・訂正・削除を求める権利、取り扱いの制限、異議申し立て、同意の撤回、苦情申し立ての権利があります。ご請求は info@facewashfox.com またはホットライン 0889 866 666 までお送りください。15営業日以内に回答いたします。",
  "privacy.s7.title": "7. 16歳未満のお子様",
  "privacy.s7.body": "16歳未満のお客様については、同伴する保護者の同意がある場合にのみデータを取り扱います。保護者は当該同意の正確性について責任を負います。",
  "privacy.s8.title": "8. 国外へのデータ移転",
  "privacy.s8.body":
    "テクノロジー事業者のサーバーがベトナム国外にある場合、データの移転（該当する場合）は個人データの国外移転に関する規定に従い、ウェブサイトの運営に必要な範囲に限って行います。",
  "privacy.s9.title": "9. お問い合わせ",
  "privacy.s9.body": "個人データに関するご請求は、info@facewashfox.com、ホットライン 0889 866 666、または Face Wash Fox 各店舗にて FB Network 株式会社までお寄せください。",
  "privacy.contact.need": "個人データについてお困りですか？",
  "privacy.contact.title": "Face Wash Fox へのお問い合わせ",
};

const privacyKo: Dict = {
  "privacy.title": "개인정보 보호정책",
  "privacy.updated": "최종 업데이트: 08/09/2026",
  "privacy.intro":
    "본 정책은 FB Network 주식회사(Face Wash Fox 브랜드 운영사)가 베트남 개인정보보호법(제91/2025/QH15호)에 따라 개인정보를 수집·이용·보관·보호하는 방법을 설명합니다.",
  "privacy.contentAria": "개인정보 보호정책 내용",
  "privacy.s1.title": "1. 개인정보 처리자",
  "privacy.s1.body":
    "FB Network 주식회사(FB NETWORK JOINT STOCK COMPANY), 세금 코드 0316806815, 주소: No. 71, Street 61 TML, Cat Lai Ward, Ho Chi Minh City, Vietnam. 이메일: info@facewashfox.com. 고객센터: 0889 866 666.",
  "privacy.s2.title": "2. 처리 목적",
  "privacy.s2.body": "예약 확인, 고객 상담 연락, Foxie 카드 활성화 및 관리, 서비스 개선, 법적 의무 준수, 고객이 동의한 경우 정보 발송.",
  "privacy.s3.title": "3. 수집하는 정보",
  "privacy.s3.body":
    "성명, 전화번호, 이메일, 희망 매장, 스킨케어 요청 메모, 예약 및 카드 구매 이력, 웹사이트 운영에 필요한 기술 데이터(쿠키 정책에 따른 쿠키).",
  "privacy.s4.title": "4. 보관 기간",
  "privacy.s4.body":
    "예약 및 연락처 정보는 마지막 상호작용일로부터 최대 36개월간 보관하며, 법령상 요구되는 경우(세금계산서, 민원, 회계 의무) 더 오래 보관할 수 있습니다. 기간이 만료되면 정보는 삭제되거나 익명 처리됩니다.",
  "privacy.s5.title": "5. 제3자 제공",
  "privacy.s5.body":
    "정보는 예약 시스템, 이메일, 서버 호스팅, 결제 서비스(해당 시) 제공업체 및 법령상 요구되는 경우 정부 기관에 제공될 수 있습니다. Face Wash Fox는 개인정보를 판매하지 않습니다.",
  "privacy.s6.title": "6. 정보주체의 권리",
  "privacy.s6.body":
    "고객은 알 권리, 동의권, 열람·정정·삭제권, 처리 제한권, 이의 제기권, 동의 철회권 및 민원 제기권을 가집니다. 요청은 info@facewashfox.com 또는 고객센터 0889 866 666으로 보내 주시면 영업일 기준 15일 이내에 답변드립니다.",
  "privacy.s7.title": "7. 16세 미만 아동",
  "privacy.s7.body": "16세 미만 고객의 경우, Face Wash Fox는 동행한 보호자의 동의가 있는 경우에만 정보를 처리합니다. 보호자는 해당 동의의 정확성에 대해 책임을 집니다.",
  "privacy.s8.title": "8. 국외 이전",
  "privacy.s8.body":
    "기술 제공업체의 서버가 베트남 국외에 있는 경우, 정보 이전(해당 시)은 개인정보 국외 이전에 관한 규정에 따라 웹사이트 운영에 필요한 범위 내에서만 이루어집니다.",
  "privacy.s9.title": "9. 문의처",
  "privacy.s9.body": "개인정보 관련 모든 요청은 info@facewashfox.com, 고객센터 0889 866 666 또는 Face Wash Fox 매장을 통해 FB Network 주식회사로 문의해 주세요.",
  "privacy.contact.need": "개인정보 관련 도움이 필요하신가요?",
  "privacy.contact.title": "Face Wash Fox 문의하기",
};

const privacyTh: Dict = {
  "privacy.title": "นโยบายคุ้มครองข้อมูลส่วนบุคคล",
  "privacy.updated": "อัปเดตล่าสุด: 08/09/2026",
  "privacy.intro":
    "นโยบายนี้อธิบายวิธีที่ FB Network Joint Stock Company (ผู้ดำเนินงานแบรนด์ Face Wash Fox) เก็บรวบรวม ใช้ จัดเก็บ และคุ้มครองข้อมูลส่วนบุคคล ตามกฎหมายคุ้มครองข้อมูลส่วนบุคคลของเวียดนาม เลขที่ 91/2025/QH15",
  "privacy.contentAria": "เนื้อหานโยบายคุ้มครองข้อมูลส่วนบุคคล",
  "privacy.s1.title": "1. ผู้ควบคุมข้อมูล",
  "privacy.s1.body":
    "FB Network Joint Stock Company เลขประจำตัวผู้เสียภาษี 0316806815 ที่อยู่ No. 71, Street 61 TML, Cat Lai Ward, Ho Chi Minh City, Vietnam อีเมล: info@facewashfox.com สายด่วน: 0889 866 666",
  "privacy.s2.title": "2. วัตถุประสงค์ในการประมวลผล",
  "privacy.s2.body": "ยืนยันการจอง ติดต่อดูแลลูกค้า เปิดใช้งานและจัดการบัตร Foxie ปรับปรุงบริการ ปฏิบัติตามหน้าที่ทางกฎหมาย และส่งข้อมูลข่าวสารเมื่อลูกค้าให้ความยินยอม",
  "privacy.s3.title": "3. ข้อมูลที่เก็บรวบรวม",
  "privacy.s3.body":
    "ชื่อ-นามสกุล เบอร์โทรศัพท์ อีเมล สาขาที่ต้องการ บันทึกความต้องการดูแลผิว ประวัติการจองและการซื้อบัตร และข้อมูลทางเทคนิคที่จำเป็นต่อการทำงานของเว็บไซต์ (คุกกี้ตามนโยบายคุกกี้)",
  "privacy.s4.title": "4. ระยะเวลาการเก็บรักษา",
  "privacy.s4.body":
    "ข้อมูลการจองและข้อมูลติดต่อจะถูกเก็บไว้ไม่เกิน 36 เดือนนับจากการติดต่อครั้งล่าสุด หรือนานกว่านั้นหากกฎหมายกำหนด (ใบแจ้งหนี้ ข้อร้องเรียน หน้าที่ทางบัญชี) เมื่อครบกำหนด ข้อมูลจะถูกลบหรือทำให้ไม่สามารถระบุตัวตนได้",
  "privacy.s5.title": "5. ผู้รับข้อมูลที่เป็นบุคคลที่สาม",
  "privacy.s5.body":
    "ข้อมูลอาจถูกเปิดเผยแก่ผู้ให้บริการระบบจอง อีเมล โฮสติ้งเซิร์ฟเวอร์ และการชำระเงิน (ถ้ามี) รวมถึงหน่วยงานรัฐเมื่อกฎหมายกำหนด Face Wash Fox ไม่ขายข้อมูลส่วนบุคคล",
  "privacy.s6.title": "6. สิทธิของเจ้าของข้อมูล",
  "privacy.s6.body":
    "ลูกค้ามีสิทธิได้รับแจ้ง ให้ความยินยอม เข้าถึง แก้ไข ลบ จำกัดการประมวลผล คัดค้าน ถอนความยินยอม และร้องเรียน ส่งคำขอได้ที่ info@facewashfox.com หรือสายด่วน 0889 866 666 เราจะตอบกลับภายใน 15 วันทำการ",
  "privacy.s7.title": "7. เด็กอายุต่ำกว่า 16 ปี",
  "privacy.s7.body": "สำหรับลูกค้าอายุต่ำกว่า 16 ปี Face Wash Fox จะประมวลผลข้อมูลเฉพาะเมื่อได้รับความยินยอมจากผู้ปกครองที่มาด้วยเท่านั้น โดยผู้ปกครองต้องรับผิดชอบต่อความถูกต้องของความยินยอมนั้น",
  "privacy.s8.title": "8. การโอนข้อมูลไปต่างประเทศ",
  "privacy.s8.body":
    "หากผู้ให้บริการเทคโนโลยีมีเซิร์ฟเวอร์อยู่นอกเวียดนาม การโอนข้อมูล (ถ้ามี) จะดำเนินการตามกฎระเบียบว่าด้วยการโอนข้อมูลส่วนบุคคลไปต่างประเทศ และเฉพาะเท่าที่จำเป็นต่อการทำงานของเว็บไซต์",
  "privacy.s9.title": "9. ติดต่อ",
  "privacy.s9.body": "คำขอทั้งหมดเกี่ยวกับข้อมูลส่วนบุคคล ส่งถึง FB Network Joint Stock Company ได้ทาง info@facewashfox.com สายด่วน 0889 866 666 หรือที่สาขา Face Wash Fox",
  "privacy.contact.need": "ต้องการความช่วยเหลือเรื่องข้อมูลส่วนบุคคล?",
  "privacy.contact.title": "ติดต่อ Face Wash Fox",
};

export const legalDictionaries: Record<SiteLanguage, Dict> = {
  vi: { ...termsVi, ...cookiePageVi, ...privacyVi },
  en: { ...termsEn, ...cookiePageEn, ...privacyEn },
  zh: { ...termsZh, ...cookiePageZh, ...privacyZh },
  ja: { ...termsJa, ...cookiePageJa, ...privacyJa },
  ko: { ...termsKo, ...cookiePageKo, ...privacyKo },
  th: { ...termsTh, ...cookiePageTh, ...privacyTh },
};
