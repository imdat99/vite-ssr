import ClientRender from '@/lib/Hoc/ClientRender'
import { cn } from '@/lib/utils'
import React from 'react'

interface TopLoadingProps {
    loading?: boolean
}
const TopLoading: React.FC<TopLoadingProps> = ({loading}) => {
    const [show, setShow] = React.useState(false)
    const progressBar = React.useRef<HTMLDivElement>(null)
    const loadingRef = React.useRef<boolean>(false)
    const timer = React.useRef<NodeJS.Timeout>()
    React.useEffect(() => {
        // handle progress bar on top when loading
        if (loading) {
                setShow(true)
            // Show progress bar with delay
                timer.current = setTimeout(() => {
                    progressBar.current!.style.width = '85%';
                    loadingRef.current = true
                }, 100); // Adjust the delay time as needed
                // Assign the timer to the ref
        } else {
            // Hide progress bar
                progressBar.current!.style.width = '101%';
                timer.current = setTimeout(() => {
                    setShow(false)
                    progressBar.current!.style.width = '0%';
                }, 800); // Adjust the delay time as needed
            // }
        }
        return () => {
            loadingRef.current = false
            clearTimeout(timer.current)
        }
    }, [loading])
  return  <div className={cn("progress", show ? "" : 'hidden')} ref={progressBar} ><b></b><i></i></div>
}

export default ClientRender(TopLoading)