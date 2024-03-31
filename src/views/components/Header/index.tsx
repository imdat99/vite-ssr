import { Theme } from '@/lib/Types'
import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import SafeRender from '../SafeRender'
import { Button } from '../ui/button'
import NavBar from './NavBar'
import PageLogo from './PageLogo'

interface Props {
    onToggletheme: () => void
    theme: Theme
}
const index: React.FC<Props> = ({ onToggletheme, theme }) => {
    const [isSheetOpen, setIsSheetOpen] = React.useState(false)
    const location = useLocation()
    React.useEffect(() => {
        setIsSheetOpen(false)
    }, [location.pathname])
    return (
        <header className="sticky z-40 top-0 bg-background/80 backdrop-blur-md border-b border-border">
            <div className="container flex justify-between h-16 items-center">
                <div className="md:hidden">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                            setIsSheetOpen((prev) => !prev)
                        }}
                    >
                        <i className="nes-icon bars size-1x"></i>
                        <span className="sr-only">Toggle Menu</span>
                    </Button>
                    <SafeRender>
                        <dialog
                            className="nes-dialog w-full h-[100vh] bg-white dark:!bg-black"
                            id="dialog-default"
                            open={isSheetOpen}
                            onClose={(e) => {
                                e.preventDefault()
                                setIsSheetOpen(false)
                            }}
                        >
                            <form method="dialog">
                                <Link to={'/'}>
                                    <p className="title mb-4 font-bold">Menu</p>
                                </Link>
                                <div className="lists">
                                    <NavBar
                                        className={
                                            'nes-list is-disc space-y-4 is-circle pl-6'
                                        }
                                    />
                                </div>
                            </form>
                        </dialog>
                    </SafeRender>
                </div>

                <div className="mr-4 hidden md:flex">
                    <PageLogo />
                    <NavBar
                        isNav
                        className="flex items-center space-x-6 text-sm font-medium style list-none"
                    />
                </div>
                <div className="flex items-center justify-end space-x-4">
                    <button title="search">
                        <i className="nes-icon search size-1x"></i>
                    </button>
                    <div className="flex items-center gap-x-1">
                        <button onClick={onToggletheme} title='Theme'>
                            <SafeRender>
                                <i
                                    className={`nes-icon ${
                                        theme === 'light' ? 'cloud' : 'star'
                                    } size-1x`}
                                />
                            </SafeRender>
                        </button>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default index