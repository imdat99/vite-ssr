import { RouteObject } from 'react-router-dom'
import { createElement as _c, lazy } from 'react'
import Layout from './views/compoents/Layout'
import AppSuspense from './views/compoents/AppSuspense'
import Home from './views/pages/Home'

/**
 * never use lazy loading in the root route,
 * use lazy loading in the child route or compoenent
 */
const routes: RouteObject[] = [
    {
        path: '/',
        element: _c(Layout),
        children: [
            {
                index: true,
                lazy: async () => ({
                    Component: (await import('./views/pages/Home')).default,
                }),
            },
            {
                path: 'about',
                element: _c(AppSuspense, {
                    lazyComponent: lazy(() => import('./views/pages/About')),
                }),
            },
        ],
    },
]

export default routes
