import React from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/views/components/ui/select'
import ClientRender from '@/lib/Hoc/ClientRender'
import useSWR from 'swr'
import client, { Categories, sortFields } from '@/lib/client'
import { useSearchParams } from 'react-router-dom'
import useParseParams from '@/lib/Hooks/useParseParams'

const fetcher = () =>
    Promise.all([
        client.v1ApiTheLoaiGetList(),
        client.v1ApiQuocGiaGetList(),
    ]).then(([types, country]) => [
        {
            title: 'Sắp xếp',
            name: 'sort_field',
            items: Object.entries(sortFields).map(([slug, name]) => ({
                name,
                slug,
            })),
        },
        {
            title: 'Thể loại',
            name: 'category',
            items: types.data.items.filter((i) => i.slug !== 'phim-18'),
        },
        {
            title: 'Quốc gia',
            name: 'country',
            items: country.data.items,
        },
        {
            title: 'Danh mục',
            name: 'slug',
            items: Object.entries(Categories).map(([slug, name]) => ({
                name,
                slug,
            })),
        },
    ])

const Filter = () => {
    const { data } = useSWR('filter', fetcher)
    const [,setSearchValue] = useSearchParams()
    const serchParams = useParseParams()
    return (
        <div className="mt-10 -mb-20 grid grid-cols-1 md:grid-cols-4 gap-5">
            {data?.map(({ title, items, name }, index) => (
                <div key={index}>
                    <p className="text-foreground mb-5">{title}</p>
                    <Select name={name} value={serchParams[name] || '-1'} onValueChange={(e) => {
                        if (e === '-1') {
                            const { [name!]: _, ...rest } = serchParams
                            setSearchValue(rest as any)
                            return
                        }
                        setSearchValue({...serchParams as any, [name!]: e})
                    }}>
                        <SelectTrigger className="w-full border-foreground/30" style={{
                                lineHeight: '2rem',
                            }}>
                            <SelectValue/>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="-1">Tất cả</SelectItem>
                            {items.map((item) => (
                                <SelectItem key={item.slug} value={item.slug}>
                                    {item.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            ))}
        </div>
    )
}

export default ClientRender(Filter)
