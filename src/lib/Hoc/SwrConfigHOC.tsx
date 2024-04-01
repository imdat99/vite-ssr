import React from 'react'
import { useLoaderData } from 'react-router-dom'
import { SWRConfig } from 'swr'

const SwrConfigHOC = <T extends React.FC<any> = () => JSX.Element>(
    component: T
) => {
    const wrapped: React.FC<React.ComponentProps<T>> = (props) => {
        const value = useLoaderData() as Record<string, any>
        return (
            <SWRConfig value={value}>
                {React.createElement(component, props)}
            </SWRConfig>
        )
    }
    return wrapped
}
export default SwrConfigHOC
