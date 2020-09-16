import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { WordsCarousel } from '../components/WordsCarousel'
import { useStore } from '../store/main'
import { SuggestedWords } from './SuggestedWords'

export const Learning = () => {
  const { userState } = useStore()
  const history = useHistory()

  return (
    <>
      <div className="flex h-16 items-center justify-between w-11/12 mx-auto">
        <div className="flex">
          <button className="btn bg-transparent w-8 h-8 rounded-full mr-2" onClick={() => history.goBack()}>
            <i className={'fas fa-angle-left text-gray-800'}></i>
          </button>
          <h1 className="text-xl font-bold text-gray-800 uppercase">Learning Path</h1>  
        </div>

        <div className="flex items-center">
          <span className="text-gray-800 text-lg uppercase">{userState.words.length}</span>
          <button className="btn bg-green-700 text-base w-8 h-8 ml-1"> 
            <i className="fas fa-bookmark"></i>
          </button> 
        </div> 
      </div>
      <hr className="w-11/12 h-px mx-auto rounded-lg bg-gray-500"/>
      <div className="w-11/12 mx-auto flex justify-center mt-4">
        <Link to={`/exercizes/${userState.words[0]?.word}`}>
          <div className="w-32 h-32 -mr-4 rounded-full shadow-2xl border border-dotted border-gray-300 bg-teal-600 flex items-center justify-center text-xl text-gray-300">
            Guess <br /> Words
          </div>
        </Link>

        <Link to={`/exercizes/${userState.words[0]?.word}`}>
          <div className="w-32 h-32 -mr-4 rounded-full shadow-2xl border border-dotted border-gray-300 bg-teal-600 flex items-center justify-center text-xl text-gray-300">
            Match <br /> Synonyms
          </div>
        </Link>
      </div>
      <div className="w-11/12 mx-auto flex justify-center -mt-4">
        <Link to={`/exercizes/${userState.words[0]?.word}`} className="z-10">
          <div className="w-32 h-32 -mr-4 rounded-full shadow-2xl border border-dotted border-gray-300 bg-teal-600 flex items-center justify-center text-xl text-gray-300">
            Guess <br /> Words
          </div>
        </Link>

        <Link to={`/exercizes/${userState.words[0]?.word}`} className="z-0">
          <div className="w-32 h-32 -mr-4 rounded-full shadow-2xl border z-0 border-dotted border-gray-300 bg-teal-600 flex items-center justify-center text-xl text-gray-300">
            Match <br /> Synonyms
          </div>
        </Link>
      </div>


      <WordsCarousel />

      <div className="flex items-center justify-between w-11/12 mx-auto mt-2">
        <span className="font-normal text-gray-800">Words in dictionary:</span>
        <div className="flex items-center">
          <span className="text-gray-800 text-lg uppercase">{userState.words.length}</span>
          <button className="btn bg-green-700 text-base w-8 h-8 ml-1"> 
            <i className="fas fa-bookmark"></i>
          </button> 
        </div> 
      </div>
    </>
  )
}
