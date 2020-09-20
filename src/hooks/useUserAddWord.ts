import { useUserNampespace } from '../store/main';
import { useCallback, useState } from "react";
import { IWord } from "../store/types";
import APIService from '../services/ApiService';

export const useUserAddWord = () => {
  const { setUserWords, setUserLearningWords } = useUserNampespace()!
  const [condition, setCondition] = useState({ loading: false, finished: false })
  const addWord = useCallback(async (word: string, learning = true) => {
    try {
      setCondition({ loading: true, finished: false })
      const { data }: { data: {words: IWord[], learning: IWord[]} } = await APIService(`/user/add-word/${word}${learning ? `?learning=true` : ''}`)
      console.log(data)
      setUserLearningWords(data.learning)
      setUserWords(data.words)
    } finally {
      setCondition({ loading: false, finished: true })
    }
  }, [setUserLearningWords, setUserWords])
  return { condition, addWord }
};