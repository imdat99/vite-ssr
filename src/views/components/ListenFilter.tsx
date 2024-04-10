import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const ListenFilter = () => {
    const {state} = useLocation()
    const na = useNavigate()
    React.useEffect(() => {
        if(state?.from === 'category' && state?.search) {
            na(['/category',state?.search].filter(Boolean).join('?'), {replace: true, state: {}})
        }
    }, [state])
  return (
    null
  )
}

export default ListenFilter