import React from 'react'
import { Outlet } from 'react-router-dom'

export default function AuthLayout() {
  return (
   <>
    <div className='auth-container '>
      <div className=' container-fluid bg-overlayout'>
        <div className="row vh-100 justify-content-center align-items-center">
          
   <Outlet/>
   
           </div>
                </div>
          </div>
            
          
   
   </>
  )
}
