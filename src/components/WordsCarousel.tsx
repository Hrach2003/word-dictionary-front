import React, { useEffect, useMemo, useState } from 'react'
import { useUserAddWord } from '../hooks/useUserAddWord'
import { useSpeech } from '../hooks/useSpeech'
import { useAppNampespace } from '../store/main'

interface IWordCarouse {
  onChange?: (word: string) => void
}

export const WordsCarousel: React.FC<IWordCarouse> = ({ onChange = () => {} }) => {
  const { appState, getAppWords } = useAppNampespace()!
  const { addWord, condition } = useUserAddWord()

  const [idx, setIdx] = useState(0)
  const word = useMemo(() => {
    let word = appState.words[idx]?.word
    return word
  }, [appState.words, idx])

  useEffect(() => {
    (async () => {
      if(!word) {
        await getAppWords()
      }
    })()
  }, [getAppWords, word])

  useEffect(() => {
    onChange(word)
  }, [onChange, word])

  const read = useSpeech(word)
  return (
    <div className="relative w-11/12 mx-auto rounded-md shadow-md mt-5 bg-gray-100 z-0">
        <h3 className="text-center text-xl font-semibold py-3">
          {word ? word : <div className="animate-pulse h-8 w-32 mx-auto rounded bg-gray-500"></div>}
        </h3> 
        <button onClick={read} className="btn mx-auto z-50 bg-gray-700 w-8 h-8 cursor-pointer flex items-center justify-center text-white rounded-full">
          <i className="fas fa-volume-up text-xs"></i>  
        </button>
        <div className="flex w-1/2 mx-auto justify-between py-2">
          <button onClick={read} className="btn px-2 py-1 bg-green-700 cursor-pointer flex items-center justify-center text-white">
            Know  
          </button>
          <button onClick={async () => await addWord(word)} className="btn px-3 py-2 bg-teal-700 cursor-pointer flex items-center justify-center text-white">
            <span>Learn</span> {condition.loading && <i className="ml-1 animate-spin fas fa-circle-notch"></i>}
          </button>
        </div>

        <div className="absolute top-0 left-0 mt-10 h-8 -mx-2">
          <button className="btn rounded-full h-8 w-8 bg-teal-700" onClick={() => setIdx(i => i - 1)}>
            <i className="fas fa-angle-left" ></i> 
          </button>
        </div>
        <div className="absolute top-0 right-0 mt-10 h-8 -mx-2" onClick={() => setIdx(i => i + 1)}>
          <button className="btn rounded-full h-8 w-8 bg-teal-700">
            <i className="fas fa-angle-right"></i> 
          </button>
        </div>
      </div>
  )
}
