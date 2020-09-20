import React, { HTMLAttributes, useEffect, useMemo, useReducer, useRef, useState } from 'react'
import classnames from 'classnames'
import { useHistory } from 'react-router-dom'
import APIService from '../services/ApiService'
import { useAppNampespace, useUserNampespace } from '../store/main'
import { IWord } from '../store/types'
import { PointerLoading } from '../components/PointerLoading'

interface IBox extends HTMLAttributes<HTMLElement> { 
  type: 'synonym' | 'word', 
  error?: boolean,
  active: boolean
}
const Box: React.FC<IBox> = React.memo(({ children, type, error = false, active, ...props }) => {
  const isWord = type === 'word'
  return <div {...props} className={classnames('py-3 relative transform duration-150 text-gray-300 shadow-md mt-2 rounded-lg', {
    'z-10 scale-110 shadow-2xl': active,
    'scale-100': !active,
    'bg-indigo-700': isWord && !error,
    'bg-teal-600': !isWord && !error,
    'bg-red-700': error && active
  })}>{children}</div>
})
  


type _ = 'LOCAL/ADD_SYNONYMS' | 'LOCAL/SET_ACTIVE_SYNONYM' | 'LOCAL/SET_ACTIVE_WORD' | 'LOCAL/SET_LOADING'
type LocalState = {
  wordWithSynonyms: { [key: string]: IWord },
  error: string[],
  active_word: string,
  active_synonym: string,
  loading: boolean
}

const localState: LocalState = {
  wordWithSynonyms: {},
  error: [],
  active_synonym: '',
  active_word: '',
  loading: false 
}

const reducer = (state: LocalState, action: { type: _, payload?: any }): typeof localState => {
  switch (action.type) {
    case 'LOCAL/ADD_SYNONYMS': 
      return {
        ...state,
        wordWithSynonyms: { 
          ...state.wordWithSynonyms, 
          [action.payload.word] : action.payload.synonyms[Math.floor(action.payload.synonyms.length * Math.random())] 
        }
      }
    case 'LOCAL/SET_ACTIVE_SYNONYM': 
      return {
        ...state, active_synonym: action.payload
      }
    case 'LOCAL/SET_ACTIVE_WORD': 
      return {
        ...state, active_word: action.payload
      }  
    case 'LOCAL/SET_LOADING':
      return {
        ...state, loading: action.payload
      }      
    default:
      return state;
  }
}

async function* getWordsSynonyms(words: IWord[]) {
  for (let i = 0; i < (words.length > 5 ? 5 : words.length); i++) {
    const wordInfo = words[i];
    const { data }: { data: { synonyms: IWord[] } } = await APIService.get(`/words/${wordInfo.word}/synonyms`)
    yield { synonyms: data.synonyms, word: wordInfo }
  }
}

export const MatchSynonyms = () => {
  const history = useHistory()
  const { appState } = useAppNampespace()!
  const { userState } = useUserNampespace()!
  const words = useMemo(() => {
    return userState.authorized ? userState.words : appState.words
  }, [appState.words, userState.authorized, userState.words])

  const [{
    wordWithSynonyms,
    active_synonym,
    active_word,
    loading
  }, dispatch] = useReducer(reducer, localState)

  const synonyms = useMemo(() => {
    return Object.values(wordWithSynonyms)
        .sort(() => Math.random() > 0.6 ? 1 : -1)
        .map(s => s.word) 
  }, [wordWithSynonyms])

  const wordsToMatch = useMemo(() => {
    return Object.keys(wordWithSynonyms)
  }, [wordWithSynonyms])

  useEffect(() => {
    (() => {
      if(loading) return;
      if(wordWithSynonyms[active_word]?.word === active_synonym) {
        alert(true)
      } else {
        console.log('not equal')
      }
    })()
  }, [active_synonym, active_word, loading, wordWithSynonyms])

  useEffect(() => {
    (async () => {
      const synonymGen = getWordsSynonyms(words)
      dispatch({ type: 'LOCAL/SET_LOADING', payload: true })
      for await (const { word, synonyms } of synonymGen) {
        dispatch({
          type: 'LOCAL/ADD_SYNONYMS',
          payload: { word: word.word, synonyms }
        })
      }
      dispatch({ type: 'LOCAL/SET_LOADING', payload: false })
    })() 
  }, [words])
   
 
  return (
    <>
      <div className="flex h-16 items-center justify-between w-11/12 mx-auto">
        <button className="btn bg-transparent w-8 h-8 rounded-full mr-2" onClick={() => history.goBack()}>
          <i className={'fas fa-angle-left text-gray-800'}></i>
        </button>
        <h1 className="text-lg font-bold text-gray-800 uppercase mx-auto">Match Words with Synonyms</h1>  
      </div>
      <hr className="w-11/12 h-px mx-auto rounded-lg bg-gray-500"/>
      <div className="w-11/12 mx-auto mt-4">
        <div className=" grid grid-cols-2 gap-x-1">
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Words</h3>
            {wordsToMatch
              .map((word) => {
                return <Box key={word} type="word" active={active_word === word} onClick={() => {
                  dispatch({ 
                    type: 'LOCAL/SET_ACTIVE_WORD', 
                    payload: word 
                  }) 
                }}>
                  {word}
                </Box> 
              })
            }

            {loading && <div className="flex items-center justify-center h-10">
              <PointerLoading />
            </div>}
          </div>
          <div>  
            <h3 className="text-lg font-semibold text-gray-800">Synonyms</h3>
            {synonyms
              // .sort(() => Math.random() > 0.6 ? 1 : -1)
              .map((synonym, idx) => {
                return <Box key={idx} type="synonym" active={active_synonym === synonym} onClick={() => {
                  dispatch({ 
                    type: 'LOCAL/SET_ACTIVE_SYNONYM', 
                    payload: synonym
                  }) 
                }}>{synonym}</Box>
              })
            }
            {loading && <div className="flex items-center justify-center h-10">
              <PointerLoading />
            </div>}
          </div>
        </div>
      </div>                
    </>
  )
}
