import React from 'react'
import { useStore } from '../store/main'

export const SignIn = () => {
  const { signInUser } = useStore()
  return (
    <div className="pt-20">
      <div className="w-10/12 mx-auto">
        <div className="border shadow-sm py-3 my-1 rounded-md flex justify-center items-center bg-yellow-100">
          <i className="text-green-700 fas fa-check mr-4" />
          <span className="font-semibold text-green-700">Lorem ipsum dolor sit amet.</span>
        </div>
        <div className="border shadow-sm py-3 my-1 rounded-md flex justify-center items-center bg-yellow-100">
          <i className="text-green-700 fas fa-check mr-4" />
          <span className="font-semibold text-green-700">Lorem ipsum dolor sit amet.</span>
        </div>
        <div className="border shadow-sm py-3 my-1 rounded-md flex justify-center items-center bg-yellow-100">
          <i className="text-green-700 fas fa-check mr-4" />
          <span className="font-semibold text-green-700">Lorem ipsum dolor sit amet.</span>
        </div>
      </div>
      <hr className="w-10/12 rounded-full bg-green-600 h-1 divide-dashed mx-auto my-4" />
      <button onClick={signInUser} className="btn overflow-hidden w-10/12 mx-auto flex items-center bg-gray-100 hover:bg-gray-300 focus:bg-gray-300">
        <div className="h-12">
          <img 
            src="https://banner2.cleanpng.com/20180723/btg/kisspng-google-logo-google-search-google-images-g-suite-google-adwords-5b5695e47fdc94.0743248315324011245237.jpg" 
            className="h-full"
          />
        </div>
        <span className="mx-auto text-gray-800 text-lg font-medium" > 
          Log in by Google 
        </span>
      </button>
    </div>
  )
}
