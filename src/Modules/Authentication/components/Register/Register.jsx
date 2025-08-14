import React, { useState } from 'react'

import { data, Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import axios from 'axios';
import { toast } from 'react-toastify';
import logo from '../../../../assets/images/logo (2).png'

export default function Register() {
    let {register,formState:{errors ,isSubmitting},handleSubmit ,watch} = useForm();
  let navigate = useNavigate()

 const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const onSubmit = async(data)=>{
    try {
      let response = await axios.post('https://upskilling-egypt.com:3006/api/v1/Users/Register',data)
     localStorage.setItem("token",response.data.token)
      toast.success("Register Successfully!")
      navigate('/verify-account')
    } catch (error) {
         toast.error(error.response?.data?.message || "Please insert correct data");
    }
  }
   
      const passwordValue = watch('password')
  return (
   <>
      <div className="col-md-5 bg-white rounded-2 px-3 py-4">
               <div>
               <div className="logo-container text-center">
                 <img className='w-50' src={logo} alt=''/>
              
             </div>
 
            <div className="title">
              <h4>Register</h4>
              <p className='text-muted'>Welcome Back! Please enter your details</p>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} >
               
                 <div className="row">

                  {/* UserName */}
                   <div className="col-md-6 mb-3">
      <div className="input-group custom-input">
        <span className="input-group-text border-0" id="basic-addon1">
          <i className="fa-solid fa-mobile-screen iconcolor" aria-hidden="true"></i>
        </span>
        <input
          {...register('userName', {
            required: 'userName is Required !',
            pattern: {
             value: /^[A-Za-z]+[A-Za-z0-9]*[0-9]+$/,
              message: "The userName must contain characters and end with numbers without spaces"
            }
          })}
          type="text"
          className="form-control border-0"
          placeholder="UserName"
        />
      </div>
      {errors.userName && <div className='text-danger mb-1 errormsg'>{errors.userName.message}</div>}
    </div>
    {/* Email */}
    <div className="col-md-6 mb-3">
      <div className="input-group custom-input">
        <span className="input-group-text border-0" id="basic-addon1">
          <i className="fa-solid fa-mobile-screen iconcolor" aria-hidden="true"></i>
        </span>
        <input
          {...register('email', {
            required: 'Email is Required !',
            pattern: {
              value: /^[A-z0-9._%+-]+@[A-z0-9.-]+\.[a-zA-Z]{2,}$/i,
              message: "Enter your Email Correct"
            }
          })}
          type="text"
          className="form-control border-0"
          placeholder="Enter your E-mail"
        />
      </div>
      {errors.email && <div className='text-danger mb-1 errormsg'>{errors.email.message}</div>}
    </div>

    {/* country  */}
    <div className="col-md-6 mb-3">
      <div className="input-group custom-input">
        <span className="input-group-text border-0 icon-border" id="basic-addon1">
          <i className="fa-solid fa-globe iconcolor" aria-hidden="true"></i>
        </span>
        <input
          {...register('country', {
            required: 'Country  is Required !'
          })}
          type="text"
          className="form-control border-0"
          placeholder="Country "
        />
      </div>
      {errors.country  && <div className='text-danger mb-1 errormsg'>{errors.country .message}</div>}
    </div>
    {/* PhoneNumber */}
      <div className="col-md-6 mb-3">
      <div className="input-group custom-input">
        <span className="input-group-text border-0 icon-border" id="basic-addon1">
          <i className="fa-solid fa-lock iconcolor" aria-hidden="true"></i>
        </span>
        <input
          {...register('phoneNumber', {
            required: 'phoneNumber  is Required !',
          })}
          type="number"
          className="form-control border-0"
          placeholder="PhoneNumber "
        />
      </div>
      {errors.phoneNumber  && <div className='text-danger mb-1 errormsg'>{errors.phoneNumber .message}</div>}
    </div>
      {/* New Password */}
          <div className="col-md-6 mb-3">
        <div className="input-group mb-3 custom-input">
          <span className="input-group-text border-0 icon-border" id="basic-addon1">
            <i className="fa-solid fa-lock iconcolor" aria-hidden="true"></i>
          </span>
          <input
            {...register('password', {
              required: 'Password is Required!',
              pattern:{
               value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{6,}$/,
               message:"The password must include at least one lowercase letter, one uppercase letter, one digit, one special character, and be at least 6 characters long."
              }
            })}
            type={showPassword ? 'text' : 'password'}
            className="form-control border-0"
            placeholder="New Password"
          />
          <span className="input-group-text border-0 icon-border" onClick={() => setShowPassword(!showPassword)} style={{ cursor: 'pointer' }}>
            <i className={`fa-solid ${showPassword ? 'fa-eye-slash' : 'fa-eye'} iconcolor`}></i>
          </span>
        </div>
        {errors.password && <div className='text-danger mb-1'>{errors.password.message}</div>}
</div>
        {/* Confirm Password */}
            <div className="col-md-6 mb-3">
        <div className="input-group mb-3 custom-input">
          <span className="input-group-text border-0 icon-border" id="basic-addon1">
            <i className="fa-solid fa-lock iconcolor" aria-hidden="true"></i>
          </span>
          <input
            {...register('confirmPassword', {
              required: 'Confirm Password is Required!',
              validate: value => value === passwordValue || "Passwords do not match!"
            })}
            type={showConfirmPassword ? 'text' : 'password'}
            className="form-control border-0"
            placeholder="Confirm New Password"
          />
          <span className="input-group-text border-0 icon-border" onClick={() => setShowConfirmPassword(!showConfirmPassword)} style={{ cursor: 'pointer' }}>
            <i className={`fa-solid ${showConfirmPassword ? 'fa-eye-slash' : 'fa-eye'} iconcolor`}></i>
          </span>
        </div>
        {errors.confirmPassword && <div className='text-danger mb-1'>{errors.confirmPassword.message}</div>}
        </div>
  </div>
                   <div className="links d-flex justify-content-end my-2">
                 
                    <Link to="/login" className=' maincolor text-decoration-none'> Log In </Link>

                   </div>
                  
                
                   <button disabled={isSubmitting} className='btn btn w-100 text-white btncolor'> Register</button>
            </form>
            </div> 
           </div>
  </>
  )
}
