import { APP_ACTIONS, IWord, APP } from './../types/index';
import { useCallback } from 'react';
import APIService from '../../services/ApiService';

export const useAppActions = (dispatch: React.Dispatch<APP_ACTIONS>) => {
  const createPost = (word: IWord) => {
    dispatch({
      type: APP.CREATE_WORD,
      payload: { word }
    })
  }

  const setWords = useCallback((words: IWord[]) => {
    dispatch({
        type: APP.SET_WORDS,
        payload: { words }
    })
  }, [dispatch])

  const getWords = useCallback(async () => {
    try {
      const { data }: { data: {words: IWord[]} }  = await APIService(`/words?limit=10&page=${Math.floor(Math.random() * 100)}`)
      setWords(data.words)
    } catch (error) {
      dispatch({
        type: APP.SET_ERROR,
        payload: { error }
      })
    }
  }, [dispatch, setWords])


  const deletePost = (wordId: string) => {
    dispatch({
      type: APP.DELETE_WORD,
      payload: { _id: wordId }
    })
  }
  return {
    createPost, deletePost, getWords, setWords
  }
}