import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useContext } from 'react';
import LoadingAnimation from '../../../Components/LoadingAnimation/LoadingAnimation';
import { AuthContext } from '../../../Context/UserContext';
import request from '../../../http-common';

const UserPage = () => {
    const { user,logOut } = useContext(AuthContext)
    const { data: userdb, isLoading } = useQuery({
        queryKey: ['user'],
        queryFn: async () => {
            try {
                const { data } = await request.get(`user?email=${user?.email}`, {
                    headers: {
                        authorization: `bearer ${localStorage.getItem('bikehutAccessToken')}`
                    }
                })
                const logedinuser = data.filter(u => u.email === user?.email)
                return logedinuser
            }
            catch (error) {
                if (error.response.status === 401 || error.response.status === 403) {
                    return logOut()
                }
            }
            
        }
    })
    if (isLoading) {
        return <LoadingAnimation></LoadingAnimation>
    }
    console.log(userdb);
    return (
        <div className=' h-full md:h-screen'>

            <div className='my-10 bg-white p-10 rounded-lg shadow-lg'>
                <img className='w-40 mx-auto' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNL_ZnOTpXSvhf1UaK7beHey2BX42U6solRA&usqp=CAU' alt="" />
                <h1 className='text-xl font-semibold text-center my-2'>{user?.displayName}</h1>
                <h1 className='text-center font-semibold my-2'>{user?.email}</h1>
                <p className='text-center font-semibold'>Account Type : {userdb[0].role}</p>
            </div>


        </div>
    );
};

export default UserPage;