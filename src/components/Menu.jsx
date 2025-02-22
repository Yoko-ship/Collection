import React from 'react'

function Menu({email,btnHandler}) {
  return (
    <div className='border-1 border-neutral-800  rounded-xl absolute right-0 mt-3 w-60 shadow-lg overflow-hidden transition-all'>
        <p className='text-start text-white p-2 object-con'>Емейл:{email}</p>
        <div className='pt-4'>
        <p className='text-center text-white p-2 cursor-pointer hover:bg-stone-800 ' onClick={btnHandler}>Выйти</p>
        </div>
    </div>
  )
}

export default Menu