import { async } from '@firebase/util';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useContext } from 'react';
import LoadingAnimation from '../../../Components/LoadingAnimation/LoadingAnimation';
import { AuthContext } from '../../../Context/UserContext';
import MyBikesCard from './MyBikesCard';

const MyProducts = () => {

    const { user } = useContext(AuthContext)
    
    const {data:bikes,isLoading } = useQuery({
        queryKey: ['bikes', user?.email],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/allbikes?email=${user?.email}`)
            const data = await res.json()
            return data
        }
    })


    if (isLoading) {
        return <LoadingAnimation></LoadingAnimation>
    }


    return (
        <div className='h-screen'>
            <h1 className='text-xl font-semibold'>My Bikes {bikes.length}</h1>
            <div>

                {
                    bikes.map(bike => <MyBikesCard
                        key={bike._id}
                        bike={bike}
                    ></MyBikesCard>)
                }


            </div>
        </div>
    );
};

export default MyProducts;