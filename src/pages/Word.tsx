import React, { useState, useMemo, useCallback, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { useStore } from '../store/main'
import { IWord } from '../store/types'
import { useSpeech } from '../hooks/useSpeech'
import { useAddWord } from '../hooks/useAddWord'
import APIService from '../services/ApiService'

export const Word = () => {
  const history = useHistory()
  const { userState } = useStore()
  const { condition, addWord } = useAddWord()
  const { word } = useParams()
  const read = useSpeech(word as string)

  const includes = useMemo(() => {
    return userState.words.some((it) => it.word === word )
  }, [userState.words, word])

  const [wordFullInfo, setWordFullInfo] = useState<IWord>()

  const getWord = useCallback(async () => {
    try {
      const { data }: { data: {word: IWord} } = await APIService(`/words/${word}`)
      setWordFullInfo(data.word)
    } catch (err) {

    }
  }, [word])
  useEffect(() => {
    (async () => await getWord())()
  }, [getWord])



  return (
    <div>
      <div className="mx-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex">
            <button className="btn bg-transparent w-8 h-8 rounded-full mr-2" onClick={() => history.goBack()}>
              <i className={'fas fa-angle-left text-gray-800'}></i>
            </button>
            <h1 className="text-xl font-bold text-gray-800 uppercase">{word}</h1>  
          </div>

          <div className="flex">
            <button onClick={read} className="btn bg-gray-700 w-8 h-8  cursor-pointer flex items-center justify-center text-white rounded-full">
              <i className="fas fa-volume-up text-xs"></i>  
            </button>
            <button className="btn bg-green-700 text-base w-8 h-8 ml-1" onClick={() => addWord(word as string)}> 
              {condition.loading && <i className="animate-spin fas fa-circle-notch"></i>}
              {!includes && !condition.loading && !condition.finished && <i className="fas fa-plus-circle"></i>}
              {includes && !condition.loading && <i className="fas fa-bookmark"></i>}
            </button> 
          </div> 
        </div>
        <hr className="bg-gray-900" />
      </div>

      <div className="mx-4">
        <h1 className="text-lg font-semibold">Synonyms</h1>
        <div className="flex flex-wrap justify-center">
          {wordFullInfo && wordFullInfo.synonyms.map(({ word, _id }) => {
            return <div onClick={() => {
              setWordFullInfo(undefined)
              history.push(`/word/${word}`)
            }} key={`${_id}-${word}`} className="rounded-full mx-1 mt-1  bg-gradient-to-t from-green-200 via-gray-200 to-gray-100 shadow px-3 py-1">
              <span className="capitalize text-sm text-gray-700">{word}</span>  
            </div>
          })}
          {!wordFullInfo && new Array(10).fill(' ').map((_, idx) => {
            return <div key={idx} className={`rounded-full mx-1 mt-1 ${Math.random() < 0.5 ? 'w-20' : 'w-32'} h-8 animate-pulse  bg-gradient-to-t from-green-200 via-gray-200 to-gray-100 shadow px-3 py-1`}>
              <span className="capitalize text-sm text-gray-700"></span>  
            </div>
          })}
        </div> 
      </div>

      <div className="mx-4 overflow-hidden">
        <h1 className="text-lg font-semibold text-center">Definitions</h1> 
        <div className="flex flex-wrap transition-height duration-1000 ease-in justify-center">
          {wordFullInfo?.definitions && wordFullInfo.definitions.map(({definition}, idx) => {
            return <div key={idx} className="text-justify w-full  mx-1 mt-1 bg-gray-400 shadow px-3 py-1">
              {idx + 1}. <span className="capitalize text-sm text-gray-700" dangerouslySetInnerHTML={{ __html: definition }} />  
            </div>
          })}
          {!wordFullInfo &&  new Array(10).fill(' ').map((_, idx) => {
            return <div key={idx} className="animate-pulse text-justify w-full  mx-1 mt-1 bg-gray-400 shadow px-3 py-1">
              # <span className="capitalize text-sm bg-gray-100 h-4 w-full mx-3" />  
            </div>
          })}
        </div> 
      </div>    

      <div className="mx-4 overflow-hidden">
        <h1 className="text-lg font-semibold text-center">Examples</h1> 
        <div className="flex flex-wrap transition-height duration-1000 ease-in justify-center">
          {wordFullInfo?.examples && wordFullInfo.examples.map(({ text }, idx) => {
            return <div key={idx} className="text-justify w-full  mx-1 mt-1 bg-gray-400 shadow px-3 py-1">
              {idx + 1}. <span className="capitalize text-sm text-gray-700" dangerouslySetInnerHTML={{ __html: text }} />  
            </div>
          })}
          {!wordFullInfo &&  new Array(10).fill(' ').map((_, idx) => {
            return <div key={idx} className="animate-pulse text-justify w-full  mx-1 mt-1 bg-gray-400 shadow px-3 py-1">
              # <span className="capitalize text-sm bg-gray-100 h-4 w-full mx-3" />  
            </div>
          })}
        </div> 
      </div>    
    </div>
    
  )
}
