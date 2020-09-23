import React, { useEffect, useState } from 'react'
import classnames from 'classnames'

export const AlertMessage: React.FC<{}> = React.memo(({ children }) => {
  const [active, setActive] = useState(false)
  useEffect(() => {
    let a = setTimeout(() => setActive(true), 500)
    return () => clearTimeout(a) 
  }, [])

  return (
    <div className={classnames('fixed inset-0 bg-gray-900 bg-opacity-50 z-50', {
      'visible': active,
      'invisible': !active
    })} onClick={() => setActive(false)}>
      <div className={classnames('w-11/12 mx-auto bg-teal-700 shadow-outline text-gray-200 mt-10 flex justify-between items-center rounded-md px-4 py-3 transform transition duration-300 ease-in-out', {
        'invisible opacity-0 -translate-y-8': !active,
        'opacity-100 visible translate-y-8': active
      })}>
        {children} 
      </div>
    </div>
  )
})
