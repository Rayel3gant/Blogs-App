const jwt =require("jsonwebtoken");
require("dotenv").config();

const Authentication= async(req,res,next)=>{
    console.log("authentication of user via token")
    try{
        //fetch token
        const token = req.body.token  || req.header("Authorization").replace("Bearer ","");
        console.log("token:",token)
        if(!token){
            return res.status(401).json({
                success:false,
                message:"token missing , can not authenticate user"
            })
        }


        //decode token
        try{
            const decodedData= jwt.verify(token,process.env.JWT_KEY);
            console.log("decoded data:",decodedData);
            req.user=decodedData;     // we can find id ,e mail from request
        }
        catch(error){
            console.log(error);
            res.status(401).json({
                success:false,
                message:"invalid token"
            })
        }

        next();

        
    }
    catch(error){
        console.log(error);
        res.status(500).json({
            success:false,
            message:"error in user authentication"
        })

    }
}
module.exports=Authentication; 