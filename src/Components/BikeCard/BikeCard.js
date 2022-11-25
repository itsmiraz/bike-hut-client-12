import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../Context/UserContext';
import useSeller from '../../Hooks/useSeller/useSeller';

const BikeCard = ({ bike,setBikedetails }) => {

    const {user} = useContext(AuthContext)
    const[isSeller] = useSeller(user?.email)

    const {
        model,
        image,
        brand,
        condition,
        totalDriven,
        orginalPrice,
        resalePrice,
        sellerNumber,
        sellerLocation,
        postdate,
        bikedetails,
        sellerName,
        status,
        purchaseDate,
        sellerEmail
        

    } = bike;
    

    const { data: seller =[],  } = useQuery({
        queryKey: ['sellers'],
        queryFn: async () => {
            const res = await fetch('https://bike-hut-server.vercel.app/user')
            const data = await res.json()
            const users = data.filter(user => user.email === sellerEmail)
            return users
        }

    })

    

    return (
        <div>
            <div className='font-semibold bg-white rounded-lg shadow-lg border p-4 relative w-[500px]'>
                <p className='flex gap-2'>Seller : {sellerName}
                
                {
                        seller[0]?.verifySeller &&
                        <span className='bg-blue-500 rounded-full text-white'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                            </svg>

                        </span>
                    }
                </p> 
                   
                
               
                <img src={image} className='w-96' alt="" />

                <h1 className='text-2xl font-semibold'>{model}</h1>
                <div className='grid shadow-lg bg-gray-200 my-4 p-2 rounded-lg grid-cols-2 gap-2'>
                    <div className=''>
                        <h1>Brand : {brand}</h1>
                        <p>Conditon : {condition}</p>
                        <p>New Price : {orginalPrice}</p>
                        <p>Resale Price : {resalePrice}</p>
                        <p>Purchase Year : {  purchaseDate }</p>




                    </div>
                    <div>
                        <p>Drived : {totalDriven}</p>
                        <p>Location : {sellerLocation}</p>
                        <p>Number : {sellerNumber}</p>
                        <p>Date : {postdate}</p>
                        <p></p>
                    </div>
                </div>
                <div className='bg-gray-200 shadow-lg p-2 rounded-lg'>
                    <p>
                        Details -
                    </p>
                    <p className='font-normal text-sm' >
                        {bikedetails}
                    </p>
                </div>
                <div className='mt-5'>
               
                    {
                        user?.uid ?
                            <>
                                {
                                    isSeller ?
                                        <>
                                        You Have be an Buyer To book this item.
                                        </>
                                        :
                                        <>
                                         <label
                             
                             onClick={()=>setBikedetails(bike)}
                             htmlFor="bookNowModal" className='bg-teal-600 mt-4 shadow-lg text-white my-2 rounded-full px-4 py-2'>Book Now</label>
                                        </>
                               }
                            </>
                            :
                            <>
                                Please <Link to='/login' className='underline'> Login</Link> to book this bike.
                            </>
                    }
                    
            </div>
                {
                    status === 'available' ?
                        <>
                            <p className='bg-green-500 shadow-lg absolute top-4 right-4 w-24 px-4 py-2 rounded-full text-white'>
                                Available
                            </p>
                        </>
                        :
                        <>
                            <p className='bg-red-500 shadow-lg absolute top-4 right-4 w-16 px-4 py-2 rounded-full text-white'>
                                Sold
                            </p>
                        </>
                }


            </div>
          
        </div>
    );
};

export default BikeCard;