import React from 'react'
import { Outlet } from 'react-router-dom'
import logo from '../../../../assets/images/logo (2).png'
export default function AuthLayout() {
  return (
   <>
    <div className='auth-container '>
      <div className=' container-fluid bg-overlayout'>
        <div className="row vh-100 justify-content-center align-items-center">
          <div className="col-md-4 bg-white rounded-2 px-3 py-4">
            <div>
            <div className="logo-container text-center">
              <img className='w-50' src={logo} alt=''/>
            </div>
   <Outlet/>
   
           </div>
                </div>
          </div>
            </div>
          </div>
   
   </>
  )
}
