import { async } from '@firebase/util';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useContext } from 'react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import LoadingAnimation from '../../../Components/LoadingAnimation/LoadingAnimation';
import { AuthContext } from '../../../Context/UserContext';
import useTitle from '../../../Hooks/useTitle/useTitle';
import request from '../../../http-common';
import MyOrdersCard from './MyOrdersCard';

const MyOrders = () => {
    useTitle('My Orders')
    const {user,logOut} = useContext(AuthContext)
    // /booked?email=${user?.email}
    const { data:bookedBikes,isLoading ,refetch} = useQuery({
        queryKey: ['bookings', user?.email],
        queryFn: async () => {


            try {
                const { data } = await request.get(`/booked?email=${user?.email}`, {
                    headers: {
                                authorization: `bearer ${localStorage.getItem('bikehutAccessToken')}`
                            }
                })
                return data
            }
            catch (error) {
                if (error.response) {
                    if (error.response.status === 401 || error.response.status === 403) {
                        return logOut()
                    }
                }
                
            }

          
        }
        
    })
    console.log(bookedBikes);


    if (isLoading) {
        return <LoadingAnimation></LoadingAnimation>
    }


    const handleCancelBook = id => {
        fetch(`https://bike-hut-server.vercel.app/book/${id}`, {
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
            <div className='px-4 md:px-40'>
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