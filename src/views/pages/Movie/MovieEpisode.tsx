import { Episode } from '@/lib/client'
import { cn } from '@/lib/utils'
import React from 'react'
import { Link, createSearchParams, useLocation } from 'react-router-dom'

interface MovieEpisodeProps extends React.HTMLAttributes<HTMLDivElement> {
    episodes: Episode[]
    ep: number
    server: number
    isWatch: boolean
}

const MovieEpisode = React.forwardRef<HTMLDivElement, MovieEpisodeProps>(
    ({ className, episodes, ep, server, isWatch, ...props }, ref) => {
        const location = useLocation()
        const [open, setOpen] = React.useState(server)

        React.useEffect(() => {
            setOpen(-1)
        }, [ep, server])

        const buildWatchLink = React.useCallback(
            (index: number, serverIndex: number) => {
                if (index === ep && isWatch) return '#'
                if (episodes.length && episodes[0].server_data.length) {
                    return [
                        location.pathname.endsWith('/watch')
                            ? location.pathname
                            : location.pathname + '/watch',
                        '?',
                        createSearchParams({
                            ep: String(index),
                            server: String(serverIndex),
                        }).toString(),
                    ].join('')
                }
                return ''
            },
            [episodes, location.pathname, server, ep, isWatch]
        )

        return episodes.length &&
            episodes[0].server_data.length === 1 ? null : (
            <div ref={ref} className="mt-10">
                {episodes.map((episode, serverIdx) => (
                    <React.Fragment key={serverIdx}>
                        <h2>
                            <button
                                type="button"
                                className="flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border border-gray-200 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3"
                                onClick={() =>
                                    setOpen((prev) =>
                                        prev === serverIdx ? -1 : serverIdx
                                    )
                                }
                            >
                                <p className="flex">
                                    {serverIdx === server && isWatch && (
                                        <i className="nes-icon play animate-pulse"></i>
                                    )}
                                    <i className="nes-icon folder"></i>
                                    <span>
                                        &nbsp;
                                        {episode.server_name}
                                        {!isNaN(ep) &&
                                            isWatch &&
                                            ' / Tập: ' +
                                                episode.server_data[ep]?.name}
                                    </span>
                                </p>
                                <i
                                    className={cn(
                                        'nes-icon caret-up',
                                        open === serverIdx && 'caret-down'
                                    )}
                                ></i>
                            </button>
                        </h2>
                        <div
                            className="overflow-hidden text-sm"
                            data-state={open === serverIdx ? 'open' : 'closed'}
                            hidden={open !== serverIdx}
                        >
                            <div className="p-5 border border-gray-200 flex flex-wrap">
                                {episode.server_data.map((server, index) => (
                                    <Link
                                        type="button"
                                        title={server.name}
                                        className={cn(
                                            'nes-btn min-w-28 flex mx-2 my-2 is-primary',
                                            isWatch &&
                                                index === ep &&
                                                '!cursor-not-allowed is-error !bg-green-600/80 after:!shadow-md after:!shadow-green-100'
                                        )}
                                        key={index}
                                        to={buildWatchLink(index, serverIdx)}
                                        onClick={(e) => {
                                            if (index === ep) {
                                                e.preventDefault()
                                            }
                                        }}
                                    >
                                        <i
                                            className={cn(
                                                'nes-icon file',
                                                index === ep &&
                                                    'play animate-pulse'
                                            )}
                                        ></i>
                                        <span>Tập {server.name}</span>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </React.Fragment>
                ))}
            </div>
        )
    }
)
MovieEpisode.displayName = 'MovieEpisode'
export default MovieEpisode
