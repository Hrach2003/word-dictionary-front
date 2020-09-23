import React, { useEffect } from 'react'
import { useAppNampespace } from '../store/main'
import { useInputBind } from '../hooks/useInputBind'
import { WordBox } from '../components/WordBox'
import { useWordSearch } from '../hooks/useSearchWord'
import { PointerLoading } from '../components/PointerLoading'
import { Link } from 'react-router-dom'


export const Index = () => {
  const postInput = useInputBind()
  const { appState, getAppWords } = useAppNampespace()!

  const { searchResults, loading } = useWordSearch(postInput.value)

  useEffect(() => {
    (async () => {
      if(!appState.words.length) {
        await getAppWords()
      }
    })()
  }, [appState.words.length, getAppWords])
  return (
    <div className="w-11/12 mx-auto pt-2">
      <div className="relative z-0">
        <input className='input rounded-md w-10/12 mx-auto' {...postInput.bind} />
        {loading && <div className="absolute flex items-center justify-center h-20 mt-1 z-0 shadow-lg rounded-lg bg-white w-full">
          <PointerLoading />
        </div>}
        {!loading && searchResults.length === 0 && postInput.value && <div className="absolute flex items-center justify-center h-20 mt-1 z-0 shadow-lg rounded-lg bg-white w-full">
          <p>Sorry, we could not find anything</p>
        </div>}
        {searchResults.length > 0 && !loading && <div className="absolute overflow-hidden mt-1 z-0 shadow-lg rounded-lg bg-white w-full">
          {searchResults.map(({ word, _id, definitions, synonyms }) => {
            return <Link to={`/word/${word}`} className="flex justify-between hover:bg-teal-700 text-gray-800 hover:text-gray-300 leading-5 font-medium text-base px-4 py-3" key={_id}>
              <p>{word}</p><span>{definitions.length} | {synonyms.length}</span>
            </Link>
          })} 
        </div>}
      </div>
      <div className="w-full flex flex-wrap mt-4 z-0">
        {appState.words.map(word => {
          return <WordBox word={word} key={word._id} />
        })}
      </div>
    </div>
  )
}
