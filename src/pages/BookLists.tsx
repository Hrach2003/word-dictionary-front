import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useAppNampespace } from '../store/main'


const Books = () => {
  const history = useHistory()
  const { setAppBooks, appState } = useAppNampespace()!
  const [activeBook, setActiveBook] = useState<{ name: string, url: string } | null>(null)
  useEffect(() => {
    (async () => await setAppBooks())()
  }, [setAppBooks])

  return (
    <>
      <div className="w-11/12 mx-auto py-1 h-16 flex items-center">
        <button className="btn bg-transparent w-8 h-8 rounded-full mr-2" onClick={() => history.goBack()}>
          <i className={'fas fa-angle-left text-gray-800'}></i>
        </button>
        <h3 className="text-gray-700 text-lg font-semibold  uppercase text-center mx-auto">
          Book PDF Collection
        </h3>
      </div>
      <hr className="w-11/12 h-px mx-auto rounded-lg bg-gray-500"/>
      <img src={require('./../assets/holding.png')} alt="learning path"></img>

      <div className="w-11/12 mx-auto">
        {appState.books.length && appState.books.map(({ name, url }) => {
          return <Link 
            to={`/booklist/${name}?url=${url}`} 
            className="btn bg-teal-700 rounded-full cursor-pointer mt-2 shadow-md px-2 py-1" 
            key={url}
          >{name}</Link>
        })}
      </div>
    </>
  )
}

export { Books as default }