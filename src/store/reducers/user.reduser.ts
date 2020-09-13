import { useUserActions } from './../actions/user.actions';
import { USER_ACTIONS, USER_STATE, USER } from '../types';
import { useReducer } from 'react';


const userInitialState: USER_STATE = {
  authorized: false,
  user: null,
  loading: false,
  words: []
}

const userReducer = (state: USER_STATE = userInitialState, action: USER_ACTIONS): USER_STATE => {
  switch (action.type) {
    case USER.SET_USER:
      return {
        ...state,
        authorized: true,
        user: action.payload.user,
        words: action.payload.user.words
      }
    case USER.SIGN_OUT:
      return {
        ...state,
        user: null,
        authorized: false
      } 
    case USER.SET_LOADING:
      return {
        ...state,
        loading: true
      }
    case USER.SET_FINISHED:
      return {
        ...state,
        loading: false
      } 
    case USER.SET_WORDS:
      return {
        ...state,
        words: action.payload.words
      }      
      
    default: return state
  }
}

export default function useUserReducer() {
  const [userState, userDispatch] = useReducer(userReducer, userInitialState)
  return { userState, userDispatch, ...useUserActions(userDispatch) }
}