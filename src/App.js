import React from 'react'
import Navbar from './components/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Profile from './pages/Profile'
import CreateBlog from './pages/CreateBlog'
import MyBlogs from './pages/MyBlogs'

const App = () => {
  return (
    <div className='w-full min-h-screen hide-scrollbar overflow-y-scroll'>
      <Navbar/>

      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/signup' element={<Signup/>} />
        <Route path='/profile' element={<Profile/>} />
        <Route path='/createBlog' element={<CreateBlog/>} />
        <Route path='/myBlogs' element={<MyBlogs/>} />
      </Routes>
    </div>
  )
}

export default App