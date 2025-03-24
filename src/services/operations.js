import { apiConnector } from "./apiConnector"
import { toast } from "react-toastify"
import axios from "axios"
import { endpoints } from "./apis"
import { setToken , setUser } from "../redux/slices/profileSlice"

export const signup = async(data) =>{
    try{
        const response = await apiConnector("POST",endpoints.SIGNUP_API, data)

        console.log("SIGNUP API RESPONSE............", response)

        if (!response.data.success) {
            toast.error(response.data.message)
            throw new Error(response.data.message)
        }
        toast.success("Sign up success")
        return true
    } catch(error){
        console.log("SIGNUP API ERROR............", error)
        if (axios.isAxiosError(error)) {
            // Handle Axios-specific errors
            if (error.response) {
                console.log('Error response data:', error.response.data); // Server response
                toast.error(error.response.data.message)
            } 
        }
        return false
    }
}

export const login = async(data, dispatch)=> {
    try{
        const response = await apiConnector("POST", endpoints.LOGIN_API, data)

        console.log("LOGIN API RESPONSE............", response)

        if ( !response.data.success) {
            toast.error(response?.data?.message)
            throw new Error(response.data?.message)
        }
        
        dispatch(setUser(response.data.user))
        dispatch(setToken(response.data.user.token))

        localStorage.setItem("token", JSON.stringify(response.data.user.token))
        localStorage.setItem("user", JSON.stringify(response.data.user))

        toast.success("User logged in")

        console.log("moving to dashboard")
        return true

    } catch(error){
        console.log("LOGIN API ERROR............", error)
        if (axios.isAxiosError(error)) {
            // Handle Axios-specific errors
            if (error.response) {
                console.log('Error response data:', error.response.data); // Server response
                toast.error(error.response.data.message)
            } 
        }

        return false

    }
}

export const logout = async( dispatch,navigate) => {
    try {
        // Clear the token and user data from state
        dispatch(setToken(null));
        dispatch(setUser(null));

        // Remove items from local storage
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        toast.success("User logged out")
        console.log("User logged out");

        // Navigate to the login page or home
        navigate("/")
        return true

    } catch (error) {
        console.error("Error during logout:", error);
        return false
    }
};


export const createBlog=async(data , token)=>{

    try {
        const response = await apiConnector("POST", endpoints.CREARE_BLOG_API, data, 
            {
                Authorization: `Bearer ${token}`,
            }
        )

        toast.success("BLOG cretaed")
        console.log("CREATE BLOG API RESPONSE............", response)
        if (!response?.data?.success) {
            throw new Error("Could Not Create blog")
        }
        toast.success("Blog created!!!")

        return true

    } catch(error){
        console.log("LOGIN API ERROR............", error)
        if (axios.isAxiosError(error)) {
            // Handle Axios-specific errors
            if (error.response) {
                console.log('Error response data:', error.response.data); // Server response
                toast.error(error.response.data.message)
            } 
        }
        return false
    }
}

export const updateBlog =async(data , token )=>{
    console.log(data)
    try{
        const response = await apiConnector("POST",endpoints.UPDATE_BLOG_API,data, 
        {
            Authorization: `Bearer ${token}`,
        }
    )
      console.log("UPDATE BLOG API RESPONSE............", response)

      if(response.data.success){
        return true
      }

    } catch(error){
        console.log("UPDATE BLOG API ERROR............", error)
        if (axios.isAxiosError(error)) {
            // Handle Axios-specific errors
            if (error.response) {
                console.log('Error response data:', error.response.data); // Server response
                toast.error(error.response.data.message)
            } 
        }
        return false

    }
}

export const getAllBlogs=async()=>{
    let result = []

    try {
        const response = await apiConnector("GET", endpoints.GET_ALL_BLOGS_API)
        console.log("GET_ALL_BLOGS API RESPONSE............", response)
  
      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      result = response?.data?.data
    } catch (error) {
      console.log("GET_ALL_BLOGS_API  ERROR............", error)
      result = error.response.data
    }
    return result
}



export const getUserBlogs=async(token)=>{
    let result = []

    try {
        const response = await apiConnector("GET", endpoints.GET_USER_BLOGS_API,null,
            {
                Authorization: `Bearer ${token}`,
            }
        )
        console.log("GET_USER_BLOGS API RESPONSE............", response)
  
      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      result = response?.data?.data
    } catch (error) {
      console.log("GET_ALL_BLOGS_API  ERROR............", error)
      result = error.response.data
    }
    return result
}

export const updateProfile=async(data,token)=>{
    console.log(data)
    try{
        const response = await apiConnector("POST",endpoints.UPDATE_PROFILE_API,data, 
        {
            Authorization: `Bearer ${token}`,
        }
    )
      console.log("UPDATE PROFILE API RESPONSE............", response)

      if(response.data.success){
        return true
      }

    } catch(error){
        console.log("UPDATE PROFILE API ERROR............", error)
        if (axios.isAxiosError(error)) {
            // Handle Axios-specific errors
            if (error.response) {
                console.log('Error response data:', error.response.data); // Server response
                toast.error(error.response.data.message)
            } 
        }
        return false

    }
}


export const getFilterBlogs=async(data)=>{
    let result = []

    try {
        const response = await apiConnector("POST", endpoints.GET_FILTER_BLOGS_API,data)
        console.log("GET_FILTER_BLOGS API RESPONSE............", response)
  
      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      result = response?.data?.data
    } catch (error) {
      console.log("GET_FILTER_BLOGS_API  ERROR............", error)
      result = error.response.data
    }
    return result
}







