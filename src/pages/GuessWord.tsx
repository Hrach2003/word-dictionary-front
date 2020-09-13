import React, { useMemo, useEffect, useState, useRef, useCallback, useReducer } from 'react'
import classnames from 'classnames'
import { useStore } from '../store/main'
import { getWord } from '../hooks/useGetWord'
import { IWord } from '../store/types'
import { useParams, Link, useHistory } from 'react-router-dom'
import { useSpeech } from '../hooks/useSpeech'


const GuessedAlert: React.FC<{ isGuessed: boolean, word: string }> = React.memo(({ isGuessed, word }) => {
  const history = useHistory()
  useEffect(() => {
    const handleEnter = (e: KeyboardEvent) => {
      if(e.keyCode === 13) history.push(`/exercizes/${word}`); // enter = 13
    }
    document.addEventListener('keydown', handleEnter )
    return () => document.removeEventListener('keydown', handleEnter)
  }, [history, word])

  return (
    <div className={classnames('transition transform ease-in duration-100 bg-gray-800 bg-opacity-75 fixed inset-0 pt-40', {
      'visible opacity-100': isGuessed,
      'invisible opacity-25': !isGuessed
    })}>
      <div className={classnames('w-40 h-40 shadow-md from-green-900 to-green-700 bg-gradient-to-t bg-green-600 rounded-full mx-auto transition transform delay-100 ease-in-out duration-300 flex items-center justify-center', {
        'visible scale-100 rotate-0': isGuessed,
        'invisible scale-0 rotate-90': !isGuessed
      })}>
        <i className="fas fa-clipboard-check text-7xl text-white"></i>  
      </div>
      <div className=" w-1/2 mx-auto flex justify-center mt-3">
        <Link className="btn px-3 text-lg  py-2 font-semibold from-green-900 to-green-700 bg-gradient-to-t bg-green-600" to={`/exercizes/${word}`}>Next</Link> 
      </div>
    </div> 
  )
})


type _ = 'LOCAL/SET_WORD' | 'LOCAL/NEXT_DEFINITION'
type LocalState = {
  wordInfo: IWord | undefined,
  error: string[],
  currentDefinitionIdx: number; 
}

const localState: LocalState = {
  wordInfo: undefined,
  currentDefinitionIdx: 1,
  error: []
}


const reducer = (state: LocalState, action: { type: _, payload?: any }): LocalState => {
  switch (action.type) {
    case 'LOCAL/SET_WORD': 
      return {
        ...state,
        wordInfo: action.payload
      }
    case 'LOCAL/NEXT_DEFINITION': 
      return {
        ...state,
        currentDefinitionIdx: (state.currentDefinitionIdx + 1) % (state.wordInfo?.definitions.length || 1)
      }  
    default:
      return state;
  }
}




