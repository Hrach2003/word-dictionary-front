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
  words: IWord[]
} 

export type APP_STATE = {
  words: IWord[],
  error: Error[]
}
export enum APP {
  CREATE_WORD = "APP_CREATE_WORD", 
  DELETE_WORD = "APP_DELETE_WORD",
  SET_WORDS = "APP_SET_WORD",
  SET_ERROR = "APP_SET_ERROR",
}
export type APP_ACTIONS = 
  { type: APP.CREATE_WORD, payload: { word: IWord }}  | 
  { type: APP.DELETE_WORD, payload: { _id: string } }  |
  { type: APP.SET_WORDS, payload: { words: IWord[] }} |  
  { type: APP.SET_ERROR, payload: { error: Error }}  

export enum USER {
  SET_USER = "SET_USER",
  SIGN_OUT = "SIGN_OUT",
  SET_LOADING = "SET_LOADING",
  SET_WORDS = "SET_WORDS",
  SET_FINISHED = "SET_FINISHED",
  ADD_WORD = "ADD_WORD",
}

type State = 'success' | 'error' | 'loading'
export type USER_STATE = {
  authorized: boolean,
  user: IUser | null,
  loading: boolean
  words: IWord[]
}

export type USER_ACTIONS = 
  { type: USER.SET_USER, payload: { user: IUser }}  | 
  { type: USER.SIGN_OUT } |
  { type: USER.SET_LOADING } |
  { type: USER.SET_FINISHED } |
  { type: USER.SET_WORDS, payload: { words: IWord[] } } 

export interface IStore {
  appState: APP_STATE
  appDispatch: React.Dispatch<APP_ACTIONS>
  createPost: (post: IWord) => void
  deletePost: (postId: string) => void,
  getWords: () => Promise<void>
  setWords: (words: IWord[]) => void
  setUserWords: (words: IWord[]) => void
  signInUser: () => void
  signOutUser: () => Promise<void>
  addUserWord: (word: IWord) => Promise<void> 
  getUser: () => Promise<void>
  userState: USER_STATE
  userDispatch: React.Dispatch<USER_ACTIONS>
}
