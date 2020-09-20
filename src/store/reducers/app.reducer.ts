import { useReducer } from 'react';
import { APP_STATE, APP_ACTIONS } from '../types';
import { useAppActions } from '../actions/app.actions';

export const appInitialState: APP_STATE = {
  words: [],
  error: [],
}
const appReducer = (state: APP_STATE = appInitialState, action: APP_ACTIONS): APP_STATE => {
  switch (action.type) {
    case  'APP_CREATE_WORD': 
      return {
        ...state,
        words: [...state.words, action.payload.word]
      }
    case 'APP_DELETE_WORD':
      return {
        ...state,
        words: state.words.filter(word => word._id !== action.payload._id)
      }
    case 'APP_SET_WORD':
      return {
        ...state,
        words: [...state.words, ...action.payload.words]
      }
    case 'APP_SET_ERROR': 
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