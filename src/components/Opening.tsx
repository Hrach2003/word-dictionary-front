import React from 'react'

export const Opening: React.FC<{}> = () => {
  return (
    <div className="fixed z-50 inset-0 bg-gray-800 opacity-75 flex items-center justify-center">
      <div>
        <h1 className="font-bold text-3xl capitalize flex items-center text-white">
          <i className="mr-1 shadow-2xl text-2xl fas fa-shield-virus"></i>
          Break barriers
        </h1>   
      </div>     
    </div>
  )
}
