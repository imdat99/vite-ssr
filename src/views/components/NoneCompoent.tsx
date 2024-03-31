import React from 'react'

type NoneProps<T extends React.FC<any>> = {
    [key in keyof React.ComponentProps<T>]: React.ComponentProps<T>[keyof React.ComponentProps<T>]
} & {
    component: Parameters<typeof React.createElement>[0]
}

const NoneCompoent = <T extends React.FC<any>>({
    component: lazyComponent,
    ...componentProps
}: NoneProps<T>) => {
    return React.createElement(lazyComponent, componentProps as any)
}
export default NoneCompoent