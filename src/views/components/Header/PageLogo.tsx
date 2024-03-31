import React from 'react'
import { Link } from 'react-router-dom'

const PageLogo = () => {
    return (
        <Link to="/" className="mr-6 flex items-center space-x-2">
            <div className="relative flex px-2 justify-between">
                <p className="font-bold text-2xl my-auto text-secondary-foreground px-2 py-1">
                    ĐỂ XEM ĐÃ
                </p>
                <div className="absolute bg-foreground/30 w-full h-2/5 bottom-0 -z-10"></div>
                <div className="absolute bg-gradient-to-r to-rose-400 from-violet-500 w-full h-3/5 top-0 -z-10"></div>
            </div>
        </Link>
    )
}

export default PageLogo
