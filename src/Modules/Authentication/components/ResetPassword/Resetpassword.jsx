import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { toast } from 'react-toastify'

export default function Resetpassword() {
  const { register, formState: { errors }, handleSubmit, watch } = useForm()
  const navigate = useNavigate()

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const onSubmit = async (data) => {
    try {
      const response = await axios.post('https://upskilling-egypt.com:3006/api/v1/Users/Reset', data)
      toast.success("Password Reset Successfully!")
      navigate('/login')
    } catch (error) {
      toast.error("Please insert correct data")
    }
  }

  const passwordValue = watch('password')

  return (
    <>
      <div className="title">
        <h4>Reset Password</h4>
        <p className='text-muted'>Please Enter Your OTP or Check Your Inbox</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>

        {/* Email */}
        <div className="input-group mb-3 custom-input">
          <span className="input-group-text border-0" id="basic-addon1">
            <i className="fa-solid fa-mobile-screen iconcolor" aria-hidden="true"></i>
          </span>
          <input
            {...register('email', {
              required: 'Email is Required!',
              pattern: {
                value: /^[A-z0-9._%+-]+@[A-z0-9.-]+\.[a-zA-Z]{2,}$/i,
                message: "Enter your Email Correctly"
              }
            })}
            type="text"
            className="form-control border-0"
            placeholder="Enter your E-mail"
          />
        </div>
        {errors.email && <div className='text-danger mb-1'>{errors.email.message}</div>}

        {/* OTP */}
        <div className="input-group mb-3 custom-input">
          <span className="input-group-text border-0 icon-border" id="basic-addon1">
            <i className="fa-solid fa-lock iconcolor" aria-hidden="true"></i>
          </span>
          <input
            {...register('seed', {
              required: 'OTP is Required!'
            })}
            type="text"
            className="form-control border-0"
            placeholder="OTP"
          />
        </div>
        {errors.seed && <div className='text-danger mb-1'>{errors.seed.message}</div>}

        {/* New Password */}
        <div className="input-group mb-3 custom-input">
          <span className="input-group-text border-0 icon-border" id="basic-addon1">
            <i className="fa-solid fa-lock iconcolor" aria-hidden="true"></i>
          </span>
          <input
            {...register('password', {
              required: 'Password is Required!'
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

        {/* Confirm Password */}
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

        <button className='btn btn w-100 text-white btncolor'>Reset Password</button>
      </form>
    </>
  )
}
