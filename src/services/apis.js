const BASE_URL =process.env.REACT_APP_BASE_URL




export const endpoints = {
  SIGNUP_API: BASE_URL + "/signup",
  LOGIN_API: BASE_URL + "/login",
  GET_ALL_BLOGS_API: BASE_URL + "/getAllBlogs",
  CREARE_BLOG_API:BASE_URL + "/createBlog",
  UPDATE_BLOG_API : BASE_URL + "/updateBlog",
  GET_USER_BLOGS_API: BASE_URL + "/getUserBlogs",
  UPDATE_PROFILE_API : BASE_URL +"/updateProfile",
  GET_FILTER_BLOGS_API:BASE_URL+"/getFilterBlogs"
}