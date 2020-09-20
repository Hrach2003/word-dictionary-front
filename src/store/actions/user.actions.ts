import { useEffect, useCallback } from 'react';
import { USER_ACTIONS, IUser, IWord } from './../types/index';
import APIService from '../../services/ApiService';

export const useUserActions = (dispatch: React.Dispatch<USER_ACTIONS>) => {
  const isDev = process.env.NODE_ENV === 'development'
  const signInUser = () => window.location.href = `${isDev ? 'http://localhost:4000' : ''}/auth/google`

  const getUser = useCallback(async () => {
    try {
      const { data }: { data: { user: IUser } | null} = await APIService('/user')
      if(data?.user) {
        console.log('logged in')
        dispatch({
          type: "SET_USER",
          payload: { user: data.user }
        })
      } 
    } catch (error) {
      dispatch({ type: "SIGN_OUT" })
    }
  }, [dispatch])
  
  const signOutUser = useCallback(async () => {
    try {
      dispatch({ type: "SET_LOADING" })
      await APIService('/auth/logout')
      dispatch({ type: "SIGN_OUT" })
    } catch (error) {
      dispatch({ type: "SIGN_OUT" }) 
    } finally {
      dispatch({ type: "SET_FINISHED" })
    }
  }, [dispatch])

  const setUserWords = useCallback((words: IWord[]) => {
    dispatch({
      type: "SET_WORDS",
      payload: { words }
    })
  }, [dispatch])

  const setUserLearningWords = useCallback((learning: IWord[]) => {
    dispatch({
      type: 'SET_LEARNING_WORDS',
      payload: { learning }
    })
  }, [dispatch])

  useEffect(() => {
    (async () => {
      await getUser()
    })()
  }, [getUser])

  return { signInUser, signOutUser, getUser, setUserWords, setUserLearningWords }
}