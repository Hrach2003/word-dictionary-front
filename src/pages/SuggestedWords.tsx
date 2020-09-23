import React, { useState, useCallback } from 'react'
import { useHistory } from 'react-router-dom'
import { useUserNampespace } from '../store/main'
import { getWordSynonyms } from '../hooks/useGetWord'
import { IWord } from '../store/types'
import { WordsCarousel } from '../components/WordsCarousel'
import { PointerLoading } from '../components/PointerLoading'

export const SuggestedWords = () => {
  const history = useHistory()
  const { userState } = useUserNampespace()!

  const [word, setWord] = useState('')
  const [synonyms, setSynonyms] = useState<IWord[]>([])

  const handleWordChange = useCallback((word: string) => {
    if(word) {
      setWord(word)
      setSynonyms([])
      getWordSynonyms(word).then((words) => setSynonyms(words as IWord[]))
    }
  }, [])

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
      <div className="h-40 bg-contain bg-no-repeat mt-1 bg-center" style={{ backgroundImage: `url(${require('./../assets/messaging.png')})` }}>
      </div>

      <WordsCarousel onChange={handleWordChange} />
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
            : <PointerLoading />
          }
        </div>
      </div>
    </div>
  )
}
