import React, { useMemo, useState } from 'react'
import { useUserNampespace } from '../store/main'
import classnames from 'classnames'
import { Link } from 'react-router-dom'

export const Profile = () => {
  const { userState } = useUserNampespace()!
  const [tab, setTab] = useState<'learning' | 'repeating'>('repeating')
  const words = useMemo(() => {
    return tab === 'learning' ? userState.learning : userState.words
  }, [tab, userState.learning, userState.words])
  return (
    <div className="pt-3">
      <div className="bg-gray-200 shadow-lg w-11/12 mx-auto rounded-md p-4 space-y-3">
        <div className="h-20">
          <img className="h-full rounded-full mx-auto shadow-xs" src={userState.user?.picture} alt={userState.user?.username}/>
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

        <Link to={`/exercises/guesswords/${userState.learning[0]?.word}`}>
          <button className="text-center mt-3 btn bg-teal-700 px-3 py-2 rounded-full">
            Start Learning!
          </button>
        </Link>
      </div>
      <div className="mt-4 w-11/12 mx-auto">
        <div className="flex bg-gray-200 rounded-md shadow-md overflow-hidden">
          <div className={classnames('flex-1 font-semibold text-base py-2', {
            'bg-teal-700 bg-opacity-75 border-b-4  border-teal-700 transition-colors duration-150 ease-in-out text-gray-200': tab === 'learning',
            'text-gray-800 bg-gray-200': tab !== 'learning'
          })} onClick={() => setTab('learning')} >Words Learning</div> 
          <div className={classnames('flex-1 font-semibold text-base py-2', {
            'bg-teal-700 bg-opacity-75 border-b-4 border-teal-700 transition-colors duration-150 ease-in-out text-gray-200': tab === 'repeating',
            'text-gray-800 bg-gray-200': tab !== 'repeating'
          })} onClick={() => setTab('repeating')}>Words Repeating</div>
        </div> 
        <div className="flex flex-wrap justify-center">
          {words.map(({ word, _id }) => {
            return <div key={_id} className="rounded-full truncate mx-1 mt-1 px-2 py-1 text-lg font-semibold text-gray-800 bg-gray-400 transition duration-150 hover:bg-gray-200 hover:border-gray-800 border border-dashed"> 
             <span>#{word}</span>
            </div>
          })}
        </div>
      </div>
    </div>
  )
}
