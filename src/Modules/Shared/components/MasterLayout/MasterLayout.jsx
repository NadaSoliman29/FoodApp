import React from 'react'
import Navbar from '../Navbar/Navbar'
import Header from '../Header/Header'
import { Outlet } from 'react-router-dom'
import SideBar from '../SidBar/Sidebar'

export default function MasterLayout({setLoginData,loginData}) {
  return (
    <>
    
    <div className='d-flex vh-100'>
      <div className="">
        <SideBar {...{setLoginData}} />
      </div>
      <div className='w-100 page-content p-4'>
        <Navbar loginData={loginData}/>
      
        <Outlet/>
      </div>
    </div>
    
    
    </>
  )
}
