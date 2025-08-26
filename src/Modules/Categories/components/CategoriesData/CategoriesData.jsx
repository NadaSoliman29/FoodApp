import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../../../Context/AuthContext'

export default function CategoriesData() {
   let {loginData}= useContext(AuthContext)
   let navigate = useNavigate()
     useEffect(() => {
 
    if(loginData?.userGroup!='SuperAdmin'){
    navigate("/login");
    }
     }, [])
  return (
    <div>CategoriesData</div>
  )
}
