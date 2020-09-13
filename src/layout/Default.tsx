import React from 'react'
import { Navbar } from '../components/Navbar'
import { BottomNavigation } from '../components/BottomNavigation'

export const Default: React.FC = ({ children }) => {
  return (
    <>
      <Navbar />
      <div className="pt-16"></div>
      {children}
      <div className="pb-16"></div>
      <BottomNavigation />
    </>
  )
}
