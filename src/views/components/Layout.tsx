import React from 'react'
import { NavLink, Outlet, useLocation } from 'react-router-dom'
import Header from './Header'
import { defaultTheme, storageThemeKey } from '@/lib/constants'
import { Theme } from '@/lib/Types'
import { cn, getCookie, isClient, setCookie } from '@/lib/utils'
import SearchInput from './Search'

// const window = <any>(typeof global === 'undefined' ? {
//     fetch: (url: RequestInfo, init?: RequestInit) =>
//         import('isomorphic-fetch').then((m) => m.default(url, init)),
// } : global)

const Layout = () => {
    const location = useLocation()
    const [theme, setheme] = React.useState(
        (getCookie(storageThemeKey) as Theme) || defaultTheme
    )
    const [toggleSearch, setToggleSearch] = React.useState(false)

    React.useEffect(() => {
        setCookie(storageThemeKey, theme)
        const root = window.document.documentElement
        root.classList.remove('light', 'dark')
        root.classList.add(theme)
    }, [theme])

    React.useEffect(() => {
        setToggleSearch(false)
    }, [location])

    const handleToggletheme = () => {
        setheme((prev) => (prev === 'dark' ? 'light' : 'dark'))
    }

    const handleToggleSearch = () => {
        setToggleSearch((prev) => !prev)
    }

    return (
        <>
            <div className={cn("flex min-h-screen flex-col bg-background", toggleSearch && "search")}>
                <Header onToggletheme={handleToggletheme} onToggleSearch={handleToggleSearch} theme={theme} />
                <div className="flex-1">
                    <div className="max-w-[1400px] mx-auto px-4 md:px-8 bg-repeat bg-contain">
                        <SearchInput hidden={!toggleSearch}/>
                        <Outlet />
                    </div>
                </div>
                {/* <Footer /> */}
                {/* <Popupdetail /> */}
            </div>
        </>
    )
}

export default Layout
