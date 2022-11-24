import { async } from '@firebase/util';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useContext } from 'react';
import LoadingAnimation from '../../../Components/LoadingAnimation/LoadingAnimation';
import { AuthContext } from '../../../Context/UserContext';
import MyOrdersCard from './MyOrdersCard';

const MyOrders = () => {

    const {user} = useContext(AuthContext)

    const { data:bookedBikes,isLoading } = useQuery({
        queryKey: ['bookings', user?.email],
        queryFn: async () => {
            const res = await fetch(`https://bike-hut-server.vercel.app/booked?email=${user?.email}`)
            const data = await res.json()
            return data
        }
        
    })



    if (isLoading) {
        return <LoadingAnimation></LoadingAnimation>
    }

    return (
        <div className='h-screen w-full'>
                <h1 className='text-xl font-semibold text-center my-10 '>My Orders</h1>
            <div className='px-40'>
                {

                    bookedBikes.map(bike => <MyOrdersCard
                        key={bike._id}
                        bike={bike}
                    ></MyOrdersCard>)

                }
                </div>

        </div>
    );
};

export default MyOrders;