import ClientRender from '@/lib/Hoc/ClientRender'
import useParseParams from '@/lib/Hooks/useParseParams'
import client, {
    Categories,
    ListMoviesResponse,
    sortFields,
} from '@/lib/client'
import { cn } from '@/lib/utils'
import { Button } from '@/views/components/ui/button'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/views/components/ui/select'
import React from 'react'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import useSWR from 'swr'

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
interface FilterProps {
    breadCrumb?: ListMoviesResponse['data']['breadCrumb']
}
const Filter: React.FC<FilterProps> = ({ breadCrumb }) => {
    const { data } = useSWR('filter', fetcher)
    const [open, setOpen] = React.useState(false)
    const { _page, ...serchParams } = useParseParams()
    const [, setSearch] = useSearchParams()

    return (
        <div className="mt-10 -mb-20">
            <div className="flex my-5 justify-between">
                <p className=" text-sm">
                    {breadCrumb?.map((item, index) => item.name).join(' > ')}
                </p>
                <Button
                    variant={'outline'}
                    className="md:hidden"
                    onClick={() => setOpen((p) => !p)}
                >
                    Bộ lọc
                </Button>
            </div>
            <div
                className={cn(
                    'grid-cols-1 md:grid-cols-4 gap-5 hidden md:grid',
                    open && 'grid'
                )}
            >
                {data?.map(({ title, items, name }, index) => (
                    <div key={index}>
                        <p className="text-foreground mb-5">{title}</p>
                        <Select
                            name={name}
                            value={serchParams[name] || '-1'}
                            onValueChange={(e) => {
                                let search = ''
                                if (e === '-1') {
                                    const { [name!]: _, ...rest } = serchParams
                                    search = new URLSearchParams(
                                        rest as any
                                    ).toString()
                                } else {
                                    search = new URLSearchParams({
                                        ...(serchParams as any),
                                        [name!]: e,
                                    }).toString()
                                }
                                setSearch(search)
                            }}
                        >
                            <SelectTrigger
                                className="w-full border-foreground/30"
                                style={{
                                    lineHeight: '2rem',
                                }}
                            >
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="-1">Tất cả</SelectItem>
                                {items.map((item) => (
                                    <SelectItem
                                        key={item.slug}
                                        value={item.slug}
                                    >
                                        {item.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ClientRender(Filter)
