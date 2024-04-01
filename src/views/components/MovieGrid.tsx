import { MovieItem } from '@/lib/client'
import { buildImageUrl } from '@/lib/utils'
import React from 'react'
import { Link } from 'react-router-dom'

interface MovieGridProps {
    items: MovieItem[]
    title: React.ReactNode
}
const MovieGrid: React.FC<MovieGridProps> = (props) => {
    const { title, items } = props
    return (
        <section className='mt-20 nes-container !border-foreground with-title relative !py-6 !px-2 md:!px-6'>
                {title}
            {/* <div className="flex justify-between mb-2 pb-1 border-border border-b"> */}
            {/* </div> */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5">
                {items.map((item) => (
                    <Link
                        key={item._id}
                        className="h-fit max-w-full"
                        to={'/movie/'+item.slug}
                    >
                        <div className="relative w-auto h-auto aspect-2/3 after:content-[''] after:bg-slate-200/20 after:absolute after:animate-pulse after:h-full after:w-full after:top-0 after:left-0 after:z-0 after:rounded-md">
                            <img
                                src={buildImageUrl(item.thumb_url)}
                                alt={item.name}
                                className="rounded-md z-10 relative w-full h-full"
                                loading="lazy"
                            />
                        </div>
                        <div className="mt-2">
                            <p>{item.name}</p>
                            <p className="text-muted-foreground">
                                {item.origin_name}
                            </p>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    )
}

export default MovieGrid