export const GuessWord = () => {
  const { word: wordURL } = useParams() as { word: string }

  const history = useHistory()
  
  const { userState } = useStore()
  const nextWord = useMemo(() => {
    for (let i = 0; i < userState.words.length; i++) {
      const { word } = userState.words[i];
      if(word === wordURL) return userState.words[(i + 1) % userState.words.length]
    }
    return userState.words[userState.words.length - 1]
  }, [userState.words, wordURL])
  const [{
    wordInfo,
    currentDefinitionIdx
  }, dispatch] = useReducer(reducer, localState)

  const messedWord = useMemo(() => wordInfo?.word.split('').sort(() => Math.random() > 0.6 ? 1 : -1), [wordInfo])

  useEffect(() => {
    getWord(wordURL).then((word) => {
      dispatch({ 
        type: 'LOCAL/SET_WORD', 
        payload: word
      })  
    }).catch(err => console.log(err))
  }, [wordURL])

  const wordRef = useRef<HTMLSpanElement[]>([])
  const messedWordRef = useRef<HTMLDivElement[]>([])
  const [currentLetter, setCurrentLetter] = useState(0)

  useEffect(() => {
    for (let i = 0; i < wordRef.current.length; i++) {
      const word = wordRef.current[i]        
      const messedWord = messedWordRef.current[i]  
      messedWord?.classList.replace('bg-teal-600', 'bg-gray-300')
      messedWord?.classList.replace('text-gray-200', 'text-gray-800')  
      messedWord?.setAttribute('data-opened', 'false')  
      if(!word?.classList.contains('invisible')) word?.classList.add('invisible')     
    }

    wordRef.current = []
    messedWordRef.current = []
    dispatch({ type: "LOCAL/SET_WORD", payload: undefined })
    setCurrentLetter(0)
  }, [wordURL])

  const renders = useRef(0)
  console.log('rendered', renders.current++)


  const checkLetter = useCallback((letter: string, idx: number) => {
    if(wordInfo?.word[currentLetter] === letter) {
      wordRef.current[currentLetter]?.classList.remove("invisible")
      setCurrentLetter(c => c+=1)
      messedWordRef.current[idx]?.setAttribute('data-opened', 'true')
      
      messedWordRef.current[idx]?.classList.replace('bg-gray-300', 'bg-teal-600')
      messedWordRef.current[idx]?.classList.replace('text-gray-800', 'text-gray-200')
    } else if(
      messedWordRef.current[idx]?.getAttribute('data-opened') !== 'true'
    ) {
      messedWordRef.current[idx]?.classList.replace('bg-gray-300', 'bg-red-500')
      messedWordRef.current[idx]?.classList.replace('text-gray-800', 'text-gray-200')
      setTimeout(() => {
        messedWordRef.current[idx]?.classList.replace('bg-red-500', 'bg-gray-300')
        messedWordRef.current[idx]?.classList.replace('text-gray-200', 'text-gray-800')
      }, 1000)
    } 
  }, [currentLetter, wordInfo])

  const isGuessed = useMemo(() => {
    if(currentLetter === wordURL.length) {
      return true
    } else return false
  }, [currentLetter, wordURL.length])
  
  const read = useSpeech(wordURL)
  useEffect(() => {
    if(isGuessed) read();
  }, [isGuessed, read])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      e.preventDefault();
      for (let i = 0; i < messedWordRef.current.length; i++) {
        const el = messedWordRef.current[i]
        if(
          (el?.innerText === e.key || (e.keyCode === 32 && !el?.innerText))
          && messedWordRef.current[i]?.getAttribute('data-opened') !== 'true'
        ) return checkLetter(e.key, i) 
      }
    } 
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [checkLetter])


  const wordIdx = useMemo(() => {
    for (let i = 0; i < userState.words.length; i++) {
      const { word } = userState.words[i];
      if(word === wordURL) return i
    }
  }, [userState.words, wordURL])
  return (
    <>
      <div className="w-11/12 mx-auto py-1 h-8 flex">
        <button className="btn bg-transparent w-8 h-8 rounded-full mr-2" onClick={() => history.goBack()}>
          <i className={'fas fa-angle-left text-gray-800'}></i>
        </button>
        <h3 className="text-gray-700 text-lg uppercase text-center mx-auto">
          Guess Word with {" "}
          <span className="text-teal-700 text-xl font-bold">Definitions</span>
        </h3>
      </div>
      <>
        <div className="flex justify-end w-11/12 mx-auto">
          <button className="text-center text-xs border-b-2 border-dashed focus:outline-none  uppercase cursor-pointer text-teal-700 mx-3" 
            onClick={() => dispatch({ type: 'LOCAL/NEXT_DEFINITION' })}>try another definition</button>
        </div>
        <div className="bg-gray-200 h-full shadow-lg w-11/12 mx-auto py-2 px-1 rounded-md">
          <div className="text-gray-700 text-center text-lg tracking-wider">
            {wordInfo 
              ? <span dangerouslySetInnerHTML={{ __html: wordInfo.definitions[currentDefinitionIdx]?.definition }}></span>
              : <div className="h-8 w-full animate-pulse bg-gray-500 rounded"></div>
            }
          </div>
          <div className="flex flex-wrap justify-center items-center mt-4">
            {wordInfo 
              ? wordInfo.word.split('').map((l, idx) => {
                  return <div className="h-10 w-10 flex items-center mb-2 mx-1 justify-center text-gray-800 text-lg font-semibold shadow-md border-gray-400 border bg-gray-300 rounded" key={idx}>
                    <span ref={el => wordRef.current[idx] = el as HTMLSpanElement} className="invisible">{l}</span> 
                  </div>})
              : <span className="flex h-5 w-5 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-5 w-5 bg-teal-600"></span>
                </span>              
            }
          </div>
          <div className="flex flex-wrap justify-center items-center mt-10">
            {messedWord 
              ? messedWord?.map((l, idx) => {
                return <div ref={el => messedWordRef.current[idx] = el as HTMLDivElement} onClick={() => checkLetter(l, idx)} className="h-10 w-10 flex items-center justify-center mb-2 transition-colors ease-out duration-150 text-gray-800 text-lg font-semibold border-b-2 mx-1 border-orange-500 shadow-md bg-gray-300 rounded" key={idx}>
                  {l} 
                </div>
              })
              : new Array(5).fill('').map((_, idx) => {
                return <div key={idx} className="h-10 w-10 mb-2 border-b-2 mx-1 border-orange-500 shadow-md bg-gray-500 animate-pulse rounded"></div>
              })
            }
          </div>
        </div>
      </> 
      
      <div className="absolute  mb-16 inset-x-0 bottom-0">
        <div className="h-1 w-11/12 mx-auto relative bg-gray-500 overflow-hidden rounded-full">
          {wordIdx && <span style={{ width: `${wordIdx * 100 / userState.words.length}%` }} className="h-1 rounded-full absolute transition-width duration-150 ease-out inset-y-0 left-0 bg-teal-700 w-full"/>}
        </div>     
      </div>            
      {/* alert  */}
      <GuessedAlert isGuessed={isGuessed} word={nextWord.word} />   
    </>
  )
}