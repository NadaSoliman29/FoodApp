import React from 'react'
import logo from '../../../../assets/images/logo (2).png'
import { data, Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import axios from 'axios';
import { toast } from 'react-toastify';

export default function Verifyaccount() {
    let {register,formState:{errors ,isSubmitting},handleSubmit } = useForm();
  let navigate = useNavigate()
  const onSubmit = async(data)=>{
    try {
      let response = await axios.put('https://upskilling-egypt.com:3006/api/v1/Users/verify',data)
     localStorage.setItem("token",response.data.token)
      toast.success("Verify Account Successfully!")
      navigate('/login')
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
              <h4>Verify Account</h4>
              <p className='text-muted'>Please Enter Your Otp or Check Your Inbox</p>
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
          {/* OTP */}
        <div className="input-group mb-3 custom-input">
          <span className="input-group-text border-0 icon-border" id="basic-addon1">
            <i className="fa-solid fa-lock iconcolor" aria-hidden="true"></i>
          </span>
          <input
            {...register('code', {
              required: 'OTP is Required!'
            })}
            type="text"
            className="form-control border-0"
            placeholder="OTP"
          />
        </div>
        {errors.code && <div className='text-danger mb-1'>{errors.code.message}</div>}
                
                   <button disabled={isSubmitting} className='btn btn w-100 text-white btncolor'> Send</button>
            </form>
            </div>
             </div>
  </>
  )
}
