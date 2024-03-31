import React from 'react'
import { useLoaderData } from 'react-router-dom'
import { SWRConfig } from 'swr'
import useMounted from '../Hooks/useMounted'

/**
 * Wraps a React component to conditionally render it on the client-side only.
 *
 * @template T - The type of the component being wrapped.
 * @param {T} component - The component to be wrapped.
 * @returns {React.FC<React.ComponentProps<T>>} - The wrapped component.
 */
const ClientRender = <T extends React.FC<any> = () => JSX.Element>(
    component: T
) => {
    const wrapped: React.FC<React.ComponentProps<T>> = (props) => {
        const mouted = useMounted()
        return mouted ? React.createElement(component, props) : null
    }
    return wrapped
}

export default ClientRender
