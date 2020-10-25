import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { AlertMessage } from '../components/AlertMessage'
import { useInputBind } from '../hooks/useInputBind'
import { useUserNampespace } from '../store/main'


const ToDoList = () => {
  const { userState } = useUserNampespace()!
  const wordInDay = useInputBind(10)
  const [loginDialog, setLoginDialog] = useState(false)
  const [newTaskDialog, setNewTaskDialog] = useState(false)
  return (
    <>
      {!userState.authorized && <AlertMessage active={loginDialog} setActive={setLoginDialog}>
        <div className="bg-teal-700 w-full shadow-outline text-gray-200  flex justify-between items-center  px-4 py-3 rounded-md">
          <div>Sign in to get more of our app</div>
          <Link to="/login" className="btn bg-gray-200 text-teal-700 px-2 py-1 text-lg font-semibold capitalize">
            Sign in
          </Link>
        </div>
      </AlertMessage>}
      <div className="py-4">
        <h1 className="text-lg uppercase font-semibold">Tasks</h1>
        <div className="w-11/12 mx-auto">
          <div className="border shadow-sm py-3 my-1 rounded-md flex justify-between px-4 items-center bg-yellow-100">
            <span className="font-semibold text-green-700">
              Learn 
              <input type="number" className="input p-0 border-2 border-dashed border-green-700 mx-2 rounded-lg text-center w-16" {...wordInDay.bind}/> 
              words in day 
            </span>
            <i className="text-green-700 fas fa-check mr-4" />
          </div>

          <div className="flex justify-end items-center mt-2">
            <button onClick={() => setNewTaskDialog(true)} className="btn px-2 py-1 font-medium bg-yellow-100 text-green-700 border-2 border-green-700">
              Add another task
            </button>
            <button className="btn px-2 py-1 font-medium ml-1 bg-yellow-100 text-green-700 border-2 border-green-700">
              Save
            </button>
          </div>
        </div>
        <div className="my-2 h-56 bg-contain bg-no-repeat bg-center" style={{ backgroundImage: `url(${require('./../assets/success.png')})` }} />
        <div className="mb-5 text-center">
          <span className="text-xl text-gray-800 uppercase font-semibold  select-none hover:border-green-700 border-dashed border-b-2">make your dreams come true</span>
        </div>  
      </div>
      {/* <AlertMessage active={newTaskDialog} setActive={setNewTaskDialog}>
        info goes here  
      </AlertMessage> */}
    </>
  )
}

export { ToDoList as default }