import React from 'react'

import spinner from "../assets/svg/spinner.svg"
export default function Spinner() {
  return (
    <div className="bg-black bg-opacity-50 grid justify-items-center 
    fixed left-0 right-0 bottom-0 top-0 z-50">
        <div className='flex justify-center items-center'>
            <img src={spinner} alt="....Loading" className='h-24' />
        </div>
        <div >“The world is a book and those who do not travel read only one page.” ― St. Augustine.</div>
    </div>
  )
}
