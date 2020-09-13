import { useReducer } from 'react';
import { APP_STATE, APP_ACTIONS, APP } from '../types';
import { useAppActions } from '../actions/app.actions';

const appInitialState: APP_STATE = {
  words: [],
  error: [],
}
const appReducer = (state: APP_STATE = appInitialState, action: APP_ACTIONS): APP_STATE => {
  switch (action.type) {
    case APP.CREATE_WORD: 
      return {
        ...state,
        words: [...state.words, action.payload.word]
      }
    case APP.DELETE_WORD:
      return {
        ...state,
        words: state.words.filter(word => word._id !== action.payload._id)
      }
    case APP.SET_WORDS:
      return {
        ...state,
        words: [...state.words, ...action.payload.words]
      }
    case APP.SET_ERROR: 
      return {
        ...state,
        error: [...state.error, action.payload.error]
      }            
    default:
      return state
  }
}

export default function useAppReducer() {
  const [appState, appDispatch] = useReducer(appReducer, appInitialState)
  return { appState, appDispatch, ...useAppActions(appDispatch) }
} 