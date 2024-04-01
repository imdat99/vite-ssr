import { createElement as _c } from 'react'
import { RouteObject } from 'react-router-dom'
import { SWRConfiguration } from 'swr'
import { unstable_serialize as infinite_unstable_serialize } from 'swr/infinite'
import client from './lib/client'
import { isClient } from './lib/utils'
import Layout from './views/components/Layout'

/**
 * never use lazy loading in the root route,
 * use lazy loading in the child route or compoenent
 */
const routes: RouteObject[] = [
    {
        path: '/',
        element: _c(Layout),
        errorElement: _c('div', {}, 'Error'),
        children: [
            {
                index: true,
                loader: async (): Promise<SWRConfiguration> => {
                    if (isClient) {
                        return {}
                    }
                    return {
                        fallback: {
                            [infinite_unstable_serialize(() => ['/home', 0])]: [
                                await client.v1ApiHome(undefined),
                            ],
                        },
                    }
                },
                lazy: async () => ({
                    Component: (await import('./views/pages/Home')).default,
                }),
            },
            {
                path: 'about',
                lazy: async () => ({
                    Component: (await import('./views/pages/About')).default,
                }),
            },
            {
                path: 'movie/:slug/:type?',
                loader: async ({params}): Promise<SWRConfiguration> => {
                    if (isClient) {
                        console.log(params)
                        return {}
                    }
                    return {
                        fallback: {
                             [params.slug || 'slug']: await client.v1ApiPhim(params.slug || ''),
                        },
                    }
                },
                lazy: async () => ({
                    Component: (await import('./views/pages/Movie')).default,
                }),
            },
        ],
    },
]

export default routes
