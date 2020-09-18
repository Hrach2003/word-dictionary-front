import React, { HTMLAttributes, useEffect, useMemo, useReducer, useState } from 'react'
import classnames from 'classnames'
import { useHistory } from 'react-router-dom'
import APIService from '../services/ApiService'
import { useStore } from '../store/main'
import { IWord } from '../store/types'

interface IBox extends HTMLAttributes<HTMLElement> { 
  type: 'synonym' | 'word', 
  error?: boolean
}
const Box: React.FC<IBox> = React.memo(({ children, type, error = false, ...props }) => {
  const [active, setActive] = useState<boolean>()

  const isWord = type === 'word'
  return <div {...props} onClick={() => setActive(a => !a)} className={classnames('py-3 relative transform duration-150 text-gray-300 shadow-md mt-2 rounded-lg', {
    'z-10 scale-110 shadow-2xl': active,
    'scale-100': !active,
    'bg-indigo-700': isWord && !error,
    'bg-teal-600': !isWord && !error,
    'bg-red-700': error && active
  })}>{children}</div>
})
  


type _ = 'LOCAL/ADD_SYNONYMS'
type LocalState = {
  wordWithSynonyms: { [key: string]: IWord },
  error: string[],
}

const localState: LocalState = {
  wordWithSynonyms: {},
  error: []
}

const reducer = (state: LocalState, action: { type: _, payload?: any }): LocalState => {
  switch (action.type) {
    case 'LOCAL/ADD_SYNONYMS': 
      return {
        ...state,
        wordWithSynonyms: { 
          ...state.wordWithSynonyms, 
          [action.payload.word] : action.payload.synonyms[Math.floor(action.payload.synonyms.length * Math.random() / 2)] 
        }
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
  const { userState, appState } = useStore()
  const words = useMemo(() => {
    return userState.authorized ? userState.words : appState.words
  }, [appState.words, userState.authorized, userState.words])

  const [{
    wordWithSynonyms
  }, dispatch] = useReducer(reducer, localState)

  useEffect(() => {
    (async () => {
      const synonymGen = getWordsSynonyms(words)
      for await (const { word, synonyms } of synonymGen) {
        dispatch({
          type: 'LOCAL/ADD_SYNONYMS',
          payload: { word: word.word, synonyms }
        })
      }
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
            {Object.keys(wordWithSynonyms)
              .sort(() => Math.random() > 0.6 ? 1 : -1)
              .map((word) => {
                return <Box key={word} type="word">
                  {word}
                </Box> 
              })
            }
          </div>
          <div>  
            <h3 className="text-lg font-semibold text-gray-800">Synonyms</h3>
            {Object.values(wordWithSynonyms)
              .sort(() => Math.random() > 0.6 ? 1 : -1)
              .map((synonyms, idx) => {
                return <Box key={idx} type="synonym">
                  {synonyms.word}
                </Box>
              })
            }
          </div>
        </div>
      </div>                
    </>

  )
}
