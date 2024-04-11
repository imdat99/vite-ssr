import React from 'react'
import useSWR, { unstable_serialize } from 'swr'
import reactLogo from '../../../assets/react.svg'
import Counter from './Counter'
import { Helmet } from 'react-helmet-async'
import {
    Link,
    useAsyncValue,
    useLoaderData,
    useNavigate,
} from 'react-router-dom'
import SwrConfigHOC from '@/lib/Hoc/SwrConfigHOC'
import useSWRInfinite from 'swr/infinite'
import client, { HomeGetResponseBody, Slug } from '@/lib/client'
import { Button } from '@/views/components/ui/button'
import PageSeo from '@/views/components/PageSeo'
import Loading from '@/views/components/Loading'
import MovieGrid from '@/views/components/MovieGrid'
import HomeCarousel from './HomeCarousel'
import SafeRender from '@/views/components/SafeRender'
import HomeScroll from '../../components/HomeScroll'
import TopLoading from '@/views/components/TopLoading'

const index = () => {
    const { data, isLoading } = useSWR('home', client.v1ApiHome, {
        revalidateIfStale: false
    })
    const hotCarousel = React.useMemo(
        () => (data?.data.items ? data.data.items.slice(0, 5) : []),
        [data]
    )

    return (
        <PageSeo {...(data?.data as React.ComponentProps<typeof PageSeo>)}>
            <TopLoading loading={isLoading} />
            {data?.data && (
                <>
                    <HomeCarousel carouselItems={hotCarousel!} />
                    <MovieGrid
                        {...(data.data as Omit<
                            React.ComponentProps<typeof MovieGrid>,
                            'title'
                        >)}
                        title={
                            <>
                                <h3 className="md:text-2xl text-xl font-semibold uppercase">
                                    Phim mới cập nhật
                                </h3>
                                <Link
                                    to="/category"
                                    className="font-medium text-foreground/60 hover:text-foreground/80 self-end"
                                >
                                    Xem tất cả
                                </Link>
                            </>
                        }
                    />
                </>
            )}
            {isLoading && <Loading />}
            <HomeScroll
                info={
                    <>
                        New: {data?.data.params?.itemsUpdateInDay}
                        <br />
                        Total: {data?.data?.params?.pagination.totalItems}
                    </>
                }
            />
        </PageSeo>
    )
}

export default SwrConfigHOC(index)
