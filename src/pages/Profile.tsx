import React from 'react'
import { useStore } from '../store/main'
import { Link } from 'react-router-dom'

export const Profile = () => {
  const { userState } = useStore()
  return (
    <div className="pt-3">
      <div className="bg-gray-200 shadow-lg w-11/12 mx-auto rounded-md p-4 space-y-3">
        <div className="h-20">
          <img className="h-full rounded-full mx-auto shadow-xs" src={userState.user?.picture} alt=""/>
        </div>
        <div className="flex items-center justify-between pb-px">
          <span className="font-normal text-teal-800">Email:</span>
          <span className="font-semibold text-gray-800">{userState.user?.email}</span> 
        </div>
        <div className="flex items-center justify-between">
          <span className="font-normal text-teal-800">Username:</span>
          <span className="font-semibold text-gray-800">{userState.user?.username}</span> 
        </div>

        <div className="flex items-center justify-between">
          <span className="font-normal text-teal-800">Words in dictionary:</span>
          <span className="font-semibold text-gray-800">{userState.user?.words.length}</span> 
        </div>

        <button>
          <Link to={`/exercizes/${userState.words[0].word}`} className="text-center mt-3 btn bg-teal-700 px-3 py-2 rounded-full">
            Start Learning!
          </Link>
        </button>
      </div>
      <div className="mt-4 w-11/12 mx-auto">
        <span className="font-semibold text-gray-800 text-lg block">Words to learn</span> 
        <div className="flex flex-wrap justify-center">
          {userState.words.map(({ word, _id }) => {
            return <div key={_id} className="rounded-full truncate mx-1 mt-1 px-2 py-1 text-lg font-semibold text-gray-800 bg-gray-400 transition duration-150 hover:bg-gray-200 hover:border-gray-800 border border-dashed"> 
             <span>#{word}</span>
            </div>
          })}
        </div>
      </div>
    </div>
  )
}
