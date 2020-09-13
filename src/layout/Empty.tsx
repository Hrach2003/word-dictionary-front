import React from 'react'
import { BottomNavigation } from '../components/BottomNavigation'

export const Empty: React.FC = ({ children }) => {
  return (
    <>
      {children}
      <div className="pb-16"></div>
      <BottomNavigation />
    </>
  )
}
