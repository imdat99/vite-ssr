import { Link } from 'react-router-dom'
const PageLogo = () => {
    return (
        <Link to="/" className="mr-6 flex items-center space-x-2">
            <div className="relative flex px-2 justify-between w-fit">
                <span className="font-bold flex text-2xl my-auto px-2 py-1 app-nes text-background">
                    XemĐi.Fun
                </span>
                <div className="absolute bg-gradient-to-r to-rose-400 from-violet-500 w-11/12 h-1/2 top-0 -z-10"></div>
                <div className="absolute bg-gradient-to-r to-green-300 from-yellow-500 w-full h-1/2 bottom-0 -z-10"></div>
            </div>
        </Link>
    )
}

export default PageLogo
