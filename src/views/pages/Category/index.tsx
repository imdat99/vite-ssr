import SwrConfigHOC from '@/lib/Hoc/SwrConfigHOC'
import useParseParams from '@/lib/Hooks/useParseParams'
import client, { Slug } from '@/lib/client'
import HomeScroll from '@/views/components/HomeScroll'
import InfinityScroll from '@/views/components/InfinityScroll'
import MovieGrid from '@/views/components/MovieGrid'
import PageSeo from '@/views/components/PageSeo'
import TopLoading from '@/views/components/TopLoading'
import React from 'react'
import useSWRInfinite from 'swr/infinite'
import Filter from './Filter'
import { useNavigate } from 'react-router-dom'

const Category = () => {
    const searchParams = useParseParams()
    const na = useNavigate()
    const { slug } = searchParams;
    const cacheSize = React.useRef<number>(0) 
    const pageSize = React.useRef<number>(1) 
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
    
    const cacheSlug = React.useRef<string>('') 
    const categoryData = React.useMemo(() => {
        if (!data?.length) return undefined
        data!.at(0)!.data!.items = data!.map((d) => d.data.items).flat()
        const setData = new Set(data!.at(0)!.data!.items)
        data!.at(0)!.data!.items = Array.from(setData)
        return data!.at(0)?.data
    }, [data])
    React.useEffect(() => {
        if (!slug || cacheSlug.current === slug) return
        na(0)
        console.log('slug', slug)
        cacheSlug.current = slug!
    }, [slug])
    return (
        <PageSeo {...(categoryData as React.ComponentProps<typeof PageSeo>)}>
            <TopLoading loading={isLoading} />
            <Filter />
            <MovieGrid items={categoryData?.items || []} />
            <InfinityScroll
                onLoadMore={() => {
                    // if (!data?.length || data?.at(-1)?.data?.items.length === 0) return
                    setSize((prev) => {
                        console.log("prev", prev)
                        return prev + 1})
                }}
            />
            <HomeScroll />
        </PageSeo>
    )
}
export default SwrConfigHOC(Category)
