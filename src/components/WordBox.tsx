import React, { useMemo } from 'react'
import { useStore } from '../store/main'
import { IWord } from '../store/types'
import { useSpeech } from '../hooks/useSpeech'
import { useHistory } from 'react-router-dom'
import { useAddWord } from '../hooks/useAddWord'

interface IWordBox {
  word: IWord
}

export const WordBox: React.FC<IWordBox> = ({ word }) => {
  const { deletePost, userState } = useStore()
  const { condition, addWord } = useAddWord()
  const history = useHistory()
  const read = useSpeech(word.word)
  const includes = useMemo(() => {
    return userState.words.some(({_id}) => _id === word._id )
  }, [userState.words, word._id])

  return (
    <div className="w-1/2 px-1 mb-2">
      <div onClick={() => history.push(`/word/${word.word}`)} className="rounded-md flex flex-col bg-gradient-to-t from-green-200 via-gray-200 to-gray-100 h-20 shadow-sm relative z-10 group">
        <span onClick={read} className="bg-gray-700 cursor-pointer text-white rounded-full w-6 h-6 absolute top-0 right-0 m-1 flex items-center justify-center opacity-100 md:opacity-50 group-hover:opacity-100">
          <i className="fas fa-volume-up text-xs"></i>  
        </span>
        <div className="flex-grow">
          <h1 className="text-lg font-semibold text-gray-800 mt-5">{word.word}</h1>
        </div>
        <div className="flex justify-end mb-1">
          <button className="btn bg-green-700 text-xs px-2 py-1 mr-1" onClick={() => addWord(word.word)} > 
            {condition.loading && <i className="animate-spin fas fa-circle-notch"></i>}
            {!includes && !condition.loading && !condition.finished && <i className="fas fa-plus-circle"></i>}
            {includes && !condition.loading && <i className="fas fa-bookmark"></i>}
          </button>  
          <button className="btn btn-red text-xs px-2 py-1 mr-1" onClick={() => deletePost(word._id)} > 
            <i className="fas fa-trash-alt"></i>
          </button>
        </div>
      </div>
    </div>
  )
}
