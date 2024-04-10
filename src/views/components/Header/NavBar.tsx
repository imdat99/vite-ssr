import { cn } from '@/lib/utils'
import React from 'react'
import { NavLink } from 'react-router-dom'
import NoneCompoent from '../NoneCompoent'

interface NavBarProps {
    className: string
    isNav?: boolean
}
const menuList = [
    {
        title: 'Movie.List',
        path: '/category',
    },
]
const NavBar: React.FC<NavBarProps> = (props) => {
    return (
        <NoneCompoent component={props.isNav ? 'nav' : 'ul'} className={props.className}>
            {menuList.map((item) => (
                <li key={item.path}>
                    <NavLink
                    key={item.path}
                    to={item.path}
                    className={({ isActive, isPending }) =>
                        cn(
                            'duration-150 ease-linear transition-colors hover:text-foreground/80 text-foreground/60',
                            isActive &&
                                'font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-violet-500'
                        )
                    }
                >
                    {item.title}
                </NavLink>
                </li>
            ))}
        </NoneCompoent>
    )
}

export default NavBar
