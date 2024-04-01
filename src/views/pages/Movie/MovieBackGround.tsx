import React from 'react'

interface MovieBackGroundProps {
    posterUrl: string
    videoId: string
}
const MovieBackGround: React.FC<MovieBackGroundProps> = ({ posterUrl, videoId }) => {
    return (
        <>
            <div className="absolute bg-cover h-full hidden md:block w-7/12 top-0 right-0 overflow-hidden">
                <div className="left-layer"></div>
                <div className="right-layer"></div>
                {videoId ? (<iframe
                    className="h-full aspect-video -z-10"
                    src={`https://www.youtube.com/embed/${videoId}?&amp;autoplay=1&amp;mute=1&amp;playsinline=1&amp;showinfo=0&amp;playlist=${videoId}&amp;loop=1`}
                    title="YouTube video player"
                ></iframe>) : (<div className="flex h-full w-ful">
                <img
                    src={posterUrl}
                    alt=""
                    className="h-full aspect-video m-auto flex-shrink-0 w-full object-cover"
                />
            </div>)}
                
                <div className="absolute md:backdrop-blur-sm w-full h-full backdrop-p z-0 top-0 left-0"></div>
            </div>
        </>
    )
}

export default MovieBackGround
