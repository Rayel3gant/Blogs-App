import React, { useEffect, useState } from 'react'
import { getAllBlogs, getFilterBlogs } from '../services/operations'
import BlogCard from '../components/BlogCard'
import TagInput from '../components/TagInput'
import { useForm } from 'react-hook-form'

const Home = () => {
    const [blogs,setBlogs]=useState([])
    const [tags,setTags]=useState([])
    const { register , handleSubmit ,formState:{errors} ,setValue , getValues}=useForm()
    const [blogsUpdate,setBlogsUpdate]=useState(false)

    const fetchBlogs=async()=>{
        try{
            const result=await getAllBlogs()
            if(result){
                setBlogs(result)
            }
        } catch(error){
            console.log(error)
        }
    }
    useEffect(()=>{
        fetchBlogs()
    },[])

    useEffect(()=>{
        if(blogsUpdate===true){
            setBlogsUpdate(false)
            fetchBlogs()
        }
    },[blogsUpdate])

    const getFilterBlogsData=async(data)=>{
        console.log(data)
        const result=await getFilterBlogs(data)
        if(result){
            setBlogs(result)
        }
    }

    const resetHandler=()=>{
        
    }
  return (
    <div className='generalContainer  '>
        <div>
            <div> Add Filters:</div>

            <form onSubmit={handleSubmit(getFilterBlogsData)}>
                <TagInput
                    name="tags"
                    placeholder="Enter Tags and press Enter"
                    register={register}
                    errors={errors}
                    setValue={setValue}
                    getValues={getValues}
                    initialTags={tags}
                />

                <div className='w-fit flex items-center gap-x-4'>
                    <button type='submit'  className='bg-darkGreen mt-3 text-[0.7rem] md:text-[1rem] text-white font-bold px-3  md:px-4 py-2 rounded-md hover:scale-95 transition-scale duration-300'>
                        Get Blogs
                    </button>

                    <div onClick={fetchBlogs}  className='bg-darkGreen mt-3 cursor-pointer text-[0.7rem] md:text-[1rem] text-white font-bold px-3  md:px-4 py-2 rounded-md hover:scale-95 transition-scale duration-300'>
                        Reset
                    </div>
                </div>
            </form>    
        </div>
        {
            (blogs.length===0)? (
                <div className='w-full h-[calc(100vh-15rem)] flexCenter text-customGreen text-xl lg:text-2xl '>
                    No Blogs Available Now...
                </div>
            ) : (
                <div className='w-full min-h-[calc(100vh-5rem)] flex flex-col my-6 gap-y-5   '>

                
                {
                    blogs.map((item)=>(
                        <BlogCard key={item._id} item={item} setBlogsUpdate={setBlogsUpdate} />
                    ))
                }
                </div>
            )
        }
    </div>
  )
}

export default Home