import React, { useEffect, useRef } from 'react'
import Artplayer from 'artplayer'
import Hls, { HlsConfig } from 'hls.js'
import { scrollToTop } from '@/lib/utils'

interface PlayerProps extends React.HTMLAttributes<HTMLDivElement> {
    getInstance?: (instance: Artplayer) => void
    option: Omit<Artplayer['option'], 'container' | 'customType'>
}
const Player = React.forwardRef<HTMLDivElement, PlayerProps>(
    ({ className, option, getInstance, ...props }, ref) => {
        const artRef = useRef<HTMLDivElement>(null)

        useEffect(() => {
            const art = new Artplayer({
                ...option,
                container: artRef.current!,
                autoOrientation: true,
                subtitleOffset: false,
                customType: {
                    m3u8: function playM3u8(video, url, art) {
                        if (Hls.isSupported()) {
                            const config: Partial<HlsConfig> = {
                                emeEnabled: true,

                                //   xhrSetup: (xhr, url) => {
                                //     const newUrl = decodeUri({
                                //       // uri: "https://phim1s.mooo.com/wp-json/movie/" + url,
                                //       uri: "http://192.168.15.202:8080/" + url.replace("//", "/"),
                                //     }).uri;

                                //     xhr.open(
                                //       "GET",
                                //       Array.from(new Set(newUrl.split("http"))).join("http"),
                                //       true
                                //     );
                                //   },
                            }
                            var hls = new Hls(config)
                            hls.loadSource(url)
                            hls.attachMedia(video)
                            art.hls = hls
                            art.on('destroy', () => hls.destroy())
                        } else if (
                            video.canPlayType('application/vnd.apple.mpegurl')
                        ) {
                            video.src = url
                        } else {
                            art.notice.show =
                                'Unsupported playback format: m3u8'
                        }
                    },
                },
            })

            if (getInstance && typeof getInstance === 'function') {
                getInstance(art)
            }
                art.on('ready', () => {
                    scrollToTop()
                })

            return () => {
                if (art && art.destroy) {
                    art.destroy(false)
                }
            }
        }, [option.url])

        return <div ref={artRef} className={className} />
    }
)
Player.displayName = 'Player'
export default Player
