import React, { useEffect } from 'react'
import { useHistory, Link } from 'react-router-dom'
import classnames from 'classnames'

export const SuccessAlert: React.FC<{ isGuessed: boolean, to: string }> = React.memo(({ isGuessed, to }) => {
  const history = useHistory()
  useEffect(() => {
    const handleEnter = (e: KeyboardEvent) => {
      if(e.keyCode === 13) history.push(to); // enter = 13
    }
    document.addEventListener('keydown', handleEnter )
    return () => document.removeEventListener('keydown', handleEnter)
  }, [history, to])

  return (
    <div className={classnames('transition transform ease-in duration-100 bg-gray-800 bg-opacity-75 fixed inset-0 flex items-center justify-center', {
      'visible opacity-100': isGuessed,
      'invisible opacity-25': !isGuessed
    })}>
      <div>
        <div className={classnames('w-40 h-40 shadow-md from-green-900 to-green-700 bg-gradient-to-t bg-green-600 rounded-full mx-auto transition transform delay-100 ease-in-out duration-300 flex items-center justify-center', {
          'visible scale-100 rotate-0': isGuessed,
          'invisible scale-0 rotate-90': !isGuessed
        })}>
          <i className="fas fa-clipboard-check text-7xl text-white"></i>  
        </div>
        <div className=" w-1/2 mx-auto flex justify-center mt-3">
          <Link className="btn px-3 text-lg  py-2 font-semibold from-green-900 to-green-700 bg-gradient-to-t bg-green-600" to={to}>Next</Link> 
        </div>
      </div>
    </div> 
  )
})
