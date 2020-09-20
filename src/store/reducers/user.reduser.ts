import { useUserActions } from './../actions/user.actions';
import { USER_ACTIONS, USER_STATE } from '../types';
import { useReducer } from 'react';


export const userInitialState: USER_STATE = {
  authorized: false,
  user: null,
  loading: false,
  learning: [],
  words: []
}

const userReducer = (state: USER_STATE = userInitialState, action: USER_ACTIONS): USER_STATE => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        authorized: true,
        user: action.payload.user,
        words: action.payload.user.words,
        learning: action.payload.user.learning
      }
    case "SIGN_OUT":
      return {
        ...state,
        user: null,
        authorized: false
      } 
    case "SET_LOADING":
      return {
        ...state,
        loading: true
      }
    case "SET_FINISHED":
      return {
        ...state,
        loading: false
      } 
    case "SET_WORDS":
      return {
        ...state,
        words: action.payload.words
      }  
    case "ADD_WORD":
      return {
        ...state,
        words: [...state.words, action.payload.word]
      }
    case "ADD_LEARNING_WORD":
      return {
        ...state,
        learning: [...state.learning, action.payload.learning]
      } 
    case "SET_LEARNING_WORDS":
      return {
        ...state,
        learning: state.learning
      }             
    default: return state
  }
}

export default function useUserReducer() {
  const [userState, userDispatch] = useReducer(userReducer, userInitialState)
  return { userState, userDispatch, ...useUserActions(userDispatch) }
}