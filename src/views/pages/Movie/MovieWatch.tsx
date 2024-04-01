import { MoviesSlugResponseBody } from '@/lib/client'
import { cn, repairUrl } from '@/lib/utils'
import React from 'react'

interface MovieWatchProps extends React.HTMLAttributes<HTMLDivElement> {
    itemData: MoviesSlugResponseBody['data']['item']
    ep: number
    server: number
}

const MovieWatch = React.forwardRef<HTMLDivElement, MovieWatchProps>(
    ({ className, ep, server, itemData, ...props }, ref) => {
        return (
            <div className={cn('aspect-video w-full', className)}>
                <div>
                    {repairUrl(
                        itemData.episodes[server].server_data[ep].link_m3u8
                    )}
                </div>
            </div>
        )
    }
)

MovieWatch.displayName = 'MovieWatch'
export default MovieWatch
