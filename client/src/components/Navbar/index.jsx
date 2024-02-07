import React from 'react'
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className='fixed text-fontcolor border-b-2 z-30 w-screen max-w-screen gradient-overlay-header py-2 sm:py-4 xs:px-2 sm:px-10 lg:px-24 flex sm:justify-between items-center sm:flex-row flex-col justify-center'>
        <Link>
        <p className='relative text-3xl sm:text-4xl font-extrabold tracking-tighter cursor-pointer'><span className='text-primary'>Short</span>Monkey</p>
        </Link>
        <div className='mt-2 sm:mt-0 w-full sm:w-fit flex justify-between sm:justify-items-none z-30 items-center px-4 sm:px-0'>
          <div className='flex items-center'>
            <button className='bg-primary text-sm py-2 px-2 tracking-tighter sm:tracking-normal sm:px-4 rounded-lg font-semibold hover:bg-indigo-500 duration-150 text-white'>Sign Out</button>
          </div>
        </div>
    </div>
  )
};

export default Navbar;