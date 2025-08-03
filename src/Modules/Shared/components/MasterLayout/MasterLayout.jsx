import React from 'react'
import Sidebar from '../SidBar/Sidebar'
import Navbar from '../Navbar/Navbar'
import Header from '../Header/Header'
import { Outlet } from 'react-router-dom'

export default function MasterLayout() {
  return (
    <>
    
    <div className='d-flex'>
      <div className="w-25 bg-danger">
        <Sidebar/>
      </div>
      <div className='bg-warning w-100'>
        <Navbar/>
        <Header/>
        <Outlet/>
      </div>
    </div>
    
    
    </>
  )
}
