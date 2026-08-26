"use client";

import Image from "next/image";
import { useState } from "react";
import { useLanguage } from "@/i18n/language-context";
import useSharedCart from "./hooks/use-shared-cart";

const comboItems = [
  {
    serviceId: "popular-1",
    image: "/combo/combo2 02-03.png",
    titleKey: "svc.comboLove.i1.title",
    descKey: "svc.comboLove.i1.desc",
    foxiePrice: 549000,
    listedPrice: 779000,
    oldPrice: 1799000,
    liked: true,
  },
  {
    serviceId: "popular-2",
    image: "/combo/combo2 02-04.png",
    titleKey: "svc.comboLove.i2.title",
    descKey: "svc.comboLove.i2.desc",
    foxiePrice: 579000,
    listedPrice: 809000,
    oldPrice: 1899000,
  },
  {
    serviceId: "popular-3",
    image: "/combo/combo-06.png",
    titleKey: "svc.comboLove.i3.title",
    descKey: "svc.comboLove.i3.desc",
    foxiePrice: 579000,
    listedPrice: 809000,
    oldPrice: 1329000,
  },
  {
    serviceId: "popular-4",
    image: "/combo/combo-07.png",
    titleKey: "svc.comboLove.i4.title",
    descKey: "svc.comboLove.i4.desc",
    foxiePrice: 769000,
    listedPrice: 999000,
    oldPrice: 1519000,
    liked: true,
  },
  {
    serviceId: "popular-5",
    image: "/combo/cb5.png",
    titleKey: "svc.comboLove.i5.title",
    descKey: "svc.comboLove.i5.desc",
    foxiePrice: 769000,
    listedPrice: 999000,
    oldPrice: 1519000,
  },
  {
    serviceId: "popular-6",
    image: "/combo/cb 6.png",
    titleKey: "svc.comboLove.i6.title",
    descKey: "svc.comboLove.i6.desc",
    foxiePrice: 769000,
    listedPrice: 999000,
    oldPrice: 1519000,
  },
];

const formatPrice = (value: number) => `${value.toLocaleString("en-US")}đ`;

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
    <section id="combo-love" className="scroll-mt-20 w-full overflow-x-hidden bg-[#f7941d] px-4 py-8 md:px-8 md:py-10">
      <div className="mx-auto w-full max-w-[1320px]">
        <div className="mb-5 text-white md:mb-7">
          <h2 className="text-[clamp(1.75rem,7vw,3rem)] font-extrabold uppercase leading-[1.1] md:text-5xl">
            {t("svc.comboLove.title1")}
            <br />
            {t("svc.comboLove.title2")}
          </h2>
          <p className="mt-2 text-[clamp(1.1rem,4.5vw,1.75rem)] font-medium md:text-4xl">
            {t("svc.comboLove.subtitle")}
          </p>
        </div>

        <div className="-mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-3 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden md:mx-0 md:grid md:grid-cols-2 md:gap-4 md:overflow-visible md:px-0 md:pb-0 lg:grid-cols-3">
          {comboItems.map((item, index) => (
            <article
              key={`${item.image}-${index}`}
              className="group min-w-[78%] snap-center overflow-hidden rounded-[22px] bg-white p-1.5 shadow-[0_8px_20px_rgba(0,0,0,0.12)] sm:min-w-[62%] sm:rounded-[24px] sm:p-2 md:min-w-0"
            >
              <div className="relative aspect-square overflow-hidden rounded-[18px] bg-[#f5f5f5]">
                <Image
                  src={item.image}
                  alt={t(item.titleKey)}
                  fill
                  sizes="(max-width: 768px) 80vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-contain transition-transform duration-500 group-hover:scale-[1.02]"
                />
                <div className="absolute right-2 top-2 z-10 min-w-9 rounded-full border-2 border-white bg-[#ff6a36] px-2.5 py-1 text-center text-xs font-extrabold text-white shadow-[0_6px_16px_rgba(0,0,0,0.25)] md:right-3 md:top-3 md:min-w-10 md:px-3 md:text-sm">
                  {String(index + 1).padStart(2, "0")}
                </div>
                {item.liked ? (
                  <div className="absolute left-2 top-2 z-10 grid h-10 w-10 place-items-center overflow-hidden rounded-full border-2 border-white bg-white shadow-[0_6px_16px_rgba(0,0,0,0.25)] md:left-3 md:top-3 md:h-11 md:w-11">
                    <Image
                      src="/images/Cao like@4x.png"
                      alt={t("svc.comboLove.likeAlt")}
                      width={34}
                      height={34}
                      className="h-8 w-8 object-contain"
                    />
                  </div>
                ) : null}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent opacity-100 transition-opacity duration-300 md:opacity-0 md:group-hover:opacity-100" />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 p-3 opacity-100 transition-all duration-300 md:translate-y-6 md:p-4 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100">
                  <div className="rounded-2xl border border-white/20 bg-black/30 p-3 text-white backdrop-blur-[1px] md:bg-black/20 md:p-4">
                    <p className="text-[11px] leading-tight text-white/85 md:text-sm">{t(item.descKey)}</p>
                    <h3 className="mt-1 text-[15px] font-extrabold leading-tight md:text-[20px]">{t(item.titleKey)}</h3>

                    <div className="mt-3 grid grid-cols-2 gap-3 leading-tight md:gap-4">
                      <div>
                        <p className="text-[10px] font-semibold text-white/70 md:text-xs">{t("svc.comboLove.foxiePrice")}</p>
                        <p className="text-[10px] text-white/60 md:text-xs">{t("svc.comboLove.foxiePoint")}</p>
                        <p className="mt-1 text-[15px] font-extrabold leading-none text-[#ffb699] md:text-[20px]">
                          {formatPrice(item.foxiePrice)}
                        </p>
                      </div>

                      <div className="text-right">
                        <p className="text-[12px] font-bold text-white/65 line-through md:text-[10px]">{formatPrice(item.oldPrice)}</p>
                        <p className="text-[10px] font-semibold text-white/70 md:text-xs">{t("svc.comboLove.listedPrice")}</p>
                        <p className="text-[10px] text-white/60 md:text-xs">{t("svc.comboLove.listedEn")}</p>
                        <p className="mt-1 text-[14px] font-extrabold leading-none text-[#ffd08c] md:text-[15px]">
                          {formatPrice(item.listedPrice)}
                        </p>
                      </div>
                    </div>

                    <div className="mt-2 flex items-center justify-end gap-2 md:mt-3">
                      <button
                        type="button"
                        className="pointer-events-auto rounded-full border border-white/45 bg-white/12 px-4 py-2 text-xs font-semibold text-white transition hover:bg-white/20 md:text-sm"
                      >
                        {t("svc.comboLove.detail")}
                      </button>
                      <button
                        type="button"
                        aria-label={t("svc.comboLove.addCartAria")}
                        onClick={() => openAddCartModal(item)}
                        className="pointer-events-auto grid h-9 w-9 place-items-center rounded-full border border-white/45 bg-[#ff6a36] text-white transition hover:bg-[#f45c28] md:h-10 md:w-10"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-4 w-4 md:h-5 md:w-5"
                        >
                          <circle cx="9" cy="20" r="1" />
                          <circle cx="17" cy="20" r="1" />
                          <path d="M3 4h2l2.2 10.2a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 2-1.6L21 7H7" />
                        </svg>
                      </button>
                    </div>
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
