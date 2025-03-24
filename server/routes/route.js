const express=require("express")
const { signup, login, updateProfile } = require("../controllers/authController")
const Authentication = require("../middlewares/Authentication")
const { createBlog, updateBlog, getAllBlogs, getUserBlogs, getFilterBlogs } = require("../controllers/blogController")
const router=express.Router()

router.post("/signup",signup)
router.post("/login",login)
router.post("/updateProfile",Authentication,updateProfile)

router.post("/createBlog",Authentication,createBlog)
router.post("/updateBlog",Authentication,updateBlog)
router.get("/getAllBlogs",getAllBlogs)
router.get("/getUserBlogs",Authentication,getUserBlogs)
router.post("/getFilterBlogs",getFilterBlogs)


module.exports=router