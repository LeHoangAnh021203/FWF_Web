"use client";

import Image from "next/image";
import { ShoppingCart } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "@/i18n/language-context";
import useSharedCart from "./hooks/use-shared-cart";

type VoucherCard = {
  id: string;
  nameKey: string;
  price: number;
  image: string;
};

const voucherCards: VoucherCard[] = [
  { id: "foxie-crown", nameKey: "svc.voucher.crown", price: 100000000, image: "/voucher/Asset 2@4x.png" },
  { id: "foxie-crystal", nameKey: "svc.voucher.crystal", price: 80000000, image: "/voucher/Asset 1@4x.png" },
  { id: "foxie-platinum", nameKey: "svc.voucher.platinum", price: 50000000, image: "/voucher/Asset 3@4x.png" },
  { id: "foxie-diamond", nameKey: "svc.voucher.diamond", price: 30000000, image: "/voucher/Asset 4@4x.png" },
  { id: "foxie-gold", nameKey: "svc.voucher.gold", price: 20000000, image: "/voucher/Asset 8@4x.png" },
  { id: "foxie-silver", nameKey: "svc.voucher.silver", price: 10000000, image: "/voucher/Asset 7@4x.png" },
  { id: "foxie-bronze", nameKey: "svc.voucher.bronze", price: 5000000, image: "/voucher/Asset 6@4x.png" },
  { id: "foxie-iron", nameKey: "svc.voucher.iron", price: 3000000, image: "/voucher/Asset 5@4x.png" },
];

const formatVnd = (value: number) =>
  new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(value);

export default function VoucherSection() {
  const { t } = useLanguage();
  const { addItem } = useSharedCart();
  const [quantities, setQuantities] = useState<Record<string, number>>(
    Object.fromEntries(voucherCards.map((voucher) => [voucher.id, 1])),
  );
  const [activeCardId, setActiveCardId] = useState<string | null>(null);

  const updateQuantity = (id: string, delta: number) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max(1, (prev[id] ?? 1) + delta),
    }));
  };

  const handleAddVoucher = (voucher: VoucherCard) => {
    const quantity = quantities[voucher.id] ?? 1;
    addItem({
      id: `voucher-${voucher.id}`,
      name: t(voucher.nameKey),
      price: voucher.price,
      quantity,
      type: "voucher",
    });
  };

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
            <span className="font-bold">
              {t("svc.voucher.bodyShare")}
            </span>
            .
          </p>
        </div>

        <div className="-mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-3 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden md:mx-0 md:grid md:grid-cols-2 md:gap-4 md:overflow-visible md:px-0 md:pb-0 lg:grid-cols-4">
          {voucherCards.map((voucher, index) => {
            const isActive = activeCardId === voucher.id;

            return (
              <div
                key={voucher.id}
                className="group relative aspect-[2986/2340] min-w-[78%] snap-center overflow-hidden rounded-3xl bg-[#f4dcc2] shadow-sm sm:min-w-[62%] md:min-w-0"
                onClick={() =>
                  setActiveCardId((prev) => (prev === voucher.id ? null : voucher.id))
                }
              >
                <Image
                  src={voucher.image}
                  alt={t(voucher.nameKey)}
                  fill
                  className="object-contain object-center"
                  sizes="(max-width: 640px) 80vw, (max-width: 1024px) 50vw, 25vw"
                  priority={index < 2}
                />

                <div
                  className={`pointer-events-none absolute inset-0 bg-black/40 transition-opacity duration-300 md:opacity-0 md:group-hover:opacity-100 ${
                    isActive ? "opacity-100" : "opacity-0"
                  }`}
                />
                <div
                  className={`absolute inset-x-3 bottom-3 rounded-2xl bg-black/75 p-2 text-white transition-all duration-300 md:pointer-events-none md:translate-y-4 md:opacity-0 md:group-hover:pointer-events-auto md:group-hover:translate-y-0 md:group-hover:opacity-100 ${
                    isActive
                      ? "pointer-events-auto translate-y-0 opacity-100"
                      : "pointer-events-none translate-y-4 opacity-0"
                  }`}
                >
                  <div className="mb-2 flex items-center justify-between gap-2">
                    <p className="text-xs font-semibold text-[#ffb699]">
                      {formatVnd(voucher.price)}
                    </p>
                    <div className="flex items-center gap-1 rounded-full bg-white/10 px-1 py-1">
                      <button
                        type="button"
                        onClick={(event) => {
                          event.stopPropagation();
                          updateQuantity(voucher.id, -1);
                        }}
                        className="grid h-7 w-7 place-items-center rounded-full bg-white/15 text-sm hover:bg-white/25"
                      >
                        -
                      </button>
                      <span className="min-w-6 text-center text-xs font-semibold">
                        {quantities[voucher.id] ?? 1}
                      </span>
                      <button
                        type="button"
                        onClick={(event) => {
                          event.stopPropagation();
                          updateQuantity(voucher.id, 1);
                        }}
                        className="grid h-7 w-7 place-items-center rounded-full bg-white/15 text-sm hover:bg-white/25"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={(event) => {
                      event.stopPropagation();
                      handleAddVoucher(voucher);
                    }}
                    className="flex h-9 w-full items-center justify-center gap-2 rounded-xl bg-[#ff6a36] text-sm font-semibold text-white hover:bg-[#f45c28]"
                  >
                    <ShoppingCart className="h-4 w-4" />
                    {t("svc.voucher.addCart")}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
