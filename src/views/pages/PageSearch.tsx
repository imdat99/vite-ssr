import SwrConfigHOC from '@/lib/Hoc/SwrConfigHOC'
import useParseParams from '@/lib/Hooks/useParseParams'
import client from '@/lib/client'
import React from 'react'
import useSWRInfinite from 'swr/infinite'
import MovieGrid from '../components/MovieGrid'
import PageSeo from '../components/PageSeo'
import TopLoading from '../components/TopLoading'
import Loading from '../components/Loading'

const PageSearch = () => {
    const { keyword } = useParseParams<'keyword'>()
    const { data, size, setSize, isLoading } = useSWRInfinite(
        (index) => [decodeURIComponent(keyword!), index + 1],
        (args) => client.v1ApiTimKiem(...args),
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
    return (
        <PageSeo {...(searchData as React.ComponentProps<typeof PageSeo>)}>
            <TopLoading loading={isLoading} />
            {isLoading ? (
                <Loading />
            ) : (
                <MovieGrid
                    items={searchData?.items || []}
                    title={
                        <>
                            <h3 className="title md:text-2xl !-mt-5 text-xl font-semibold uppercase !bg-background">
                                Tìm kiếm: {keyword}
                            </h3>
                            <p className="mb-5">&nbsp;</p>
                        </>
                    }
                />
            )}
        </PageSeo>
    )
}
export default SwrConfigHOC(PageSearch)
