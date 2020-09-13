import { IWord } from "../store/types"
import APIService from "../services/ApiService"

export const getWord = async (word: string): Promise<IWord | string> => {
  try {
    const { data }: { data: {word: IWord} } = await APIService(`/words/${word}`)
    return data.word
  } catch (error) {
    return error.message
  }
}

export const getWordSynonyms = async (word: string): Promise<IWord[] | string> => {
  try {
    const { data }: { data: { synonyms: IWord[] }} = await APIService(`/words/${word}/synonyms`)
    return data.synonyms
  } catch (error) {
    return error.message
  }
}