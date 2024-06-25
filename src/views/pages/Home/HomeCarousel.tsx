import * as React from 'react'

import {
    Carousel,
    CarouselContent,
    CarouselDotButtons,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/views/components/ui/carousel'
import { MovieItem } from '@/lib/client'
import { build } from 'vite'
import { buildOriginImageUrl } from '@/lib/utils'
import CarouselCard from './CarouselCard'

export interface HomeCarouselProps {
    carouselItems: MovieItem[]
}
const HomeCarousel: React.FC<HomeCarouselProps> = ({ carouselItems }) => {
    return (
        <Carousel className="w-full pb-10 relative" opts={{loop: true}}>
            <CarouselContent>
                {carouselItems.map((item, index) => (
                    <React.Fragment key={index}>
                        <CarouselItem>
                            <div
                                className="relative aspect-video md:aspect-auto overflow-hidden md:h-[560px] bg-no-repeat bg-cover bg-slate-400 dark:bg-slate-700"
                                style={{
                                    backgroundImage: `url(${buildOriginImageUrl(
                                        item.thumb_url.replace(
                                            'thumb',
                                            'poster'
                                        ) || ''
                                    )})`,
                                }}
                            >
                                {/* <div className="md:backdrop-blur-sm w-full h-full"></div> */}
                            </div>
                        </CarouselItem>
                    </React.Fragment>
                ))}
            </CarouselContent>
            <CarouselCard {...{carouselItems}}/>
            <CarouselDotButtons
                className="absolute right-3 top-3 space-x-3 z-10"
                dotClassName="h-3 w-3 nes-icon heart is-small"
                selectedClassName="before:!text-red-500"
            />
            <CarouselPrevious className="left-0 top-full" />
            <CarouselNext className=" left-20 top-full" />
        </Carousel>
    )
}

export default HomeCarousel
