import React, { useEffect } from 'react'
import { useStore } from '../store/main'
import { useInputBind } from '../hooks/useInputBind'
// import { useHistory } from 'react-router-dom'
import { WordBox } from '../components/WordBox'


export const Index = () => {
  // const history = useHistory()
  const postInput = useInputBind()
  const { appState, getWords } = useStore()
  // const clickHandler = () => {
  //   if(postInput.value) {
  //     // createPost({ word: postInput.value, _id: Date.now().toString() })
  //     postInput.clear()
  //   }
  // }

  useEffect(() => {
    (async () => {
      if(!appState.words.length) {
        await getWords()
      }
    })()
  }, [appState.words.length, getWords])

  // if(appState.words.length) return <p>Loading ...</p>

  return (
    <div className="p-4">
      <input className="input" onCopy={(e) => console.log(e)} {...postInput.bind} />
      <div className="w-full flex flex-wrap mt-4 z-0">
        {appState.words.map(word => {
          return <WordBox word={word} key={word._id} />
        })}
      </div>
    </div>
  )
}
