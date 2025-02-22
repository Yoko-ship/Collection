import React from 'react'

function FormElement({children,buttonHandler}) {
  return (
    <form className='flex items-center flex-col gap-2'>
        {children}
        <div className='p-3 '>
            <button className='bg-green-800 text-white p-3 cursor-pointer rounded-xl' onClick={(e) => buttonHandler(e)}>Подтвердить</button>
        </div>
    </form>
  )
}

export default FormElement