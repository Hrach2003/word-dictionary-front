import { useEffect, useRef, useState } from "react"
import APIService from "../services/ApiService"
import { IWord } from "../store/types"

export const useWordSearch = (value: string) => {
  const interval = useRef<NodeJS.Timeout>()
  const [searchResults, setSearchResults] = useState<IWord[]>([])
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    if(!value) return setSearchResults([]);
    if(interval.current) clearTimeout(interval.current)  
    interval.current = setTimeout(async () => {
      setLoading(true)
      let { data }: { data: { words: IWord[] } } = await APIService(`/words/search/${value.trim()}`)
      setSearchResults(data.words)
      setLoading(false)
    }, 500)

    return () => interval.current && clearTimeout(interval.current)
  }, [value])

  return { searchResults, loading }
}