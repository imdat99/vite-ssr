import ReactDOM from 'react-dom/client'
// import "nes.css/css/nes.min.css";
import "nes.icons/css/nes-icons.min.css";
import './index.css'
import {
    RouterProvider,
    createBrowserRouter,
    matchRoutes,
} from 'react-router-dom'
import routes from './router'
import { HelmetProvider } from 'react-helmet-async'
import { ErrorBoundary } from './views/components/Errorboundary'
import Loading from './views/components/Loading'

const render = () => {
    const router = createBrowserRouter(routes)
    const root = document.getElementById('root') as HTMLElement
    ReactDOM.hydrateRoot(
        root,
        <HelmetProvider>
            <ErrorBoundary>
                <RouterProvider
                    router={router}
                    fallbackElement={<Loading />}
                />
            </ErrorBoundary>
        </HelmetProvider>
    )
}

// Determine if any of the initial routes are lazy
let lazyMatches = matchRoutes(routes, window.location)?.filter(
    (m) => m.route.lazy
)

// Load the lazy matches and update the routes before creating your router
// so we can hydrate the SSR-rendered content synchronously

if (typeof window === 'object' && lazyMatches && lazyMatches?.length > 0) {
    Promise.all(
        lazyMatches.map(async (m) => {
            if (m.route.lazy) {
                let routeModule = await m.route.lazy()
                Object.assign(m.route, {
                    ...routeModule,
                    lazy: undefined,
                })
            }
        })
    ).then(render)
}

export default render
