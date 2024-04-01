import { MoviesSlugResponseBody } from '@/lib/client'
import { buildImageUrl, cn, repairUrl } from '@/lib/utils'
import React from 'react'
import Player from './Player'
import ClientRender from '@/lib/Hoc/ClientRender'

interface MovieWatchProps extends React.HTMLAttributes<HTMLDivElement> {
    itemData: MoviesSlugResponseBody['data']['item']
    ep: number
    server: number
}

const MovieWatch = React.forwardRef<HTMLDivElement, MovieWatchProps>(
    ({ className, ep, server, itemData, ...props }, ref) => {
        return (
            <div className={cn('aspect-video w-full', className)}>
                <Player
                    option={{
                        url: repairUrl(
                            itemData.episodes[server].server_data[ep].link_m3u8
                        ),
                        setting: true,
                        playbackRate: true,
                        autoplay: true,
                        fullscreen: true,
                        mutex: true,
                        backdrop: true,
                        fastForward: true,
                        theme: '#E03131',
                        poster: buildImageUrl(itemData?.poster_url),
                    }}
                    className="w-full h-full player"
                />
                <div></div>
            </div>
        )
    }
)

MovieWatch.displayName = 'MovieWatch'
export default ClientRender(MovieWatch)
