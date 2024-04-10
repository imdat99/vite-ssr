import React from 'react'
import { Params, useLocation } from 'react-router-dom'
import { parseParams, repairUrl } from '../utils'

const useParseParams = <
    ParamsOrSearch extends string | Record<string, string | undefined> = string
>(): Readonly<
    [ParamsOrSearch] extends [string]
        ? Params<ParamsOrSearch>
        : Partial<ParamsOrSearch>
> => {
    const location = useLocation()
    return (parseParams(repairUrl(location.pathname+location.search)) as any)
}

export default useParseParams
