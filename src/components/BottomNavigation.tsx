import React from 'react'
import classnames from 'classnames'
import { NavLink } from 'react-router-dom'
import { useUserNampespace } from '../store/main'

export const BottomNavigation = () => {
  const { userState } = useUserNampespace()!!
  return (
    <div className={classnames('fixed grid z-50 shadow-2xl divide-x-2 rounded-t divide-gray-300 bg-teal-800 inset-x-0 bottom-0 h-12 items-center justify-around text-gray-300', {
      'grid-cols-3': !userState.authorized,
      'grid-cols-4': userState.authorized
    })}>
      <NavLink exact to="/">
        <i className="fas fa-home"></i>
      </NavLink>
      <NavLink to="/todo">
        <i className="fas fa-tasks"></i>
      </NavLink>
      <NavLink to="/learning">
        <i className="fas fa-graduation-cap"></i>
      </NavLink>
      {userState.authorized && <NavLink exact to="/profile">
        <i className="fas fa-user-cog"></i>
      </NavLink>}
    </div>
  )
}
