import React, { useEffect } from 'react'
import classnames from 'classnames'

interface IAlertMessage {
  setActive: React.Dispatch<React.SetStateAction<boolean>>
  active: boolean
}

export const AlertMessage: React.FC<IAlertMessage> = React.memo(({ children, setActive, active }) => {
  // const [active, setActive] = useState(false)
  useEffect(() => {
    let a = setTimeout(() => setActive(true), 500)
    return () => clearTimeout(a) 
  }, [setActive])

  return (
    <div className={classnames('fixed inset-0 bg-gray-900 bg-opacity-50 z-50', {
      'visible': active,
      'invisible': !active
    })} onClick={() => setActive(false)}>
      <div className={classnames('w-11/12 mx-auto mt-10 transform transition duration-300 ease-in-out', {
        'invisible opacity-0 -translate-y-8': !active,
        'opacity-100 visible translate-y-8': active
      })}>
        {children} 
      </div>
    </div>
  )
})
