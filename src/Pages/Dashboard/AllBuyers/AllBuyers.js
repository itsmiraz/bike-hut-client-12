import { async } from '@firebase/util';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useContext } from 'react';
import toast from 'react-hot-toast';
import LoadingAnimation from '../../../Components/LoadingAnimation/LoadingAnimation';
import { AuthContext } from '../../../Context/UserContext';
import useTitle from '../../../Hooks/useTitle/useTitle';
import request from '../../../http-common';

const AllBuyers = () => {
    useTitle('All Buyers')
    const {user,logOut} = useContext(AuthContext)
    

  

    const {data:buyers,isLoading,refetch } = useQuery({
        queryKey: ['buyers',user?.email],
        queryFn: async () => {
            try {
                const { data } = await request.get(`/user?email=${user?.email}`, {
                    headers: {
                        authorization: `bearer ${localStorage.getItem('bikehutAccessToken')}`,
                    }
                })
                const users = data.filter(user => user.role === 'Buyer')
                return users
               
            }
            catch(error) {
                if (error.response) {
                    console.log(error.response.status);
                    if (error.response.status === 401 || error.response.status === 403) {
                        return logOut()
                    }
                } 
            }
         
        }
    })

    if (isLoading) {
        return <LoadingAnimation></LoadingAnimation>
    }
    const handledelete = (id) => {


        fetch(`https://bike-hut-server.vercel.app/user/${id}`, {
            method: "DELETE",
            headers: {
                authorization: `bearer ${localStorage.getItem('bikehutAccessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.deletedCount > 0) {
                    toast.success('Buyer Deleted')
                    refetch()  
                }
                
        })



    }

    return (
        <div className='h-screen px-4 w-full'>
            <div>
                <h1 className='text-xl my-10 font-semibold text-center'>All Buyers</h1>
            </div>
            {

                buyers.length === 0 ?
                    <>
                        <p className='my-10 font-semibold text-center'>0 buyers Found</p>
                    </>
                    :
                    <>
                        <div>
                            {
                                buyers.map((user, i) =>
                                    <div key={user._id}>
                                        <div className='flex flex-row relative py-4 items-center mx-auto rounded-lg  gap-5  bg-white my-3 text-slate-800 font-semibold px-2 w-full md:w-[500px]'>
                                            <p>{i + 1}</p>
                                            <div className='flex items-center md:flex-row gap-2 flex-col'>
                                                <p>{user.name}</p>
                                                <p className='text-sm'>{user.email}</p>
                                            </div>
                                            <div className="dropdown absolute right-4 dropdown-end">
                                                <label tabIndex={0} className=" m-1"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
                                                </svg>
                                                </label>
                                                <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-gray-100 rounded-box w-52">
                                                    <li><button onClick={() => handledelete(user._id)} className=''>
                                                       Delete
                                                    </button></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>)
                            }
                        </div>
                    </>

            }
        </div>
    );
};

export default AllBuyers;