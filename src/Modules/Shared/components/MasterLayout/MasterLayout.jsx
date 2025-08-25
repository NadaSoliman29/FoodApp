import React, { useContext } from 'react'
import Navbar from '../Navbar/Navbar'
import Header from '../Header/Header'
import { Outlet } from 'react-router-dom'
import SideBar from '../SidBar/Sidebar'
import { AuthContext } from '../../../../Context/AuthContext'

export default function MasterLayout() {
    let {setLoginData}= useContext(AuthContext)
      let {loginData}= useContext(AuthContext)
  return (
    <>
    
    <div className='d-flex vh-100'>
      <div className="">
        <SideBar {...{setLoginData}} />
      </div>
      <div className='w-100 page-content p-4'>
        <Navbar />
      
        <Outlet/>
      </div>
    </div>
    
    
    </>
  )
}
