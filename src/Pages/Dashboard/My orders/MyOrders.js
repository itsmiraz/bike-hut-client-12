import { async } from '@firebase/util';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useContext } from 'react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import LoadingAnimation from '../../../Components/LoadingAnimation/LoadingAnimation';
import { AuthContext } from '../../../Context/UserContext';
import MyOrdersCard from './MyOrdersCard';

const MyOrders = () => {

    const {user} = useContext(AuthContext)

    const { data:bookedBikes,isLoading ,refetch} = useQuery({
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


    const handleCancelBook = id => {
        fetch(`http://localhost:5000/book/${id}`, {
            method:'DELETE'
            
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                refetch()
                toast.success('Booking Cancelded')
        })
    }
 
    return (
        <div className='h-screen w-full'>
            {
                bookedBikes.length === 0 ?
                    <>
                        <p className='text-center font-semibold my-52'>

                    You haven't booked any think yet <Link className='underline' to='/'>Book Now</Link>

                        </p>
                    </>
                    :
                    <>
                       <h1 className='text-xl font-semibold text-center my-10 '>My Orders</h1>
                    </>
             }
            <div className='px-40'>
                {

                    bookedBikes.map(bike => <MyOrdersCard
                        key={bike._id}
                        bike={bike}
                        handleCancelBook={handleCancelBook}
                    ></MyOrdersCard>)

                }
                </div>

        </div>
    );
};

export default MyOrders;