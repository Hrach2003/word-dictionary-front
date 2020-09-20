import { APP_ACTIONS, IWord } from './../types/index';
import { useCallback } from 'react';
import APIService from '../../services/ApiService';


export const useAppActions = (dispatch: React.Dispatch<APP_ACTIONS>) => {
  const setAppWords = useCallback((words: IWord[]) => {
    dispatch({
        type: 'APP_SET_WORD',
        payload: { words }
    })
  }, [dispatch])

  const getAppWords = useCallback(async () => {
    try {
      const { data }: { data: {words: IWord[]} }  = await APIService(`/words?limit=10&page=${Math.floor(Math.random() * 100)}`)
      setAppWords(data.words)
    } catch (error) {
      dispatch({
        type: 'APP_SET_ERROR',
        payload: { error }
      })
    }
  }, [dispatch, setAppWords])


  const deleteAppPost = (wordId: string) => {
    dispatch({
      type: 'APP_DELETE_WORD',
      payload: { _id: wordId }
    })
  }
  return {
    deleteAppPost, getAppWords, setAppWords
  }
}