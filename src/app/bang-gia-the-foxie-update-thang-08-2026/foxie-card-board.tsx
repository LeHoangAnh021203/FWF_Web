"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { X } from "lucide-react";

const POSTER_SRC = "/bang-gia-the-foxie/quyen-loi-the-08-2026.jpg";
const POSTER_PDF = "/bang-gia-the-foxie/quyen-loi-the-08-2026.pdf";

const foxieCards = [
  { id: "crown", name: "Foxie Crown", price: "100 triệu", image: "/voucher/Asset 2@4x.png" },
  { id: "crystal", name: "Foxie Crystal", price: "80 triệu", image: "/voucher/Asset 1@4x.png" },
  { id: "platinum", name: "Foxie Platinum", price: "50 triệu", image: "/voucher/Asset 3@4x.png" },
  { id: "diamond", name: "Foxie Diamond", price: "30 triệu", image: "/voucher/Asset 4@4x.png" },
  { id: "gold", name: "Foxie Gold", price: "20 triệu", image: "/voucher/Asset 8@4x.png" },
  { id: "silver", name: "Foxie Silver", price: "10 triệu", image: "/voucher/Asset 7@4x.png" },
  { id: "bronze", name: "Foxie Bronze", price: "5 triệu", image: "/voucher/Asset 6@4x.png" },
  { id: "iron", name: "Foxie Iron", price: "3 triệu", image: "/voucher/Asset 5@4x.png" },
] as const;

export default function FoxieCardBoard() {
  const [posterOpen, setPosterOpen] = useState(false);

  useEffect(() => {
    if (!posterOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setPosterOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [posterOpen]);

  return (
    <>
      <div className="mb-8 flex flex-col items-center gap-3 sm:mb-10">
        <button
          type="button"
          onClick={() => setPosterOpen(true)}
          className="rounded-full bg-[#ea5814] px-6 py-3 text-sm font-bold uppercase tracking-wide text-white shadow-[0_12px_24px_rgba(234,88,20,0.35)] transition hover:bg-[#d44d0f] sm:text-base"
        >
          Xem quyền lợi & voucher thẻ Foxie
        </button>
        <p className="text-center text-sm font-medium text-[#5f5a57]">
          Bấm nút hoặc bấm vào từng thẻ để mở bảng quyền lợi tháng 08/2026
        </p>
      </div>

      <div className="-mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-3 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden md:mx-0 md:grid md:grid-cols-2 md:gap-4 md:overflow-visible md:px-0 md:pb-0 lg:grid-cols-4">
        {foxieCards.map((card, index) => (
          <button
            key={card.id}
            type="button"
            onClick={() => setPosterOpen(true)}
            className="group relative aspect-[2986/2340] min-w-[78%] snap-center overflow-hidden rounded-3xl bg-[#f4dcc2] text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md sm:min-w-[62%] md:min-w-0"
            aria-label={`Xem quyền lợi ${card.name}`}
          >
            <Image
              src={card.image}
              alt={`${card.name} ${card.price}`}
              fill
              className="object-contain object-center"
              sizes="(max-width: 640px) 80vw, (max-width: 1024px) 50vw, 25vw"
              priority={index < 2}
            />
          </button>
        ))}
      </div>

      {posterOpen ? (
        <div
          className="fixed inset-0 z-[1000] flex items-start justify-center bg-black/80 p-3 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label="Quyền lợi thẻ Foxie tháng 08/2026"
          onClick={() => setPosterOpen(false)}
        >
          <div
            className="relative max-h-[min(100dvh,100%)] w-full max-w-4xl overflow-y-auto rounded-2xl bg-[#f6eadc] shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="sticky top-0 z-10 flex items-center justify-between gap-3 border-b border-black/10 bg-[#f6eadc]/95 px-3 py-2 backdrop-blur-sm">
              <p className="text-sm font-bold text-[#ea5814] sm:text-base">
                Quyền lợi thẻ Foxie · 08/2026
              </p>
              <div className="flex items-center gap-2">
                <a
                  href={POSTER_PDF}
                  download
                  className="rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-[#ea5814] shadow-sm hover:bg-[#fff4ec]"
                >
                  Tải PDF
                </a>
                <button
                  type="button"
                  onClick={() => setPosterOpen(false)}
                  className="grid h-9 w-9 place-items-center rounded-full bg-[#ea5814] text-white"
                  aria-label="Đóng"
                >
                  <X className="h-5 w-5" strokeWidth={2.4} />
                </button>
              </div>
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={POSTER_SRC}
              alt="Bảng quyền lợi và voucher thẻ Foxie cập nhật tháng 08/2026"
              className="block h-auto w-full"
            />
          </div>
        </div>
      ) : null}
    </>
  );
}
