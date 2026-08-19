/* eslint-disable @next/next/no-img-element */

import LoadingOverlay from "./loading-overlay";
import NewsShowcase from "./news-showcase";
import ScrollEffects from "./scroll-effects";
import ServiceCarousel from "./service-carousel";
import FeedbackCarousel from "./feedback-carousel";
import CityTimeline from "./city-timeline";
import { SiteFooter, SiteHeader } from "./site-chrome";
import { foxNewsItems } from "@/components/b2b/home-data";

const services = [
  {
    name: "Aqua Peel Cleanse",
    description: "Rửa mặt công nghệ Hydra Facial",
    price: "299.000 đ",
    image: "/services/aqua-peel-clean.png",
  },
  {
    name: "Lumiglow Cleanse",
    description: "Làm sáng và đều màu da, giảm đốm nâu",
    price: "519.000 đ",
    image: "/services/lumiglow.png",
  },
  {
    name: "Gymming Cleanse",
    description: "Làm săn chắc và tăng độ đàn hồi da, chống lão hoá",
    price: "519.000 đ",
    image: "/services/gymming.png",
  },
  {
    name: "Cryo Cleanse",
    description: "Cấp ẩm và làm da căng bóng, tràn đầy sức sống",
    price: "519.000 đ",
    image: "/services/cryo.png",
  },
  {
    name: "Deep Cleanse",
    description: "Làm sạch sâu và thu nhỏ lỗ chân lông, trẻ hoá da",
    price: "489.000 đ",
    image: "/services/deep-cleanse.png",
  },
  {
    name: "Eye-Revive Cleanse",
    description: "Chăm sóc da mắt và làm giảm nếp nhăn mắt",
    price: "519.000 đ",
    image: "/services/eye-revive.png",
  },
];

const testimonials = [
  {
    name: "Ngô Thảo",
    quote:
      "Dịch vụ tốt, nhân viên dễ thương, các bạn take care rất nhiệt tình, nên trải nghiệm",
    image: "/PR/pr3/pr3_1.jpg",
  },
  {
    name: "Nguyễn Hảo",
    quote:
      "Cửa hàng xinh quá trời! Máy móc hiện đại, các bạn nhân viên dễ thương xỉu, da sạch sâu lại tiết kiệm!",
    image: "/PR/pr1/pr1_1.PNG",
  },
  {
    name: "Joni Vu",
    quote:
      "Dịch vụ tốt, trang thiết bị hiện đại. Khuyến khích mọi người trải nghiệm nha!",
    image: "/PR/pr2/pr2_1.JPG",
  },
  {
    name: "Trần Phương Trinh",
    quote:
      "Ấn tượng nhất là không gian decor khá xinh xắn, bình thường đi spa sẽ hay ngại nhưng mà nhân viên ở đây đáng yêu cực. Recommend cho chị em nên trải nghiệm thử ở đây nha ^^",
    image: "/PR/pr3/pr3_2.jpg",
  },
  {
    name: "Phan Nguyen",
    quote:
      "Dịch vụ tuyệt vời, nhanh gọn mà lại hiệu quả. Chăm sóc da cho nam rất tiện, sau khi rửa mặt mình cảm thấy da sạch và hết mụn đầu đen. Nói chung là thích, giá cực kỳ hợp lý. Mình recommend nhé.",
    image: "/PR/pr2/pr2_2.JPG",
  },
];

const presenceCities = [
  {
    name: "Hà Nội",
    text: "Hệ thống cửa hàng Face Wash Fox phủ rộng thủ đô với nhiều chi nhánh tiện lợi, mang trải nghiệm rửa mặt công nghệ cao đến gần khách hàng hơn.",
    image: "/branch/AEON MALL HÀ ĐÔNG/MT1b.jpg",
    imageAlt: "Chi nhánh Face Wash Fox AEON Mall Hà Đông",
  },
  {
    name: "Hải Phòng",
    text: "Mở rộng mạnh tại thành phố cảng, mang dịch vụ rửa mặt công nghệ cao và không gian trải nghiệm thân thiện đến người dân địa phương.",
    image: "/branch/AEON MALL HÀ ĐÔNG/S6.jpg",
    imageAlt: "Không gian Face Wash Fox tại AEON Mall Hà Đông",
  },
  {
    name: "Đà Nẵng",
    text: "Điểm đến rửa mặt công nghệ tại miền Trung, giúp khách hàng trải nghiệm liệu trình chuyên sâu với tiêu chuẩn đồng nhất toàn hệ thống.",
    image: "/branch/Lotte Liễu Giai/V4.jpg",
    imageAlt: "Không gian Face Wash Fox Lotte Liễu Giai",
  },
  {
    name: "Nha Trang",
    text: "Phục vụ khách địa phương và du khách với liệu trình làm sạch sâu, phù hợp khí hậu biển và nhịp sống năng động của thành phố.",
    image: "/branch/Lotte Liễu Giai/V8.jpg",
    imageAlt: "Nội thất Face Wash Fox Lotte Liễu Giai",
  },
  {
    name: "TP Hồ Chí Minh",
    text: "Thành phố có mật độ cửa hàng dày đặc nhất, phủ từ trung tâm đến các khu đô thị mới để khách dễ dàng đặt lịch và chăm sóc da.",
    image: "/Fox Swat/S7B.jpg",
    imageAlt: "Không gian Face Wash Fox tại TP Hồ Chí Minh",
  },
  {
    name: "Vũng Tàu",
    text: "Chi nhánh gần biển giúp khách thư giãn và chăm sóc da nhanh chóng với công nghệ hiện đại, giá minh bạch theo tiêu chuẩn Face Wash Fox.",
    image: "/branch/AEON MALL HÀ ĐÔNG/S5B.jpg",
    imageAlt: "Không gian Face Wash Fox AEON Mall Hà Đông",
  },
] as const;

