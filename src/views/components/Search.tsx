import React from 'react'
import { useNavigate } from 'react-router-dom'

const SearchInput = React.forwardRef<
    HTMLInputElement,
    React.HTMLAttributes<HTMLInputElement> & {
        dotClassName?: string
        selectedClassName?: string
    }
>(({ className, selectedClassName, dotClassName, hidden, ...props }, ref) => {
    const na = useNavigate()
    const [search, setSearch] = React.useState('' as string)

    React.useEffect(() => {
        if (hidden) {
            setSearch('')
        }
    }, [hidden])
    return (
        <div className={"search-input relative w-full animate-[fadeIn] ease-linear duration-200 my-4 hidden -top-24"}>
            <div className="nes-field">
                <label htmlFor="name_field">Tìm kiếm</label>
                <input
                    type="text"
                    id="name_field"
                    className="nes-input text-base !border-foreground"
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            na({ pathname: '/tim-kiem', search: `?keyword=${search}`})
                        }
                    }}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>
        </div>
    )
})
SearchInput.displayName = 'SearchInput'
export default SearchInput
