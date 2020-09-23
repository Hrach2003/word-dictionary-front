import { useState, ChangeEvent } from "react"

export const useInputBind = (defaultValue?: any) => {
  const [value, setValue] = useState(defaultValue)
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }
  const clear = () => setValue('')
  return {
    bind: { value, onChange },
    clear,
    value
  }
}
