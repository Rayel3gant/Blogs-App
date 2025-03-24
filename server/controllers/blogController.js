const Blog=require("../models/Blog")

const createBlog=async(req,res)=>{
    try{
        const { title , content , tags }=req.body;
        const userId=req.user.id;

        if(!title || !content || !tags || !userId){
            return res.status(403).json({
                success:false,
                message:"data missing"
            })
        }

        const newBlog=await Blog.create({
            title,
            content,
            tags,
            userId:userId
        })

        return res.status(200).json({
            success:true,
            message:"blog created",
            data:newBlog
        })
        
    } catch(error){
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"error in creating blog"
        })
    }
}

const updateBlog=async(req,res)=>{
    try{
        const { updateType , blogId , title , content , tags , comment, like } =req.body;

        if(!blogId || !updateType){
            return res.status(403).json({
                success:false,
                message:"data missing"
            })
        }

        const blogData=await Blog.findById(blogId)
        if(!blogData){
            return res.status(404).json({
                success:false,
                message:"blog not found"
            })
        }
        if(updateType==="delete"){
            await Blog.findByIdAndDelete(blogId)
            return res.status(200).json({
                success:true,
                message:"blog deleted"
            })
        } else {

            const userId=req.user.id;
            const updateFields = {};
            if (title && title !== blogData.title) updateFields.title = title;
            if (content && content !== blogData.content) updateFields.content = content;
            if (tags && tags !== blogData.tags) updateFields.tags = tags;


            let updatedBlog;
            // if no data given ,return
            if (Object.keys(updateFields).length !== 0) {
                updatedBlog = await Blog.findByIdAndUpdate(
                    blogId,
                    { $set: updateFields },
                    { new: true }
                )
            }

            if(comment){
                const userAlreadyCommented = blogData.comments.some(
                    (comment) => comment.userId.toString() === userId.toString()
                );

                if(!userAlreadyCommented){
                    await Blog.findByIdAndUpdate(
                        blogId,
                        {
                            $push:{
                                comments:{
                                    userId,
                                    comment
                                }
                            }
                        },
                        {new:true}
                    )
                }
                
            }

            if(like){

                if(!blogData.likes.includes(userId)){
                    await Blog.findByIdAndUpdate(
                        blogId,
                        {
                            $push:{
                                likes:{
                                    userId,
                                }
                            }
                        },
                        {new:true}
                    )
                }

                
            }

            

            res.status(200).json({
                success:true,
                message:"blog updated",
                data:updatedBlog
            })
        }
    } catch(error){
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"error in updating blog"
        })
    }
}

const getAllBlogs=async(req,res)=>{
    try{
        const blogsData=await Blog.find()
        .populate({
            path:'userId',
            select:"userName"
        })
        .populate({
            path: "comments.userId",
            select: "userName", 
        }).sort({createdAt:-1})
        .exec()

        return res.status(200).json({
            success:true,
            message:"blogs data",
            data:blogsData
        })
    } catch(error){
        console.log(error)
        res.status(500).json({
            success:false,
            message:"can not fetch blogs"
        })
    }
}

const getUserBlogs=async(req,res)=>{
    try{
        const userId=req.user.id;
        if(!userId){
            return res.status(403).json({
                success:false,
                message:"user id missing"
            })
        }

        const blogsData=await Blog.find({
            userId:userId
        })
        .populate({
            path: "comments.userId",
            select: "userName", 
        })
        .populate({
            path:'userId',
            select:"userName"
        })
        .exec()

        res.status(200).json({
            success:true,
            message:"user blogs fetched",
            data:blogsData
        })
    } catch(error){
        console.log(error)
        res.status(500).json({
            success:false,
            message:"could nnot fetch user blogs"
        })
    }
}


const getFilterBlogs=async(req,res)=>{
    try{
        const { tags } =req.body;
        if(!tags){
            return res.status(403).json({
                success:false,
                message:"filter tags missing"
            })
        }

        const blogsData=await Blog.find({
            tags: { $in: tags },
        })


        res.status(200).json({
            success:true,
            message:"filter blogs",
            data:blogsData
        })


    } catch(error){
        console.log(error)
        res.status(500).json({
            success:false,
            message:"error in getting filter blogs"
        })
    }
}
module.exports = { createBlog , updateBlog , getAllBlogs , getUserBlogs ,getFilterBlogs}