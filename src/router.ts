import { createElement as _c } from 'react'
import { RouteObject } from 'react-router-dom'
import { SWRConfiguration } from 'swr'
import { unstable_serialize as infinite_unstable_serialize } from 'swr/infinite'
import client, { Slug } from './lib/client'
import { isClient, parseParams } from './lib/utils'
import Layout from './views/components/Layout'
import Error from './views/pages/Error'
import { searchRegex } from './lib/constants'
import { ErrorBoundary } from './views/components/Errorboundary'

/**
 * never use lazy loading in the root route,
 * use lazy loading in the child route or compoenent
 */
const routes: RouteObject[] = [
    {
        path: '/',
        element: _c(Layout),
        // ErrorBoundary: Error,
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
                    const {keyword} = parseParams(params.request.url)
                    if (keyword) {
                        const searchString = decodeURIComponent(keyword)
                        if(searchString)
                        return {
                            fallback: {
                                [infinite_unstable_serialize(() => [searchString || 'tim-kiem', 1])]: [await client.v1ApiTimKiem(searchString, 1)],
                            },
                        }
                    } 
                    return {}
                    
                },
            },
            {
                path: 'category/:slug?',
                lazy: async () => ({
                    Component: (await import('./views/pages/Category')).default,
                }),
                loader: async ({ params, request }): Promise<SWRConfiguration>=> {
                    if (isClient) return {}
                    const slug = params.slug;
                    console.log("slug", slug)
                    const searchParams = parseParams(request.url)
                    return {
                        fallback: {
                            [infinite_unstable_serialize(() => [
                                slug || Slug.PhimMoi,
                                1,
                            ])]: [await client.v1ApiDanhSach(slug as Slug || Slug.PhimMoi, searchParams.page || 1, searchParams as any)],
                        },
                    }
                },
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
