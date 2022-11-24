import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useContext } from 'react';
import LoadingAnimation from '../../../Components/LoadingAnimation/LoadingAnimation';
import { AuthContext } from '../../../Context/UserContext';

const UserPage = () => {
    const { user } = useContext(AuthContext)
    const {data:userdb,isLoading } = useQuery({
        queryKey: ['user'],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/user?email=${user?.email}`)
            const data = await res.json()
            return data
        }
    })
    if (isLoading) {
    return LoadingAnimation
}
    
    return (
        <div className='w-full h-screen'>

            <div className='my-10'>
            <img className='w-40 mx-auto' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNL_ZnOTpXSvhf1UaK7beHey2BX42U6solRA&usqp=CAU' alt="" />
                <h1 className='text-xl font-semibold text-center my-2'>{user?.displayName}</h1>  
                <h1 className='text-center font-semibold my-2'>{user?.email}</h1>
                <p className='text-center font-semibold'>Account Type : {userdb[0].role }</p>
          </div>


        </div>
    );
};

export default UserPage;