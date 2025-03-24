import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getUserBlogs } from '../services/operations'
import BlogCard from '../components/BlogCard'

const MyBlogs = () => {
  const [blogs,setBlogs]=useState([])
  const [blogsUpdate,setBlogsUpdate]=useState(false)
  const { token } =useSelector((state)=>state.profile)
  const fetchUserBlogs=async()=>{
    const result=await getUserBlogs(token)
    if(result){
      setBlogs(result)
    }
  }

  useEffect(()=>{
    fetchUserBlogs()
  },[])

  useEffect(()=>{
    if(blogsUpdate===true){
        setBlogsUpdate(false)
        fetchUserBlogs()
    }
  },[blogsUpdate])


  return (
    <div className='generalContainer'>
      {
        (blogs.length===0) ? (
          <div className='w-full h-[calc(100vh-4.5rem)] flex items-center justify-center text-xl md:text-3xl lg:text-5xl font-bold text-darkGreen'>
            you have created a grand total of 0 blogs...
          </div>
        ) : (
          <div className='w-full h-[calc(100vh-4.5rem)] flex flex-col gap-y-5 my-6'>
          {
            blogs.map((item)=>(
              <BlogCard key={item._id} item={item} type={2} setBlogsUpdate={setBlogsUpdate}/>
            ))
          }
          </div>
        )
      }
    </div>
  )
}

export default MyBlogs