import { createElement as _c } from 'react'
import { RouteObject } from 'react-router-dom'
import { SWRConfiguration } from 'swr'
import { unstable_serialize as infinite_unstable_serialize } from 'swr/infinite'
import client from './lib/client'
import { isClient } from './lib/utils'
import Layout from './views/components/Layout'
import Error from './views/pages/Error'
import { searchRegex } from './lib/constants'

/**
 * never use lazy loading in the root route,
 * use lazy loading in the child route or compoenent
 */
const routes: RouteObject[] = [
    {
        path: '/',
        element: _c(Layout),
        errorElement: _c(Error),
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
                path: 'tim-kiem',
                lazy: async () => ({
                    Component: (await import('./views/pages/PageSearch'))
                        .default,
                }),
                loader: async (params): Promise<SWRConfiguration> => {
                    if (isClient) return {}
                    const match = params.request.url.match(searchRegex)
                    if (match && match[1]) {
                        const searchString = decodeURIComponent(match[1])
                        console.log("searchString", searchString)
                        if(searchString)
                        return {
                            fallback: {
                                [infinite_unstable_serialize(() => [searchString || 'tim-kiem', 0])]: [await client.v1ApiTimKiem(searchString, 1)],
                            },
                        }
                    } 
                    return {}
                    
                },
            },
            {
                path: 'category/:slug',
                lazy: async () => ({
                    Component: (await import('./views/pages/Category')).default,
                }),
                // children:[
                //     {
                //         path: ':slug',
                //         // loader: async ({params}): Promise<SWRConfiguration> => {
                //         //     if(isClient) return {}
                //         //     return {
                //         //         fallback: {
                //         //             [params.slug || 'slug']: await client.v1ApiCategory(params.slug || ''),
                //         //         },
                //         //     }
                //         // },
                //         lazy: async () => ({
                //             Component: (await import('./views/pages/Category')).default,
                //         }),
                //     }
                // ]
            },
            {
                path: 'movie/:slug/:type?',
                loader: async ({ params }): Promise<SWRConfiguration> => {
                    if (isClient) {
                        return {}
                    }
                    return {
                        fallback: {
                            [params.slug || 'slug']: await client.v1ApiPhim(
                                params.slug || ''
                            ),
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
