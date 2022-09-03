Storing the state in the url query parameters
---
Package size:  1.5 kB
---

<p align="center">
  <a href="https://www.npmjs.com/package/react-hook-query">
    <img src="https://img.shields.io/npm/dm/react-hook-query.svg?style=flat-square">
  </a>
</p>

## Installation

```
yarn add react-hook-query
or
npm i react-hook-query
```

### Simple 
```
import { useQuery } from 'react-hook-query'

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
      <button onClick={handlerIncrement}>
        +1
      </button>
      <button onClick={handlerDecrement}>
        -1
      </button>
      <button onClick={handlerReset}>
        0
      </button>
    </div>
  )
}
```