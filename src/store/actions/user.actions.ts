import { useEffect, useCallback } from 'react';
import { USER_ACTIONS, IUser, USER, IWord } from './../types/index';
import APIService from '../../services/ApiService';

export const useUserActions = (dispatch: React.Dispatch<USER_ACTIONS>) => {
  const isDev = process.env.NODE_ENV === 'development'

  const signInUser = () => window.location.href = `${isDev ? 'http://localhost:4000' : window.location.host}/auth/google`

  const getUser = useCallback(async () => {
    try {
      const { data }: { data: { user: IUser } | null} = await APIService('/user')
      if(data?.user) {
        console.log('logged in')
        dispatch({
          type: USER.SET_USER,
          payload: { user: data.user }
        })
      } 
    } catch (error) {
      dispatch({ type: USER.SIGN_OUT })
    }
  }, [dispatch])
  
  const signOutUser = useCallback(async () => {
    try {
      dispatch({ type: USER.SET_LOADING })
      await APIService('/auth/logout')
      dispatch({ type: USER.SIGN_OUT })
    } catch (error) {
      dispatch({ type: USER.SIGN_OUT }) 
    } finally {
      dispatch({ type: USER.SET_FINISHED })
    }
  }, [dispatch])

  const setWords = useCallback((words: IWord[]) => {
    dispatch({
      type: USER.SET_WORDS,
      payload: { words }
    })
  }, [dispatch])

  useEffect(() => {
    (async () => {
      await getUser()
    })()
    
  }, [getUser])

  return { signInUser, signOutUser, getUser, setWords }
}