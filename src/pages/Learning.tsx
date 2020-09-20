import React, { useMemo } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { WordsCarousel } from '../components/WordsCarousel'
import { useAppNampespace, useUserNampespace } from '../store/main'

export const Learning = () => {
  const { appState } = useAppNampespace()!
  const { userState } = useUserNampespace()!
  const history = useHistory()

  const words = useMemo(() => {
    return userState.authorized ? userState.words :  appState.words
  }, [appState.words, userState.authorized, userState.words])

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
          <span className="text-gray-800 text-lg uppercase">{words.length}</span>
          <button className="btn bg-green-700 text-base w-8 h-8 ml-1"> 
            <i className="fas fa-bookmark"></i>
          </button> 
        </div> 
      </div>
      <hr className="w-11/12 h-px mx-auto rounded-lg bg-gray-500"/>
      <div className="w-11/12 mx-auto flex justify-center mt-4">
        <Link to={`/exercises/guesswords/${words[words.length - 1]?.word}`}>
          <div className="w-32 h-32 -mr-4 rounded-full shadow-2xl border border-dotted border-gray-300 bg-green-600 flex items-center justify-center text-xl text-gray-300">
            Guess <br /> Words
          </div>
        </Link>

        <Link to={`/exercises/matchsynonyms`}>
          <div className="w-32 h-32 -mr-4 rounded-full shadow-2xl border border-dotted border-gray-300 bg-teal-600 flex items-center justify-center text-xl text-gray-300">
            Match <br /> Synonyms
          </div>
        </Link>
      </div>
      <div className="w-11/12 mx-auto flex justify-center -mt-4">
        <Link to="/suggested" className="z-10">
          <div className="w-32 h-32 -mr-4 rounded-full shadow-2xl border border-dotted border-gray-300 bg-teal-600 flex items-center justify-center text-xl text-gray-300">
            Suggested <br /> Words
          </div>
        </Link>

        <Link to={`/exercises/${words[0]?.word}`} className="z-0">
          <div className="w-32 h-32 -mr-4 rounded-full shadow-2xl border z-0 border-dotted border-gray-300 bg-green-600 flex items-center justify-center text-xl text-gray-300">
            Audio <br /> Books
          </div>
        </Link>
      </div>


      <WordsCarousel />

      <div className="flex items-center justify-between w-11/12 mx-auto mt-2">
        <span className="font-normal text-gray-800">Words in dictionary:</span>
        <div className="flex items-center">
          <span className="text-gray-800 text-lg uppercase">{words.length}</span>
          <button className="btn bg-green-700 text-base w-8 h-8 ml-1"> 
            <i className="fas fa-bookmark"></i>
          </button> 
        </div> 
      </div>


      {/* <div className={classnames('fixed transition-height duration-500 ease-out inset-x-0 bottom-0 z-50  bg-teal-900', {
        ' h-48': alert,
        ' h-12': !alert
      })}>
        <button className="btn px-2 py-1" onClick={() => setAlert(false)}>Sign in</button>
      </div> */}
    </>
  )
}
