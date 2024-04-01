import SwrConfigHOC from '@/lib/Hoc/SwrConfigHOC'
import client from '@/lib/client'
import React from 'react'
import useSWR from 'swr'
import PageSeo from '../components/PageSeo'
import useParseParams from '@/lib/Hooks/useParseParams'
import { useLocation } from 'react-router-dom'
import Movie from './Movie'
import MovieGrid from '../components/MovieGrid'
import useSWRInfinite from 'swr/infinite'
import TopLoading from '../components/TopLoading'


const PageSearch = () => {
    const { keyword } = useParseParams<'keyword'>()
    // const { data, error } = useSWR(keyword, client.v1ApiTimKiem, {
    //     revalidateIfStale: false,
    //     revalidateOnFocus: false,
    // })
    console.log("keyword", keyword)
    const { data, size, setSize, isLoading } = useSWRInfinite(
        (index) => [decodeURIComponent(keyword!), index],
        client.v1ApiTimKiem,
        {
            revalidateFirstPage: false,
            revalidateIfStale: false,
            revalidateOnFocus: false,
        }
    )
    const searchData = React.useMemo(() => {
        if (!data?.length) return undefined
        data!.at(0)!.data!.items = data!.map((d) => d.data.items).flat()
        // data!.at(0)!.data!.params.pagination = data!.at(-1)!.data!.params.pagination
        return data!.at(0)?.data
    }, [data])
    console.log("searchData", searchData, data)
    return (
        <PageSeo {...(searchData as React.ComponentProps<typeof PageSeo>)}>
            <TopLoading loading={isLoading} />
            <MovieGrid 
                items={searchData?.items || []}
                title={
                    <>
                        <h3 className="title md:text-2xl !-mt-11 text-xl font-semibold uppercase !bg-background">
                            Tìm kiếm: {keyword}
                        </h3>
                        <p className="mb-11">&nbsp;</p>
                    </>
                }/>
        </PageSeo>
    )
}
export default SwrConfigHOC(PageSearch)
