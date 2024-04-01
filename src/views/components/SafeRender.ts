import useMounted from '@/lib/Hooks/useMounted'
import React from 'react'

type SafeRenderProps = {
    children: React.ReactNode
}

const SafeRender: React.FC<SafeRenderProps> = ({ children }) => {
    const mouted = useMounted()
    return mouted ? React.createElement(React.Fragment, { children }) : null
}

export default SafeRender
