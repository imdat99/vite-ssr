import { RiLoader4Line } from 'react-icons/ri'

const Loading = () => {
    return (
        <div className="flex my-2">
            <RiLoader4Line fontSize={22} className="animate-spin" />
            <span className='animate-pulse'>&nbsp;Loading...</span>
        </div>
    )
}

export default Loading
