import Image from "next/image"
import Link from "next/link"

import { foxNewsItems } from "@/components/b2b/home-data"

export function FoxNewsSection() {
  return (
    <section
      id="fox-news"
      className="overflow-hidden bg-[radial-gradient(circle_at_top,rgba(255,196,112,0.18),transparent_26%),linear-gradient(180deg,#ffffff_0%,#fffaf3_52%,#ffffff_100%)] py-20 md:py-24"
    >
      <div className="mx-auto w-full max-w-[1800px] px-4 sm:px-6 md:px-10 xl:px-12">
        <div className="mx-auto mb-14 max-w-3xl text-center md:mb-16">
          <p className="mb-3 text-xl font-medium uppercase text-orange-400 md:text-[2rem]">
            Cập nhật
          </p>
          <h2 className="text-3xl font-extrabold text-orange-500 drop-shadow-[0_5px_16px_rgba(249,115,22,0.18)] md:bg-gradient-to-b md:from-[#ffb15f] md:via-orange-500 md:to-[#f97316] md:bg-clip-text md:text-5xl md:text-transparent">
            <span className="bg-gradient-to-r from-[#ff6a3d] via-[#ff8a24] to-[#ffca43] bg-clip-text text-transparent">
              Fox news
            </span>
          </h2>
        </div>

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3 xl:gap-11">
          {foxNewsItems.map((item) => (
            <Link
              key={item.slug}
              href={`/tin-tuc/${item.slug}`}
              className="group flex h-full w-full flex-col text-left transition-transform duration-300 hover:-translate-y-1"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
              </div>

              <div className="flex flex-1 flex-col pt-5">
                <div className="mb-4 flex min-h-[56px] flex-wrap items-center gap-3">
                  <p className="text-[1.05rem] font-medium text-orange-400 md:text-[1.15rem]">
                    {item.date}
                  </p>
                  <span className="inline-flex min-w-[132px] items-center justify-center rounded-full border border-[#f0c437] bg-[repeating-linear-gradient(45deg,rgba(240,196,55,0.18)_0,rgba(240,196,55,0.18)_11px,rgba(255,220,90,0.42)_11px,rgba(255,220,90,0.42)_22px)] px-7 py-1 text-[1.05rem] font-medium italic text-black md:text-[1.2rem]">
                    Mới
                  </span>
                </div>
                <h3 className="max-w-full text-2xl font-extrabold leading-[1.04] text-[#ff6a3d] md:min-h-[168px] md:text-[22px]">
                  {item.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
