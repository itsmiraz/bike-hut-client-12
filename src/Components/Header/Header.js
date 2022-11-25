import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid'
import logo from '../../assets/Logo/BIKEHUTLOGO.png'
import { useContext } from 'react';
import { AuthContext } from '../../Context/UserContext';


const Header = () => {

    const { user, logOut, } = useContext(AuthContext)

    const [open, setOpen] = useState(false)


    const handleSingOut = () => {
        logOut()
            .then(result => {
                
            })
            .catch(error => {
                console.log(error);
            })
    }

    return (
        <div className='bg-white  text-slate-900 items-center md:px-10 px-4 py-3 flex justify-between w-full'>

            <img className='w-40 z-50' src={logo} alt="" />

            <div>
                <ul className={`md:flex bg-white right-0 z-10 items-center w-full text-slate-900 text-center justify-center md:static duration-300 ease-linear absolute ${open ? 'top-16' : 'top-[-450px]'}`}>
                    <li className='font-semibold mr-4'>
                        <Link to='/'>Home</Link>
                    </li>
                    <li className='font-semibold mr-4'>
                        <Link to='/blogs'>Blogs</Link>
                    </li>
                    <li className='font-semibold mr-4'>
                        <Link to='/dashboard/userpage'>Dashboard</Link>
                    </li>
                    {
                        user?.uid ?

                            <>

                                <li className='font-semibold mr-4'>
                                    <img className='w-10 rounded-full h-10' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNL_ZnOTpXSvhf1UaK7beHey2BX42U6solRA&usqp=CAU' alt="" />

                                </li>

                                <li className='font-semibold mr-4'>
                                    <button onClick={handleSingOut}  type="button" className="px-4 py-2 font-semibold rounded-full border border-teal-500 text-gray-800">Sign Out</button>

                                </li>

                            </>
                            :
                            <>
                                <li className='font-semibold mr-4'>
                                    <Link to='/login'>
                                        <button type="button" className="px-4 py-2 font-semibold rounded-full border border-teal-500 text-gray-800">Sign In</button>

                                    </Link>
                                </li>
                                <li className='font-semibold mr-4'>
                                    <button type="button" className="px-4 py-2 font-semibold rounded-full bg-teal-500 text-white">Sing Out</button>
                                </li>

                            </>
                    }

                </ul>
                <div onClick={() => setOpen(!open)} className="h-8 p-1 z-40 rounded-full bg-teal-500 text-white w-8 md:hidden" >
                    {open ? <XMarkIcon />
                        : <Bars3Icon />
                    }
                </div>
            </div>
        </div >
    );
};

export default Header;