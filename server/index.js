const express=require("express")
const app=express()
require("dotenv").config()
const cors=require("cors");
const dbConnection = require("./config/dbConnection");
const port=process.env.BACKEND_PORT ||3003;
const appRoutes=require("./routes/route")

app.use(express.json());
app.use(cors({
    origin:"*",     
    credentials:true, 
}))

dbConnection();

app.use("/api",appRoutes)


//default route
app.get("/" ,(req,res)=>{
    return res.json({
        success:true,
        message:"server actication successful"
    })
})

app.listen(port, () =>{
    console.log("server started successfully on port ", port);
})
