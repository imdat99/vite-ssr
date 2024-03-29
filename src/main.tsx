import App from './App'
import ReactDOM from 'react-dom/client'
import React from 'react'
import './index.css'
import { RouterProvider, createBrowserRouter, matchRoutes } from 'react-router-dom'
import routes from './router'
import { HelmetProvider } from 'react-helmet-async'

const render = () => {
    const router = createBrowserRouter(routes)
    const root = document.getElementById('root') as HTMLElement
    
    ReactDOM.hydrateRoot(
        root,
        <React.StrictMode>
            <HelmetProvider>
                <App>
                    <RouterProvider router={router} fallbackElement={null} />
                </App>
            </HelmetProvider>
        </React.StrictMode>
    )
}

// Determine if any of the initial routes are lazy
let lazyMatches = matchRoutes(
    routes,
    window.location
  )?.filter((m) => m.route.lazy);
  
  // Load the lazy matches and update the routes before creating your router
  // so we can hydrate the SSR-rendered content synchronously

if (lazyMatches && lazyMatches?.length > 0) {
    Promise.all(
        lazyMatches.map(async (m) => {
            if (m.route.lazy) {
                let routeModule = await m.route.lazy();
                Object.assign(m.route, {
                    ...routeModule,
                    lazy: undefined,
                });
            }
        })
    ).then(render)
}



