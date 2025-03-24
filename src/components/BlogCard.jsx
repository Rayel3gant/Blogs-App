import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import TagInput from "./TagInput"
import { updateBlog } from '../services/operations'
import { FaRegPenToSquare } from "react-icons/fa6";
import { MdDeleteOutline } from "react-icons/md";
import { toast } from 'react-toastify'
import { FaHeart } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa6";

function formatDate(timestamp) {
    const date = new Date(timestamp);
    return date.toLocaleDateString("en-GB").replace(/\//g, "-");
}


const BlogCard = ({item,type ,setBlogsUpdate}) => {
    const { register , handleSubmit ,formState:{errors} ,setValue , getValues}=useForm({
        defaultValues: {
          title: item.title, // Set the initial value here
          content:item.content,
          tags:item.tags
        },
    })
    const { token , user } =useSelector((state)=>state.profile)
    console.log("token",token)
    
  

    const submitHandler=async(data)=>{
        const newData={
            updateType:"update",
            blogId:item._id ,
            ...data
        }
        const result=await updateBlog(newData,token)

        if(result){
            setModal(false)
            setBlogsUpdate(true)
        }
        
    }
    
    const [modal,setModal]=useState(false)
    const [commentModal,setCommentModal]=useState(false)
    const [newComment,setNewComment]=useState('')
    


    const deleteHandler=async()=>{
        const data={
            updateType:"delete",
            blogId:item._id
        }
        const result=await updateBlog(data,token)
        if(result){
            setBlogsUpdate(true)
        }
    }

    const commentHandler=async()=>{
        if(!token){
            toast.warn("log in to post comments")
        } else {
            setCommentModal(true)
        }
    }
    const handleChange = (e) => {
        setNewComment(e.target.value);
    };


    const addCommentHandler=async()=>{
        console.log("new comment",newComment)
        const data={
            updateType:"update", 
            blogId:item._id ,  
            comment:newComment
        }

        const result=await updateBlog(data,token)
        if(result){
            setBlogsUpdate(true)
            setCommentModal(false)
        }
    }

    const addLikeHandler=async()=>{
        if(!token){
            toast.warn("log in to like blogs")
            return
        }
        const data={
            updateType:"update", 
            blogId:item._id ,  
            like:true
        }

        const result=await updateBlog(data,token)
        if(result){
            setBlogsUpdate(true)
            setCommentModal(false)
        }
    }
  return (
    <div key={item._id} className='w-full  px-4 py-6 shadow-md relative' >
        <p className='text-customGreen text-[1rem] md:text-2xl font-bold'>{item.title}</p>
        <p className='text-darkGray text-[0.5rem]  md:text-sm mt-2'>
            {
                (item.content.length>1000)? `${item.content.slice(0,1000)}...` : item.content
            }
        </p>

        <p className='text-customGreen mt-1 text-[0.8rem] md:text-[1rem]'> By: {item.userId.userName}</p>
        <p className='text-customGreen mt-1 text-[0.8rem] md:text-[1rem]'>Total Likes : {item.likes.length}</p>
        
        <p className='text-customGreen mt-1 text-[0.8rem] md:text-[1rem]'>Created at: {formatDate(item.createdAt)}</p>

        {
            (item.comments.length> 0 &&  <div className='flex  gap-x-4'>
                <p className='text-customGreen'>Comments:</p>
                <div className='text-[0.8rem] mt-1 text-darkGray'>
                    {
                        item.comments.map((item)=>(
                            <div key={item._id}>{item.comment}</div>
                        ))
                    }
                </div>
            </div>) 
        }


        <div className='flex items-center gap-x-4'>
            {
                (type===2) && <button onClick={()=>setModal(true)} className='mt-4 bg-darkGreen text-white text-[0.7rem] md:text-[1rem] font-bold flex items-center gap-x-3 px-3 md:px-4 py-2 rounded-md hover:scale-95 transition-scale duration-300'>
                    Update Blog
                    <FaRegPenToSquare />
                </button>
            }

            {
                (type===2) && <button onClick={deleteHandler} className='mt-4 bg-red-500 text-white text-[0.7rem] md:text-[1rem] font-bold flex items-center gap-x-3 px-3 md:px-4 py-2 rounded-md hover:scale-95 transition-scale duration-300'>
                    Delete Blog
                    <MdDeleteOutline/>
                </button>
            }
        </div>

        <button onClick={commentHandler}  className='bg-darkGreen mt-3 text-[0.7rem] md:text-[1rem] text-white font-bold px-3  md:px-4 py-2 rounded-md hover:scale-95 transition-scale duration-300'>
            Add a comment
        </button>

        
        <div className='absolute top-[5%] right-2 w-8 h-8 rounded-full flexCenter bg-pink-300 cursor-pointer hover:scale-110 transition-scale duration-1000'>
        {
            (user &&  item.likes.some((like) => like.userId === user._id))? (
                <FaHeart className='text-red-500'/>
            ) : (<FaRegHeart onClick={addLikeHandler} className='text-white'/>)
        }
        </div>

        {
            (modal===true) && 
                <div className="fixed inset-0 z-[1000] !mt-0 grid place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm">
                    <div className='w-11/12 md:w-3/4 bg-[#EAF6F6] flex flex-col gap-y-4 py-6 px-5  rounded-md'>
                        <div onClick={()=>setModal(false)} className='cursor-pointer text-darkGray'>Close x</div>

                        <form onSubmit={handleSubmit(submitHandler)} className='w-11/12 md:w-[60%] bg-white  flex flex-col gap-y-6 mx-auto px-4 py-8 rounded-md shadow-md'>
        
                            <div className='flex flex-col '>
                                <label htmlFor='title' className='formLabel'>Blog title</label>
                                <input type='text' id='title' name='title' className='formInput ' {...register('title',{required:'blog title is required'})} />
                                {
                                    errors.title && <p className='formError'>{errors.title.message}</p>
                                }
                            </div>

                            <div className='flex flex-col '>
                                <label htmlFor='content' className='formLabel '>Content</label>
                                <textarea type='text'  id='content' rows={4} name='content' className='formInput resize-none ' {...register('content',{required:'content is required'})} />
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
                                initialTags={item.tags}
                            />

                            <button type='submit'  className='bg-darkGreen text-[#ffffff] py-2 rounded-md font-semibold'>
                                Update Blog
                            </button>

                        </form>
                    </div>
                </div>
        }

        {
            (commentModal===true) && 
                <div className="fixed inset-0 z-[1000] !mt-0 grid place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm">
                    <div className='w-11/12 md:w-[60%] lg:w-[40%] bg-white flex flex-col gap-y-4 py-6 px-5  rounded-md'>
                        <div onClick={()=>setCommentModal(false)} className='cursor-pointer text-darkGray'>Close x</div>


                        <div className='flex flex-col gap-y-2'>
                            <label htmlFor='comment' className='formLabel'>Comment</label>
                            <input type='text' onChange={handleChange} value={newComment} required id='comment' name='comment' className='w-full formInput' />
                        </div>


                        <button onClick={addCommentHandler}  className='bg-darkGreen mt-3 text-white font-bold  px-4 py-2 rounded-md hover:scale-95 transition-scale duration-300'>
                            Post
                        </button>

                    </div>
                </div>
        }


    </div>
  )
}

export default BlogCard