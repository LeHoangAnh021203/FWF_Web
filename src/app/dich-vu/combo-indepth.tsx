"use client";

import { useState } from "react";
import { useLanguage } from "@/i18n/language-context";
import useSharedCart from "./hooks/use-shared-cart";

type ComboIndepthItem = {
  serviceId: string;
  displayNo: number;
  titleKey: string;
  itemKey?: string;
  subKey?: string;
  minutes: number;
  foxiePrice: number;
  listedPrice: number;
  oldPrice: number;
  liked?: boolean;
};

const comboIndepthItems: ComboIndepthItem[] = [
  {
    serviceId: "deep-1",
    displayNo: 1,
    titleKey: "svc.comboDeep.i1.title",
    minutes: 60,
    foxiePrice: 999000,
    listedPrice: 1590000,
    oldPrice: 2999000,
    liked: true,
  },
  {
    serviceId: "deep-2",
    displayNo: 2,
    titleKey: "svc.comboDeep.i2.title",
    minutes: 60,
    foxiePrice: 999000,
    listedPrice: 1590000,
    oldPrice: 2999000,
  },
  {
    serviceId: "deep-3",
    displayNo: 3,
    titleKey: "svc.comboDeep.i3.title",
    itemKey: "svc.comboDeep.i3.item",
    subKey: "svc.comboDeep.i3.sub",
    minutes: 70,
    foxiePrice: 2290000,
    listedPrice: 2990000,
    oldPrice: 5490000,
  },
  {
    serviceId: "deep-4",
    displayNo: 4,
    titleKey: "svc.comboDeep.i4.title",
    itemKey: "svc.comboDeep.i4.item",
    subKey: "svc.comboDeep.i4.sub",
    minutes: 70,
    foxiePrice: 2290000,
    listedPrice: 2990000,
    oldPrice: 4990000,
  },
  {
    serviceId: "deep-5",
    displayNo: 5,
    titleKey: "svc.comboDeep.i5.title",
    itemKey: "svc.comboDeep.i5.item",
    subKey: "svc.comboDeep.i5.sub",
    minutes: 70,
    foxiePrice: 2290000,
    listedPrice: 2990000,
    oldPrice: 5990000,
    liked: true,
  },
  {
    serviceId: "deep-6",
    displayNo: 6,
    titleKey: "svc.comboDeep.i6.title",
    itemKey: "svc.comboDeep.i6.item",
    subKey: "svc.comboDeep.i6.sub",
    minutes: 70,
    foxiePrice: 999000,
    listedPrice: 1590000,
    oldPrice: 2749000,
  },
];

const formatPrice = (value: number) => `${value.toLocaleString("vi-VN")}đ`;

export default function ComboIndepth() {
  const { t } = useLanguage();
  const { addItem } = useSharedCart();
  const [selectedItem, setSelectedItem] = useState<ComboIndepthItem | null>(null);
  const [quantity, setQuantity] = useState(1);

  const openAddCartModal = (item: ComboIndepthItem) => {
    setSelectedItem(item);
    setQuantity(1);
  };

  const closeAddCartModal = () => {
    setSelectedItem(null);
    setQuantity(1);
  };

  const confirmAddToCart = () => {
    if (!selectedItem) return;

    const itemName = selectedItem.itemKey ? t(selectedItem.itemKey) : "";
    const fullName = [t(selectedItem.titleKey), itemName].filter(Boolean).join(" ");

    addItem({
      id: `service-${selectedItem.serviceId}`,
      name: fullName,
      price: selectedItem.foxiePrice,
      quantity,
      type: "service",
    });

    closeAddCartModal();
  };

  return (
    <section
      id="combo-deep"
      className="scroll-mt-20 w-full overflow-x-hidden bg-[#f7941d] px-4 pb-8 pt-10 md:px-8 md:pb-10 md:pt-14"
    >
      <div className="mx-auto w-full max-w-[1320px]">
        <div className="mb-5 text-white md:mb-7">
          <h2 className="whitespace-nowrap text-[clamp(1.35rem,5.5vw,3rem)] font-extrabold uppercase leading-[1.1] md:text-5xl">
            {t("svc.comboDeep.title")}
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:gap-4">
          {comboIndepthItems.map((item) => (
            <article
              key={item.serviceId}
              className="relative flex min-h-[190px] flex-col justify-between rounded-[18px] bg-white px-4 pb-4 pt-5 shadow-[0_8px_20px_rgba(0,0,0,0.1)] md:min-h-[210px] md:rounded-[22px] md:px-5 md:pb-5 md:pt-6"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 flex-1 pr-2">
                  <h3 className="text-[28px] font-extrabold leading-tight text-[#2bb8c9] md:text-[34px]">
                    {t(item.titleKey)}
                  </h3>
                  {item.itemKey && t(item.itemKey) ? (
                    <p className="mt-1 text-[18px] font-extrabold leading-snug text-[#1a1a1a] md:text-[22px]">
                      {t(item.itemKey)}
                    </p>
                  ) : null}
                  
                </div>

                <div className="flex shrink-0 flex-col items-end gap-1.5">
                  
                  <p className="text-right text-[12px] font-extrabold uppercase leading-tight tracking-wide text-[#333] md:text-[23px]">
                    {item.minutes} {t("svc.comboDeep.minutes")}
                  </p>
                </div>
              </div>

              <div className=" border-t border-[#ece7e2] pt-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-[11px] font-semibold text-[#666] md:text-xs">
                      {t("svc.comboDeep.foxiePrice")}
                    </p>
                    <p className=" text-[20px] font-extrabold leading-none text-[#2bb8c9] md:text-[28px]">
                      {formatPrice(item.foxiePrice)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-[11px] font-semibold text-[#666] md:text-xs">
                      {t("svc.comboDeep.listedPrice")}
                    </p>
                  
                    <p className=" text-[18px] font-extrabold leading-none text-[#f7941d] md:text-[24px]">
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
            <h3 className="text-lg font-semibold">{t("svc.comboDeep.modalTitle")}</h3>
            <p className="mt-1 text-sm text-white/70">
              {[t(selectedItem.titleKey), selectedItem.itemKey ? t(selectedItem.itemKey) : ""]
                .filter(Boolean)
                .join(" ")}
            </p>
            <p className="mt-2 text-sm text-[#ffb699]">{formatPrice(selectedItem.foxiePrice)}</p>

            <div className="mt-4 flex items-center justify-between rounded-xl border border-white/10 bg-white/5 p-3">
              <span className="text-sm">{t("svc.comboDeep.qty")}</span>
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
                {t("svc.comboDeep.cancel")}
              </button>
              <button
                type="button"
                onClick={confirmAddToCart}
                className="rounded-full bg-[#ff6a36] px-5 py-2 text-sm font-semibold text-white hover:bg-[#f45c28]"
              >
                {t("svc.comboDeep.addCart")}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
