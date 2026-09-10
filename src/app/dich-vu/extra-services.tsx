"use client";

import { useLanguage } from "@/i18n/language-context";
import {
  ComboMobileNav,
  comboMobileCardClassName,
  comboMobileTrackClassName,
  useComboMobileScroll,
} from "./combo-mobile-scroll";

const extraItems = [
  {
    id: "extra-1",
    nameKey: "svc.gallery.extra1.name",
    subKey: "svc.gallery.extra1.sub",
    foxiePrice: 199000,
    listedPrice: 299000,
  },
  {
    id: "extra-2",
    nameKey: "svc.gallery.extra2.name",
    subKey: "svc.gallery.extra2.sub",
    foxiePrice: 199000,
    listedPrice: 299000,
  },
  {
    id: "extra-3",
    nameKey: "svc.gallery.extra3.name",
    subKey: "svc.gallery.extra3.sub",
    foxiePrice: 199000,
    listedPrice: 299000,
  },
  {
    id: "extra-4",
    nameKey: "svc.gallery.extra4.name",
    subKey: "svc.gallery.extra4.sub",
    foxiePrice: 199000,
    listedPrice: 299000,
  },
  {
    id: "extra-5",
    nameKey: "svc.gallery.extra5.name",
    subKey: "svc.gallery.extra5.sub",
    foxiePrice: 199000,
    listedPrice: 299000,
  },
  {
    id: "extra-6",
    nameKey: "svc.gallery.extra6.name",
    subKey: "svc.gallery.extra6.sub",
    foxiePrice: 199000,
    listedPrice: 299000,
  },
] as const;

const formatPrice = (value: number) => `${value.toLocaleString("vi-VN")}đ`;

export default function ExtraServices() {
  const { t } = useLanguage();
  const { trackRef, scrollByCard } = useComboMobileScroll();

  return (
    <div id="dich-vu-cong-them" className="scroll-mt-20">
      <div className="mb-5 text-[#1a1a1a] md:mb-7">
        <h2 className="whitespace-nowrap text-[clamp(1.35rem,5.5vw,3rem)] font-extrabold uppercase leading-[1.1] md:text-5xl">
          {t("svc.gallery.tabExtra")}
        </h2>
      </div>

      <div
        ref={trackRef}
        className={`${comboMobileTrackClassName} md:grid-cols-2 lg:grid-cols-3`}
      >
        {extraItems.map((item) => (
          <article
            key={item.id}
            data-combo-card
            className={`${comboMobileCardClassName} shadow-[0_14px_36px_rgba(244,116,29,0.22)]`}
          >
            <div className="min-w-0">
              <h3 className="whitespace-nowrap text-[22px] font-extrabold leading-tight text-[#2bb8c9] md:text-[28px]">
                {t(item.nameKey)}
              </h3>
              <p className="mt-1 text-[16px] font-extrabold leading-snug text-[#1a1a1a] md:text-[20px]">
                {t(item.subKey)}
              </p>
            </div>

            <div className="mt-4 border-t border-[#ece7e2] pt-3">
              <div className="grid grid-cols-2 gap-3">
                <div className="min-w-0">
                  <p className="text-[11px] font-semibold text-[#666] md:text-xs">
                    {t("svc.gallery.foxiePrice")}
                  </p>
                  <p className="mt-1 whitespace-nowrap text-[20px] font-extrabold leading-none text-[#2bb8c9] md:text-[28px]">
                    {formatPrice(item.foxiePrice)}
                  </p>
                </div>
                <div className="min-w-0 text-right">
                  <p className="text-[11px] font-semibold text-[#666] md:text-xs">
                    {t("svc.gallery.listedPrice")}
                  </p>
                  <p className="mt-1 whitespace-nowrap text-[18px] font-extrabold leading-none text-[#f7941d] md:text-[24px]">
                    {formatPrice(item.listedPrice)}
                  </p>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      <ComboMobileNav
        onPrev={() => scrollByCard(-1)}
        onNext={() => scrollByCard(1)}
        prevLabel="Previous extra service"
        nextLabel="Next extra service"
      />
    </div>
  );
}
