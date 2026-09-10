"use client";

import { useLanguage } from "@/i18n/language-context";

const extraItems = [
  {
    id: "extra-1",
    nameKey: "svc.gallery.extra1.name",
    subKey: "svc.gallery.extra1.sub",
    foxiePrice: 199000,
    listedPrice: 299000,
    oldPrice: 599000,
  },
  {
    id: "extra-2",
    nameKey: "svc.gallery.extra2.name",
    subKey: "svc.gallery.extra2.sub",
    foxiePrice: 199000,
    listedPrice: 299000,
    oldPrice: 599000,
  },
  {
    id: "extra-3",
    nameKey: "svc.gallery.extra3.name",
    subKey: "svc.gallery.extra3.sub",
    foxiePrice: 199000,
    listedPrice: 299000,
    oldPrice: 599000,
  },
  {
    id: "extra-4",
    nameKey: "svc.gallery.extra4.name",
    subKey: "svc.gallery.extra4.sub",
    foxiePrice: 199000,
    listedPrice: 299000,
    oldPrice: 599000,
  },
  {
    id: "extra-5",
    nameKey: "svc.gallery.extra5.name",
    subKey: "svc.gallery.extra5.sub",
    foxiePrice: 199000,
    listedPrice: 299000,
    oldPrice: 599000,
  },
  {
    id: "extra-6",
    nameKey: "svc.gallery.extra6.name",
    subKey: "svc.gallery.extra6.sub",
    foxiePrice: 199000,
    listedPrice: 299000,
    oldPrice: 599000,
  },
] as const;

const formatPrice = (value: number) => `${value.toLocaleString("vi-VN")}đ`;

export default function ExtraServices() {
  const { t } = useLanguage();

  return (
    <div id="dich-vu-cong-them" className="scroll-mt-20">
      <div className="mb-5 text-[#1a1a1a] md:mb-7">
        <h2 className="whitespace-nowrap text-[clamp(1.35rem,5.5vw,3rem)] font-extrabold uppercase leading-[1.1] md:text-5xl">
          {t("svc.gallery.tabExtra")}
        </h2>
      </div>

      <div className="-mx-4 overflow-x-auto px-4 pb-2 sm:-mx-6 sm:px-6 md:-mx-10 md:px-10 lg:mx-0 lg:overflow-visible lg:px-0">
        <div className="grid w-max grid-cols-6 gap-3 lg:w-full lg:gap-3 xl:gap-4">
          {extraItems.map((item) => (
            <article
              key={item.id}
              className="relative flex w-[min(42vw,190px)] min-h-[200px] flex-col justify-between rounded-[18px] border border-[#f0e4d8] bg-white px-3 pb-3 pt-4 shadow-[0_10px_28px_rgba(244,116,29,0.12)] sm:w-[170px] md:w-[180px] md:rounded-[20px] md:px-3.5 md:pb-3.5 md:pt-4 lg:w-auto lg:min-h-[210px] lg:rounded-[22px]"
            >
              <div className="min-w-0">
                <h3 className="whitespace-nowrap text-[15px] font-extrabold leading-tight text-[#2bb8c9] sm:text-[16px] xl:text-[18px]">
                  {t(item.nameKey)}
                </h3>
                <p className="mt-1 text-[13px] font-bold leading-snug text-[#1a1a1a] sm:text-[14px] xl:text-[15px]">
                  {t(item.subKey)}
                </p>
              </div>

              <div className="mt-3 border-t border-[#ece7e2] pt-2.5">
                <p className="mb-2 text-right text-[11px] font-semibold leading-none text-[#f7941d] line-through sm:text-[12px]">
                  {formatPrice(item.oldPrice)}
                </p>
                <div className="grid grid-cols-2 gap-2">
                  <div className="min-w-0">
                    <p className="text-[10px] font-semibold leading-tight text-[#666] xl:text-[11px]">
                      {t("svc.gallery.foxiePrice")}
                    </p>
                    <p className="mt-1 text-[15px] font-extrabold leading-none text-[#2bb8c9] xl:text-[17px]">
                      {formatPrice(item.foxiePrice)}
                    </p>
                  </div>
                  <div className="min-w-0 text-right">
                    <p className="text-[10px] font-semibold leading-tight text-[#666] xl:text-[11px]">
                      {t("svc.gallery.listedPrice")}
                    </p>
                    <p className="mt-1 text-[15px] font-extrabold leading-none text-[#f7941d] xl:text-[17px]">
                      {formatPrice(item.listedPrice)}
                    </p>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
