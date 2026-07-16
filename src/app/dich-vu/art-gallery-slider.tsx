"use client"

import { useMemo, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { NavigationDots } from "./navigation-dots"
import { useSliderNavigation } from "./hooks/use-slider-navigation"
import { useSliderDrag } from "./hooks/use-slider-drag"
import { useIsMobile } from "./hooks/use-mobile"
import useSharedCart from "./hooks/use-shared-cart"
import { generateStablePalette } from "./lib/color-extractor"

type ServiceTab = "extra" | "basic"
type ExtraServiceCardData = {
    id: string
    name: string
    subtitle: string
    foxiePrice: number
    listedPrice: number
    comparePrice: number
}

const EXTRA_SERVICE_CARDS: ExtraServiceCardData[] = [
    { id: "extra-1", name: "Cấp ẩm", subtitle: "Cryo", foxiePrice: 199000, listedPrice: 299000, comparePrice: 599000 },
    { id: "extra-2", name: "Sáng da", subtitle: "Lumiglow", foxiePrice: 199000, listedPrice: 299000, comparePrice: 599000 },
    { id: "extra-3", name: "Săn chắc da", subtitle: "Gymming", foxiePrice: 199000, listedPrice: 299000, comparePrice: 599000 },
    { id: "extra-4", name: "Chăm sóc mắt", subtitle: "Eye-revive", foxiePrice: 199000, listedPrice: 299000, comparePrice: 599000 },
    { id: "extra-5", name: "Chăm sóc cổ", subtitle: "Neck care", foxiePrice: 199000, listedPrice: 299000, comparePrice: 599000 },
    { id: "extra-6", name: "Sạch sâu vùng mũi", subtitle: "Acne Nose Detox", foxiePrice: 199000, listedPrice: 299000, comparePrice: 599000 },
]

type BasicServiceCardData = {
    id: string
    order: number
    image: string
    name: string
    subtitle: string
    durationVi: string
    durationEn: string
    foxiePrice: number
    listedPrice: number
    comparePrice: number
    under12Note?: string
}

const isBasicServiceCard = (
    item: BasicServiceCardData | ExtraServiceCardData | undefined
): item is BasicServiceCardData => Boolean(item && typeof (item as BasicServiceCardData).image === "string")

const BASIC_SERVICE_CARDS: BasicServiceCardData[] = [
    {
        id: "basic-1",
        order: 1,
        image: "/Dichvucb/cb1.png",
        name: "Rửa mặt công nghệ Hydra Facial",
        subtitle: "Aqua Peel Cleanse",
        durationVi: "30 PHÚT",
        durationEn: "30 Minutes",
        foxiePrice: 199000,
        listedPrice: 299000,
        comparePrice: 599000,
        under12Note: "Dưới 12 tuổi - Under 12",
    },
    {
        id: "basic-2",
        order: 2,
        image: "/Dichvucb/cb2.png",
        name: "Làm sạch sâu và cải thiện lỗ chân lông",
        subtitle: "Deep Cleanse",
        durationVi: "40 PHÚT",
        durationEn: "40 Minutes",
        foxiePrice: 339000,
        listedPrice: 489000,
        comparePrice: 999000,
    },
    {
        id: "basic-3",
        order: 3,
        image: "/Dichvucb/cb3.png",
        name: "Cấp ẩm, căng bóng và tràn đầy sức sống",
        subtitle: "Cryo Cleanse",
        durationVi: "40 PHÚT",
        durationEn: "40 Minutes",
        foxiePrice: 349000,
        listedPrice: 519000,
        comparePrice: 1299000,
    },
    {
        id: "basic-4",
        order: 4,
        image: "/Dichvucb/cb4.png",
        name: "Làm sáng và cải thiện màu da, giảm đốm nâu",
        subtitle: "Lumiglow Cleanse",
        durationVi: "40 PHÚT",
        durationEn: "40 Minutes",
        foxiePrice: 349000,
        listedPrice: 519000,
        comparePrice: 1299000,
    },
    {
        id: "basic-5",
        order: 5,
        image: "/Dichvucb/cb5.png",
        name: "Làm tăng đàn hồi, săn chắc và thư giãn da",
        subtitle: "Gymming Cleanse",
        durationVi: "40 PHÚT",
        durationEn: "40 Minutes",
        foxiePrice: 349000,
        listedPrice: 519000,
        comparePrice: 1299000,
    },
    {
        id: "basic-6",
        order: 6,
        image: "/Dichvucb/cb6.png",
        name: "Chăm sóc da mắt và làm giảm nếp nhăn mắt",
        subtitle: "Eye-revive Cleanse",
        durationVi: "40 PHÚT",
        durationEn: "40 Minutes",
        foxiePrice: 349000,
        listedPrice: 519000,
        comparePrice: 999000,
    },
]

const formatPrice = (value: number) => `${value.toLocaleString("vi-VN")}đ`

export function ArtGallerySlider() {
    const sliderRef = useRef<HTMLDivElement>(null)
    const isMobile = useIsMobile()
    const { addItem } = useSharedCart()
    const [activeTab, setActiveTab] = useState<ServiceTab>("basic")

    const totalSlides = activeTab === "basic" ? BASIC_SERVICE_CARDS.length : EXTRA_SERVICE_CARDS.length

    const { currentIndex, goToNext, goToPrev, goToSlide } = useSliderNavigation({
        totalSlides,
        enableKeyboard: true,
    })

    const { isDragging, dragX, handleDragStart, handleDragMove, handleDragEnd } = useSliderDrag({
        onSwipeLeft: goToNext,
        onSwipeRight: goToPrev,
    })

    const handleTabChange = (tab: ServiceTab) => {
        setActiveTab(tab)
        goToSlide(0)
    }

    const activeItem = useMemo(
        () => (activeTab === "basic" ? BASIC_SERVICE_CARDS[currentIndex] : EXTRA_SERVICE_CARDS[currentIndex]),
        [activeTab, currentIndex]
    )

    const currentColors = useMemo(() => {
        if (!activeItem) {
            return ["#f7931a", "#ff6a36", "#ffd28a"]
        }

        if (isBasicServiceCard(activeItem)) {
            return generateStablePalette(activeItem.image)
        }

        return generateStablePalette(activeItem.id + activeItem.name)
    }, [activeItem])
    const slideWidth = isMobile ? 270 : 396
    const [c1, c2, c3] = currentColors

    return (
        <div className="relative h-full w-full overflow-hidden touch-pan-y">
            {/* Animated ambient background */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
                    className="absolute inset-0"
                    style={{
                        background: `
              radial-gradient(ellipse at 50% 40%, ${c1}99 0%, transparent 62%),
              radial-gradient(ellipse at 20% 80%, ${c2}88 0%, transparent 64%),
              radial-gradient(ellipse at 85% 20%, ${c3}88 0%, transparent 66%),
              linear-gradient(160deg, ${c1}3d 0%, ${c2}33 45%, ${c3}2e 80%, ${c1}24 100%)
            `,
                    }}
                />
            </AnimatePresence>

            {/* Blur overlay */}
            <div className="absolute inset-0 " />

            {/* Header */}
            <header className="absolute top-0 left-0 right-0 z-20 flex items-start justify-between gap-2 p-3 sm:items-center sm:p-6 md:p-8">
                <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                    <div className="flex max-w-[calc(100vw-5.5rem)] flex-wrap items-center gap-1 rounded-full border border-white/10 bg-white/5 p-1 backdrop-blur-md sm:max-w-none sm:gap-2">
                        <button
                            type="button"
                            onClick={() => handleTabChange("basic")}
                            className={`rounded-full px-2.5 py-1.5 text-[11px] font-semibold transition sm:px-4 sm:py-2 sm:text-sm ${activeTab === "basic" ? "bg-[#ff6a36] text-white" : "text-white/70 hover:text-white"
                                }`}
                        >
                            Dịch vụ cơ bản
                        </button>
                        <button
                            type="button"
                            onClick={() => handleTabChange("extra")}
                            className={`rounded-full px-2.5 py-1.5 text-[11px] font-semibold transition sm:px-4 sm:py-2 sm:text-sm ${activeTab === "extra" ? "bg-[#ff6a36] text-white" : "text-white/70 hover:text-white"
                                }`}
                        >
                            Dịch vụ cộng thêm
                        </button>
                    </div>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="flex shrink-0 items-center gap-1 rounded-full border border-white/10 bg-white/5 px-2.5 py-1.5 backdrop-blur-md sm:gap-2 sm:px-4 sm:py-2"
                >
                    <span className="text-xs text-white/60 sm:text-sm">{String(currentIndex + 1).padStart(2, "0")}</span>
                    <span className="text-white/30">/</span>
                    <span className="text-xs text-white/40 sm:text-sm">{String(totalSlides).padStart(2, "0")}</span>
                </motion.div>
            </header>

            {/* Slider */}
            <div
                ref={sliderRef}
                className="relative flex h-full w-full cursor-grab items-center touch-pan-y active:cursor-grabbing"
                onMouseDown={handleDragStart}
                onMouseMove={handleDragMove}
                onMouseUp={handleDragEnd}
                onMouseLeave={handleDragEnd}
                onTouchStart={handleDragStart}
                onTouchMove={handleDragMove}
                onTouchEnd={handleDragEnd}
            >
                <motion.div
                    className="flex items-center gap-5 px-[calc(50vw-130px)] sm:gap-8 sm:px-[calc(50vw-150px)] md:gap-16 md:px-[calc(50vw-250px)]"
                    animate={{
                        x: -currentIndex * slideWidth + dragX,
                    }}
                    transition={isDragging ? { duration: 0 } : { duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
                >
                    {activeTab === "basic"
                        ? BASIC_SERVICE_CARDS.map((item, index) => (
                            <BasicServiceInfoCard
                                key={item.id}
                                item={item}
                                isActive={index === currentIndex}
                                dragOffset={dragX}
                                index={index}
                                currentIndex={currentIndex}
                                onAddToCart={() =>
                                    addItem({
                                        id: `service-${item.id}`,
                                        name: item.name,
                                        price: item.foxiePrice,
                                        quantity: 1,
                                        type: "service",
                                    })
                                }
                            />
                        ))
                        : EXTRA_SERVICE_CARDS.map((item, index) => (
                            <ExtraServicePriceCard
                                key={item.id}
                                item={item}
                                isActive={index === currentIndex}
                                dragOffset={dragX}
                                index={index}
                                currentIndex={currentIndex}
                            />
                        ))}
                </motion.div>
            </div>

            {/* Navigation dots */}
            <NavigationDots total={totalSlides} current={currentIndex} onSelect={goToSlide} colors={currentColors} />

            {/* Keyboard hint */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="absolute bottom-8 left-8 hidden items-center gap-3 text-white/30 md:flex"
            >
                <kbd className="rounded border border-white/10 bg-white/5 px-2 py-1 font-mono text-xs">←</kbd>
                <kbd className="rounded border border-white/10 bg-white/5 px-2 py-1 font-mono text-xs">→</kbd>
                <span className="text-xs">lướt hoặc bấm mũi tên để xem thêm</span>
            </motion.div>
        </div>
    )
}

interface ExtraServicePriceCardProps {
    item: ExtraServiceCardData
    isActive: boolean
    dragOffset: number
    index: number
    currentIndex: number
}

function ExtraServicePriceCard({ item, isActive, dragOffset, index, currentIndex }: ExtraServicePriceCardProps) {
    const distance = index - currentIndex
    const parallaxOffset = dragOffset * (0.1 * (distance + 1))

    return (
        <motion.article
            className="relative flex-shrink-0"
            animate={{
                scale: isActive ? 1 : 0.88,
                opacity: isActive ? 1 : 0.62,
                rotateY: distance * 4,
            }}
            transition={{ duration: 0.45, ease: [0.32, 0.72, 0, 1] }}
            style={{ x: parallaxOffset }}
        >
            <div className="w-[250px] rounded-[20px] border border-white/60 bg-[#ececec] p-4 shadow-[0_14px_35px_rgba(0,0,0,0.28)] sm:w-[280px] sm:rounded-[24px] sm:p-5 md:w-[332px]">
                <h3 className="text-[clamp(2rem,8vw,3.5rem)] font-extrabold leading-none text-[#212121] md:text-[56px]">{item.name}</h3>
                <p className="mt-1 text-[clamp(1rem,4vw,1.5rem)] leading-none text-[#333333]/80 md:text-[24px]">{item.subtitle}</p>

                <div className="mt-3 border-t-[3px] border-[#272727] pt-2">
                    <p className="text-right text-[14px] font-bold leading-none text-[#d1937a] line-through md:text-[18px]">
                        {formatPrice(item.comparePrice)}
                    </p>
                </div>

                <div className="mt-2 grid grid-cols-2 gap-2 sm:gap-3">
                    <div className="min-w-0">
                        <p className="text-[14px] font-extrabold leading-tight text-[#191919] sm:text-[18px] md:text-[19px]">Giá thẻ Foxie</p>
                        <p className="text-[11px] leading-none text-[#1f1f1f]/75 md:text-[13px]">Foxie Card&apos;s point</p>
                        <p className="mt-1 whitespace-nowrap text-[15px] font-extrabold leading-none text-[#19b6bf] sm:text-[18px] md:text-[20px]">
                            {formatPrice(item.foxiePrice)}
                        </p>
                    </div>
                    <div className="min-w-0 text-right">
                        <p className="text-[14px] font-extrabold leading-tight text-[#191919] sm:text-[18px] md:text-[19px]">Giá niêm yết</p>
                        <p className="text-[11px] leading-none text-[#1f1f1f]/75 md:text-[13px]">Listed price</p>
                        <p className="mt-1 whitespace-nowrap text-[15px] font-extrabold leading-none text-[#f7941d] sm:text-[18px] md:text-[20px]">
                            {formatPrice(item.listedPrice)}
                        </p>
                    </div>
                </div>
            </div>
        </motion.article>
    )
}

interface BasicServiceInfoCardProps {
    item: BasicServiceCardData
    isActive: boolean
    dragOffset: number
    index: number
    currentIndex: number
    onAddToCart: () => void
}

function BasicServiceInfoCard({ item, isActive, dragOffset, index, currentIndex, onAddToCart }: BasicServiceInfoCardProps) {
    const distance = index - currentIndex
    const parallaxOffset = dragOffset * (0.1 * (distance + 1))

    return (
        <motion.article
            className="group relative flex-shrink-0 overflow-hidden rounded-[24px]"
            animate={{
                scale: isActive ? 1 : 0.88,
                opacity: isActive ? 1 : 0.62,
                rotateY: distance * 4,
            }}
            transition={{ duration: 0.45, ease: [0.32, 0.72, 0, 1] }}
            style={{ x: parallaxOffset }}
        >
            <div className="relative w-[250px] sm:w-[280px] md:w-[332px]">
                <img
                    src={item.image}
                    alt={item.name}
                    className="w-full rounded-[20px] shadow-[0_14px_35px_rgba(0,0,0,0.28)] transition-transform duration-500 group-hover:scale-[1.02] sm:rounded-[24px]"
                    loading="lazy"
                    draggable={false}
                />
                <div className="absolute inset-0 rounded-[20px] bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-100 transition-opacity duration-300 sm:rounded-[24px] md:opacity-0 md:group-hover:opacity-100" />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 p-3 opacity-100 transition-all duration-300 md:translate-y-6 md:p-4 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100">

                    <div className="flex items-center justify-end gap-2">
                        <button
                            type="button"
                            className="pointer-events-auto rounded-full border border-white/45 bg-white/12 px-4 py-2 text-xs font-semibold text-white transition hover:bg-white/20 md:text-sm"
                        >
                            Chi tiết
                        </button>
                        <button
                            type="button"
                            aria-label="Them vao gio hang"
                            onClick={onAddToCart}
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
        </motion.article>
    )
}
