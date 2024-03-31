import { MoviesSlugResponseBody } from '@/lib/client'
import { repairUrl } from '@/lib/utils'
import React from 'react'

interface MovieWatchProps {
        itemData: MoviesSlugResponseBody['data']['item']
        ep: number
        server: number
}
const MovieWatch: React.FC<MovieWatchProps> = ({itemData, ep, server}) => {
  return (
    <div>{repairUrl(itemData.episodes[server].server_data[ep].link_m3u8)}</div>
  )
}

export default MovieWatch