import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { IoEyeOffSharp } from "react-icons/io5";
import { IoEyeSharp } from "react-icons/io5";
import { signup } from '../services/operations';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const { register , handleSubmit , formState:{errors}}=useForm()
  const [passwordType,setPasswordType]=useState('password')
  const navigate=useNavigate()

  const passwordHandler=()=>{
    if(passwordType==='text'){
      setPasswordType('password')
    } else { 
      setPasswordType('text')
    }
  }
  const submitHandler=async(data)=>{
    console.log(data)
    const result=await signup(data)
    if(result){
      navigate("/login")
    }
  }
  return (
    <div className='w-full min-h-[calc(100vh-4.5rem)]  flexCenter'>
      
      <form onSubmit={handleSubmit(submitHandler)} className='w-11/12 md:w-[60%] lg:w-[40%] flex flex-col gap-y-6 mx-auto px-4 py-8 rounded-md shadow-md'>
        <div className='text-lg md:text-3xl lg:text-5xl font-bold'>Sign up form</div>
        
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
            <input type={passwordType} id='password' name='password' className='formInput w-full' {...register('password', { 
              required: 'Password is required', 
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

export default Signup