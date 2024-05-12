import { MoviesSlugResponseBody } from '@/lib/client'
import { buildImageUrl, cn, getYoutubeVideoId } from '@/lib/utils'
import React from 'react'
import { Link, createSearchParams } from 'react-router-dom'
import MovieBackGround from './MovieBackGround'

interface MovieInfoProps {
    itemData: MoviesSlugResponseBody['data']['item']
    isWatch: boolean;
    ep: number;
}
const MovieInfo: React.FC<MovieInfoProps> = ({ itemData: item, isWatch, ep }) => {
    const [showInfo, setShowInfo] = React.useState(false)

    const watchLink = React.useMemo(() => {
        if (item?.episodes.length && item?.episodes[0].server_data.length) {
            return createSearchParams({
                ep: String(item.episodes[0].server_data.length - 1),
                server: '0',
            }).toString()
        }
        return ''
    }, [item])
    return (
        <>
            <div className="md:pt-20 relative overflow-hidden">
                <MovieBackGround isWatch={isWatch} posterUrl={buildImageUrl(item?.poster_url)} videoId={getYoutubeVideoId(item?.trailer_url)}/>
                <div className={cn("bg-cover h-full w-full mb-4 sm:absolute sm:max-w-[280px] sm:aspect-2/3 sm:right-28", isWatch && 'hidden md:block')}>
                    <img
                        className="w-full shadow-md"
                        src={buildImageUrl(item?.thumb_url || '')}
                        alt={item?.name}
                        loading="lazy"
                    />
                </div>
                <div className="relative w-full md:w-5/12 bg-transparent">
                    <h1 className="font-bold text-xl md:text-3xl mb-2">
                        {item?.name} {isWatch && <span className="text-base"><br/>{`(Tập ${item.episodes[0].server_data[ep]?.name})`}</span>}
                    </h1>
                    <h2 className="font-semibold text-lg md:text-2xl text-foreground/40 mb-5">
                        {item?.origin_name}
                    </h2>

                    <div className="align-middle text-foreground/60 flex font-bold mb-1">
                        <div className="flex">
                            <i className="nes-icon eye size-1x my-auto mr-6 mb-2" />
                            <span>{item?.view || 0}</span>
                        </div>
                        <span>&nbsp; - &nbsp;</span>
                        <div className="flex">
                            <i className="nes-icon calendar size-1x my-auto mr-6 mb-2" />
                            <span>{item?.year || 1957}</span>
                        </div>
                    </div>
                    <div className="space-y-2 flex flex-col">
                        <p className="w-fit space-x-2 mt-2">
                            {item?.category.map((category, index) => (
                                <Link
                                    to={category.slug}
                                    key={index}
                                    className="bg-gray-600/30 text-white w-fit py-1 px-3 text-xs"
                                >
                                    <span className="is-dark">
                                        {category.name}
                                    </span>
                                </Link>
                            ))}
                        </p>
                        <ul className="text-justify">
                            <li className="space-x-2">
                                <span className="text-foreground/50">
                                    Quốc gia:&nbsp;{' '}
                                </span>
                                {item?.country.map((country, index) => (
                                    <Link
                                        to={country.slug}
                                        key={index}
                                        className="px-1"
                                    >
                                        {country.name}
                                    </Link>
                                ))}
                            </li>
                            <li className="space-x-2">
                                <span className="text-foreground/50">
                                    Thể loại:&nbsp;{' '}
                                </span>
                                <span className="px-1">
                                    {item?.type || 'Unknown'}
                                </span>
                            </li>
                            <li className="space-x-2">
                                <span className="text-foreground/50">
                                    Số tập:&nbsp;{' '}
                                </span>
                                <span className="px-1">
                                    {item?.episode_total || '? Tập'} - {item?.time}
                                </span>
                            </li>
                            <li
                                className={cn(
                                    'pb-1',
                                    !showInfo && 'line-clamp-3'
                                )}
                            >
                                <span className="text-foreground/50">
                                    Diễn viên chính:&nbsp;{' '}
                                </span>
                                <span className="px-1">
                                    {item?.actor.filter(Boolean).length
                                        ? item?.actor.join(', ')
                                        : 'Đang cập nhật'}
                                </span>
                            </li>
                        </ul>

                        <div className="space-x-3 flex w-full flex-wrap mt-3">
                            <div className="nes-container with-title mt-5 dark:!border-white !w-full">
                                <p className="title !-mt-10 !bg-background">
                                    Miêu tả
                                </p>
                                <p className={showInfo ? '' : 'line-clamp-3'}>
                                    {item?.content.replace(/<[^>]*>/g, '')}
                                </p>
                                <button
                                    // variant="link"
                                    className="m-0 p-0 focus:outline-none text-red-600/60 hover:text-red-600/80"
                                    onClick={() => {
                                        setShowInfo((prev) => !prev)
                                    }}
                                >
                                    {!showInfo ? 'Hiển thị thêm' : 'Thu gọn'}
                                </button>
                            </div>

                            {item?.status !== "trailer"  ? <Link
                                replace
                                to={isWatch ? 'https://www.google.com/' :'watch?' + watchLink}
                                className={cn(
                                    'nes-btn is-error flex mt-5 dark:!border-white', isWatch && '!cursor-not-allowed'
                                )}
                                onClick={(e) => {
                                    if (isWatch) {
                                        e.preventDefault()
                                    }
                                }}
                                title='Xem tập mới nhất'
                            >
                                <i className={cn('nes-icon play size-1x', isWatch && 'animate-pulse')}></i>
                                <span>&nbsp;{isWatch ? 'Đang phát':'Xem phim'}</span>
                            </Link>:(
                                <button
                                    type="button"
                                    title="share"
                                    className="nes-btn is-warning flex mt-5"
                                >
                                    <i className="nes-icon ban" />
                                    <span>&nbsp;Đang cập nhật</span>
                                </button>
                            ) }
                            <button
                                type="button"
                                title="share"
                                className="nes-btn flex mt-5"
                            >
                                <i className="nes-icon facebook-square" />
                                <span>&nbsp;Chia sẻ</span>
                            </button>
                            <div
                                className="w-full md:w-max mt-3"
                                v-if="!validChildData && seasonData?.titles.nodes.length"
                            ></div>
                        </div>
                    </div>
                </div>
            </div>
            
        </>
    )
}

export default MovieInfo
