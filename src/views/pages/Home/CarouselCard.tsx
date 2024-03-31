import { useCarousel } from '@/views/components/ui/carousel'
import { useDotButton } from '@/views/components/ui/carouselButton'
import React from 'react'
import { HomeCarouselProps } from './HomeCarousel'
import { Link } from 'react-router-dom'
import { buildImageUrl } from '@/lib/utils'

const CarouselCard: React.FC<HomeCarouselProps> = ({ carouselItems }) => {
    const { api } = useCarousel()
    const { selectedIndex, scrollSnaps } = useDotButton(api)
    return (
        <>
            {scrollSnaps.map((_snap, index) => {
                const infoData = carouselItems[index]
                return index === selectedIndex ? (
                    <div
                        key={index}
                        className=" shadow-lg shadow-black nes-container z-20 dark:!border-white flex flex-col animate-[fadeIn] duration-200 ease-linear absolute max-w-[300px] sm:max-w-[700px] bottom-6 py-2 px-3 sm:py-4 sm:px-6 md:-bottom-4 right-8 bg-background gap-3"
                    >
                        <h2 className="title !text-xl w-fit">Movie.info</h2>
                        <div className="flex flex-row">
                            <div className="img-container pr-5 hidden md:block">
                                <img
                                    src={buildImageUrl(infoData.thumb_url)}
                                    alt={infoData.name}
                                    className="w-24 h-32 min-w-32 sm:w-32 sm:h-40 md:w-40 md:h-52 aspect-2/3 flex-shrink-0"
                                />
                            </div>
                            <div className="flex flex-col sm:max-w-[320px]">
                                <div className="flex-row gap-2 mt-2 hidden sm:flex">
                                    {infoData.category.map((item, index) => (
                                        <span
                                            key={index}
                                            className="text-xs text-foreground font-medium bg-secondary px-2 py-1 self-start truncate"
                                        >
                                            {item.name}
                                        </span>
                                    ))}
                                </div>
                                <h3 className="font-serif font-semibold hover:text-blue-500 transition-colors line-clamp-3 text-lg sm:text-xl md:text-2xl lg:text-3xl">
                                    <Link
                                        to={'/movie/' + infoData.slug}
                                        className="text-wrap overflow-hidden font-[Determination]"
                                    >
                                        {infoData.name}
                                    </Link>
                                </h3>
                                <div className="flex flex-row items-center gap-2">
                                    <div
                                        className="flex flex-row items-center gap-2"
                                        role="button"
                                        aria-haspopup="dialog"
                                        aria-expanded="false"
                                        data-state="closed"
                                        aria-controls="C4rTbx80wZ"
                                        id="ffa3SdN49f"
                                        data-melt-hover-card-trigger=""
                                    >
                                        <i className="nes-icon exclamation-circle text-sm"></i>
                                        <h4 className="text-sm">
                                            {infoData.origin_name}
                                        </h4>
                                    </div>
                                    <div className="w-0.5 h-0.5 bg-foreground/70 rounded-full"></div>
                                    <span className="text-sm text-foreground/60 font-normal">
                                        {infoData.episode_current}
                                    </span>
                                </div>
                                <Link
                                    to={'/movie/' + infoData.slug}
                                    className="nes-btn is-error mt-5 hidden md:flex w-fit"
                                >
                                    <i className="nes-icon play size-1x"></i>
                                    <span>&nbsp;Xem phim</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                ) : null
            })}
        </>
    )
}

export default CarouselCard