const commitments = [
  {
    title: "Ứng dụng công nghệ",
    text: "App linh hoạt & tiện dụng tối ưu trải nghiệm khách hàng. Máy móc công nghệ tiên tiến nhất được áp dụng cho tất cả các dịch vụ",
    image: "/commitments/technology.png",
  },
  {
    title: "Minh bạch giá cả",
    text: "Giá dịch vụ niêm yết rõ ràng trên app và website, đồng nhất cho tất cả cửa hàng trong hệ thống, không phí tips.",
    image: "/commitments/pricing.png",
  },
  {
    title: "Tiết kiệm chi phí và thời gian",
    text: "Tất cả các quy trình đều được tối ưu để mang lại trải nghiệm tốt nhất cho khách hàng trong thời gian ngắn với chi phí tốt nhất.",
    image: "/commitments/time.png",
  },
  {
    title: "Phù hợp cho mọi khách hàng",
    text: "Không hạn chế đối tượng chăm sóc da vì chúng tôi tin rằng làn da đẹp không phân biệt giới tính hay độ tuổi.",
    image: "/commitments/audience.png",
  },
  {
    title: "Tập trung vào dịch vụ cốt lõi là rửa mặt",
    text: "Chúng tôi chỉ tập trung vào việc rửa mặt để mang lại làn da đẹp cho khách hàng",
    image: "/commitments/focus.png",
  },
];

export default function Home() {
  return (
    <main className="mono-page">
      <LoadingOverlay />
      <ScrollEffects />
      <SiteHeader home />

      <section id="hero" className="mono-hero">
        <div className="hero-title" aria-hidden="true">
          <span>F</span>
          <span>W</span>
          <span>F</span>
        </div>
        <div className="hero-frame">
          <video
            className="hero-video"
            src="/fwf-hero.mp4"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
          />
        </div>
      </section>

      <section className="store-section">
        <h2 className="store-title">Sự có mặt của chúng tôi</h2>
        <div className="store-stats">
          <article>
            <span>Chuỗi cửa hàng rửa mặt</span>
            <strong>Công nghệ cao</strong>
            <p>
              chuyên cung cấp các dịch vụ chăm sóc da mặt
              chuyên sâu kết hợp công nghệ hiện đại
            </p>
          </article>
          <article>
            <span>Cuối năm</span>
            <strong className="stat-number" data-count-to="2023">
              2023
            </strong>
            <p>Chính thức ra mắt rộng rãi từ cuối năm 2023 - đầu năm 2024</p>
          </article>
          <article>
            <span>Quy mô</span>
            <strong className="stat-number" data-count-to="50" data-suffix="+">
              50+
            </strong>
            <p>Chi nhánh trên toàn quốc</p>
          </article>
        </div>
        <CityTimeline cities={presenceCities} />
      </section>

      <section id="our-picks" className="models-section">
        <div className="section-heading">
          <h2>Các dịch vụ nổi bật</h2>
          <p>
            Những liệu trình rửa mặt chăm sóc da chuyên sâu được mọi người ưa
            chuộng.
          </p>
        </div>
        <ServiceCarousel services={services} />
      </section>

      <section id="story" className="story-section">
        <div className="story-copy">
          <p>&quot;Da đẹp bắt đầu từ việc rửa mặt&quot;</p>
          <h2>Câu chuyện dịch vụ</h2>
          <p>
            Face Wash Fox là chuỗi cửa hàng rửa mặt công nghệ cao dành cho mọi
            người ra đời tạo nên khái niệm mới về công nghệ chăm sóc da mặt, là
            sự kết hợp giữa công nghệ hydra facial hiện đại và tối ưu hóa quy
            trình chăm sóc da để giúp khách hàng có được một làn da đẹp dễ dàng
            hơn bao giờ hết.
          </p>
          <a href="https://facewashfox.com/ve-chung-toi/">Tìm hiểu thêm</a>
        </div>
        <div className="video-panel story-video">
          <video
            src="/fwf-story.mp4"
            poster="/fwf-story-poster.jpg"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-label="Video giới thiệu Face Wash Fox"
          />
        </div>
      </section>

      <NewsShowcase posts={foxNewsItems} />

      <section className="feedback-section">
        <div className="section-heading">
          <h2>Feedback</h2>
          <p>Đánh giá của khách hàng về Face Wash Fox trong thời gian vừa qua.</p>
        </div>
        <FeedbackCarousel testimonials={testimonials} />
      </section>

      <section className="commitment-section">
        <h2>
          Face Wash Fox cam kết mang đến các trải nghiệm mới mẻ và hứng khởi cho
          người dùng thông qua dịch vụ chăm sóc da mặt chất lượng bằng máy móc
          công nghệ cao với chi phí hợp lý.
        </h2>
        <div className="commitment-grid">
          {commitments.map((item) => (
            <article key={item.title}>
              <img src={item.image} alt="" />
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>



      <SiteFooter home />
    </main>
  );
}
