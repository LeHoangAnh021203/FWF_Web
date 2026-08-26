import type { SiteLanguage } from "@/i18n/dictionaries";

export type ArticleBlock =
  | { type: "paragraph"; content: string }
  | { type: "image"; src: string; alt: string };

export type LocalizedNewsFields = {
  title: string;
  excerpt: string;
  intro: string;
  lead: string;
  paragraphs: ArticleBlock[];
  bullets: string[];
  quote: string;
  cta: string;
};

export type FoxNewsSource = {
  slug: string;
  date: string;
  image: string;
  locales: Record<SiteLanguage, LocalizedNewsFields>;
};

const p = (content: string): ArticleBlock => ({ type: "paragraph", content });
const img = (src: string, alt: string): ArticleBlock => ({
  type: "image",
  src,
  alt,
});

const officeAlt: Record<SiteLanguage, string> = {
  vi: "Trải nghiệm chăm sóc da Face Wash Fox tại văn phòng",
  en: "Face Wash Fox skincare experience at the office",
  zh: "Face Wash Fox 办公室护肤体验",
  ja: "オフィスでの Face Wash Fox スキンケア体験",
  ko: "사무실에서의 Face Wash Fox 스킨케어 체험",
  th: "ประสบการณ์ดูแลผิว Face Wash Fox ที่ออฟฟิศ",
};

