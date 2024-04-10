import React, { useEffect, useRef } from 'react'
import Artplayer from 'artplayer'
import Hls, { HlsConfig } from 'hls.js'
import { scrollToTop, secondsToHHMMSS, throttle } from '@/lib/utils'
import { storageTimeKey } from '@/lib/constants'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/views/components/ui/alert-dialog'

interface PlayerProps extends React.HTMLAttributes<HTMLDivElement> {
    getInstance?: (instance: Artplayer) => void
    option: Omit<Artplayer['option'], 'container' | 'customType'> & {
        _id: string
        name: string
    }
}
const Player = React.forwardRef<HTMLDivElement, PlayerProps>(
    ({ className, option, getInstance, ...props }, ref) => {
        const timer = useRef<number | null>(null)
        const playerRef = useRef<HTMLDivElement>(null)
        const artRef = useRef<Artplayer>()
        const [open, setOpen] = React.useState<number>(0)
        const writeTime = throttle(
            React.useCallback(() => {
                if(!artRef.current!.playing) return
                const prevStorage = localStorage.getItem(storageTimeKey)
                const currentTime = (artRef.current!.currentTime / artRef.current!.duration)*100 > 95 ? 0 :artRef.current!.currentTime
                localStorage.setItem(
                    storageTimeKey,
                    JSON.stringify({
                        ...JSON.parse(prevStorage || ''),
                        [option._id]: currentTime,
                    })
                )
            }, [option.url]),
            5000
        )
        useEffect(() => {
            artRef.current = new Artplayer({
                ...option,
                container: playerRef.current!,
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
                getInstance(artRef.current)
            }
             artRef.current.on('ready', () => {
                scrollToTop()
                const prevStorage = JSON.parse(localStorage.getItem(storageTimeKey)||'{}')
                if(prevStorage[option._id] &&  artRef.current){
                     artRef.current.pause()
                    setOpen(prevStorage[option._id])
                }
            })
             artRef.current.on('video:timeupdate', writeTime)
            return () => {
                if ( artRef.current &&  artRef.current.destroy) {
                     artRef.current.destroy(false)
                }
            }
        }, [option.url])

        return (
            <>
                <AlertDialog open={Boolean(open)} onOpenChange={() => setOpen(0)}>
                    {/* <AlertDialogTrigger>Open</AlertDialogTrigger> */}
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>
                                Tiếp tục xem?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                                Tiếp tục xem phim <br/><b>{option.name}</b> tại: <b>{secondsToHHMMSS(open)}</b>
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Thôi</AlertDialogCancel>
                            <AlertDialogAction onClick={() => {
                                 artRef.current!.seek = open;
                                    artRef.current!.play()
                            }}>Oke luôn</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
                <div ref={playerRef} className={className} />
            </>
        )
    }
)
Player.displayName = 'Player'
export default Player
