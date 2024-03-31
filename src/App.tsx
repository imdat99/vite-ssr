import { PropsWithChildren } from 'react'

import { Helmet } from 'react-helmet-async'
import { ErrorBoundary } from './views/components/Errorboundary'
const App: React.FC<PropsWithChildren> = ({ children }) => {
    return (
        <ErrorBoundary>
            <>
                <Helmet>
                    <title>Hello World</title>
                    <link rel="canonical" href="https://dat09.fun/" />
                    <meta name="twitter:creator" content={'aaaa'} />
                    <meta name="twitter:card" content={'bbbbb'} />
                    <meta name="twitter:title" content={'cccccc'} />
                </Helmet>
                {children}
            </>
        </ErrorBoundary>
    )
}
export default App
