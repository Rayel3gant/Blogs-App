import React from 'react'
import {  useForm } from 'react-hook-form'
import TagInput from '../components/TagInput'
import { useSelector } from 'react-redux'
import { createBlog } from '../services/operations'

const CreateBlog = () => {
    const { register , handleSubmit ,formState:{errors} ,setValue , getValues}=useForm()
    const { token } =useSelector((state)=>state.profile)
    console.log("token",token)
   
    const submitHandler=async(data)=>{
        console.log(data)
        const result=await createBlog(data,token)
        if(result){

        }
        
    }
  return (
    <div className='w-full min-h-[calc(100vh-4.4rem)]  flexCenter'>
          
        <form onSubmit={handleSubmit(submitHandler)} className='w-11/12 md:w-[60%]  flex flex-col gap-y-6 mx-auto px-4 py-8 rounded-md shadow-md'>
            <div className='text-lg md:text-3xl lg:text-5xl font-bold'>Create New Blog</div>
        
            <div className='flex flex-col '>
                <label htmlFor='title' className='formLabel'>Blog title</label>
                <input type='text' id='title' name='title' className='formInput ' {...register('title',{required:'blog title is required'})} />
                {
                    errors.title && <p className='formError'>{errors.title.message}</p>
                }
            </div>

            <div className='flex flex-col '>
                <label htmlFor='content' className='formLabel '>Content</label>
                <textarea type='text'  id='content' rows={8} name='content' className='formInput resize-none ' {...register('content',{required:'content is required'})} />
                {
                    errors.content && <p className='formError'>{errors.content.message}</p>
                }
            </div>

            <TagInput
                label=" Blog Tags"
                name="tags"
                placeholder="Enter Tags and press Enter"
                register={register}
                errors={errors}
                setValue={setValue}
                getValues={getValues}
                initialTags={[]}
            />

            <button type='submit' className='bg-darkGreen text-[#ffffff] py-2 rounded-md font-semibold'>
                Submit
            </button>

        </form>
    </div>
  )
}

export default CreateBlog