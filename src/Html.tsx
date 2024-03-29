import { ReactNode } from 'react'
import refreshScript from './refresh-hack.js?raw'
import { isClient } from './utils/helper'

interface HtmlProps {
    children: ReactNode
}
const Html: React.FC<HtmlProps> = ({ children }) => {
    // inject vite refresh script to avoid "React refresh preamble was not loaded"

    return import.meta.env.DEV ? (
        <html lang="en">
            <head>
                <script type="module" src="/@vite/client" />
                <script
                    type="module"
                    dangerouslySetInnerHTML={{ __html: refreshScript }}
                />
            </head>
            <body>
                <div id="root">{children}</div>
            </body>
        </html>
    ) : (
        <>
            <body>
                <div id="root">{children}</div>
            </body>
        </>
    )
}

export default Html
