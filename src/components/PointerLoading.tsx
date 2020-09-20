import React from 'react'

export const PointerLoading = () => (
    <span className="flex h-5 w-5 relative">
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
      <span className="relative inline-flex rounded-full h-5 w-5 bg-teal-600"></span>
    </span>
  )

