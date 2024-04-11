import SwrConfigHOC from '@/lib/Hoc/SwrConfigHOC'
import useParseParams from '@/lib/Hooks/useParseParams'
import client, { Slug } from '@/lib/client'
import HomeScroll from '@/views/components/HomeScroll'
import InfinityScroll from '@/views/components/InfinityScroll'
import Loading from '@/views/components/Loading'
import MovieGrid from '@/views/components/MovieGrid'
import PageSeo from '@/views/components/PageSeo'
import React from 'react'
import useSWRInfinite from 'swr/infinite'
import Filter from './Filter'
import Pagi from './Pagi'
import useSWR from 'swr'

const Category = () => {
    const searchParams = useParseParams()
    const { slug, page, ...other } = searchParams
    const { data, isLoading } = useSWR(
        slug || JSON.stringify(searchParams),
        ([pageSlug]) =>
            client.v1ApiDanhSach(
                (pageSlug as Slug) || Slug.PhimMoi,
                Number(page || 1),
                other as any
            ),
        {
            revalidateFirstPage: false,
            revalidateIfStale: false,
            revalidateOnFocus: false,
        }
    )
    const pagiData = React.useMemo(() => data?.data?.params.pagination, [data])
    return (
        <PageSeo {...(data?.data as React.ComponentProps<typeof PageSeo>)}>
            <Filter breadCrumb={data?.data.breadCrumb} />
            <MovieGrid items={data?.data?.items || []} />
            {isLoading && <Loading />}
            {pagiData && <Pagi pagiData={pagiData} />}
            <HomeScroll />
        </PageSeo>
    )
}

export default SwrConfigHOC(Category)
