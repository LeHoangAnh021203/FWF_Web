"use client";

import Image from "next/image";
import { useState } from "react";
import { useLanguage } from "@/i18n/language-context";
import useSharedCart from "./hooks/use-shared-cart";

const comboItems = [
  {
    serviceId: "popular-4",
    displayNo: 4,
    titleKey: "svc.comboLove.i4.title",
    descKey: "svc.comboLove.i4.desc",
    minutes: 50,
    foxiePrice: 769000,
    listedPrice: 1079000,
    liked: true,
  },
  {
    serviceId: "popular-7",
    displayNo: 7,

    titleKey: "svc.comboLove.i7.title",
    descKey: "svc.comboLove.i7.desc",
    minutes: 50,
    foxiePrice: 579000,
    listedPrice: 809000,
    liked: true,
  },
  {
    serviceId: "popular-8",
    displayNo: 8,
    titleKey: "svc.comboLove.i8.title",
    descKey: "svc.comboLove.i8.desc",
    minutes: 50,
    foxiePrice: 599000,
    listedPrice: 829000,
    liked: true,
  },
  {
    serviceId: "popular-9",
    displayNo: 9,
    titleKey: "svc.comboLove.i9.title",
    descKey: "svc.comboLove.i9.desc",
    minutes: 55,
    foxiePrice: 959000,
    listedPrice: 1378000,
    liked: true,
  },
] as const;

const formatPrice = (value: number) => `${value.toLocaleString("vi-VN")}đ`;

export default function ComboLove() {
  const { t } = useLanguage();
  const { addItem } = useSharedCart();
  const [selectedItem, setSelectedItem] = useState<(typeof comboItems)[number] | null>(null);
  const [quantity, setQuantity] = useState(1);

  const openAddCartModal = (item: (typeof comboItems)[number]) => {
    setSelectedItem(item);
    setQuantity(1);
  };

  const closeAddCartModal = () => {
    setSelectedItem(null);
    setQuantity(1);
  };

  const confirmAddToCart = () => {
    if (!selectedItem) return;

    addItem({
      id: `service-${selectedItem.serviceId}`,
      name: t(selectedItem.titleKey),
      price: selectedItem.foxiePrice,
      quantity,
      type: "service",
    });

    closeAddCartModal();
  };

  return (
    <section
      id="combo-love"
      className="scroll-mt-20 w-full overflow-x-hidden bg-[radial-gradient(circle_at_top,#ffe0c4_0%,#fff7ef_42%,#ffffff_100%)] px-4 pb-10 pt-10 sm:px-6 md:px-10 md:pb-12 md:pt-14 lg:px-[5.5rem] xl:px-24"
    >
      <div className="mx-auto w-full max-w-[1320px]">
        <div className="mb-5 flex items-center gap-3 text-[#1a1a1a] md:mb-7 md:gap-4">
          <h2 className="whitespace-nowrap text-[clamp(1.35rem,5.5vw,3rem)] font-extrabold uppercase leading-[1.1] md:text-5xl">
            {t("svc.comboLove.title1")} {t("svc.comboLove.title2")}
          </h2>
          <Image
            src="/images/README.png"
            alt={t("svc.comboLove.likeAlt")}
            width={88}
            height={88}
            className="h-14 w-14 shrink-0 object-contain md:h-[88px] md:w-[88px]"
          />
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:gap-4">
          {comboItems.map((item) => (
            <article
              key={item.serviceId}
              className="relative flex min-h-[190px] flex-col justify-between rounded-[22px] border border-[#f0e4d8] bg-white px-4 pb-4 pt-5 shadow-[0_10px_28px_rgba(244,116,29,0.12)] md:min-h-[210px] md:rounded-[26px] md:px-5 md:pb-5 md:pt-6"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 flex-1 pr-2">
                  <span className="text-[32px] font-extrabold leading-none text-[#2bb8c9] md:text-[40px]">
                    Combo {item.displayNo}
                  </span>
                  <h3 className="pt-2 text-[14px] font-extrabold uppercase leading-snug text-[#1a1a1a] md:text-[16px]">
                    {t(item.titleKey)}
                  </h3>
                  <p className="mt-1.5 text-[12px] font-medium leading-snug text-[#777] md:text-[13px]">
                    {t(item.descKey)}
                  </p>
                </div>

                <div className="flex shrink-0 flex-col items-end gap-1.5">
                  {item.liked ? (
                    <Image
                      src="/images/README.png"
                      alt={t("svc.comboLove.likeAlt")}
                      width={40}
                      height={40}
                      className="h-8 w-8 object-contain md:h-10 md:w-10"
                    />
                  ) : null}
                  <p className="text-right text-[12px] font-extrabold uppercase leading-tight tracking-wide text-[#333] md:text-[23px]">
                    {item.minutes} {t("svc.comboLove.minutes")}
                  </p>
                </div>
              </div>

              <div className="mt-4 border-t border-[#ece7e2] pt-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-[11px] font-semibold text-[#666] md:text-xs">
                      {t("svc.comboLove.foxiePrice")}
                    </p>
                    <p className=" text-[20px] font-extrabold leading-none text-[#2bb8c9] md:text-[34px]">
                      {formatPrice(item.foxiePrice)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-[11px] font-semibold text-[#666] md:text-xs">
                      {t("svc.comboLove.listedPrice")}
                    </p>
                    <p className=" text-[18px] font-extrabold leading-none text-[#ff6a36] md:text-[34px]">
                      {formatPrice(item.listedPrice)}
                    </p>
                  </div>
                </div>


              </div>
            </article>
          ))}
        </div>
      </div>

      {selectedItem ? (
        <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[#151515] p-5 text-white">
            <h3 className="text-lg font-semibold">{t("svc.comboLove.modalTitle")}</h3>
            <p className="mt-1 text-sm text-white/70">{t(selectedItem.titleKey)}</p>
            <p className="mt-2 text-sm text-[#ffb699]">{formatPrice(selectedItem.foxiePrice)}</p>

            <div className="mt-4 flex items-center justify-between rounded-xl border border-white/10 bg-white/5 p-3">
              <span className="text-sm">{t("svc.comboLove.qty")}</span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                  className="h-8 w-8 rounded-full bg-white/10"
                >
                  -
                </button>
                <span className="min-w-8 text-center text-sm">{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity((prev) => prev + 1)}
                  className="h-8 w-8 rounded-full bg-white/10"
                >
                  +
                </button>
              </div>
            </div>

            <div className="mt-5 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={closeAddCartModal}
                className="rounded-full border border-white/20 px-4 py-2 text-sm text-white/80"
              >
                {t("svc.comboLove.cancel")}
              </button>
              <button
                type="button"
                onClick={confirmAddToCart}
                className="rounded-full bg-[#ff6a36] px-5 py-2 text-sm font-semibold text-white hover:bg-[#f45c28]"
              >
                {t("svc.comboLove.addCart")}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
