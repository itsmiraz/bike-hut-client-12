import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid'
import logo from '../../assets/Logo/BIKEHUTLOGO.png'


const Header = () => {
    const [open, setOpen] = useState(false)
    return (
        <div className='bg-white  text-slate-900 items-center md:px-10 px-4 py-3 flex justify-between w-full'>

            <img className='w-40' src={logo} alt="" />

            <div>
                <ul className={`md:flex bg-white right-0 z-0 items-center w-full text-slate-900 text-center justify-center md:static duration-300 ease-linear absolute ${open ? 'top-12' : 'top-[-450px]'}`}>
                    <li className='font-semibold mr-4'>
                        <Link>Home</Link>
                    </li>
                    <li className='font-semibold mr-4'>
                        <Link>Rooms</Link>
                    </li>
                    <li className='font-semibold mr-4'>
                        <Link>Books</Link>
                    </li>
                    <li className='font-semibold mr-4'>
                        <Link to='/login'>
                            <button type="button" className="px-4 py-2 font-semibold rounded-full border border-teal-500 text-gray-800">Sign In</button>

                        </Link>
                    </li>
                    <li className='font-semibold mr-4'>
                        <button type="button" className="px-4 py-2 font-semibold rounded-full bg-teal-500 text-white">Sing Out</button>
                    </li>

                </ul>
                <div onClick={() => setOpen(!open)} className="h-8 p-1 rounded-full bg-teal-500 text-white w-8 md:hidden" >
                    {open ? <XMarkIcon />
                        : <Bars3Icon />
                    }
                </div>
            </div>
        </div >
    );
};

export default Header;