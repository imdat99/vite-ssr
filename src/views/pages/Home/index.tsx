import React from 'react'
import { unstable_serialize } from 'swr'
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
import InfinityScroll from '@/views/components/InfinityScroll'

const fetcher = ([key, page]: [string, number]) =>
    (page
        ? client.v1ApiDanhSach(Slug.PhimMoi, page + 1)
        : client.v1ApiHome(undefined)) as Promise<HomeGetResponseBody>

const index = () => {
    const na = useNavigate()
    const { data, size, setSize, isLoading } = useSWRInfinite(
        (index) => ['/home', index],
        fetcher,
        {
            revalidateFirstPage: false,
        }
    )
    const homeData = React.useMemo(() => {
        if (!data?.length) return undefined
        data!.at(0)!.data!.items = data!.map((d) => d.data.items).flat()
        // data!.at(0)!.data!.params.pagination = data!.at(-1)!.data!.params.pagination
        return data!.at(0)?.data
    }, [data])
    const hotCarousel = React.useMemo(
        () => (data?.length ? data.at(0)?.data.items.slice(0, 10) : []),
        [data]
    )

    // console.log('homeData', homeData)
    return (
        <PageSeo {...(homeData as React.ComponentProps<typeof PageSeo>)}>
            <TopLoading loading={isLoading} />
            {homeData && (
                <>
                    <HomeCarousel carouselItems={hotCarousel!} />
                    <MovieGrid
                        {...(homeData as Omit<
                            React.ComponentProps<typeof MovieGrid>,
                            'title'
                        >)}
                        title={
                            <>
                                <h3 className="md:text-2xl text-xl font-semibold uppercase">
                                    Phim mới cập nhật
                                </h3>
                                <Link
                                    to="/list"
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
                        New: {homeData?.params?.itemsUpdateInDay}
                        <br />
                        Total: {homeData?.params?.pagination.totalItems}
                    </>
                }
            />
        </PageSeo>
    )
}

export default SwrConfigHOC(index)
