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
                        _id: [itemData._id,ep,server].join('-'),
                        name: [itemData.name, itemData.episodes[server].server_data[ep].name].join(' - '),
                        url: repairUrl(
                            itemData.episodes[server].server_data[ep].link_m3u8
                        ),
                        // url: '/ahihi-decoded.m3u8',
                        setting: true,
                        playbackRate: true,
                        autoplay: true,
                        fullscreen: true,
                        mutex: true,
                        backdrop: true,
                        fastForward: true,
                        theme: '#E03131',
                        poster: buildImageUrl(itemData?.poster_url),
                        controls: [
                            {
                                name: 'button1',
                                index: 10,
                                position: 'right',
                                html: '<img width="24" heigth="24" src="/next.svg">',
                                tooltip: 'Tiến 10s',
                                click: function () {
                                    this.forward = 10
                                },
                            },
                            {
                                name: 'button2',
                                index: 10,
                                position: 'right',
                                html: '<img width="24" heigth="24" src="/prev.svg">',
                                tooltip: 'Lùi 10s',
                                click: function () {
                                    this.backward = 10
                                },
                            },
                        ]
                    }}
                    className="w-full h-full player"
                />
            </div>
        )
    }
)

MovieWatch.displayName = 'MovieWatch'
export default ClientRender(MovieWatch)
