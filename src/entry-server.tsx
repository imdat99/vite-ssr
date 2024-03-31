import type * as ex from 'express'
import ReactDOMServer from 'react-dom/server'
import { HelmetProvider, HelmetServerState } from 'react-helmet-async'
import {
    StaticRouterProvider,
    createStaticHandler,
    createStaticRouter,
} from 'react-router-dom/server'
import Html from './Html'
import routes from './router'
import { ErrorBoundary } from './views/components/Errorboundary'
import { storageThemeKey } from './lib/constants'

export async function render(
    req: ex.Request,
    res: ex.Response,
    bootstrap: string,
    style: string
) {
    const { query, dataRoutes } = createStaticHandler(routes)

    const remixRequest = createFetchRequest(req)
    const context = await query(remixRequest)

    if (context instanceof Response) {
        throw context
    }

    const router = createStaticRouter(dataRoutes, context)
    const helmetContext: { helmet: HelmetServerState } = { helmet: {} as any }

    const cookies: Record<string, string> = req.headers.cookie?.split('; ').reduce((acc, cur) => ({ ...acc, [cur.split('=')[0]]: cur.split('=')[1] }), {}) || {}

    const { pipe } = ReactDOMServer.renderToPipeableStream(
        <Html>
            <HelmetProvider context={helmetContext}>
                <ErrorBoundary>
                    <StaticRouterProvider
                        router={router}
                        context={context}
                        nonce="the-nonce"
                    />
                </ErrorBoundary>
            </HelmetProvider>
        </Html>,
        {
            onShellReady() {
                res.statusCode = 200
                res.setHeader('content-type', 'text/html')
                const header =
                    `<!DOCTYPE html><html lang="en" class="${cookies[storageThemeKey]}"><head><meta charSet="UTF-8" /><link rel="shortcut icon" href="/vite.svg" type="image/x-icon" /><meta name="viewport" content="width=device-width, initial-scale=1.0" /><link rel="stylesheet" href="${style}" />` +
                    Object.values(helmetContext.helmet)
                        .map((value) => value.toString())
                        .filter(Boolean)
                        .join('') +
                    '</head>'
                res.write(header)
                pipe(res)
            },
            bootstrapModules: [bootstrap],
        }
    )
}

export function createFetchRequest(req: ex.Request): Request {
    const origin = `${req.protocol}://${req.get('host')}`
    const url = new URL(req.originalUrl || req.url, origin)

    const controller = new AbortController()
    req.on('close', () => controller.abort())

    const headers = new Headers()

    for (const [key, values] of Object.entries(req.headers)) {
        if (values) {
            if (Array.isArray(values)) {
                for (const value of values) {
                    headers.append(key, value)
                }
            } else {
                headers.set(key, values)
            }
        }
    }

    const init: RequestInit = {
        method: req.method,
        headers,
        signal: controller.signal,
    }

    if (req.method !== 'GET' && req.method !== 'HEAD') {
        init.body = req.body
    }

    return new Request(url.href, init)
}
