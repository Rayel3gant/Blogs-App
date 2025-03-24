import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import ProfileDropdown from './ProfileDropdown'

const Navbar = () => {
    const { token } =useSelector((state)=>state.profile)
  return (
    <div className='generalContainer py-2 md:py-4 flex justify-between items-center '>
        <div className='text-customGreen text-[1rem] md:text-2xl lg:text-3xl font-semibold'>
            Blogs App
        </div>

        <div className='flex w-fit items-center gap-x-4'>
            <Link to="/" className=' text-darkGray text-[0.6rem] md:text-[1rem] hover:scale-105 transition-scale duration-500'>Home</Link>
            
            {
                (token) && <ProfileDropdown/>
            }

            

            {
                (!token) && <Link to="/signup" >
                    <button className='bg-customGreen px-5 py-1 text-[0.6rem] md:text-[1rem] rounded-3xl text-[#D9EEE6] hover:scale-105  transition-scale duration-500'>Sign up</button>
                </Link>
            }

            {
                (!token) && <Link to="/login">
                    <button className='px-5 py-1 rounded-3xl text-[#4DB288] text-[0.6rem] md:text-[1rem] bg-white border border-[#4DB288] hover:scale-105 transition-scale duration-500'>Log in</button>
                </Link>
            }

            
        </div>
    </div>
  )
}

export default Navbar