/* eslint-disable @next/next/no-img-element */

import LoadingOverlay from "./loading-overlay";
import NewsShowcase from "./news-showcase";
import ScrollEffects from "./scroll-effects";
import ServiceCarousel from "./service-carousel";
import { SiteFooter, SiteHeader, SocialLinks } from "./site-chrome";
import { foxNewsItems } from "@/components/b2b/home-data";

const services = [
  {
    name: "Aqua Peel Cleanse",
    description: "Rửa mặt công nghệ Hydra Facial",
    price: "219.000 đ",
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
    price: "489.000 đ",
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
        <p className="store-kicker">Sự có mặt của chúng tôi</p>
        <div className="store-stats">
          <article>
            <span>Công nghệ</span>
            <strong>Đầu tiên</strong>
            <p>
              Chuỗi cửa hàng rửa mặt công nghệ cao đầu tiên tại Việt Nam, chuyên
              cung cấp các dịch vụ chăm sóc da mặt chuyên sâu kết hợp công nghệ
              hiện đại
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
        <div className="store-location-copy">
          <p>
            Hà Nội, TP Hồ Chí Minh, Đà Nẵng, Hải Phòng, Nha Trang và Vũng Tàu
          </p>
          <a href="/cua-hang">Tìm cửa hàng</a>
        </div>
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
        <div className="feedback-stage">
          <div className="testimonial-track">
            {testimonials.map((item) => (
              <article className="testimonial-card" key={item.name}>
                <div className="stars">★★★★★</div>
                <p>{item.quote}</p>
                <div className="testimonial-person">
                  <img src={item.image} alt="" />
                  <h3>{item.name}</h3>
                </div>
              </article>
            ))}
          </div>
        </div>
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

      <section id="home-contact-info" className="contact-section">
        <div>
          <h2>Hệ thống cửa hàng Face Wash Fox</h2>
          <a href="/cua-hang">Xem vị trí</a>
        </div>
        <div>
          <h2>Thời gian hoạt động</h2>
          <p>
            Giờ mở cửa: <b> từ 9h30 – 21h30 </b>
            <br />
            (tuỳ thuộc vào cửa hàng)
          </p>
          <p>
            Hotline:<b> 0889866666 </b>
          </p>
        </div>
        <div>
          <h2>Tham gia cùng chúng tôi</h2>
          <SocialLinks />
          <p>Quét QR để tải ứng dụng:</p>
          <img
            className="qr"
            src="/qr/fwf-app.png"
            alt=""
          />
        </div>
      </section>

      <SiteFooter home />
    </main>
  );
}
