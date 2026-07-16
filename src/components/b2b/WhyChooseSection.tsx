"use client"

import { useEffect, useMemo, useState } from "react"
import { ChevronDown } from "lucide-react"
import Image from "next/image"

const showcaseImages = [
  "/autoSection/40.png",
  "/autoSection/42.png",
  "/autoSection/47.png",
]

const slideWidth = 312
const slideGap = 18

export function WhyChooseSection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(true)

  const imageTrack = useMemo(
    () => [...showcaseImages, ...showcaseImages],
    []
  )

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveIndex((current) => {
        const next = current + 1

        if (next > showcaseImages.length) {
          return current
        }

        return next
      })
    }, 2600)

    return () => window.clearInterval(interval)
  }, [])

  useEffect(() => {
    if (activeIndex !== showcaseImages.length) return

    const resetTimer = window.setTimeout(() => {
      setIsAnimating(false)
      setActiveIndex(0)

      window.setTimeout(() => {
        setIsAnimating(true)
      }, 80)
    }, 700)

    return () => window.clearTimeout(resetTimer)
  }, [activeIndex])

  return (
    <section
      id="services"
      className="overflow-hidden bg-[linear-gradient(180deg,#fffdfa_0%,#fff4e8_52%,#ffffff_100%)] py-20 md:py-24"
    >
      <div className="mx-auto grid max-w-[1440px] gap-10 px-4 md:px-8 xl:grid-cols-[minmax(0,0.94fr)_460px] xl:items-start xl:gap-12">
        <div className="max-w-[820px]">
          <div className="mb-8 max-w-2xl text-center lg:mb-10 lg:text-left">
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.14em] text-orange-300 md:text-base">
              Khám phá
            </p>
            <h2 className="text-2xl font-bold leading-tight text-orange-500 md:text-3xl lg:text-4xl">
              Điều khiến Face Wash Fox trở thành <br className="hidden lg:block" /> lựa chọn của nhiều doanh nghiệp
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2 lg:grid-rows-2 lg:gap-x-5 lg:gap-y-5">
            {industries.map((industry) => (
              <details
                key={industry.name}
                className={`group rounded-[26px] bg-[linear-gradient(180deg,rgba(255,244,233,0.96),rgba(255,236,214,0.94))] p-2.5 shadow-[0_18px_45px_-30px_rgba(234,88,12,0.28)] transition-all duration-300 open:bg-[linear-gradient(180deg,rgba(255,239,221,0.98),rgba(255,228,198,0.96))] open:shadow-[0_24px_55px_-28px_rgba(234,88,12,0.34)] ${industry.layoutClass}`}
              >
                <summary className="flex min-h-[164px] cursor-pointer list-none flex-col justify-between rounded-[22px] border border-orange-100/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.65),rgba(255,247,239,0.38))] p-5 marker:hidden">
                  <div className="flex items-start justify-between gap-4">
                    <div className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-[18px] bg-[linear-gradient(180deg,#ffbf69_0%,#ff9f1c_100%)] text-white shadow-[0_16px_35px_-20px_rgba(234,88,12,0.8)] [&_svg]:h-7 [&_svg]:w-7">
                      <div className="absolute inset-0 rounded-[18px] bg-white/10" />
                      <div className="relative z-10">
                        <industry.icon />
                      </div>
                    </div>
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-orange-200 bg-white/75 text-orange-400 transition-transform duration-300 group-open:rotate-180">
                      <ChevronDown className="h-4 w-4" />
                    </div>
                  </div>
                  <h3 className="max-w-[18ch] text-lg font-bold leading-tight text-orange-950 md:text-[1.35rem]">
                    {industry.name}
                  </h3>
                </summary>
                <div className="px-2 pb-2 pt-4">
                  <p
                    className="text-[15px] leading-6 text-stone-600"
                    dangerouslySetInnerHTML={{ __html: industry.description }}
                  />
                </div>
              </details>
            ))}
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[460px]">
          <div className="absolute inset-x-10 top-8 h-32 rounded-full bg-[radial-gradient(circle,rgba(251,146,60,0.18),transparent_72%)] blur-3xl" />
          <div className="relative overflow-hidden rounded-[36px] border border-orange-100/80 bg-[linear-gradient(180deg,rgba(255,255,255,0.85),rgba(255,247,239,0.72))] p-4 shadow-[0_35px_90px_-34px_rgba(234,88,12,0.28)] md:p-5">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-orange-300">
                  Trải nghiệm
                </p>
                <h3 className="mt-2 text-2xl font-extrabold leading-tight text-orange-600">
                  Fox SWAT in action
                </h3>
              </div>
            
            </div>

            <div className="relative h-[640px] overflow-hidden rounded-[28px] bg-[linear-gradient(180deg,#fff7ed_0%,#fff1e6_100%)] p-2">
              

              <div
                className="flex h-full items-stretch gap-[18px]"
                style={{
                  width: `${imageTrack.length * slideWidth + (imageTrack.length - 1) * slideGap}px`,
                  transform: `translateX(-${activeIndex * (slideWidth + slideGap)}px)`,
                  transition: isAnimating ? "transform 700ms cubic-bezier(0.22, 1, 0.36, 1)" : "none",
                }}
              >
                {imageTrack.map((image, index) => (
                  <div
                    key={`${image}-${index}`}
                    className="relative h-full w-[312px] shrink-0 overflow-hidden rounded-[24px] "
                  >
                    <Image
                      src={image}
                      alt={`Face Wash Fox showcase ${index + 1}`}
                      fill
                      sizes="312px"
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

const industries = [
  {
    name: "Ngân sách linh hoạt",
    description: "Gói dịch vụ tùy chỉnh theo quy mô và ngân sách doanh nghiệp, <br /> không phát sinh chi phí ngoài.",
    layoutClass: "lg:col-start-1 lg:row-start-1",
    icon: () => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-hand-coins-icon lucide-hand-coins"
      >
        <path d="M11 15h2a2 2 0 1 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 17" />
        <path d="m7 21 1.6-1.4c.3-.4.8-.6 1.4-.6h4c1.1 0 2.1-.4 2.8-1.2l4.6-4.4a2 2 0 0 0-2.75-2.91l-4.2 3.9" />
        <path d="m2 16 6 6" />
        <circle cx="16" cy="9" r="2.9" />
        <circle cx="6" cy="5" r="3" />
      </svg>
    ),
  },
  {
    name: "Trải nghiệm chăm sóc khác biệt",
    description: "Mang đến trải nghiệm chăm sóc da thiết thực, giúp nhân viên cảm thấy được quan tâm và nâng cao hình ảnh doanh nghiệp.",
    layoutClass: "lg:col-start-2 lg:row-start-1",
    icon: () => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-store-icon lucide-store"
      >
        <path d="M15 21v-5a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v5" />
        <path d="M17.774 10.31a1.12 1.12 0 0 0-1.549 0 2.5 2.5 0 0 1-3.451 0 1.12 1.12 0 0 0-1.548 0 2.5 2.5 0 0 1-3.452 0 1.12 1.12 0 0 0-1.549 0 2.5 2.5 0 0 1-3.77-3.248l2.889-4.184A2 2 0 0 1 7 2h10a2 2 0 0 1 1.653.873l2.895 4.192a2.5 2.5 0 0 1-3.774 3.244" />
        <path d="M4 10.95V19a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8.05" />
      </svg>
    ),
  },
  {
    name: "Dễ dàng sử dụng",
    description: "Nhân viên có thể dễ dàng sử dụng dịch vụ tại hơn 50 cửa hàng Facewashfox trên toàn quốc",
    layoutClass: "lg:col-start-1 lg:row-start-2",
    icon: () => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-check-check-icon lucide-check-check"
      >
        <path d="M18 6 7 17l-5-5" />
        <path d="m22 10-7.5 7.5L13 16" />
      </svg>
    ),
  },
  {
    name: "Quy trình chuyên nghiệp",
    description: "Đội ngũ chuyên viên được đào tạo bài bản, quy trình chuẩn hóa từ soi da AI đến liệu trình chăm sóc, đảm bảo chất lượng đồng bộ",
    layoutClass: "lg:col-start-2 lg:row-start-2",
    icon: () => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-gem-icon lucide-gem"
      >
        <path d="M10.5 3 8 9l4 13 4-13-2.5-6" />
        <path d="M17 3a2 2 0 0 1 1.6.8l3 4a2 2 0 0 1 .013 2.382l-7.99 10.986a2 2 0 0 1-3.247 0l-7.99-10.986A2 2 0 0 1 2.4 7.8l2.998-3.997A2 2 0 0 1 7 3z" />
        <path d="M2 9h20" />
      </svg>
    ),
  },
]
