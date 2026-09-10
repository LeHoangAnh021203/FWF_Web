"use client";

import Image from "next/image";
import { useLanguage } from "@/i18n/language-context";

type VoucherCard = {
  id: string;
  nameKey: string;
  image: string;
};

/** Sorted low → high by recharge value */
const voucherCards: VoucherCard[] = [
  { id: "foxie-trial", nameKey: "svc.voucher.trial", image: "/voucher/foxie-cards/foxie-0-trial.png" },
  { id: "foxie-iron", nameKey: "svc.voucher.iron", image: "/voucher/foxie-cards/foxie-1-iron.png" },
  { id: "foxie-bronze", nameKey: "svc.voucher.bronze", image: "/voucher/foxie-cards/foxie-2-bronze.png" },
  { id: "foxie-silver", nameKey: "svc.voucher.silver", image: "/voucher/foxie-cards/foxie-3-silver.png" },
  { id: "foxie-gold", nameKey: "svc.voucher.gold", image: "/voucher/foxie-cards/foxie-4-gold.png" },
  { id: "foxie-diamond", nameKey: "svc.voucher.diamond", image: "/voucher/foxie-cards/foxie-5-diamond.png" },
  { id: "foxie-platinum", nameKey: "svc.voucher.platinum", image: "/voucher/foxie-cards/foxie-6-platinum.png" },
  { id: "foxie-crystal", nameKey: "svc.voucher.crystal", image: "/voucher/foxie-cards/foxie-7-crystal.png" },
  { id: "foxie-crown", nameKey: "svc.voucher.crown", image: "/voucher/foxie-cards/foxie-8-crown.png" },
];

export default function VoucherSection() {
  const { t } = useLanguage();

  return (
    <section className="w-full overflow-x-hidden bg-[#f7e0c7] px-4 py-10 md:px-8 md:py-14">
      <div className="mx-auto w-full max-w-6xl">
        <div className="mb-7 text-center md:mb-10">
          <h2 className="text-[clamp(1.75rem,7vw,3.75rem)] font-extrabold uppercase leading-tight text-[#f05b2a] md:text-6xl">
            {t("svc.voucher.title")}
          </h2>
          <p className="mt-1 text-[clamp(1.05rem,4vw,2.25rem)] font-bold uppercase text-[#f05b2a] md:mt-2 md:text-4xl">
            {t("svc.voucher.subtitle")}
          </p>
          <p className="mx-auto mt-3 max-w-4xl text-sm font-medium leading-relaxed text-[#222] md:mt-4 md:text-2xl">
            {t("svc.voucher.body1")}{" "}
            <span className="font-bold">{t("svc.voucher.bodySave")}</span> {t("svc.voucher.body2")}{" "}
            <span className="font-bold">{t("svc.voucher.bodyShare")}</span>.
          </p>
        </div>

        <div className="-mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-3 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden md:mx-0 md:grid md:grid-cols-2 md:gap-4 md:overflow-visible md:px-0 md:pb-0 lg:grid-cols-3">
          {voucherCards.map((voucher, index) => (
            <div
              key={voucher.id}
              className="relative aspect-[1672/941] min-w-[78%] max-w-[320px] snap-center overflow-hidden rounded-[28px] bg-transparent sm:min-w-[58%] md:max-w-none md:min-w-0"
            >
              <Image
                src={voucher.image}
                alt={t(voucher.nameKey)}
                fill
                className="object-contain object-center"
                sizes="(max-width: 640px) 78vw, (max-width: 1024px) 45vw, 360px"
                priority={index < 3}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
