import React from 'react'
import { data, Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import axios from 'axios';
import { toast } from 'react-toastify';
import logo from '../../../../assets/images/logo (2).png'

export default function Forgetpassword() {
   let {register,formState:{errors ,isSubmitting},handleSubmit} = useForm();
  let navigate = useNavigate()

   const onSubmit = async(data)=>{
    try {
      let response = await axios.post('https://upskilling-egypt.com:3006/api/v1/Users/Reset/Request',data)
      toast.success("Check Your E-mail!")
      navigate('/reset-pass')
    } catch (error) {
          toast.error(error.response?.data?.message || "Please insert correct data");
    }
  }
  return (
    <>
       <div className="col-md-4 bg-white rounded-2 px-3 py-4">
                <div>
                <div className="logo-container text-center">
                  <img className='w-50' src={logo} alt=''/>
               
              </div>
    
    <div className="title">
              <h4>Forgetpassword</h4>
              <p className='text-muted'>No worries! Please enter your email and we will send a password reset link </p>
            </div>
              <form onSubmit={handleSubmit(onSubmit)} >
              <div className="input-group mb-3 custom-input">
               <span className="input-group-text border-0" id="basic-addon1">
                  <i className="fa-solid fa-mobile-screen iconcolor" aria-hidden="true"></i>
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
                   <button disabled={isSubmitting} className='btn btn w-100 text-white btncolor'> Submit</button>
            </form>
            </div>
            </div>
  </>
  )
}
