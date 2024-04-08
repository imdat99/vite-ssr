import SwrConfigHOC from '@/lib/Hoc/SwrConfigHOC'
import useParseParams from '@/lib/Hooks/useParseParams'
import client, { Slug } from '@/lib/client'
import React from 'react'
import useSWRInfinite from 'swr/infinite'
import MovieGrid from '../components/MovieGrid'
import PageSeo from '../components/PageSeo'
import TopLoading from '../components/TopLoading'
import { ScrollRestoration, useParams } from 'react-router-dom'
import InfinityScroll from '../components/InfinityScroll'

const Category = () => {
    const searchParams = useParseParams()
    const { slug } = useParams<{ slug: string }>()
    const { data, size, setSize, isLoading } = useSWRInfinite(
        (index) => [slug || Slug.PhimMoi, index + 1],
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
        // data!.at(0)!.data!.params.pagination = data!.at(-1)!.data!.params.pagination
        return data!.at(0)?.data
    }, [data])
    // console.log('categoryData', categoryData, data)
    return (
        <PageSeo {...(categoryData as React.ComponentProps<typeof PageSeo>)}>
            <TopLoading loading={isLoading} />
            {!isLoading && <MovieGrid items={categoryData?.items || []} />}
            <InfinityScroll
                onLoadMore={() => {
                    setSize((prev) => prev + 1)
                }}
            />
        </PageSeo>
    )
}
export default SwrConfigHOC(Category)
