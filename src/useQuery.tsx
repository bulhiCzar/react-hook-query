import { useCallback, useEffect, useState } from 'react'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { useDebounce } from './hook/useDebounce'

export type Query = string | number | undefined | null

export interface UseQuery {
  name?: string
  replace?: boolean
  isDebounce?: boolean
  isJSON?: boolean
  defaultValue?: Query
}

interface HandlerNavigateProps {
  replace?: boolean
  name: string
  value: Query
}

export type SetQuery = (value: Query, params?: Omit<UseQuery, 'isDebounce'>) => void

export const useQuery = <T extends Query>({
  name,
  replace = true,
  isDebounce = false,
  isJSON = false,
  defaultValue,
}: UseQuery): [T, SetQuery] => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const location = useLocation()

  const [query, _setQuery] = useState<T>(() => {
    if (name) {
      return searchParams.get(name) as T
    }
    return defaultValue as T
  })

  const [action, setAction] = useState<HandlerNavigateProps>({} as HandlerNavigateProps)

  const actionDebounce = useDebounce(action)

  useEffect(() => {
    if (name) {
      const currentQuery = searchParams.get(name)
      if (String(currentQuery) !== String(query)) {
        _setQuery(currentQuery as T)
      }
    }
  }, [searchParams.get(name || '')])

  const handlerNavigate = useCallback(({
    replace,
    name,
    value,
  }: HandlerNavigateProps) => {
    const { search, pathname } = location

    const searchParams = new URLSearchParams(search)
    if (value) {
      searchParams.set(name, String(value))
    } else {
      searchParams.delete(name)
    }

    navigate({
      pathname,
      search: searchParams.toString(),
    },
    {
      state: location.state,
      replace,
    })
  }, [location])

  const setQuery: SetQuery = useCallback((value, params) => {
    value = isJSON || params?.isJSON
      ? JSON.stringify(value)
      : typeof value === 'string' || typeof value === 'number'
        ? String(value)
        : value

    const {
      name: nameParams,
      replace: replaceParams,
    } = params || {}
    const $name = nameParams || name
    const $isDebounce = isDebounce
    if (!$name) {
      return
    }
    const { search } = location

    const searchParams = new URLSearchParams(search)

    if (value) {
      searchParams.set($name, String(value))
    } else {
      searchParams.delete($name)
    }

    _setQuery(value as T)

    if ($isDebounce) {
      setAction({
        replace: replaceParams ?? replace,
        name: $name,
        value,
      })
    } else {
      handlerNavigate({
        replace: replaceParams ?? replace,
        name: $name,
        value,
      })
    }
  }, [location.state])

  useEffect(() => {
    if (actionDebounce) {
      handlerNavigate(actionDebounce)
    }
  }, [actionDebounce])

  return [isJSON ? JSON.parse(query as string) : query, setQuery]
}
