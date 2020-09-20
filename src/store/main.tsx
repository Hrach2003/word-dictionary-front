import React, { createContext, useContext } from 'react'
import useUserReducer from './reducers/user.reduser'
import useAppReducer from './reducers/app.reducer'
import { IStore } from './types'

type IContext = IStore<{ app: ReturnType<typeof useAppReducer>, user: ReturnType<typeof useUserReducer> }>

const GlobalContext = createContext<Partial<IContext | undefined>>(undefined)

export const useUserNampespace = () => useContext(GlobalContext)!.user
export const useAppNampespace = () => useContext(GlobalContext)!.app 

export const StoreProvider: React.FC = ({ children }) => {
  return (
    <GlobalContext.Provider value={{ 
      app: useAppReducer(), 
      user: useUserReducer() 
    }}>
      {children}
    </GlobalContext.Provider>
  )
}