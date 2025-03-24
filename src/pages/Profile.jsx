import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { IoEyeOffSharp } from "react-icons/io5";
import { IoEyeSharp } from "react-icons/io5";
import { logout, updateProfile } from '../services/operations';

const Profile = () => {
  const { user , token } =useSelector((state)=>state.profile)
  const { register , handleSubmit , formState:{errors}}=useForm({
    defaultValues: {
      userName: user.userName, // Set the initial value here
      email:user.email,
    },
  })
  const [passwordType,setPasswordType]=useState('password')
  const navigate=useNavigate()
  const dispatch=useDispatch()

  const passwordHandler=()=>{
    if(passwordType==='text'){
      setPasswordType('password')
    } else { 
      setPasswordType('text')
    }
  }
  const submitHandler=async(data)=>{
    console.log(data)
    const result=await updateProfile(data,token)
    if(result){
      await logout(dispatch,navigate)
    }
  }

  return (
    <div className='generalContainer'>
      <div className='text-xl md:text-3xl lg:text-5xl font-bold text-black'>Hello, {user.userName}</div>
      <div className='text-xs md:text-lg lg:text-xl text-black lg:mt-2'>Welcome to your profile!</div>

      <form onSubmit={handleSubmit(submitHandler)} className='w-11/12 md:w-[60%] lg:w-[40%] mt-4 flex flex-col gap-y-6 mx-auto px-4 py-8 rounded-md shadow-md'>
        <div className='text-lg md:text-3xl lg:text-5xl font-bold'>Update Details</div>
              
              
        <div className='flex flex-col '>
          <label htmlFor='userName' className='formLabel'>Username</label>
          <input type='text' id='userName' name='userName' className='formInput ' {...register('userName',{required:'username is required'})} />
          {
            errors.userName && <p className='formError'>{errors.userName.message}</p>
          }
        </div>

        <div className='flex flex-col '>
          <label htmlFor='email' className='formLabel '>Email</label>
          <input type='email' id='email' name='email' className='formInput ' {...register('email',{required:'Email is required'})} />
          {
            errors.email && <p className='formError'>{errors.email.message}</p>
          }
        </div>

        <div className='flex flex-col  '>
          <label htmlFor='password' className='formLabel'>Password</label>

          <div className='w-full relative'>
            <input placeholder='please enter your new password ' type={passwordType} id='password' name='password' className='formInput w-full' {...register('password', { 
              minLength: { value: 8, message: 'Password must be at least 8 characters' }
            })} /> 
            <div onClick={passwordHandler} className='absolute top-[30%] right-2 text-darkGray'>
            {
              (passwordType==="text")? (<IoEyeOffSharp/>):(<IoEyeSharp/>)
            }
            </div>
          </div>

          {
            errors.password && <p className='formError'>{errors.password.message}</p>
          }
        </div>


        <button type='submit' className='bg-darkGreen text-[#ffffff] py-2 rounded-md font-semibold'>
          Submit
        </button>

      </form>


    </div>
  )
}

export default Profile