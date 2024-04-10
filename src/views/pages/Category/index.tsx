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

const Category = () => {
    const searchParams = useParseParams()
    const { slug } = searchParams;
    const { data, size, setSize, isLoading } = useSWRInfinite(
        (index) => [slug || Slug.PhimMoi, index + 1, JSON.stringify(searchParams)],
        ([pageSlug, index]) =>
            client.v1ApiDanhSach(pageSlug as Slug, index, searchParams as any),
        {
            revalidateFirstPage: false,
            revalidateIfStale: false,
            revalidateOnFocus: false,
        }
    )
    
    const categoryData = React.useMemo(() => {
        if (!data?.length) return undefined
        data!.at(0)!.data!.items = data!.map((d) => d.data.items).flat()
        const setData = new Set(data!.at(0)!.data!.items)
        data!.at(0)!.data!.items = Array.from(setData)
        return data!.at(0)?.data
    }, [data])

    return (
        <PageSeo {...(categoryData as React.ComponentProps<typeof PageSeo>)}>
            {/* <Filter /> */}
            <MovieGrid items={categoryData?.items || []} />
            {isLoading && <Loading />}
            <InfinityScroll
                onLoadMore={() => {
                    if (!data?.length || data?.at(-1)?.data?.items.length === 0) return
                    setSize((prev) => prev + 1)
                }}
            />
            <HomeScroll />
        </PageSeo>
    )
}

export default SwrConfigHOC(Category)
