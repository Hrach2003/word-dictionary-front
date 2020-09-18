import React, { useMemo } from 'react'
import { useStore } from '../store/main'
import { IWord } from '../store/types'
import { useSpeech } from '../hooks/useSpeech'
import { Link } from 'react-router-dom'
import { useAddWord } from '../hooks/useAddWord'

interface IWordBox {
  word: IWord
}

export const WordBox: React.FC<IWordBox> = ({ word }) => {
  const { deletePost, userState } = useStore()
  const { condition, addWord } = useAddWord()
  const read = useSpeech(word.word)
  const includes = useMemo(() => {
    return userState.words.some(({_id}) => _id === word._id )
  }, [userState.words, word._id])

  return (
    <div className="w-1/2 px-1 mb-2">
      <Link to={`/word/${word.word}`} className="rounded-md flex flex-col bg-gradient-to-t from-green-200 via-gray-200 to-gray-100 shadow-sm p-1">
        <div className="flex justify-end items-center">
          <span onClick={(e) => {
            e.stopPropagation()
            read()
          }} className="bg-gray-700 cursor-pointer text-white rounded-full mt-1 mr-1 w-6 h-6 flex items-center justify-center">
            <i className="fas fa-volume-up text-xs"></i>  
          </span>
        </div>
        <div className="flex-grow m-1">
          <h1 className="text-lg font-semibold text-gray-800 leading-1">{word.word}</h1>
        </div>
        <div className="flex justify-end mb-1">
          <button className="btn bg-green-700 text-xs px-2 py-1 mr-1" onClick={(e) => {
            e.stopPropagation()
            addWord(word.word)
          }} > 
            {condition.loading && <i className="animate-spin fas fa-circle-notch"></i>}
            {!includes && !condition.loading && !condition.finished && <i className="fas fa-plus-circle"></i>}
            {includes && !condition.loading && <i className="fas fa-bookmark"></i>}
          </button>  
          <button className="btn btn-red text-xs px-2 py-1 mr-1" onClick={(e) => {
            e.stopPropagation()
            deletePost(word._id)} 
          }> 
            <i className="fas fa-trash-alt"></i>
          </button>
        </div>
      </Link>
    </div>
  )
}
