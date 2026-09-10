"use client";

import Image from "next/image";
import Link from "next/link";

type ExperienceOffer = {
  id: string;
  title: string;
  priceLine: string;
  price: string;
  benefits: string;
  image: string;
  href: string;
};

const offers: ExperienceOffer[] = [
  {
    id: "combo-4",
    title: "Combo 4",
    priceLine: "Giá trải nghiệm lần đầu 399.000đ",
    price: "399.000đ",
    benefits: "Sáng Da - Săn Chắc Da - Chăm Sóc Mắt",
    image: "/dich vu uu dai/Combo 399.png",
    href: "/dich-vu",
  },
  {
    id: "combo-7",
    title: "Combo 7",
    priceLine: "Giá trải nghiệm lần đầu 539.000đ",
    price: "539.000đ",
    benefits: "Sạch sâu và Chăm sóc da mụn",
    image: "/dich vu uu dai/Combo 539.png",
    href: "/dich-vu",
  },
  {
    id: "combo-9",
    title: "Combo 9",
    priceLine: "Giá trải nghiệm lần đầu 689.000đ",
    price: "689.000đ",
    benefits: "Cấp ẩm - Sáng Da - Săn Chắc Da - Chăm Sóc Mắt",
    image: "/dich vu uu dai/Combo 689.png",
    href: "/dich-vu",
  },
  {
    id: "combo-ms",
    title: "Combo MS PDRN / MS Brightening",
    priceLine: "Giá trải nghiệm lần đầu 999.000đ",
    price: "999.000đ",
    benefits: "Căng bóng - Trắng sáng - Săn chắc - Hỗ trợ phục hồi",
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
              sizes="(max-width: 768px) 78vw, 280px"
              className="object-cover"
              priority
            />
            <div className="experience-offer-panel">
              <h3>{offer.title}</h3>
              <p className="experience-offer-benefits">{offer.benefits}</p>
              <p className="experience-offer-price-line">{offer.priceLine}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
