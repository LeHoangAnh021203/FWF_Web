const serviceCards = [
  {
    alt: "Liệu trình rửa mặt chuyên sâu",
    image: "/service-page/01-treatment.png",
  },
  {
    alt: "Đại sứ thương hiệu Face Wash Fox",
    image: "/service-page/02-ambassador.png",
  },
  {
    alt: "Đội ngũ kỹ thuật viên Face Wash Fox",
    image: "/service-page/03-team.png",
  },
] as const;

export default function ServiceSection() {
  return (
    <section className="mx-auto grid w-full max-w-[1400px] grid-cols-1 items-center gap-6 px-4 py-8 sm:gap-8 sm:px-6 sm:py-10 md:px-10 md:py-14 lg:grid-cols-[minmax(220px,320px)_minmax(0,1fr)] lg:gap-12 lg:px-12">
      <section className="grid gap-3 sm:gap-4 lg:gap-5">
        <h1 className="max-w-[12ch] text-[clamp(1.85rem,8vw,3.5rem)] font-extrabold leading-[1.05] text-[#171717]">
          Dịch vụ cung cấp
        </h1>
        <p className="max-w-[40ch] text-[clamp(0.95rem,3.8vw,1.25rem)] leading-relaxed text-[#6f6f6f]">
          Những liệu trình rửa mặt chuyên sâu được chúng tôi nghiên cứu và phát
          triển không ngừng để phục vụ cho hàng triệu khách hàng Việt Nam
        </p>
        <a
          href="#combo-love"
          className="mt-1 inline-flex min-h-11 items-center gap-2 text-[clamp(1rem,3.5vw,1.15rem)] font-bold text-[#f46d34] no-underline"
          aria-label="Khám phá dịch vụ ngay"
        >
          Khám Phá Ngay <span aria-hidden>→</span>
        </a>
      </section>

      <section
        className="grid grid-cols-3 items-end gap-1.5 sm:gap-3 md:gap-4"
        aria-label="Thư viện hình ảnh dịch vụ"
      >
        {serviceCards.map((card) => (
          <article key={card.alt} className="min-w-0">
            <img
              src={card.image}
              alt={card.alt}
              width={640}
              height={911}
              className="block h-auto w-full"
              loading="eager"
            />
          </article>
        ))}
      </section>
    </section>
  );
}
