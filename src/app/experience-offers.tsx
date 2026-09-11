"use client";

import Image from "next/image";
import Link from "next/link";

type ExperienceOffer = {
  id: string;
  title: string;
  price: string;
  benefits: string;
  image: string;
  href: string;
};

const offers: ExperienceOffer[] = [
  {
    id: "combo-4",
    title: "Combo 4",
    price: "399.000đ",
    benefits: "Sáng Da - Săn\u00a0Chắc\u00a0Da - Chăm\u00a0Sóc\u00a0Mắt",
    image: "/dich vu uu dai/Combo 399.png",
    href: "/dich-vu",
  },
  {
    id: "combo-7",
    title: "Combo 7",
    price: "539.000đ",
    benefits: "Sạch sâu và Chăm sóc da mụn",
    image: "/dich vu uu dai/Combo 539.png",
    href: "/dich-vu",
  },
  {
    id: "combo-9",
    title: "Combo 9",
    price: "689.000đ",
    benefits: "Cấp ẩm - Sáng Da - Săn\u00a0Chắc\u00a0Da - Chăm\u00a0Sóc\u00a0Mắt",
    image: "/dich vu uu dai/Combo 689.png",
    href: "/dich-vu",
  },
  {
    id: "combo-ms",
    title: "MS PDRN / MS Brightening",
    price: "999.000đ",
    benefits: "Căng bóng - Săn chắc - Hỗ trợ phục hồi",
    image: "/dich vu uu dai/Combo 999.png",
    href: "/dich-vu",
  },
];

export default function ExperienceOffers() {
  return (
    <div className="experience-offers">
      <div className="experience-offers-track">
        {offers.map((offer) => (
          <Link
            key={offer.id}
            href={offer.href}
            className="experience-offer-card"
            aria-label={`${offer.title} — ${offer.price}`}
          >
            <Image
              src={offer.image}
              alt={offer.title}
              fill
              sizes="(max-width: 768px) 78vw, 25vw"
              className="object-cover"
              priority
            />
            <div className="experience-offer-panel">
              <h3>{offer.title}</h3>
              <div className="experience-offer-meta">
                <p className="experience-offer-benefits">{offer.benefits}</p>
                <p className="experience-offer-price-line">
                  Giá trải nghiệm lần đầu <strong>{offer.price}</strong>
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
