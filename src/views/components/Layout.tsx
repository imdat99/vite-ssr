import React from 'react'
import {
    NavLink,
    Outlet,
    ScrollRestoration,
    useLocation,
} from 'react-router-dom'
import Header from './Header'
import { defaultTheme, storageThemeKey } from '@/lib/constants'
import { Theme } from '@/lib/Types'
import { cn, getCookie, isClient, setCookie } from '@/lib/utils'
import SearchInput from './Search'
import Footer from './Footer'

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
            <div
                className={cn(
                    'flex min-h-screen flex-col bg-background',
                    toggleSearch && 'search'
                )}
            >
                <Header
                    onToggletheme={handleToggletheme}
                    onToggleSearch={handleToggleSearch}
                    toggleSearch={!toggleSearch}
                    theme={theme}
                    searchComponent={
                        <div
                            className={cn(
                                'flex w-0 transition-all duration-200 ease-linear ml-auto',
                                toggleSearch && 'md:w-8/12 w-full'
                            )}
                        >
                            <SearchInput
                                onToggleSearch={handleToggleSearch}
                                hidden={!toggleSearch}
                                className={cn(
                                    'max-w-[1400px] ml-auto w-full pr-4',
                                    !toggleSearch && 'opacity-0 -z-10'
                                )}
                            />
                        </div>
                    }
                />
                <div className="flex-1">
                    <div className="max-w-[1400px] mx-auto px-4 md:px-8 bg-repeat bg-contain">
                        <Outlet />
                        <ScrollRestoration
                            getKey={(location, matches) => {
                                const paths = ['/category']
                                return paths.includes(location.pathname)
                                    ? location.pathname
                                    : location.key
                            }}
                        />
                    </div>
                </div>
                <Footer />
                {/* <Popupdetail /> */}
            </div>
        </>
    )
}

export default Layout
