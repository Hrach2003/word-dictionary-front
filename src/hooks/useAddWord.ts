import { useStore } from './../store/main';
import { useCallback, useState } from "react";
import { IWord } from "../store/types";
import APIService from '../services/ApiService';

export const useAddWord = () => {
  const { setUserWords } = useStore()
  const [condition, setCondition] = useState({ loading: false, finished: false })


  const addWord = useCallback(async (word: string) => {
    try {
      setCondition({ loading: true, finished: false })
      const { data }: { data: {words: IWord[]} } = await APIService(`/user/add-word/${word}`)
      setUserWords(data.words)
    } finally {
      setCondition({ loading: false, finished: true })
    }
  }, [setUserWords])
  return { condition, addWord }
};