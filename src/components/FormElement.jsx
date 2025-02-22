import React from 'react'

function FormElement({children}) {
  return (
    <form>
        {children}
        <div>
            <button>sss</button>
        </div>
    </form>
  )
}

export default FormElement