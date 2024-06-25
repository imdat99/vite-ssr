import useLazyImg from '@/lib/Hooks/useLazyImg'
import { MovieItem } from '@/lib/client'
import { ImageTypes } from '@/lib/constants'
import { buildOriginImageUrl, buildWebpImageUrl, cn } from '@/lib/utils'
import React from 'react'
import { Link } from 'react-router-dom'

interface MovieGridProps {
    items: MovieItem[]
    title?: React.ReactNode
}
const MovieGrid: React.FC<MovieGridProps> = (props) => {
    const { title, items } = props
    const imgBlock = useLazyImg(items)
    return (
        <section className='mt-10 !border-foreground with-title relative !py-6 !px-2'>
            <div className="flex justify-between mb-2 pb-3 border-border border-b">
                {title}
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5" ref={imgBlock}>
                {items.map((item) => (
                    <Link
                        key={item._id}
                        className="h-fit max-w-full"
                        to={'/movie/'+item.slug}
                    >
                        <div className="relative w-auto h-auto aspect-2/3 after:content-[''] after:bg-slate-200/10 after:absolute after:animate-pulse after:h-full after:w-full after:top-0 after:left-0 after:z-0 after:rounded-md">
                            <img
                                src={buildWebpImageUrl(item.slug, ImageTypes.thumb)}
                                alt={item.name}
                                className="rounded-md z-10 relative w-full h-full object-cover bg-cover bg-center"
                                loading="lazy"
                                lazy-src={buildOriginImageUrl(item.thumb_url)}
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
                {items.length === 0 && (
                    <div className="w-full text-center text-lg text-foreground">
                        No movie found
                    </div>
                )}
            </div>
        </section>
    )
}

export default MovieGrid
