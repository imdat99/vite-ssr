import React from 'react'
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/views/components/ui/pagination'
import { Button } from '@/views/components/ui/button'
import {
    Link,
    createSearchParams,
    useLocation,
    useSearchParams,
} from 'react-router-dom'
import { ListMoviesResponse } from '@/lib/client'
import useParseParams from '@/lib/Hooks/useParseParams'

interface PagiProps {
    pagiData: ListMoviesResponse['data']['params']['pagination']
}
const Pagi: React.FC<PagiProps> = ({ pagiData }) => {
    const searchParams = useParseParams()
   
    const location = useLocation()

    const buildPageUrl = React.useCallback((page: number) => {
        return `${location.pathname}?${createSearchParams({
            ...searchParams,
            page: page.toString(),
        }).toString()}`
    }, [])

    const renderReange = React.useMemo(() => {
        const temp = pagiData.totalItems / pagiData.totalItemsPerPage
        const total =
            Math.round(temp) < temp ? Math.round(temp) + 1 : Math.round(temp)
        let min = pagiData.currentPage
        let max = total
        let ranges = Array.from({ length: total > pagiData.pageRanges ? pagiData.pageRanges : total }, (_, i) => {
            const range = pagiData.currentPage + (i % pagiData.pageRanges) - 2
            min = Math.min(min, range)
            max = Math.max(max, range)
            return range
        })
        if (min < 1) ranges = ranges.map((item) => item + 1 + Math.abs(min))
        if (max > total) ranges = ranges.map((item) => item - (max - total))

        return {
            total,
            ranges,
            hasNext: {
                cond: ranges[ranges.length - 1] < total,
                pages: Math.abs(total - ranges[ranges.length - 1]),
            },
            hasPrev: { cond: ranges[0] > 1, pages: Math.abs(ranges[0] - 1) },
        }
    }, [pagiData])
    
    return (
        <Pagination>
            <PaginationContent className='flex-wrap justify-center'>
                {renderReange.hasPrev.cond && (
                    <PaginationItem>
                        <PaginationPrevious
                            to={buildPageUrl(pagiData.currentPage - 1)}
                        />
                    </PaginationItem>
                )}
                {renderReange.hasPrev.pages > 1 && (
                    <>
                        <PaginationItem>
                            <Button asChild variant="ghost">
                                <Link to={buildPageUrl(1)}>1</Link>
                            </Button>
                        </PaginationItem>
                        <PaginationItem >
                            <PaginationEllipsis />
                        </PaginationItem>
                    </>
                )}
                {renderReange.ranges.map((item, index) => {
                    const isActive = item === pagiData.currentPage
                    return (
                        <PaginationItem key={index}>
                            <Button
                                asChild={!isActive}
                                disabled={isActive}
                                variant={isActive ? 'outline' : 'ghost'}
                            >
                                {isActive ? (
                                    item
                                ) : (
                                    <Link to={buildPageUrl(item)}>{item}</Link>
                                )}
                            </Button>
                        </PaginationItem>
                    )
                })}
                {renderReange.hasNext.pages > 1 && (
                    <>
                        <PaginationItem >
                            <PaginationEllipsis />
                        </PaginationItem>
                        <PaginationItem>
                            <Button asChild variant="ghost">
                                <Link to={buildPageUrl(renderReange.total)}>
                                    {renderReange.total}
                                </Link>
                            </Button>
                        </PaginationItem>
                    </>
                )}
                {renderReange.hasNext.cond && (
                    <PaginationItem>
                        <PaginationNext
                            to={buildPageUrl(pagiData.currentPage + 1)}
                        />
                    </PaginationItem>
                )}
            </PaginationContent>
        </Pagination>
    )
}

export default Pagi
