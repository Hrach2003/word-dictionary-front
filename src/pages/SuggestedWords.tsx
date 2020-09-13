import React, { useMemo, useState, useEffect } from 'react'
import { useSpeech } from '../hooks/useSpeech'
import { useHistory } from 'react-router-dom'
import { useStore } from '../store/main'
import { useAddWord } from '../hooks/useAddWord'
import { getWordSynonyms } from '../hooks/useGetWord'
import { IWord } from '../store/types'

export const SuggestedWords = () => {
  const history = useHistory()
  const { addWord, condition } = useAddWord()
  const { userState, appState, getWords } = useStore()

  const [idx, setIdx] = useState(0)
  const word = useMemo(() => {
    return appState.words[idx]?.word
  }, [appState.words, idx])

  const [synonyms, setSynonyms] = useState<IWord[]>([])
  useEffect(() => {
    setSynonyms([])
    getWordSynonyms(word).then((words) => setSynonyms(words as IWord[]))
  }, [word])

  useEffect(() => {
    (async () => {
      if(!word) {
        await getWords()
      } else {
        
      }  
    })()
  }, [getWords, word])
  const read = useSpeech(word)
  return (
    <div className="" >
      <div className="flex h-16 items-center justify-between w-11/12 mx-auto">
        <div className="flex">
          <button className="btn bg-transparent w-8 h-8 rounded-full mr-2" onClick={() => history.goBack()}>
            <i className={'fas fa-angle-left text-gray-800'}></i>
          </button>
          <h1 className="text-xl font-bold text-gray-800 uppercase">Suggested Words</h1>  
        </div>

        <div className="flex items-center">
          <span className="text-gray-800 text-lg uppercase">{userState.words.length}</span>
          <button className="btn bg-green-700 text-base w-8 h-8 ml-1"> 
            <i className="fas fa-bookmark"></i>
          </button> 
        </div> 
      </div>
      <hr className="w-11/12 h-px mx-auto rounded-lg bg-gray-500"/>


      <div className=" relative w-11/12 mx-auto rounded-md shadow-md mt-5 bg-gray-100">
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

        <div className="mt-4 w-11/12 mx-auto">
        <h3 className="font-semibold text-gray-800 text-lg inline">Related words to {' '}
          {word 
            ? <div className="bg-gray-500 rounded text-gray-200 px-2 py-1 my-3">#{word}</div>
            : <div className="bg-gray-500 rounded animate-pulse text-gray-200 h-8 w-full my-3"></div>
          }   
        </h3> 
        <div className="flex flex-wrap justify-center">
          {synonyms?.length 
            ? synonyms.map(({ word, _id }) => {
              return <div key={_id} className="rounded-full truncate mx-1 mt-1 px-2 py-1 text-lg font-semibold text-gray-800 bg-gray-400 transition duration-150 hover:bg-gray-200 hover:border-gray-800 border border-dashed"> 
                <span>#{word}</span>
              </div>
            })
            : <span className="flex h-5 w-5 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-5 w-5 bg-teal-600"></span>
              </span>
          }
        </div>
      </div>
    </div>
  )
}
