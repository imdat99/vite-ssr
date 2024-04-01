import SwrConfigHOC from '@/lib/Hoc/SwrConfigHOC'
import useParseParams from '@/lib/Hooks/useParseParams'
import client, { MoviesSlugResponseBody } from '@/lib/client'
import PageSeo from '@/views/components/PageSeo'
import TopLoading from '@/views/components/TopLoading'
import React from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import useSWR from 'swr'
import MovieInfo from './MovieInfo'
import Related from './Related'
import { isEp, epNumber } from '@/lib/utils'
import MovieWatch from './MovieWatch'
import HomeScroll from '@/views/components/HomeScroll'
import MovieEpisode from './MovieEpisode'

const Movie = () => {
    const na = useNavigate()
    const { slug, type } = useParams<'slug' | 'type'>()
    const { ep, server } = useParseParams<'ep' | 'server'>()
    const { data, isLoading } = useSWR(slug || 'slug', client.v1ApiPhim, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
    })
    const cacheData = React.useRef<MoviesSlugResponseBody['data']>({} as any)
    const isWatch = React.useMemo(
        () => isEp(ep) && isEp(server) && type === 'watch',
        [type, ep, server]
    )
    React.useEffect(() => {
        // console.log('isWatch', isWatch)
        if (!isWatch) {
            na('/movie/' + slug, { replace: true })
        }
    }, [isWatch])
    React.useEffect(() => {
        if (data?.data) {
            cacheData.current = data.data
            window.scrollTo(0, 0)
        }
    }, [data])
    const { item } = data?.data || cacheData.current
    return (
        <PageSeo {...(data?.data as React.ComponentProps<typeof PageSeo>)}>
            <TopLoading loading={isLoading} />
            {isWatch && (
                <MovieWatch
                    itemData={item!}
                    ep={epNumber(ep)}
                    server={epNumber(server)}
                    className='my-5 bg-slate-400'
                />
            )}
            <MovieInfo itemData={item!} isWatch={isWatch} />
            <MovieEpisode
                episodes={item?.episodes || []}
                ep={epNumber(ep)}
                server={epNumber(server)}
                isWatch={isWatch}
            />
            <Related
                itemCategory={item?.category[0]!}
                itemCountry={item?.country[0]!}
                itemId={item?._id!}
            />
            <HomeScroll />
        </PageSeo>
    )
}

export default SwrConfigHOC(Movie)
