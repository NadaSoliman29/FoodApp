import React, { useContext } from 'react'
import avatar from "../../../../assets/images/avatar.png"
import { AuthContext } from '../../../../Context/AuthContext';

export default function Navbar() {
        let {loginData}= useContext(AuthContext)
  
  return (
   <>
 <nav className="navbar navbar-expand-lg navbar-light navbg">
  <div className="container-fluid">
    <a className="navbar-brand usercolor" href="#">Food App</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
        {/* <li className="nav-item">
        <a className="nav-link d-flex align-items-center gap-2" href="#">
  {loginData?.imageUrl ? (
    <img src={loginData.imageUrl} alt="avatar" className="avatar-img" />
  ) : (
    <div className="avatar-fallback">
      {(loginData?.userName || 'U').trim().charAt(0).toUpperCase()}
    </div>
  )}
  <span>{loginData?.userName || 'default user'}</span>
</a>
        </li> */}
        <li className="nav-item">
  <a className="nav-link d-flex align-items-center gap-2" href="#">
    <img
      src={loginData?.imageUrl || avatar}alt="avatar" className="avatar-img"
      onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = defaultAvatar; }}/>
    <span>{loginData?.userName || 'default user'}</span>
  </a>
</li>
 <li className="nav-item ms-2">
  <a className="nav-link d-flex align-items-center mt-2" href="#">
    <div className="position-relative">
      <i className="fa-solid fa-bell fs-6"></i>
      <span className="position-absolute top-0 start-100 translate-middle p-1 bg-danger border border-light rounded-circle"></span>
     
    </div>
  </a>
</li>
      </ul>
    </div></div></nav>

     
   
   
   
   </>
  )
}
