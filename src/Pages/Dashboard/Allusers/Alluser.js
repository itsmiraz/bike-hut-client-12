import { async } from '@firebase/util';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useContext } from 'react';
import toast from 'react-hot-toast';
import LoadingAnimation from '../../../Components/LoadingAnimation/LoadingAnimation';
import { AuthContext } from '../../../Context/UserContext';
import request from '../../../http-common';



const Alluser = () => {
    const { user, logOut } = useContext(AuthContext)
    const { data: users, isLoading, refetch } = useQuery({
        queryKey: ['sellers',user?.email],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/user?email=${user?.email}`, {
                headers: {
                    authorization: `bearer ${localStorage.getItem('bikehutAccessToken')}`
                }
            })
            if (res.status === 401 || res.status === 403) {
                return logOut()
            }
            else {
                const data = await res.json()
                return data
                
            }
        


        }
           
          

 })
          
               
              
                
    if (isLoading) {
        return <LoadingAnimation></LoadingAnimation>
    }


    const handleMakeAdmin = id => {
        fetch(`http://localhost:5000/user/admin/${id}?email=${user?.email}`, {
            method: "PUT",
            headers: {
                authorization: `bearer ${localStorage.getItem('bikehutAccessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {

                console.log(data)
                if (data.modifiedCount > 0) {
                    toast.success('SuccessFully Created Admin')
                    refetch()
                    
                }
            })

    }

    const handledelete = (id) => {


        request.delete(`/user/${id}`)
            .then(data => {
                console.log(data);
                // if (data.deletedCount > 0) {
                toast.success('Buyer Deleted')
                refetch()
                // }

            })
    }

    return (
        <div className='h-screen w-full'>
            <h1 className='text-center text-xl font-semibold'>All Users</h1>

            <div>

                {
                    users.map((user, i) =>
                        <div key={user._id}>
                            <div className='flex  relative py-4 items-center mx-auto rounded-lg  gap-5 px-8 bg-white my-3 text-slate-800 font-semibold w-full md:w-[500px]'>
                                <p>{i + 1}.</p>
                                <div className='flex items-center md:flex-row gap-2 flex-col'>
                                <div className='flex items-center gap-2'>
                                    <p>{user.name}</p>
                                    {
                                        user.verifySeller &&
                                        <p className='bg-blue-500  rounded-full text-white'>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="md:w-6 w-4 md:h-6 w-4">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                                            </svg>

                                        </p>
                                    }
                                  </div>
                                    <p>{user.email}</p>
                                    
                                </div>
                                <div className="dropdown absolute right-4 dropdown-end">
                                    <label tabIndex={0} className=" m-1"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
                                    </svg>
                                    </label>
                                    <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-gray-100 rounded-box w-52">
                                        <li><button onClick={() => handleMakeAdmin(user._id)} className=''>
                                            {
                                                user.role === 'admin' ? 'Admin' : 'Make Admin'
                                            }
                                        </button></li>

                                        <li><button onClick={() => handledelete(user._id)}>Delete</button></li>
                                    </ul>
                                </div>
                            </div>
                        </div>)
                }

            </div>

        </div>
    );
};

export default Alluser;