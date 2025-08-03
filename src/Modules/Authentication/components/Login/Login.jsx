import React from 'react'

import { data, Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import axios from 'axios';
import { toast } from 'react-toastify';

export default function Login({getLoginData}) {
  let {register,formState:{errors},handleSubmit} = useForm();
  let navigate = useNavigate()
  const onSubmit = async(data)=>{
    try {
      let response = await axios.post('https://upskilling-egypt.com:3006/api/v1/Users/Login',data)
     localStorage.setItem("token",response.data.token)
      toast.success("login Successfully!")
      navigate('/dashboard')
    } catch (error) {
       toast.error("please insert correct data");
    }
  }
  return (
    <>
            <div className="title">
              <h4>Log In</h4>
              <p className='text-muted'>Welcome Back! Please enter your details</p>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} >
              <div className="input-group mb-3 custom-input">
               <span className="input-group-text border-0" id="basic-addon1">
                  <i class="fa-solid fa-mobile-screen iconcolor" aria-hidden="true"></i>
               </span>
                <input {...register('email',{
                  required:'Email is Required !',
                  pattern:{
                    value:/^[A-z0-9._%+-]+@[A-z0-9.-]+\.[a-zA-Z]{2,}$/i,
                    message:"Enter your Email Correct "
                  }
                })} type="text" className="form-control border-0" placeholder="Enter your E-mail" aria-label="email" aria-describedby="basic-addon1" />
                   </div>
                   {errors.email&& <div className='text-danger mb-1'>{errors.email.message}</div>}
            <div className="input-group mb-3 custom-input">
               <span className="input-group-text border-0 icon-border" id="basic-addon1">
                  <i class="fa-solid fa-lock iconcolor" aria-hidden="true"></i>
               </span>
                <input {...register('password',{
                  required:'Password is Requried !'
                })} type="password" className="form-control border-0" placeholder="Password" aria-label="Password" aria-describedby="basic-addon1" />
                   </div>
                   {errors.password&&<div className='text-danger mb-1'>{errors.password.message}</div>}
                   <div className="links d-flex justify-content-between my-2">
                   <Link to="/register" className=' text-black text-decoration-none'> Register Now? </Link>
                    <Link to="/forget-pass" className=' maincolor text-decoration-none'> Forget Password </Link>

                   </div>
                  
                
                   <button className='btn btn w-100 text-white btncolor'> login</button>
            </form>
            
       </>
        
  )
}
