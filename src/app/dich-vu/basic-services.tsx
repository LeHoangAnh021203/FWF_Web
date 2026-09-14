"use client";

import { useLanguage } from "@/i18n/language-context";
import {
  ComboMobileNav,
  comboMobileCardClassName,
  comboMobileTrackClassName,
  useComboMobileScroll,
} from "./combo-mobile-scroll";

const basicItems = [
  {
    id: "basic-2",
    nameKey: "svc.gallery.basic2.name",
    subKey: "svc.gallery.basic2.sub",
    minutes: 40,
    foxiePrice: 339000,
    listedPrice: 489000,
  },
  {
    id: "basic-3",
    nameKey: "svc.gallery.basic3.name",
    subKey: "svc.gallery.basic3.sub",
    minutes: 40,
    foxiePrice: 349000,
    listedPrice: 519000,
  },
  {
    id: "basic-4",
    nameKey: "svc.gallery.basic4.name",
    subKey: "svc.gallery.basic4.sub",
    minutes: 40,
    foxiePrice: 349000,
    listedPrice: 519000,
  },
  {
    id: "basic-5",
    nameKey: "svc.gallery.basic5.name",
    subKey: "svc.gallery.basic5.sub",
    minutes: 40,
    foxiePrice: 349000,
    listedPrice: 519000,
  },
  {
    id: "basic-6",
    nameKey: "svc.gallery.basic6.name",
    subKey: "svc.gallery.basic6.sub",
    minutes: 40,
    foxiePrice: 349000,
    listedPrice: 519000,
  },
] as const;

const formatPrice = (value: number) => `${value.toLocaleString("vi-VN")}đ`;

export default function BasicServices() {
  const { t } = useLanguage();
  const { trackRef, scrollByCard } = useComboMobileScroll();

  return (
    <div id="dich-vu-co-ban" className="scroll-mt-20">
      <div className="mb-5 text-[#1a1a1a] md:mb-7">
        <h2 className="whitespace-nowrap text-[clamp(1.35rem,5.5vw,3rem)] font-extrabold uppercase leading-[1.1] md:text-5xl">
          {t("svc.gallery.tabBasic")}
        </h2>
      </div>

      <div ref={trackRef} className={comboMobileTrackClassName}>
        {basicItems.map((item) => (
          <article key={item.id} data-combo-card className={comboMobileCardClassName}>
            <div className="flex items-start justify-between gap-3">
              <div className="grid min-w-0 flex-1 grid-rows-[auto_minmax(0.55em,auto)_auto] gap-1.5 pr-2">
                <span className="text-[32px] font-extrabold leading-none text-[#2bb8c9] md:text-[40px]">
                  {t(item.subKey)}
                </span>
                <h3 className="text-[14px] font-extrabold uppercase leading-snug text-[#1a1a1a] md:text-[16px]">
                  {t(item.nameKey)}
                </h3>
              </div>

              <div className="flex shrink-0 flex-col items-end gap-1.5">
                <p className="text-right text-[12px] font-extrabold uppercase leading-tight tracking-wide text-[#333] md:text-[23px]">
                  {item.minutes} {t("svc.comboLove.minutes")}
                </p>
              </div>
            </div>

            <div className=" border-t border-[#ece7e2] pt-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-[11px] font-semibold text-[#666] md:text-xs">
                    {t("svc.comboLove.foxiePrice")}
                  </p>
                  <p className="mt-[-4] whitespace-nowrap text-[20px] font-extrabold leading-none text-[#2bb8c9] md:text-[28px]">
                    {formatPrice(item.foxiePrice)}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-[11px] font-semibold text-[#666] md:text-xs">
                    {t("svc.comboLove.listedPrice")}
                  </p>
                  <p className="mt-[-4] whitespace-nowrap text-[18px] font-extrabold leading-none text-[#f7941d] md:text-[24px]">
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
        prevLabel="Previous basic service"
        nextLabel="Next basic service"
      />
    </div>
  );
}
