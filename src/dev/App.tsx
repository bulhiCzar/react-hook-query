import { useQuery } from '../useQuery'
import React from 'react'

export const App = () => {
  const [value, setValue] = useQuery({ name: 'value' })
  const [, setValueDeb] = useQuery({ name: 'value', isDebounce: true, isJSON: false, defaultValue: 4, replace: false })

  const handlerIncrement = () => {
    setValue(Number(value) + 1)
  }

  const handlerDecrement = () => {
    setValue(Number(value) - 1)
  }

  const handlerReset = () => {
    setValueDeb(0)
  }

  return (
    <div>
      value: {value}
      <div onClick={handlerIncrement}>
        +1
      </div>
      <div onClick={handlerDecrement}>
        -1
      </div>
      <div onClick={handlerReset}>
        0
      </div>
    </div>
  )
}
