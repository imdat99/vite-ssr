import React from 'react'

interface MovieBackGroundProps {
    posterUrl: string
    videoId: string
    isWatch: boolean
}
const MovieBackGround: React.FC<MovieBackGroundProps> = ({
    posterUrl,
    videoId,
    isWatch,
}) => {
    return (
        <>
            <div className="absolute bg-cover h-full hidden md:block w-7/12 top-0 right-0">
                {videoId && !isWatch && (
                    <iframe
                        className="aspect-video z-0 h-[140%] absolute top-3/4 -left-2/3 -translate-y-2/3"
                        src={`https://www.youtube.com/embed/${videoId}?&amp;autoplay=1&amp;mute=1&amp;playsinline=1&amp;showinfo=0&amp;playlist=${videoId}&amp;loop=1`}
                        title="YouTube video player"
                    ></iframe>
                )}
                <div className="flex h-[115%] w-ful absolute top-3/4 -left-[20%] -translate-y-2/3" hidden={Boolean(videoId && !isWatch)}>
                    <img
                        src={posterUrl}
                        alt=""
                        className="h-full aspect-video m-auto flex-shrink-0 w-full object-cover"
                    />
                </div>
                <div className="absolute aspect-video md:backdrop-blur-sm h-[120%] backdrop-p z-0 top-2/3 -left-[20%] -translate-y-2/3"></div>
                <div className="absolute bg-background w-1/2 h-[120%] -left-3/4 -top-[10%]"></div>
                <div className="left-layer w-[150%] h-[120%] -left-[30%] -top-[10%]"></div>
                {isWatch && <div className="right-layer w-[150%] h-[100%] -right-1/4"></div>}
            </div>
        </>
    )
}

export default MovieBackGround
