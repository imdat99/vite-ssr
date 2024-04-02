import { cn, scrollToTop } from '@/lib/utils'
import React from 'react'

interface HomeScrollProps {
    info?: React.ReactNode
}
const HomeScroll: React.FC<HomeScrollProps> = ({info}) => {
    const [navBackground, setNavBackground] = React.useState('')
    const [kirby, setKirby] = React.useState('active')
    const navRef = React.useRef<string>()
    const kirbyRef = React.useRef<string>()
    navRef.current = navBackground
    kirbyRef.current = kirby
    React.useEffect(() => {
        const handleScroll = () => {
            setNavBackground(window.scrollY > 410 ? 'active' : '')
            setKirby(window.scrollY > 210 ? '' : 'active')
        }
        document.addEventListener('scroll', handleScroll)
        return () => {
            document.removeEventListener('scroll', handleScroll)
        }
    }, [])

    return (
        <div className="app-nes">
            {info&&<a
                href="/"
                target="_blank"
                rel="noopener"
                className={cn('kirby-info !hidden md:flex', kirbyRef.current)}
            >
                <p className="nes-balloon from-right py-1 px-2 text-xs h-fit">
                    {info || 'Hello!'}
                </p>
                <i className="nes-kirby"></i>
            </a>}
            <button
                type="button"
                className={cn(
                    'nes-btn is-warning scroll-btn !p-1 z-50',
                    navRef.current
                )}
                onClick={scrollToTop}
            >
                <span>&lt;</span>
            </button>
        </div>
    )
}

export default HomeScroll
