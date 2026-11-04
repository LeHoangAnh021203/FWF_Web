"use client";

import Image from "next/image";
import Link from "next/link";

import { useLanguage } from "@/i18n/language-context";

const offers = [
  {
    id: "combo-4",
    titleKey: "home.exp.combo4.title",
    benefitsKey: "home.exp.combo4.benefits",
    price: "399.000đ",
    image: "/dich vu uu dai/Combo 399.png",
    href: "/dich-vu",
  },
  {
    id: "combo-7",
    titleKey: "home.exp.combo7.title",
    benefitsKey: "home.exp.combo7.benefits",
    price: "539.000đ",
    image: "/dich vu uu dai/Combo 539.png",
    href: "/dich-vu",
  },
  {
    id: "combo-9",
    titleKey: "home.exp.combo9.title",
    benefitsKey: "home.exp.combo9.benefits",
    price: "689.000đ",
    image: "/dich vu uu dai/Combo 689.png",
    href: "/dich-vu",
  },
  {
    id: "combo-ms",
    titleKey: "home.exp.comboMs.title",
    benefitsKey: "home.exp.comboMs.benefits",
    price: "999.000đ",
    image: "/dich vu uu dai/Combo 999.png",
    href: "/dich-vu",
  },
] as const;

export default function ExperienceOffers() {
  const { t } = useLanguage();

  return (
    <div className="experience-offers">
      <div className="experience-offers-track">
        {offers.map((offer) => {
          const title = t(offer.titleKey);
          const benefits = t(offer.benefitsKey);
          return (
            <Link
              key={offer.id}
              href={offer.href}
              className="experience-offer-card"
              aria-label={`${title} — ${offer.price}`}
            >
              <Image
                src={offer.image}
                alt={title}
                fill
                sizes="(max-width: 768px) 78vw, 25vw"
                className="object-cover"
                priority
              />
              <div className="experience-offer-panel">
                <h3>{title}</h3>
                <div className="experience-offer-meta">
                  <p className="experience-offer-benefits">{benefits}</p>
                  <p className="experience-offer-price-line">
                    {t("home.exp.priceLabel")} <strong>{offer.price}</strong>
                  </p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
