import ClientRender from '@/lib/Hoc/ClientRender';
import React from 'react'

interface InfinityScrollProps {
    onLoadMore: () => void
}
const InfinityScroll: React.FC<InfinityScrollProps> = (props) => {
    const {onLoadMore: handleLoadMore} = props;
    const elRef = React.useRef<HTMLDivElement>(null)
    React.useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    handleLoadMore()
                }
            },
            { threshold: 0.5 }
        )
        if (elRef.current) observer.observe(elRef.current)
        return () => {
            if (elRef.current) observer.unobserve(elRef.current)
        }
    }, [])
    return (
        <div ref={elRef} className='h-1 w-1'>
            &nbsp;
        </div>
    )
}

export default ClientRender(InfinityScroll)
