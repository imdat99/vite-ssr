import { SeoOnPage } from '@/lib/client'
import { buildImageUrl } from '@/lib/utils'
import React from 'react'
import { Helmet } from 'react-helmet-async'
import { useLocation } from 'react-router-dom'

interface PageSeoProps {
    children?: React.ReactNode
    seoOnPage: SeoOnPage
}
const PageSeo: React.FC<PageSeoProps> = ({ children, seoOnPage }) => {
    const {
        og_type,
        titleHead,
        descriptionHead,
        og_image,
        updated_time,
        og_url,
    } = seoOnPage || {}
    const location = useLocation()
    return (
        <>
            {seoOnPage && (
                <Helmet prioritizeSeoTags>
                    <title>{titleHead}</title>
                    {descriptionHead && (
                        <>
                            <meta
                                name="description"
                                content={descriptionHead}
                            />
                            <meta
                                property="og:description"
                                content={descriptionHead}
                            ></meta>
                        </>
                    )}
                    <meta
                        property="og:title"
                        content={['Dat09Movie', titleHead].join(' -')}
                    ></meta>
                    <link
                        rel="canonical"
                        href={'https://dat09.fun' + location.pathname}
                    />
                    <meta
                        property="og:url"
                        content={'https://dat09.fun' + location.pathname}
                    ></meta>
                    <meta property="og:site_name" content="Dat09Movie" />
                    <meta
                        property="og:image"
                        content={buildImageUrl(og_image[0] || '')}
                    />
                    <meta
                        property="og:type"
                        content={og_type || 'website'}
                    ></meta>
                </Helmet>
            )}
            {children}
        </>
    )
}

export default PageSeo