export const foxNewsSources: FoxNewsSource[] = [
  {
    slug: "nam-2026-ung-vien-hoi-gi-truoc-khi-nhan-offer",
    date: "7 April 2026",
    image: "/Fox Swat/fx1.JPG",
    locales: {
      vi: {
        title: "Năm 2026, ứng viên hỏi gì trước khi nhận offer?",
        excerpt:
          "Câu hỏi tuyển dụng giờ không chỉ xoay quanh lương và title, mà là doanh nghiệp làm gì để nhân viên muốn gắn bó lâu dài.",
        intro: "Không còn chỉ là lương. Không còn chỉ là title.",
        lead: 'Họ hỏi: "Công ty anh/chị làm gì để nhân viên muốn đi làm mỗi sáng?"',
        paragraphs: [
          p(
            "Câu hỏi đó đang thay đổi cách doanh nghiệp cạnh tranh nhân tài, không phải bằng con số trên bảng lương, mà bằng trải nghiệm khiến họ cảm thấy được quan tâm thật sự.",
          ),
          p("Lương giữ người ở lại tạm thời. Trải nghiệm khiến họ muốn ở lại lâu dài."),
          p(
            "Gen Z và Millennials là lực lượng chính năm 2026. Họ không rời đi vì thiếu lương tốt, mà thường vì cảm giác thiếu quan tâm, môi trường thiếu năng lượng và công ty không có gì để nhớ ngoài deadline.",
          ),
          p(
            "Xu hướng đang dịch chuyển: thay vì chờ Year End mới tổ chức event lớn, nhiều doanh nghiệp bắt đầu tạo ra những khoảnh khắc nhỏ, thường xuyên và cá nhân hơn để nhân viên được sạc pin giữa ngày làm việc.",
          ),
          img("/PR/pr1/pr2_2.jpg", officeAlt.vi),
          p(
            "Một hướng đang được chú ý là mang trải nghiệm chăm sóc bản thân trực tiếp vào văn phòng. Không cần di chuyển, không cần HR lo khâu tổ chức phức tạp, nhưng nhân viên vẫn cảm nhận rõ sự khác biệt.",
          ),
          p(
            "Face Wash Fox phát triển mô hình FOX SWAT dành riêng cho doanh nghiệp: mang thiết bị hydra facial công nghệ cao cùng đội ngũ chuyên nghiệp đến tận văn phòng. HR chỉ cần xác nhận lịch và danh sách, phần còn lại được setup và vận hành trọn gói.",
          ),
          img("/news/news2.JPG", officeAlt.vi),
          p(
            "Khác với những event wellness mang tính đại trà, FOX SWAT tập trung vào cá nhân hóa và tái tạo năng lượng nhanh để nhân viên quay lại bàn làm việc với mood tốt hơn hẳn.",
          ),
          img("/PR/pr1/pr1_4.png", officeAlt.vi),
          p(
            "Ngoài FOX SWAT, Face Wash Fox còn có voucher chăm sóc da để nhân viên chủ động đến hơn 50 cửa hàng trên toàn quốc theo lịch cá nhân, phù hợp với doanh nghiệp không muốn tổ chức event tập trung.",
          ),
          p(
            'Điều nhân viên nhớ không phải là một món quà, mà là khoảnh khắc họ cảm thấy: "Công ty đang quan tâm đến mình theo cách cụ thể, không hình thức."',
          ),
          img("/PR/pr1/pr1_3.jpg", officeAlt.vi),
          p(
            'Năm 2026, doanh nghiệp cạnh tranh nhân tài không chỉ bằng con số, mà bằng cảm giác: "Đây là nơi mình muốn gắn bó."',
          ),
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
      en: {
        title: "In 2026, what do candidates ask before accepting an offer?",
        excerpt:
          "Hiring questions are no longer just about salary and title — they ask what companies do so people want to stay for the long run.",
        intro: "It's no longer just about salary. It's no longer just about title.",
        lead: 'They ask: "What does your company do so employees want to show up every morning?"',
        paragraphs: [
          p(
            "That question is changing how companies compete for talent — not with numbers on a payslip, but with experiences that make people feel genuinely cared for.",
          ),
          p("Salary keeps people temporarily. Experience makes them want to stay long term."),
          p(
            "Gen Z and Millennials are the main workforce in 2026. They rarely leave only because pay is low — more often because they feel uncared for, the environment lacks energy, and the company has nothing memorable beyond deadlines.",
          ),
          p(
            "The trend is shifting: instead of waiting for a big year-end event, many companies create smaller, frequent, more personal moments so employees can recharge during the workday.",
          ),
          img("/PR/pr1/pr2_2.jpg", officeAlt.en),
          p(
            "One approach gaining attention is bringing self-care experiences directly into the office. No commute, no complex HR logistics — yet employees clearly feel the difference.",
          ),
          p(
            "Face Wash Fox developed FOX SWAT for businesses: high-tech HydraFacial equipment and a professional team come to the office. HR only confirms the schedule and guest list; everything else is set up and run end to end.",
          ),
          img("/news/news2.JPG", officeAlt.en),
          p(
            "Unlike mass wellness events, FOX SWAT focuses on personalization and quick energy recovery so employees return to their desks in a much better mood.",
          ),
          img("/PR/pr1/pr1_4.png", officeAlt.en),
          p(
            "Beyond FOX SWAT, Face Wash Fox also offers skincare vouchers so employees can visit 50+ stores nationwide on their own schedule — ideal for companies that prefer not to run a centralized event.",
          ),
          p(
            'What employees remember is not a gift item, but the moment they feel: "The company cares about me in a concrete way, not just for show."',
          ),
          img("/PR/pr1/pr1_3.jpg", officeAlt.en),
          p(
            'In 2026, companies compete for talent not only with numbers, but with the feeling: "This is where I want to belong."',
          ),
        ],
        bullets: [
          "Employees sit down and relax.",
          "AI skin analysis for a clear read on their skin condition.",
          "Personalized advice for each skin type.",
          "A deep-cleansing facial with actives for clearer skin and a refreshed mind.",
        ],
        quote:
          "This is the first time I truly understood what my skin needed — not guessing. The first time I felt the company cared for me in a concrete way, not just for show.",
        cta: "Contact Face Wash Fox at 088 986 6666 for a program tailored to your business.",
      },
      zh: {
        title: "2026年，候选人在接受offer前会问什么？",
        excerpt:
          "招聘问题已不只围绕薪资与职位，而是企业如何让员工愿意长期留下。",
        intro: "不再只是薪资。也不再只是职称。",
        lead: "他们会问：贵公司做了什么，让员工每天早上都想上班？",
        paragraphs: [
          p(
            "这个问题正在改变企业竞争人才的方式——不是靠薪资数字，而是靠让人真正感到被关心的体验。",
          ),
          p("薪资只能暂时留人。体验才让人愿意长期留下。"),
          p(
            "Z世代与千禧一代是2026年的主力。他们离开往往不是因为薪水不够，而是感觉不被关心、环境缺乏活力，公司除了截止日期外没什么值得记住。",
          ),
          p(
            "趋势正在转变：与其等到年终才办大型活动，许多企业开始创造更小、更频繁、更个人化的时刻，让员工在工作日中也能充电。",
          ),
          img("/PR/pr1/pr2_2.jpg", officeAlt.zh),
          p(
            "一个受关注的方向是把自我护理体验直接带到办公室。无需外出，HR也不必组织复杂流程，员工却能明显感受到差异。",
          ),
          p(
            "Face Wash Fox 为企业打造 FOX SWAT：把高科技 HydraFacial 设备与专业团队带到办公室。HR 只需确认时间与名单，其余由我们一站式布置与运营。",
          ),
          img("/news/news2.JPG", officeAlt.zh),
          p(
            "不同于大众化的健康活动，FOX SWAT 强调个性化与快速恢复能量，让员工回到工位时心情明显更好。",
          ),
          img("/PR/pr1/pr1_4.png", officeAlt.zh),
          p(
            "除了 FOX SWAT，Face Wash Fox 还有护肤券，员工可按个人时间前往全国50多家门店，适合不想举办集中活动的企业。",
          ),
          p(
            "员工记住的不是一份礼物，而是那一刻的感受：“公司以具体、不流于形式的方式关心我。”",
          ),
          img("/PR/pr1/pr1_3.jpg", officeAlt.zh),
          p('2026年，企业竞争人才不只靠数字，更靠一种感觉：“这里是我想留下的地方。”'),
        ],
        bullets: [
          "员工坐下放松。",
          "AI 皮肤检测，分析具体肤况。",
          "按肤质个性化建议。",
          "深层洁面与养分护理，让皮肤清爽、精神焕发。",
        ],
        quote:
          "这是我第一次真正明白皮肤需要什么，而不是瞎猜。也是第一次感到公司以具体、不流于形式的方式关心我。",
        cta: "拨打 Face Wash Fox 热线 088 986 6666，获取适合企业的方案咨询。",
      },
      ja: {
        title: "2026年、候補者はオファー受諾前に何を聞くか？",
        excerpt:
          "採用の質問は給与や役職だけでなく、長く働きたいと思える取り組みになっている。",
        intro: "もう給与だけではない。役職だけでもない。",
        lead: "彼らはこう聞きます。「毎朝出勤したくなるために、御社は何をしていますか？」",
        paragraphs: [
          p(
            "その問いが、企業が人材を奪い合う方法を変えています。給与の数字ではなく、本当に大切にされていると感じる体験で。",
          ),
          p("給与は一時的に人を留めます。体験が長くいたい気持ちをつくります。"),
          p(
            "2026年の主力はZ世代とミレニアル。辞める理由は低賃金より、関心の欠如、活気のない環境、締め切り以外に記憶に残るものがないことであることが多いです。",
          ),
          p(
            "トレンドは変化中。年末の大きなイベントを待つ代わりに、勤務の合間に充電できる小さく頻繁でパーソナルな瞬間をつくる企業が増えています。",
          ),
          img("/PR/pr1/pr2_2.jpg", officeAlt.ja),
          p(
            "注目されているのは、セルフケア体験をオフィスへ直接届けること。移動不要、複雑なHR手配も不要なのに、差ははっきり感じられます。",
          ),
          p(
            "Face Wash Fox は企業向けに FOX SWAT を展開。ハイテク HydraFacial 機器とプロチームがオフィスへ。HRは日程とリストの確認だけで、あとは一式セットアップと運営を任せてください。",
          ),
          img("/news/news2.JPG", officeAlt.ja),
          p(
            "大規模ウェルネスイベントと違い、FOX SWAT はパーソナライズと素早いエネルギー回復に焦点を当て、デスクに戻るときの気分を大きく高めます。",
          ),
          img("/PR/pr1/pr1_4.png", officeAlt.ja),
          p(
            "FOX SWAT 以外にも、全国50店舗以上で個人の都合に合わせて使えるスキンケアバウチャーがあり、集合イベントを避けたい企業にも最適です。",
          ),
          p(
            "従業員が覚えるのは品物ではなく、「会社が形だけではない、具体的な関心を示してくれた」という瞬間です。",
          ),
          img("/PR/pr1/pr1_3.jpg", officeAlt.ja),
          p(
            "2026年、人材競争は数字だけでなく、「ここに所属したい」という感覚でも行われます。",
          ),
        ],
        bullets: [
          "リラックスチェアに座る。",
          "AI肌診断で状態を具体的に分析。",
          "肌質に合わせた個別アドバイス。",
          "ディープクレンジングと栄養ケアで肌すっきり、気分もリフレッシュ。",
        ],
        quote:
          "肌に本当に必要なものが初めて分かった。当てずっぽうではない。会社が形だけではない具体的な関心を示してくれたのも初めて。",
        cta: "企業向けプログラムのご相談は Face Wash Fox ホットライン 088 986 6666 まで。",
      },
      ko: {
        title: "2026년, 지원자는 오퍼 수락 전에 무엇을 물을까?",
        excerpt:
          "채용 질문은 이제 연봉과 직함만이 아니라, 오래 머물고 싶게 만드는 기업의 실천에 관한 것입니다.",
        intro: "더 이상 연봉만이 아닙니다. 직함만이 아닙니다.",
        lead: '그들은 묻습니다. "직원들이 매일 아침 출근하고 싶게, 귀사는 무엇을 하나요?"',
        paragraphs: [
          p(
            "그 질문은 기업이 인재를 경쟁하는 방식을 바꿉니다. 급여 숫자가 아니라, 진심으로 관심받는다는 경험으로.",
          ),
          p("연봉은 잠시 붙잡아 둡니다. 경험이 오래 머물고 싶게 만듭니다."),
          p(
            "2026년 주력은 Gen Z와 밀레니얼입니다. 떠나는 이유는 낮은 급여보다, 관심 부족·활력 없는 환경·마감 외에 기억할 것이 없다는 느낌이 더 큽니다.",
          ),
          p(
            "트렌드가 바뀌고 있습니다. 연말 대형 이벤트를 기다리기보다, 근무 중 충전할 수 있는 작고 잦고 개인적인 순간을 만드는 기업이 늘고 있습니다.",
          ),
          img("/PR/pr1/pr2_2.jpg", officeAlt.ko),
          p(
            "주목받는 방향은 셀프케어 경험을 사무실로 직접 가져오는 것입니다. 이동이 없고 HR 준비도 복잡하지 않은데, 차이는 분명히 느껴집니다.",
          ),
          p(
            "Face Wash Fox는 기업용 FOX SWAT를 운영합니다. 하이테크 HydraFacial 장비와 전문 팀이 사무실로 옵니다. HR은 일정과 명단만 확인하면 되고, 나머지는 올인원으로 세팅·운영합니다.",
          ),
          img("/news/news2.JPG", officeAlt.ko),
          p(
            "대중 웰니스 이벤트와 달리 FOX SWAT는 개인화와 빠른 에너지 회복에 집중해, 직원들이 훨씬 좋은 기분으로 자리로 돌아가게 합니다.",
          ),
          img("/PR/pr1/pr1_4.png", officeAlt.ko),
          p(
            "FOX SWAT 외에도 Face Wash Fox 스킨케어 바우처로 전국 50개 이상 매장을 개인 일정에 맞춰 이용할 수 있어, 집중 이벤트를 원하지 않는 기업에 적합합니다.",
          ),
          p(
            '직원이 기억하는 것은 선물이 아니라 "회사가 형식적이 아닌 구체적인 방식으로 나를 챙긴다"는 순간입니다.',
          ),
          img("/PR/pr1/pr1_3.jpg", officeAlt.ko),
          p(
            '2026년, 인재 경쟁은 숫자만이 아니라 "여기가 내가 머물고 싶은 곳"이라는 감각으로도 이뤄집니다.',
          ),
        ],
        bullets: [
          "직원이 앉아 휴식을 취합니다.",
          "AI 피부 분석으로 상태를 구체적으로 확인합니다.",
          "피부 타입별 맞춤 상담.",
          "딥클렌징과 영양 케어로 피부는 맑게, 기분은 상쾌하게.",
        ],
        quote:
          "피부가 정말 필요한 게 뭔지 처음 알았어요. 추측이 아니고요. 회사가 형식적이 아닌 구체적인 방식으로 나를 챙긴다는 느낌도 처음이었습니다.",
        cta: "기업 맞춤 프로그램 상담은 Face Wash Fox 핫라인 088 986 6666으로 연락해 주세요.",
      },
      th: {
        title: "ปี 2026 ผู้สมัครถามอะไรก่อนรับข้อเสนอ?",
        excerpt:
          "คำถามสมัครงานไม่ได้มีแค่เงินเดือนกับตำแหน่งอีกต่อไป แต่คือบริษัททำอะไรให้พนักงานอยากอยู่ระยะยาว",
        intro: "ไม่ใช่แค่เงินเดือนอีกต่อไป ไม่ใช่แค่ตำแหน่งอีกต่อไป",
        lead: 'พวกเขามักถาม: "บริษัททำอะไรให้พนักงานอยากมาทำงานทุกเช้า?"',
        paragraphs: [
          p(
            "คำถามนั้นกำลังเปลี่ยนวิธีที่องค์กรแข่งชิงคนเก่ง — ไม่ใช่ด้วยตัวเลขบนสลิปเงินเดือน แต่ด้วยประสบการณ์ที่ทำให้รู้สึกว่าได้รับการใส่ใจจริงๆ",
          ),
          p("เงินเดือนยึดคนไว้ชั่วคราว ประสบการณ์ทำให้เขาอยากอยู่ระยะยาว"),
          p(
            "Gen Z และ Millennials คือกำลังหลักปี 2026 พวกเขามักลาออกไม่ใช่เพราะเงินเดือนต่ำเพียงอย่างเดียว แต่เพราะรู้สึกขาดความใส่ใจ สภาพแวดล้อมไร้พลัง และบริษัทไม่มีอะไรน่าจดจำนอกจากเดดไลน์",
          ),
          p(
            "เทรนด์กำลังเปลี่ยน: แทนที่จะรออีเวนต์ใหญ่ปลายปี หลายบริษัทเริ่มสร้างช่วงเวลาเล็กๆ ที่บ่อยและเป็นส่วนตัว เพื่อให้พนักงานชาร์จพลังระหว่างวันทำงาน",
          ),
          img("/PR/pr1/pr2_2.jpg", officeAlt.th),
          p(
            "แนวทางที่น่าสนใจคือนำประสบการณ์ดูแลตัวเองเข้าสู่ออฟฟิศโดยตรง ไม่ต้องเดินทาง HR ไม่ต้องจัดงานซับซ้อน แต่พนักงานยังรู้สึกถึงความต่างชัดเจน",
          ),
          p(
            "Face Wash Fox พัฒนา FOX SWAT สำหรับองค์กร: นำอุปกรณ์ HydraFacial เทคโนโลยีสูงและทีมมืออาชีพไปถึงออฟฟิศ HR ยืนยันตารางและรายชื่อเท่านั้น ส่วนที่เหลือเราเซ็ตอัพและดูแลครบวงจร",
          ),
          img("/news/news2.JPG", officeAlt.th),
          p(
            "ต่างจากอีเวนต์เวลเนสแบบรวมหมู่ FOX SWAT เน้นการปรับเฉพาะบุคคลและการฟื้นพลังเร็ว เพื่อให้พนักงานกลับโต๊ะด้วยอารมณ์ที่ดีขึ้นชัดเจน",
          ),
          img("/PR/pr1/pr1_4.png", officeAlt.th),
          p(
            "นอกจาก FOX SWAT ยังมีวอยเชอร์ดูแลผิว ให้พนักงานไปใช้ที่ร้านกว่า 50 สาขาทั่วประเทศตามตารางส่วนตัว เหมาะกับองค์กรที่ไม่ต้องการจัดอีเวนต์รวมศูนย์",
          ),
          p(
            'สิ่งที่พนักงานจำได้ไม่ใช่ของขวัญชิ้นหนึ่ง แต่คือช่วงที่รู้สึกว่า "บริษัทใส่ใจเราอย่างเป็นรูปธรรม ไม่ใช่แค่พิธีการ"',
          ),
          img("/PR/pr1/pr1_3.jpg", officeAlt.th),
          p(
            'ปี 2026 องค์กรแข่งชิงคนเก่งไม่ใช่แค่ด้วยตัวเลข แต่ด้วยความรู้สึกว่า "นี่คือที่ที่อยากผูกพัน"',
          ),
        ],
        bullets: [
          "พนักงานนั่งผ่อนคลาย",
          "วิเคราะห์ผิวด้วย AI ตามสภาพจริง",
          "คำแนะนำเฉพาะตามประเภทผิว",
          "ล้างหน้าลึกพร้อมบำรุง ผิวโล่ง ใจสดชื่น",
        ],
        quote:
          "ครั้งแรกที่เข้าใจจริงๆ ว่าผิวต้องการอะไร ไม่ใช่เดา และครั้งแรกที่รู้สึกว่าบริษัทใส่ใจอย่างเป็นรูปธรรม ไม่ใช่แค่พิธีการ",
        cta: "ติดต่อ Face Wash Fox ที่ 088 986 6666 เพื่อรับคำปรึกษาโปรแกรมที่เหมาะกับองค์กร",
      },
    },
  },
  {
    slug: "cong-ty-ban-dang-giu-chan-nhan-tai-bang-gi-ngoai-luong-va-thuong",
    date: "7 April 2026",
    image: "/news/news2.JPG",
    locales: {
      vi: {
        title: "Công ty bạn đang giữ chân nhân tài bằng gì - ngoài lương và thưởng?",
        excerpt:
          "Wellness đang trở thành một phần của chiến lược giữ chân nhân sự, nơi trải nghiệm được quan tâm tạo ra khác biệt rõ rệt.",
        intro:
          "Wellness không còn là một xu hướng nhất thời, mà đang trở thành chuẩn mực sống của thế hệ mới.",
        lead:
          "Trong bối cảnh áp lực hiệu suất và nhịp sống đô thị dày đặc, nhân viên không chỉ tìm kiếm thu nhập, mà còn tìm kiếm cảm giác được quan tâm thật sự.",
        paragraphs: [
          p(
            "Khi deadline, áp lực và những kết nối số không ngừng nghỉ bủa vây, cơ thể và làn da bắt đầu phát tín hiệu quá tải. Xỉn màu, thiếu sức sống, tinh thần dễ kiệt quệ là những biểu hiện rất thực tế của trạng thái đó.",
          ),
          p(
            "Lúc này, thứ họ tìm không còn chỉ là mức lương tốt, mà là cảm giác được phục hồi, được chăm sóc và được đối xử như một con người, không chỉ là một nguồn lực.",
          ),
          p(
            "Face Wash Fox mang đến cho HR một công cụ để gửi sự quan tâm tinh tế ngay tại nơi làm việc, tạo ra những trải nghiệm khiến nhân viên nhớ lâu và muốn gắn bó hơn.",
          ),
          img("/PR/pr1/pr1_1.PNG", officeAlt.vi),
          p(
            "Doanh nghiệp có thể linh hoạt chọn gói phù hợp với quy mô và ngân sách, từ trải nghiệm tại văn phòng đến hình thức quà tặng để nhân viên chủ động sử dụng theo lịch cá nhân.",
          ),
          p(
            "Tất cả các giải pháp đều dùng công nghệ hydra facial hiện đại, mỹ phẩm Hàn Quốc cao cấp và đội ngũ được đào tạo bài bản, giúp đảm bảo an toàn và hiệu quả ngay từ lần đầu.",
          ),
          img("/PR/pr3/pr3_2.jpg", officeAlt.vi),
          p(
            "Đây không chỉ là một hoạt động phúc lợi. Đó là cách doanh nghiệp tạo ra một khoảnh khắc wow nhỏ nhưng có chiều sâu, giúp đội ngũ cảm thấy mình được quan tâm theo cách cá nhân hóa hơn.",
          ),
          p(
            "Khi doanh nghiệp làm tốt điều này, lợi ích không dừng ở trải nghiệm của nhân viên mà còn phản ánh lên thương hiệu tuyển dụng, mức độ gắn kết nội bộ và hiệu quả sử dụng ngân sách.",
          ),
        ],
        bullets: [
          "Fox SWAT: thiết lập trạm chăm sóc da ngay tại văn phòng cho brand day, team building hoặc dịp đặc biệt.",
          "Voucher linh hoạt tiền mặt: nhân viên tự đặt lịch tại hơn 50 cửa hàng Face Wash Fox trên toàn quốc.",
          "Thẻ quà tặng chăm sóc da: phù hợp cho sinh nhật, lễ Tết hoặc ghi nhận hoàn thành KPI.",
          "Ngân sách linh hoạt, dễ chọn theo quy mô doanh nghiệp và mục tiêu triển khai.",
        ],
        quote:
          "Nhân viên thư giãn, da đẹp hơn, tự tin hơn và cảm thấy được quan tâm rõ ràng hơn ngay trong môi trường làm việc hàng ngày.",
        cta: "Inbox hoặc gọi 088 986 6666 để nhận tư vấn gói phù hợp với doanh nghiệp bạn. Face Wash Fox sẵn sàng hỗ trợ HR tạo khác biệt từ những điều nhỏ nhất.",
      },
      en: {
        title: "How are you retaining talent — beyond salary and bonuses?",
        excerpt:
          "Wellness is becoming part of retention strategy, where feeling genuinely cared for creates a clear difference.",
        intro:
          "Wellness is no longer a passing trend — it is becoming a living standard for the new generation.",
        lead:
          "Under performance pressure and dense urban pace, employees seek not only income, but a real sense of being cared for.",
        paragraphs: [
          p(
            "When deadlines, pressure, and nonstop digital connections pile up, the body and skin signal overload — dullness, low vitality, and easy burnout are very real signs.",
          ),
          p(
            "What they look for then is no longer just good pay, but recovery, care, and being treated as a person — not only a resource.",
          ),
          p(
            "Face Wash Fox gives HR a tool to show refined care at work, creating experiences employees remember and that strengthen belonging.",
          ),
          img("/PR/pr1/pr1_1.PNG", officeAlt.en),
          p(
            "Companies can flexibly choose packages by size and budget — from on-site office experiences to gifts employees redeem on their own schedule.",
          ),
          p(
            "All solutions use modern HydraFacial technology, premium Korean cosmetics, and a well-trained team for safety and results from the first visit.",
          ),
          img("/PR/pr3/pr3_2.jpg", officeAlt.en),
          p(
            "This is more than a welfare activity. It is how a company creates a small but meaningful wow moment, so teams feel cared for in a more personal way.",
          ),
          p(
            "Done well, the benefits go beyond employee experience to employer brand, internal engagement, and smarter use of budget.",
          ),
        ],
        bullets: [
          "Fox SWAT: set up an on-site skincare station for brand days, team building, or special occasions.",
          "Flexible cash vouchers: employees book at 50+ Face Wash Fox stores nationwide.",
          "Skincare gift cards: ideal for birthdays, holidays, or KPI recognition.",
          "Flexible budgets, easy to match company size and rollout goals.",
        ],
        quote:
          "Employees relax, skin looks better, confidence rises, and they feel clearly cared for in everyday work life.",
        cta: "Inbox or call 088 986 6666 for a package fit for your company. Face Wash Fox helps HR create difference from the smallest details.",
      },
      zh: {
        title: "除了薪资和奖金，你用什么留住人才？",
        excerpt: "健康福祉正成为留才策略的一部分，被真正关心的体验能带来明显差异。",
        intro: "健康福祉不再是短暂潮流，而正成为新一代的生活标准。",
        lead: "在绩效压力与密集都市节奏下，员工追求的不只是收入，更是被真正关心的感觉。",
        paragraphs: [
          p(
            "当截止日期、压力与不停歇的数字连接包围时，身体与皮肤开始发出过载信号。暗沉、缺乏活力、精神易耗尽，都是非常真实的表现。",
          ),
          p(
            "此时他们寻找的不再只是好薪水，而是恢复、被照顾，以及被当作人而非仅仅资源来对待。",
          ),
          p(
            "Face Wash Fox 为 HR 提供在职场传递细致关怀的工具，创造让员工长久记得、更愿留下的体验。",
          ),
          img("/PR/pr1/pr1_1.PNG", officeAlt.zh),
          p(
            "企业可按规模与预算灵活选择方案——从办公室现场体验，到员工按个人时间自主使用的礼遇形式。",
          ),
          p(
            "所有方案均采用现代 HydraFacial 技术、高端韩国化妆品与专业培训团队，确保从第一次就安全有效。",
          ),
          img("/PR/pr3/pr3_2.jpg", officeAlt.zh),
          p(
            "这不只是福利活动。这是企业创造虽小却有深度的 wow 时刻，让团队感到以更个人化的方式被关心。",
          ),
          p(
            "做好这一点，收益不止于员工体验，还会反映在雇主品牌、内部凝聚力与预算使用效率上。",
          ),
        ],
        bullets: [
          "Fox SWAT：在办公室设立护肤站，适合品牌日、团建或特别日子。",
          "灵活现金券：员工可在全国50多家 Face Wash Fox 门店自行预约。",
          "护肤礼品卡：适合生日、节日或 KPI 表彰。",
          "预算灵活，易按企业规模与落地目标选择。",
        ],
        quote: "员工放松、皮肤更好、更自信，并在日常工作环境中清楚感到被关心。",
        cta: "私信或拨打 088 986 6666 获取适合企业的方案。Face Wash Fox 助力 HR 从细节创造差异。",
      },
      ja: {
        title: "給与と賞与以外で、どう人材をつなぎとめていますか？",
        excerpt:
          "ウェルネスは定着戦略の一部になり、本当に大切にされる体験が明確な差を生みます。",
        intro: "ウェルネスは一過性の流行ではなく、新しい世代の生活基準になりつつあります。",
        lead:
          "成果圧力と密集した都市生活の中で、従業員が求めるのは収入だけでなく、本当に大切にされている感覚です。",
        paragraphs: [
          p(
            "締め切り、プレッシャー、止まらないデジタル接続に囲まれると、体と肌は過負荷のサインを出します。くすみ、活力不足、燃え尽きやすさはとても現実的な表れです。",
          ),
          p(
            "そのとき彼らが求めるのは良い給与だけでなく、回復し、ケアされ、リソースではなく一人の人として扱われる感覚です。",
          ),
          p(
            "Face Wash Fox は、職場で繊細な関心を届けるツールをHRに提供し、長く記憶に残り、帰属意識を高める体験をつくります。",
          ),
          img("/PR/pr1/pr1_1.PNG", officeAlt.ja),
          p(
            "企業は規模と予算に合わせて柔軟に選べます。オフィス体験から、個人の都合で使えるギフト形式まで。",
          ),
          p(
            "すべてのソリューションは最新 HydraFacial、高品質の韓国化粧品、訓練されたチームで、初回から安全と効果を支えます。",
          ),
          img("/PR/pr3/pr3_2.jpg", officeAlt.ja),
          p(
            "これは福利厚生活動だけではありません。小さくても深い wow の瞬間をつくり、チームがよりパーソナルに大切にされていると感じる方法です。",
          ),
          p(
            "うまくいくと、利点は従業員体験にとどまらず、採用ブランド、社内エンゲージメント、予算効率にも表れます。",
          ),
        ],
        bullets: [
          "Fox SWAT：ブランドデー、チームビルディング、特別な日にオフィスでスキンケアステーションを設置。",
          "柔軟なキャッシュバウチャー：全国50店舗以上の Face Wash Fox で予約。",
          "スキンケアギフトカード：誕生日、祝日、KPI達成の表彰に最適。",
          "予算は柔軟で、企業規模と展開目標に合わせやすい。",
        ],
        quote:
          "従業員はリラックスし、肌が良くなり、自信が増し、日常の職場で明確に大切にされていると感じます。",
        cta: "Inbox または 088 986 6666 まで。御社に合うパッケージをご提案します。Face Wash Fox は細部から差をつくるHRを支援します。",
      },
      ko: {
        title: "연봉과 보너스 외에, 인재를 어떻게 붙잡고 있나요?",
        excerpt:
          "웰니스는 리텐션 전략의 일부가 되었고, 진심으로 관심받는 경험이 뚜렷한 차이를 만듭니다.",
        intro: "웰니스는 일시적 유행이 아니라 새 세대의 생활 기준이 되고 있습니다.",
        lead:
          "성과 압박과 밀도 높은 도시 리듬 속에서 직원이 찾는 것은 수입만이 아니라 진심으로 관심받는 느낌입니다.",
        paragraphs: [
          p(
            "마감, 압박, 끊이지 않는 디지털 연결에 둘러싸이면 몸과 피부가 과부하 신호를 보냅니다. 칙칙함, 활력 저하, 번아웃은 매우 현실적인 증상입니다.",
          ),
          p(
            "그때 그들이 찾는 것은 좋은 급여만이 아니라 회복, 케어, 그리고 자원이 아닌 한 사람으로서 대우받는 느낌입니다.",
          ),
          p(
            "Face Wash Fox는 HR이 직장에서 세심한 관심을 전할 도구를 제공해, 오래 기억되고 소속감을 높이는 경험을 만듭니다.",
          ),
          img("/PR/pr1/pr1_1.PNG", officeAlt.ko),
          p(
            "기업은 규모와 예산에 맞게 유연하게 선택할 수 있습니다. 사무실 현장 경험부터 개인 일정에 맞춰 쓰는 선물 형태까지.",
          ),
          p(
            "모든 솔루션은 현대 HydraFacial 기술, 프리미엄 한국 화장품, 체계적으로 훈련된 팀으로 첫 방문부터 안전과 효과를 보장합니다.",
          ),
          img("/PR/pr3/pr3_2.jpg", officeAlt.ko),
          p(
            "단순한 복지 활동이 아닙니다. 작지만 깊이 있는 wow 순간을 만들어, 팀이 더 개인화된 방식으로 관심받는다고 느끼게 합니다.",
          ),
          p(
            "잘하면 이점은 직원 경험을 넘어 고용주 브랜드, 내부 결속, 예산 효율에도 반영됩니다.",
          ),
        ],
        bullets: [
          "Fox SWAT: 브랜드데이·팀빌딩·특별 행사에 사무실 스킨케어 스테이션 설치.",
          "유연한 캐시 바우처: 전국 50개 이상 Face Wash Fox 매장에서 예약.",
          "스킨케어 기프트카드: 생일, 명절, KPI 달성에 적합.",
          "예산 유연, 규모와 실행 목표에 맞추기 쉽습니다.",
        ],
        quote:
          "직원이 편안해지고 피부가 좋아지며 자신감이 오르고, 일상 업무 환경에서 분명히 관심받는다고 느낍니다.",
        cta: "Inbox 또는 088 986 6666으로 문의하세요. Face Wash Fox가 HR이 작은 것에서 차이를 만들도록 돕습니다.",
      },
      th: {
        title: "นอกจากเงินเดือนและโบนัส คุณรักษาคนเก่งด้วยอะไร?",
        excerpt:
          "เวลเนสกำลังเป็นส่วนหนึ่งของกลยุทธ์รักษาคน ที่ประสบการณ์ได้รับการใส่ใจสร้างความต่างชัดเจน",
        intro: "เวลเนสไม่ใช่เทรนด์ชั่วคราวอีกต่อไป แต่กำลังเป็นมาตรฐานการใช้ชีวิตของเจนใหม่",
        lead:
          "ท่ามกลางแรงกดดันผลงานและจังหวะเมืองที่หนาแน่น พนักงานไม่ได้มองหาแค่รายได้ แต่ยังมองหาความรู้สึกว่าได้รับการใส่ใจจริงๆ",
        paragraphs: [
          p(
            "เมื่อเดดไลน์ ความกดดัน และการเชื่อมต่อดิจิทัลไม่หยุดพัก ร่างกายและผิวเริ่มส่งสัญญาณโอเวอร์โหลด — ผิวหมอง ไร้ชีวิตชีวา จิตใจหมดไฟได้ง่าย คืออาการจริงๆ",
          ),
          p(
            "สิ่งที่พวกเขามองหาจึงไม่ใช่แค่เงินเดือนดี แต่คือการได้ฟื้นตัว ได้รับการดูแล และถูกปฏิบัติเหมือนคน ไม่ใช่แค่ทรัพยากร",
          ),
          p(
            "Face Wash Fox มอบเครื่องมือให้ HR ส่งความใส่ใจอย่างละเอียดอ่อนที่ที่ทำงาน สร้างประสบการณ์ที่พนักงานจำได้นานและอยากผูกพันมากขึ้น",
          ),
          img("/PR/pr1/pr1_1.PNG", officeAlt.th),
          p(
            "องค์กรเลือกแพ็กเกจได้ยืดหยุ่นตามขนาดและงบ — จากประสบการณ์ที่ออฟฟิศ ถึงของขวัญให้พนักงานใช้ตามตารางส่วนตัว",
          ),
          p(
            "ทุกโซลูชันใช้เทคโนโลยี HydraFacial สมัยใหม่ เครื่องสำอางเกาหลีระดับพรีเมียม และทีมที่ผ่านการฝึกอย่างเป็นระบบ เพื่อความปลอดภัยและผลลัพธ์ตั้งแต่ครั้งแรก",
          ),
          img("/PR/pr3/pr3_2.jpg", officeAlt.th),
          p(
            "นี่ไม่ใช่แค่กิจกรรมสวัสดิการ แต่เป็นวิธีสร้างช่วง wow เล็กๆ แต่ลึกซึ้ง ให้ทีมรู้สึกว่าได้รับการใส่ใจแบบเฉพาะบุคคลมากขึ้น",
          ),
          p(
            "เมื่อทำได้ดี ประโยชน์ไม่หยุดที่ประสบการณ์พนักงาน แต่สะท้อนถึงแบรนด์นายจ้าง ความผูกพันภายใน และประสิทธิภาพงบประมาณ",
          ),
        ],
        bullets: [
          "Fox SWAT: ตั้งสถานีดูแลผิวที่ออฟฟิศสำหรับ brand day, team building หรือโอกาสพิเศษ",
          "วอยเชอร์เงินสดยืดหยุ่น: พนักงานจองเองที่ร้าน Face Wash Fox กว่า 50 สาขาทั่วประเทศ",
          "บัตรของขวัญดูแลผิว: เหมาะกับวันเกิด เทศกาล หรือการยกย่อง KPI",
          "งบยืดหยุ่น เลือกตามขนาดองค์กรและเป้าหมายการนำไปใช้ได้ง่าย",
        ],
        quote:
          "พนักงานผ่อนคลาย ผิวดีขึ้น มั่นใจขึ้น และรู้สึกได้รับการใส่ใจชัดเจนในสภาพแวดล้อมการทำงานประจำวัน",
        cta: "Inbox หรือโทร 088 986 6666 เพื่อรับคำปรึกษาแพ็กเกจที่เหมาะกับองค์กร Face Wash Fox พร้อมช่วย HR สร้างความต่างจากรายละเอียดเล็กๆ",
      },
    },
  },
  {
    slug: "khi-trai-nghiem-nhan-vien-tro-thanh-chien-luoc-cua-doanh-nghiep-hien-dai",
    date: "7 April 2026",
    image: "/news/news3.JPG",
    locales: {
      vi: {
        title: "Khi trải nghiệm nhân viên trở thành chiến lược của doanh nghiệp hiện đại",
        excerpt:
          "Những hành động quan tâm cụ thể ngay tại văn phòng có thể trở thành nền tảng cho hiệu suất và sự gắn bó lâu dài.",
        intro: "Nhân viên của bạn cảm thấy thế nào mỗi sáng đến văn phòng?",
        lead:
          "Không chỉ là hoàn thành deadline, mà là cảm giác được quan tâm, dù chỉ qua những điều nhỏ nhất.",
        paragraphs: [
          p(
            "Trong nhiều năm, doanh nghiệp đầu tư mạnh vào trải nghiệm khách hàng. Nhưng hiện tại, ngày càng nhiều công ty nhận ra rằng trải nghiệm nhân viên mới là chìa khóa giữ chân tài năng và duy trì hiệu suất bền vững.",
          ),
          p(
            "Một nhân viên mệt mỏi, da xỉn màu vì điều hòa và màn hình 8 đến 10 tiếng mỗi ngày, năng lượng cạn kiệt và tự tin giảm sút sẽ rất khó duy trì sự sáng tạo hay gắn bó lâu dài.",
          ),
          p(
            "Áp lực công việc và trạng thái chạy hết pin không phải lúc nào cũng hiện rõ trên KPI, nhưng lại ảnh hưởng trực tiếp đến mood, mức độ tập trung và tương tác hàng ngày trong tổ chức.",
          ),
          img("/PR/pr2/pr2_1.JPG", officeAlt.vi),
          p(
            "Vì vậy, nhiều doanh nghiệp đang thử nghiệm cách mang well-being vào ngay trong văn phòng. Không cần sự kiện quá lớn hay chi phí khổng lồ, chỉ cần đúng lúc và đủ chân thành.",
          ),
          p(
            "Một ví dụ thực tế là Fox SWAT từ Face Wash Fox: mang thiết bị soi da công nghệ cao và liệu trình hydra facial chuyên sâu đến thẳng văn phòng trong các dịp brand day hoặc hoạt động nội bộ định kỳ.",
          ),
          img("/PR/pr2/pr2_3.jpg", officeAlt.vi),
          p(
            "Nhân viên được soi da, phân tích tình trạng ở tầng sâu, làm sạch và chăm sóc da ngay tại chỗ. Họ không cần rời khỏi công ty nhưng vẫn có thể quay lại bàn làm việc với tinh thần sảng khoái và tự tin hơn.",
          ),
          p(
            "Những hành động quan tâm cụ thể như vậy không chỉ giúp đội ngũ duy trì năng lượng, mà còn góp phần xây dựng hình ảnh công ty nhân văn, nơi mọi người thật sự muốn gắn bó lâu dài.",
          ),
          img("/PR/pr3/pr3_1.jpg", officeAlt.vi),
          p(
            "Đôi khi chỉ một thay đổi nhỏ như một buổi chăm sóc da tại chỗ cũng đủ tạo ra chuyển biến lớn: từ nhân viên mệt mỏi thành đội ngũ tích cực, từ làm việc vì lương thành làm việc vì cảm thấy được quan tâm.",
          ),
        ],
        bullets: [
          "Mang một góc tái tạo năng lượng vào ngay nơi làm việc.",
          "Soi da và chăm sóc da tại chỗ bằng công nghệ hydra facial.",
          "Tạo khoảng nghỉ ngắn nhưng đúng lúc để cải thiện mood và sự tập trung.",
          "Tăng cảm giác được trân trọng, từ đó hỗ trợ hiệu suất và gắn kết lâu dài.",
        ],
        quote:
          "Chỉ một buổi thôi mà mood cả tuần lên hẳn, cảm giác được trân trọng thật sự.",
        cta: "Inbox Face Wash Fox hoặc gọi 088 986 6666 để nhận tư vấn gói phù hợp, từ team nhỏ đến chương trình định kỳ cho doanh nghiệp.",
      },
      en: {
        title: "When employee experience becomes a modern company strategy",
        excerpt:
          "Concrete acts of care at the office can become the foundation for performance and lasting commitment.",
        intro: "How do your employees feel each morning when they arrive at the office?",
        lead:
          "It is not only about hitting deadlines — it is the feeling of being cared for, even through the smallest things.",
        paragraphs: [
          p(
            "For years, companies invested heavily in customer experience. Now more firms see that employee experience is the key to retaining talent and sustaining performance.",
          ),
          p(
            "A tired employee with dull skin from AC and screens 8–10 hours a day, low energy and fading confidence, will struggle to stay creative or committed long term.",
          ),
          p(
            "Work pressure and running on empty do not always show on KPIs, yet they directly affect mood, focus, and daily interactions in the organization.",
          ),
          img("/PR/pr2/pr2_1.JPG", officeAlt.en),
          p(
            "That is why many companies are bringing well-being into the office itself. No need for a massive event or huge budget — just the right timing and sincerity.",
          ),
          p(
            "A real example is Fox SWAT from Face Wash Fox: high-tech skin analysis and in-depth HydraFacial treatments come straight to the office for brand days or recurring internal activities.",
          ),
          img("/PR/pr2/pr2_3.jpg", officeAlt.en),
          p(
            "Employees get skin analysis, deep assessment, cleansing, and care on the spot. They never leave the company, yet return to their desks refreshed and more confident.",
          ),
          p(
            "Such concrete care not only helps teams keep energy — it also builds a human company image people truly want to stay with.",
          ),
          img("/PR/pr3/pr3_1.jpg", officeAlt.en),
          p(
            "Sometimes one small change — like an on-site skincare session — is enough for a big shift: from tired staff to an energized team, from working for pay to working because they feel cared for.",
          ),
        ],
        bullets: [
          "Bring an energy-recovery corner into the workplace.",
          "On-site skin analysis and care with HydraFacial technology.",
          "Short but well-timed breaks to improve mood and focus.",
          "Increase the feeling of being valued — supporting performance and long-term engagement.",
        ],
        quote:
          "Just one session and my mood for the whole week went up — I truly felt valued.",
        cta: "Inbox Face Wash Fox or call 088 986 6666 for a package that fits — from small teams to recurring corporate programs.",
      },
      zh: {
        title: "当员工体验成为现代企业的战略",
        excerpt: "在办公室的具体关心行动，可以成为绩效与长期归属的基础。",
        intro: "你的员工每天早上来到办公室时感觉如何？",
        lead: "不只是完成截止日期，而是被关心的感觉——哪怕只是最细小的事。",
        paragraphs: [
          p(
            "多年来企业大力投入客户体验。如今越来越多公司意识到：员工体验才是留住人才、维持可持续绩效的关键。",
          ),
          p(
            "一个因空调与屏幕每天8到10小时而疲惫、皮肤暗沉、能量耗尽、自信下降的员工，很难保持创造或长期归属。",
          ),
          p(
            "工作压力与“电量耗尽”不一定体现在KPI上，却直接影响情绪、专注度与组织中的日常互动。",
          ),
          img("/PR/pr2/pr2_1.JPG", officeAlt.zh),
          p(
            "因此许多企业正尝试把健康福祉带进办公室。不必超大型活动或巨额预算——只需恰逢其时、足够真诚。",
          ),
          p(
            "一个实际例子是 Face Wash Fox 的 Fox SWAT：在品牌日或定期内训活动中，把高科技皮肤检测与深度 HydraFacial 护理直接带到办公室。",
          ),
          img("/PR/pr2/pr2_3.jpg", officeAlt.zh),
          p(
            "员工当场完成皮肤检测、深层分析、清洁与护理。无需离开公司，却能以更清爽、更自信的状态回到工位。",
          ),
          p(
            "这样具体的关心不仅帮助团队保持能量，也塑造以人为本的公司形象，让人真正想长期留下。",
          ),
          img("/PR/pr3/pr3_1.jpg", officeAlt.zh),
          p(
            "有时只是一次现场护肤这样的小改变，就足以带来大转变：从疲惫员工到积极团队，从为薪水工作到因为被关心而工作。",
          ),
        ],
        bullets: [
          "在工作场所开辟能量恢复角落。",
          "用 HydraFacial 技术现场检测与护肤。",
          "短暂但恰当时机的休息，改善情绪与专注。",
          "增强被珍视的感觉，从而支持绩效与长期凝聚力。",
        ],
        quote: "只一次疗程，整周心情都明显提升，真的感到被珍视。",
        cta: "私信 Face Wash Fox 或拨打 088 986 6666，获取从小型团队到定期企业项目的合适方案。",
      },
      ja: {
        title: "従業員体験が現代企業の戦略になるとき",
        excerpt:
          "オフィスでの具体的な関心の行動が、成果と長期の帰属意識の基盤になり得ます。",
        intro: "従業員は毎朝オフィスに来るとき、どんな気持ちでしょうか？",
        lead:
          "締め切りを守るだけではありません。小さなことでも大切にされている感覚です。",
        paragraphs: [
          p(
            "長年、企業は顧客体験に大きく投資してきました。今は多くの会社が、人材定着と持続的な成果の鍵は従業員体験だと気づいています。",
          ),
          p(
            "エアコンと画面で1日8〜10時間、疲れ、くすみ、エネルギー切れ、自信低下の従業員は、創造性や長期の帰属を保ちにくいものです。",
          ),
          p(
            "仕事のプレッシャーとバッテリー切れはKPIに表れないこともありますが、気分、集中、日常のやり取りには直接影響します。",
          ),
          img("/PR/pr2/pr2_1.JPG", officeAlt.ja),
          p(
            "だから多くの企業がウェルビーイングをオフィスに持ち込もうとしています。巨大イベントや莫大な費用は不要。タイミングと誠実さがあれば十分です。",
          ),
          p(
            "実例が Face Wash Fox の Fox SWAT。ブランドデーや定期の社内活動で、ハイテク肌診断と本格 HydraFacial をオフィスへ直接届けます。",
          ),
          img("/PR/pr2/pr2_3.jpg", officeAlt.ja),
          p(
            "従業員はその場で肌診断、深い分析、クレンジングとケアを受けます。会社を離れなくても、すっきり自信を持ってデスクに戻れます。",
          ),
          p(
            "こうした具体的な関心はチームのエネルギー維持だけでなく、人が本当に長くいたい人間味のある会社像づくりにもつながります。",
          ),
          img("/PR/pr3/pr3_1.jpg", officeAlt.ja),
          p(
            "時には現場スキンケアのような小さな変化だけで大きな転換が起きます。疲れた個人から前向きなチームへ、給与のためから大切にされていると感じる働き方へ。",
          ),
        ],
        bullets: [
          "職場にエネルギー回復のコーナーを。",
          "HydraFacial 技術でその場で肌診断とケア。",
          "短くても適切な休憩で気分と集中を改善。",
          "大切にされている感覚を高め、成果と長期エンゲージメントを支える。",
        ],
        quote: "一回だけで一週間の気分が上がった。本当に大切にされていると感じた。",
        cta: "Face Wash Fox へInbox、または 088 986 6666。少人数から定期プログラムまでご相談ください。",
      },
      ko: {
        title: "직원 경험이 현대 기업의 전략이 될 때",
        excerpt:
          "사무실에서의 구체적인 관심 행동이 성과와 장기 소속의 기반이 될 수 있습니다.",
        intro: "직원들은 매일 아침 사무실에 올 때 어떤 기분일까요?",
        lead:
          "마감을 맞추는 것만이 아닙니다. 작은 일로도 관심받는다는 느낌입니다.",
        paragraphs: [
          p(
            "오랫동안 기업은 고객 경험에 크게 투자해 왔습니다. 이제는 많은 회사가 인재 유지와 지속 성과의 열쇠가 직원 경험임을 깨닫습니다.",
          ),
          p(
            "에어컨과 화면으로 하루 8~10시간, 피곤하고 피부가 칙칙하며 에너지와 자신감이 떨어진 직원은 창의성이나 장기 소속을 유지하기 어렵습니다.",
          ),
          p(
            "업무 압박과 방전 상태는 KPI에 늘 드러나지는 않지만, 기분·집중·조직 내 일상 상호작용에는 직접 영향을 줍니다.",
          ),
          img("/PR/pr2/pr2_1.JPG", officeAlt.ko),
          p(
            "그래서 많은 기업이 웰빙을 사무실로 가져오고 있습니다. 거대 이벤트나 막대한 비용은 필요 없습니다. 적절한 타이밍과 진심이면 충분합니다.",
          ),
          p(
            "실제 예가 Face Wash Fox의 Fox SWAT입니다. 브랜드데이나 정기 내부 활동에 하이테크 피부 분석과 심층 HydraFacial을 사무실로 직접 가져옵니다.",
          ),
          img("/PR/pr2/pr2_3.jpg", officeAlt.ko),
          p(
            "직원은 그 자리에서 피부 분석, 심층 진단, 클렌징과 케어를 받습니다. 회사를 떠나지 않고도 상쾌하고 자신감 있게 자리로 돌아갑니다.",
          ),
          p(
            "이런 구체적 관심은 팀 에너지 유지뿐 아니라, 사람들이 정말 오래 머물고 싶은 인간적인 회사 이미지에도 기여합니다.",
          ),
          img("/PR/pr3/pr3_1.jpg", officeAlt.ko),
          p(
            "가끔 현장 스킨케어 같은 작은 변화만으로도 큰 전환이 생깁니다. 지친 개인에서 적극적 팀으로, 월급 때문에 일하던 것에서 관심받는다고 느끼며 일하는 것으로.",
          ),
        ],
        bullets: [
          "직장에 에너지 회복 코너를 만듭니다.",
          "HydraFacial 기술로 현장 피부 분석과 케어.",
          "짧지만 적시의 휴식으로 기분과 집중을 개선.",
          "존중받는 느낌을 높여 성과와 장기 결속을 지원.",
        ],
        quote: "한 번만으로도 일주일 기분이 확 올랐어요. 정말 존중받는다고 느꼈습니다.",
        cta: "Face Wash Fox에 Inbox하거나 088 986 6666으로 연락해 소규모 팀부터 정기 프로그램까지 상담받으세요.",
      },
      th: {
        title: "เมื่อประสบการณ์พนักงานกลายเป็นกลยุทธ์ขององค์กรสมัยใหม่",
        excerpt:
          "การใส่ใจที่เป็นรูปธรรมที่ออฟฟิศ สามารถเป็นฐานของผลงานและความผูกพันระยะยาวได้",
        intro: "พนักงานของคุณรู้สึกอย่างไรทุกเช้าที่มาถึงออฟฟิศ?",
        lead:
          "ไม่ใช่แค่ทำเดดไลน์ให้ทัน แต่คือความรู้สึกว่าได้รับการใส่ใจ แม้ผ่านเรื่องเล็กๆ",
        paragraphs: [
          p(
            "หลายปีที่องค์กรลงทุนหนักกับประสบการณ์ลูกค้า แต่ตอนนี้บริษัทจำนวนมากขึ้นเห็นว่าประสบการณ์พนักงานต่างหากคือกุญแจรักษาคนเก่งและผลงานที่ยั่งยืน",
          ),
          p(
            "พนักงานที่เหนื่อย ผิวหมองจากแอร์และหน้าจอ 8–10 ชั่วโมงต่อวัน พลังหมดและความมั่นใจลดลง จะรักษากความคิดสร้างสรรค์หรือความผูกพันระยะยาวได้ยาก",
          ),
          p(
            "แรงกดดันงานและภาวะแบตหมดไม่ปรากฏบน KPI เสมอไป แต่กระทบอารมณ์ สมาธิ และการปฏิสัมพันธ์รายวันในองค์กรโดยตรง",
          ),
          img("/PR/pr2/pr2_1.JPG", officeAlt.th),
          p(
            "จึงมีหลายองค์กรทดลองนำ well-being เข้าสู่ออฟฟิศ ไม่ต้องอีเวนต์ใหญ่หรืองบมหาศาล — แค่ถูกเวลาและจริงใจพอ",
          ),
          p(
            "ตัวอย่างจริงคือ Fox SWAT จาก Face Wash Fox: นำอุปกรณ์วิเคราะห์ผิวเทคโนโลยีสูงและทรีตเมนต์ HydraFacial ลึกมาถึงออฟฟิศในวัน brand day หรือกิจกรรมภายในเป็นประจำ",
          ),
          img("/PR/pr2/pr2_3.jpg", officeAlt.th),
          p(
            "พนักงานได้วิเคราะห์ผิว ประเมินชั้นลึก ทำความสะอาดและดูแลผิวทันที ไม่ต้องออกจากบริษัท แต่กลับโต๊ะด้วยอารมณ์สดชื่นและมั่นใจกว่าเดิม",
          ),
          p(
            "การใส่ใจที่เป็นรูปธรรมเช่นนี้ไม่เพียงช่วยทีมรักษาพลังงาน แต่ยังสร้างภาพลักษณ์องค์กรที่เป็นมนุษย์ ที่คนอยากผูกพันระยะยาวจริงๆ",
          ),
          img("/PR/pr3/pr3_1.jpg", officeAlt.th),
          p(
            "บางครั้งแค่การเปลี่ยนเล็กๆ อย่างเซสชันดูแลผิวที่ออฟฟิศ ก็พอสร้างการเปลี่ยนแปลงใหญ่: จากพนักงานเหนื่อยเป็นทีมกระตือรือร้น จากทำงานเพื่อเงินเดือนเป็นทำงานเพราะรู้สึกได้รับการใส่ใจ",
          ),
        ],
        bullets: [
          "นำมุมฟื้นพลังเข้าสู่ที่ทำงาน",
          "วิเคราะห์และดูแลผิวหน้างานด้วยเทคโนโลยี HydraFacial",
          "พักสั้นแต่ถูกจังหวะ เพื่อปรับอารมณ์และสมาธิ",
          "เพิ่มความรู้สึกว่าได้รับการให้คุณค่า สนับสนุนผลงานและความผูกพันระยะยาว",
        ],
        quote: "แค่ครั้งเดียว อารมณ์ทั้งอาทิตย์ดีขึ้นชัด — รู้สึกว่าได้รับการให้คุณค่าจริงๆ",
        cta: "Inbox Face Wash Fox หรือโทร 088 986 6666 เพื่อรับคำปรึกษาแพ็กเกจที่เหมาะ — จากทีมเล็กถึงโปรแกรมองค์กรเป็นประจำ",
      },
    },
  },
];
