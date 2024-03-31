import React from 'react'
import { Params, useLocation } from 'react-router-dom'
const parseParams = (querystring: string) => {
    const params = new URLSearchParams(querystring)
    const obj: Record<string, any> = {}
    for (const key of params.keys()) {
        if (params.getAll(key).length > 1) {
            if (params.get(key) !== 'undefined') {
                obj[key] = params.getAll(key)
            }
        } else {
            if (params.get(key) !== 'undefined') {
                obj[key] = params.get(key)
            }
            if (typeof params.get(key) === 'boolean') {
                obj[key] = params.get(key)
            }
            if (params.get(key) === 'false' || params.get(key) === 'true') {
                obj[key] = JSON.parse(params.get(key) as any)
            }
        }
    }
    return obj
}

const useParseParams = <ParamsOrSearch extends string | Record<string, string | undefined> = string>(): Readonly<[
    ParamsOrSearch
] extends [string] ? Params<ParamsOrSearch> : Partial<ParamsOrSearch>> => {
    const [paramsObj, setParamsObj] = React.useState<Record<string, any>>({})
    const location = useLocation()
    React.useEffect(() => {
        setParamsObj(parseParams(location.search))
    },[location.search])
    return paramsObj as any
}

export default useParseParams
