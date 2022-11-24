import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

const AllSellers = () => {


    const [sellers, setsellers] = useState([])
    useEffect(() => {
        fetch('http://localhost:5000/user')
            .then(res => res.json())
            .then(data => {
                const users = data.filter(user => user.role === 'Seller')
                setsellers(users)
            })


    }, [])

    const handleMakeAdmin = (id) => {

    }

    return (
        <div className='h-screen  w-full'>
            <div>
            <h1 className='text-xl my-10 font-semibold text-center'>All Sellers</h1>
            </div>
            <div>
                {
                    sellers.map((user, i) =>
                        <div key={user._id}>
                            <div className='flex  relative py-4 items-center mx-auto rounded-lg  gap-5 px-8 bg-white my-3 text-slate-800 font-semibold w-full md:w-[500px]'>
                                <p>{i + 1}</p>
                                <div className='flex md:flex-row gap-2 flex-col'>
                                    <p>{user.name}</p>
                                    <p>{user.email}</p>
                                </div>
                                <div className="dropdown absolute right-4 dropdown-end">
                                    <label tabIndex={0} className=" m-1"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
                                    </svg>
                                    </label>
                                    <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-gray-100 rounded-box w-52">
                                        {/* <li><button onClick={() => handleMakeAdmin(user._id)} className='text-white'>
                                            {
                                                user.role === 'admin' ? 'Admin' : 'Make Admin'
                                            }
                                        </button></li> */}
                                        <li><button className=''>Verify Seller</button></li>
                                    </ul>
                                </div>
                            </div>
                        </div>)
                }
            </div>
        </div>
    );
};

export default AllSellers;