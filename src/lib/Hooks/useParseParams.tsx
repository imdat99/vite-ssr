import React from 'react'
import { Params, useLocation } from 'react-router-dom'
import { parseParams } from '../utils'

const useParseParams = <
    ParamsOrSearch extends string | Record<string, string | undefined> = string
>(): Readonly<
    [ParamsOrSearch] extends [string]
        ? Params<ParamsOrSearch>
        : Partial<ParamsOrSearch>
> => {
    const location = useLocation()
    return (parseParams(location.search) as any)
}

export default useParseParams
