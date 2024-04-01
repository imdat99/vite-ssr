import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import Header from './Header'
import { defaultTheme, storageThemeKey } from '@/lib/constants'
import { Theme } from '@/lib/Types'
import { getCookie, isClient, setCookie } from '@/lib/utils'

// const window = <any>(typeof global === 'undefined' ? {
//     fetch: (url: RequestInfo, init?: RequestInit) =>
//         import('isomorphic-fetch').then((m) => m.default(url, init)),
// } : global)

const Layout = () => {
    const [theme, setheme] = React.useState(
        (getCookie(storageThemeKey) as Theme) || defaultTheme
    )
    React.useEffect(() => {
        setCookie(storageThemeKey, theme);
        const root = window.document.documentElement
        root.classList.remove('light', 'dark')
        root.classList.add(theme)
    }, [theme])

    const handleToggletheme = () => {
        setheme(prev => prev === "dark"? "light": "dark")
    }

    return (
        <>
            <div className="flex min-h-screen flex-col bg-background">
                <Header onToggletheme={handleToggletheme} theme={theme}/>
                <div className="flex-1">
                    <div className="max-w-[1400px] mx-auto px-4 md:px-8 bg-repeat bg-contain">
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
