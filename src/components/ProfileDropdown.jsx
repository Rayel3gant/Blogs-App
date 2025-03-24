import React, { useState, useRef, useEffect } from "react";
import { FaChevronDown, FaUser, FaCog, FaSignOutAlt } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../services/operations";

const ProfileDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const dispatch=useDispatch()
  const navigate=useNavigate()

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const logoutHandler=async()=>{
    const result=await logout(dispatch)
    if(result){
      navigate("/")
    }
  }

  return (
    <div className="relative " ref={dropdownRef}>
      <div
        className="text-darkGray text-[0.6rem]  md:text-[1rem] hover:scale-105 transition-scale duration-500 cursor-pointer"
        onClick={toggleDropdown}
      >
        Dashboard
      </div>
      {isOpen && (
        <div className="absolute right-0 z-10 w-28 md:w-48 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg">
          <ul className="py-1 text-sm text-gray-700">
            <li>
              <Link to="/profile"
                className="flex items-center w-full px-4 py-2 hover:bg-gray-100 cursor-pointer"
              >
                <FaUser className="w-4 h-4 mr-2" />
                <p className="text-[0.6rem] md:text-[1rem]  text-darkGray" >My Profile</p>
              </Link>
            </li>

            <li>
              <Link to="/myBlogs"
                className="flex items-center w-full px-4 py-2 hover:bg-gray-100 cursor-pointer"
              >
                <FaUser className="w-4 h-4 mr-2" />
                <p className="text-[0.6rem] md:text-[1rem]  text-darkGray" >My Blogs</p>
              </Link>
            </li>

            <li>
              <Link to="/createBlog"
                className="flex items-center w-full px-4 py-2 hover:bg-gray-100"
              >
                <FaCog className="w-4 h-4 mr-2" />
                <p className="text-[0.6rem] md:text-[1rem]  text-darkGray" >Create Blog</p>
                
              </Link>
            </li>
            <li>
              <button onClick={logoutHandler}
                className="flex items-center w-full px-4 py-2 text-red-600 hover:bg-red-100"
              >
                <FaSignOutAlt className="w-4 h-4 mr-2" />
                <p className="text-[0.6rem] md:text-[1rem]  text-red-600" >Log Out</p>
                
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
