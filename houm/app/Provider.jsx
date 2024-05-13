import React from 'react'
import Header from './_components/Header'

function Provider({children}) {
  return (
    <div>

        <Header></Header>
        <div className='mt-30'>
            {children}
        </div>
        
    
    </div>
  )
}

export default Provider