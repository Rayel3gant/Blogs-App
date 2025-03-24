
require("dotenv").config()

const User=require("../models/User")
const bcrypt =require("bcrypt")
const jwt=require("jsonwebtoken")

const signup=async(req,res)=>{
    try{

        //fetch data from request
        const { userName , email , password} =req.body;
       

        if(!userName || !email ||!password){
            return res.status(403).json({
                success:false,
                message:"data missing"
            })
        }
        

        //search if user already exists
        const searchUserData=await User.findOne({email:email});
        if(searchUserData){
            return res.status(400).json({
                success:false,
                message:"User already exists!!!",
            })
        }

        //hash the password

        const encryptionRounds=10;
        const hashedPassword =await bcrypt.hash(password,encryptionRounds);

        //save user  in db
        const newUser =await User.create({
           userName,
           email,
           password:hashedPassword
        })

        return  res.status(200).json({
            success:true,
            message:"User sign up successful",
            data:newUser
        })
    }
    catch(error){
        console.log(error);
        res.status(500).json({
            success:false,
            message:"can't sign up now"
        })
    }
}


const login=async(req,res)=>{
    try{

        //fetch data from req
        const { email ,password } =req.body;

        if( ! email || !password){
            return res.status(403)({
                success:false,
                message:"data missing!!"
            })
        }

        const userData =await User.findOne({email:email})

        if(!userData){
            return res.status(401).json({
                success:false,
                message:"User not found , create a new account"
            })
        }

        //match passwords  => create jwt

        if(await bcrypt.compare(password ,userData.password)){

            const payload={
                email:userData.email,
                id:userData._id,
            }
            const token =jwt.sign(payload,process.env.JWT_KEY,{
                expiresIn:"24h"
            })

            userData.token=token;
            userData.password="";
            
            console.log("user login successful")
            res.status(200).json({
                success:true,
                message:"log in successful",
                user:userData
            })
        }
        else{
            console.log("login failed => incorrect password")
            return res.status(401).json({
                success:false,
                message:"incorrect password"
            })
        }
    }
    catch(error){
        console.log(error);
        res.status(500).json({
            success:false,
            message:"Log in failed!!!"
        })
    }
}

const updateProfile=async(req,res)=>{
    try{
        const userId=req.user.id;
        const { userName , email , password }=req.body;
        if(!userId){
            return res.status(403).json({
                success:false,
                message:"user id missing"
            })
        }

        const userData=await User.findById(userId);
        if(!userData){
            return res.status(404).json({
                success:false,
                message:"user not found!!"
            })
        }

        const updateFields = {};
        if (userName && userName !== userData.userName) updateFields.userName= userName;
        if (email && email !== userData.email) updateFields.email= email;

        if(password){
            const encryptionRounds=10;
            const hashedPassword =await bcrypt.hash(password,encryptionRounds);
            updateFields.password=hashedPassword;
        }
  
        let updatedUser;
        // if no data given ,return
        if (Object.keys(updateFields).length !== 0) {
            updatedUser = await User.findByIdAndUpdate(
                userId,
                { $set: updateFields },
                { new: true }
            )
        }

        res.status(200).json({
            success:true,
            message:"user updated",
            data:updatedUser
        })


    } catch(error){
        console.log(error)
        res.status(500).json({
            success:false,
            message:"could not update user profile"
        })
    }
}

module.exports= { signup , login , updateProfile}