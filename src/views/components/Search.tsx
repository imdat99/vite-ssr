import { cn } from '@/lib/utils'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Input } from './ui/input'

const SearchInput = React.forwardRef<
    HTMLInputElement,
    React.HTMLAttributes<HTMLInputElement> & {
        onToggleSearch: () => void
        dotClassName?: string
        selectedClassName?: string
    }
>(({ className, selectedClassName, dotClassName, hidden, onToggleSearch, ...props }, ref) => {
    const na = useNavigate()
    // const lo = useLocation()
    const [search, setSearch] = React.useState('' as string)

    React.useEffect(() => {
        if (hidden) {
            setSearch('')
        } else {
            document.getElementById('name_field')?.focus()
        }
    }, [hidden])
    return (
        <div
            className={
                cn('search-input relative w-full animate-[fadeIn] ease-linear duration-200', className)
            }
        >
                <Input
                    placeholder="Tìm kiếm..."
                    value={search}
                    type="text"
                    id="name_field"
                    className='border border-foreground/50'
                    onKeyDown={(e) => {
                        if (e.key === "Escape") {
                            onToggleSearch()
                        }
                        if (e.key === 'Enter') {
                            na({
                                pathname: '/tim-kiem',
                                search: `?keyword=${search}`,
                            })
                        }
                    }}
                    onChange={(e) => setSearch(e.target.value)}
                />
        </div>
    )
})
SearchInput.displayName = 'SearchInput'
export default SearchInput
