export interface IWord {
  synonyms: { _id: string, word: string }[],
  _id: string,
  word: string,
  language: {
    _id: string,
    name: string,
  },
  examples: { year: number, text: string }[],
  definitions: { definition: string, language: string }[],
  date: Date,
}

export interface IUser { 
  username: string, 
  email: string,
  id: string,
  picture: string,
  google_id: string, 
  words: IWord[],
  learning: IWord[]
} 

export type APP_STATE = {
  words: IWord[],
  error: Error[],
  books: { name: string, url: string }[]
}
export type APP_ACTIONS = 
  { type: 'APP_CREATE_WORD', payload: { word: IWord }}  | 
  { type: 'APP_DELETE_WORD', payload: { _id: string } }  |
  { type: 'APP_SET_WORD', payload: { words: IWord[] }} |   
  { type: 'APP_SET_ERROR', payload: { error: Error }} |
  { type: 'APP_SET_BOOKS', payload: { books: APP_STATE['books'] }}  

export type APP = APP_ACTIONS['type']

export type USER_STATE = {
  authorized: boolean,
  user: IUser | null,
  loading: boolean
  words: IWord[],
  learning: IWord[]
}

export type USER_ACTIONS = 
  { type: "SET_USER", payload: { user: IUser }}  | 
  { type: "SIGN_OUT" } |
  { type: "SET_LOADING" } |
  { type: "SET_FINISHED" } |
  { type: "SET_WORDS", payload: { words: IWord[] } } |
  { type: "ADD_WORD", payload: { word: IWord } } |
  { type: "ADD_LEARNING_WORD", payload: { learning: IWord } } |
  { type: "SET_LEARNING_WORDS", payload: { learning: IWord[] } } 


export type USER = USER_ACTIONS['type']
export type IStore<T> = {
  [k in keyof T]: T[k]
}