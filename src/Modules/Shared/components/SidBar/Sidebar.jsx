import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import logoside from "../../../../assets/images/sidelogo3.png"
export default function SideBar({ setLoginData}) {
 let navigate = useNavigate()
  const logout =()=>{
    //hfady localstorge
    //h null login data
    // h ro7 ll loginpage
    localStorage.removeItem("token");
    setLoginData(null);
   navigate("/login")
   
  }
  const [isCollapse, setIsCollapse] = useState(false)
   let toggleCollapse =()=>{
    setIsCollapse(!isCollapse)
   }
     useEffect(() => {
    const width = isCollapse ? '80px' : '250px'; // width الافتراضي
    document.documentElement.style.setProperty('--sidebar-w', width);
  }, [isCollapse]);
  return (
  <>
  <div className="container-sidebar">
    <Sidebar collapsed={isCollapse} className=' position-fixed '>
  <Menu>
     
        <img onClick={toggleCollapse} className='cursor-pointer my-4 w-50 mx-3' src={logoside} alt=""  />
      

    <MenuItem icon={<i className='fa-regular fa-house iconsize' aria-hidden="true"></i>} component={<Link to="/dashboard" />}> Home </MenuItem>
    <MenuItem icon={<i className="fa-solid  fa-users iconsize" aria-hidden="true"></i>} component={<Link to="/dashboard/users" />}> Users </MenuItem>
    <MenuItem icon={<i className="fa-regular fa-newspaper iconsize" aria-hidden="true"></i>} component={<Link to="/dashboard/recipes" />}> Recipes </MenuItem>
    <MenuItem icon={<i className="fa-regular fa-calendar-days  iconsize" aria-hidden="true"></i>} component={<Link to="/dashboard/categories" />}> Categories </MenuItem>
    <MenuItem icon={<i className="fa-solid fa-lock iconsize" aria-hidden="true"></i>}> Change Password </MenuItem>
    <MenuItem onClick={logout} icon={<i className="fa-solid fa-right-from-bracket iconsize" aria-hidden="true"></i>}> Logout </MenuItem>
  </Menu>
</Sidebar>;
  </div>

  
  
  </>
  )
}
