import { storageTimeKey } from '@/lib/constants'
import { scrollToTop, secondsToHHMMSS, throttle } from '@/lib/utils'
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
import Artplayer from 'artplayer'
import Hls, { HlsConfig } from 'hls.js'
import React, { useEffect, useRef } from 'react'
import Error from '../Error'

interface PlayerProps extends React.HTMLAttributes<HTMLDivElement> {
    getInstance?: (instance: Artplayer) => void
    playPercent?: (percent: number) => void
    option: Omit<Artplayer['option'], 'container' | 'customType'> & {
        _id: string
        name: string
    }
}
const Player = React.forwardRef<HTMLDivElement, PlayerProps>(
    ({ className, option, getInstance, playPercent, ...props }, ref) => {
        const [isError, setIsError] = React.useState<boolean>(false)
        const playerRef = useRef<HTMLDivElement>(null)
        const artRef = useRef<Artplayer>()
        const [open, setOpen] = React.useState<number>(0)
        const writeTime = throttle(
            React.useCallback(() => {
                if (!artRef.current!.playing) return
                playPercent &&
                    playPercent(
                        (artRef.current!.currentTime /
                            artRef.current!.duration) *
                        100
                    )
                const prevStorage = localStorage.getItem(storageTimeKey)
                const currentTime =
                    (artRef.current!.currentTime / artRef.current!.duration) *
                        100 >
                        95
                        ? 0
                        : artRef.current!.currentTime
                localStorage.setItem(
                    storageTimeKey,
                    JSON.stringify({
                        ...JSON.parse(prevStorage || '{}'),
                        [option._id]: currentTime,
                    })
                )
            }, [option.url]),
            5000
        )
        useEffect(() => {
            fetch(option.url).then(() => {
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
                                }
                                var hls = new Hls(config)
                                hls.attachMedia(video);
                                hls.loadSource(url);
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
                    const prevStorage = JSON.parse(
                        localStorage.getItem(storageTimeKey) || '{}'
                    )
                    if (prevStorage[option._id] && artRef.current) {
                        artRef.current.pause()
                        setOpen(prevStorage[option._id])
                    }
                })
                artRef.current.on('video:timeupdate', writeTime)
            }).catch(() => {
                setIsError(true)
                if (artRef.current && artRef.current.destroy) {
                    artRef.current.destroy(false)
                }
            })
           
            return () => {
                if (artRef.current && artRef.current.destroy) {
                    artRef.current.destroy(false)
                }
            }
        }, [option.url])

        return (
            <>
                <AlertDialog
                    open={Boolean(open)}
                    onOpenChange={() => setOpen(0)}
                >
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Tiếp tục xem?</AlertDialogTitle>
                            <AlertDialogDescription>
                                Tiếp tục xem phim <br />
                                <b>{option.name}</b> tại:{' '}
                                <b>{secondsToHHMMSS(open)}</b>
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Thôi</AlertDialogCancel>
                            <AlertDialogAction
                                onClick={() => {
                                    artRef.current!.seek = open
                                    artRef.current!.play()
                                }}
                            >
                                Oke luôn
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
                <div ref={playerRef} className={className} style={isError ? {
                    backgroundImage: `url(${option.poster})`,
                    backgroundSize: 'contain'
                }: {}}>
                {isError && <Error className='h-full w-full'/>}
                </div>
            </>
        )
    }
)
Player.displayName = 'Player'
export default Player
