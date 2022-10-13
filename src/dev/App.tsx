import { useQuery } from '../useQuery'
import React from 'react'

type BtnProps = React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
& { text: string }

const Btn: React.FC<BtnProps> = ({ text, ...props }) => {
  return (
    <button {...props} type="button">
      {text}
    </button>
  )
}

export const App = () => {
  const [value, setValue] = useQuery({ name: 'value' })
  const [, setValueDeb] = useQuery({
    name: 'value',
    isDebounce: true,
    isJSON: false,
    defaultValue: 4,
    replace: false,
  })

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
      <span>
        value: {value}
      </span>
      <div>
        <Btn onClick={handlerIncrement} text="+1" />
        <Btn onClick={handlerDecrement} text="-1" />
        <Btn onClick={handlerReset} text="0" />
      </div>
    </div>
  )
}
