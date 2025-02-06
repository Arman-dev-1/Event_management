import React from "react";
import Image from "next/image";

const Navbar = ({ Is_Logged, handlepublish, handlelogin, handlesignup, handleprofile }) => {
  return (
    <div className="flex w-full m-0 h-24 justify-center items-center mb-12">
      <div className="flex md:w-[80%] w-[90%] border border-white/30 rounded-lg backdrop-blur-md bg-white/10 shadow-lg items-center justify-between h-[90%]">
        <div className="flex items-center justify-center w-1/6 text-black font-bold text-2xl">
          {/* <Image 
            src='/logo.png'
            alt='logo'
            width={100}
            height={100}
            className='flex items-center justify-center'
          /> */}
          Logo
        </div>

        <div className="flex items-center justify-center h-full w-1/4">
          {Is_Logged === true ? (
            <div className="flex items-center justify-center h-full w-full gap-4">
              <button className="px-4 py-2 text-black hover:text-gray-500 rounded-lg shadow-md transition" onClick={handlepublish}>
                Publish Event
              </button>
              <button className="px-4 py-2 text-black hover:text-gray-500 rounded-lg shadow-md transition" onClick={handleprofile}>
                Profile
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-evenly h-full w-full">
              <button className="px-4 py-2 text-black rounded-lg hover:text-gray-500 shadow-md transition" onClick={handlesignup}>
                Sign Up
              </button>
              <button className="px-4 py-2 text-black rounded-lg hover:text-gray-500 shadow-md transition" onClick={handlelogin}>
                Log In
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
