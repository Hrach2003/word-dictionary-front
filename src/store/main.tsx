import React, { createContext, useContext } from 'react'
import useUserReducer from './reducers/user.reduser'
import useAppReducer from './reducers/app.reducer'
import { IStore } from './types'

const GlobalContext = createContext<Partial<IStore>>({})

export const useStore = () => useContext(GlobalContext) as IStore

export const StoreProvider: React.FC = ({ children }) => {
  const { appState, appDispatch, createPost, deletePost, getWords, setWords } = useAppReducer()
  const { userState, userDispatch, signInUser, signOutUser, getUser, setWords: setUserWords } = useUserReducer()

  return (
    <GlobalContext.Provider value={{
      appState, appDispatch, userState, userDispatch, 
      createPost, deletePost, getWords, signInUser, signOutUser, getUser, setWords, setUserWords
    }}>
      {children}
    </GlobalContext.Provider>
  )
}