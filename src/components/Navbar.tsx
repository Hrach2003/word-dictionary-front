import React, { useState } from 'react'
import classnames from 'classnames'
import { useUserNampespace } from '../store/main'
import { useHistory } from 'react-router-dom'


export const Navbar = () => {
  const history = useHistory()
  const { userState, signOutUser } = useUserNampespace()!
  const [dropdownActive, setDropdownActive] = useState(false)

  const goTo = history.push
  const logout = () => {
    signOutUser().finally(() => goTo('/'))
  }
  return (
    <div className="bg-teal-800 h-16 text-gray-100 fixed z-50 shadow-2xl inset-x-0 top-0">
      <div className="w-11/12 mx-auto flex justify-between items-center h-full">
        <div>
          <h1 className=" font-bold text-lg capitalize flex items-center">
            <i className="mr-1 shadow-2xl text-2xl fas fa-shield-virus"></i>
            Break barriers
          </h1>
        </div>
        <div className="flex">
          {userState.authorized &&
            <img className="h-8 rounded-full mr-2 border-2 border-gray-300" src={userState.user?.picture} alt=""/>
          }
          <div className="relative">
            <button className="btn px-3 py-1 z-50 relative" onClick={() => setDropdownActive(d => !d)}>
              <i className="fas fa-hamburger"></i>
            </button>
            <div tabIndex={-1} className={classnames('fixed inset-0 z-20 bg-gray-900 bg-opacity-50', {
              'hidden': !dropdownActive,
              'block': dropdownActive,
            })} onClick={() => setDropdownActive(d => !d)}></div>
            <div className={classnames('absolute w-32 transform z-50 ease-in duration-150 bg-gray-100 text-gray-800 mt-2 py-1 rounded-md shadow-lg left-auto right-0', {
              'invisible translate-y-4 opacity-0': !dropdownActive,
              'visible translate-y-0 opacity-100': dropdownActive
            })}>
              {userState.authorized 
                ? <><div 
                    onClick={logout} 
                    className="flex justify-center items-center cursor-pointer hover:bg-teal-700 py-1 hover:text-gray-100 focus:bg-teal-700 focus:text-gray-100"
                  >
                    <span>Log out</span> 
                    {userState.loading && <span className="flex relative h-3 w-3 ml-2">
                      <span className="animate-spin h-full w-full rounded-full bg-transparent border-teal-300 border-t-2 border-l-2"></span>
                    </span>}
                  </div>
                  <div 
                    onClick={() => {
                      setDropdownActive(d => !d)
                      goTo('/profile')
                    }} 
                    className="flex justify-center items-center cursor-pointer hover:bg-teal-700 py-1 hover:text-gray-100 focus:bg-teal-700 focus:text-gray-100"
                  >
                    <span>Profile</span>
                  </div></>
                : <div onClick={() => {
                  setDropdownActive(d => !d)
                  goTo('/login')
                }} className=" cursor-pointer hover:bg-teal-700 py-1 hover:text-gray-100 focus:bg-teal-700 focus:text-gray-100">Sign In</div>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
