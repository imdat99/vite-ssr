import ClientRender from '@/lib/Hoc/ClientRender'
import client, { Category, Country, MoviesSlugResponseBody } from '@/lib/client'
import Loading from '@/views/components/Loading'
import MovieGrid from '@/views/components/MovieGrid'
import React from 'react'
import { Link } from 'react-router-dom'
import useSWR from 'swr'

interface RelatedProps {
    itemCategory: Category
    itemCountry: Country
    itemId: string
}
const Related: React.FC<RelatedProps> = ({
    itemCategory,
    itemCountry,
    itemId,
}) => {
    const { data, isLoading } = useSWR('related'+itemId, () =>
        client.v1ApiTheLoaiGet(
            itemCategory.slug,
            undefined,
            Math.random() * 4 < 2 ? itemCountry.slug : undefined,
            undefined,
            Math.floor(Math.random() * 10)+1
        ), {
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
        }
    )
    return (
        isLoading ? <Loading /> : (
            <MovieGrid
                title={
                    <h3 className="title md:text-2xl !-mt-11 text-xl font-semibold uppercase !bg-background">
                        Phim liên quan xíu
                    </h3>
                }
                items={
                    data?.data.items
                        .slice(0, Math.floor(Math.random() * 24) + 7)
                        .filter((item) => item._id !== itemId) || [] as any
                }
            />
        )
    )
}

export default ClientRender(Related)
