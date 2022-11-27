import { useQuery } from '@tanstack/react-query';
import React from 'react';
import toast from 'react-hot-toast';
import BikeCard from '../../../Components/BikeCard/BikeCard';
import LoadingAnimation from '../../../Components/LoadingAnimation/LoadingAnimation';
import useTitle from '../../../Hooks/useTitle/useTitle';
import request from '../../../http-common';

const ReportedItems = () => {
    useTitle('Reported Items')
    const { data: reported, isLoading ,refetch} = useQuery({
        queryKey: ['reportedbikes'],
        queryFn: async () => {
            const { data } = await request.get('/allbikecollection', {
                headers: {
                    authorization: `bearer ${localStorage.getItem('bikehutAccessToken')}`,
                }
            })
            const reportedbikes = data.filter(bike => bike.reported === 'true')
            return reportedbikes

        }
    })


    if (isLoading) {
        return <LoadingAnimation></LoadingAnimation>
    }


    const handleDelete = (id) => {
        fetch(`https://bike-hut-server.vercel.app/bike/${id}`, {
            method: 'DELETE',
            headers: {
                authorization: `bearer ${localStorage.getItem('bikehutAccessToken')}`

            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount > 0) {
                    refetch()
                    toast.error('Post Delete SuccessFully')
            }
        })
       
    }


    return (
        <div className='h-screen w-full'>
            <h1 className='text-center my-4 text-xl font-semibold'>
                Reported Bikes
            </h1>
            <div className='mx-4 md:mx-32'>
                
            {
                reported.length === 0 ?
                    <>
                        <p className='font-semibold text-center '>No reported Bikes Found</p>
                    </>
                    :
                    <>
                        {
                            reported.map(bike => <div
                                key={bike._id}
                            >

                                <div className='flex md:flex-row flex-col  select-none shadow-lg bg-white rounded-lg p-2 w-full md:w-[700px] relative my-4 border items-center font-semibold gap-5'>
                                    <img className='w-32' src={bike.image} alt="" />
                                    <div>
                                        <h1 className='text-xl'>
                                            {bike.model.slice(0, 15)}
                                        </h1>
                                        <div>
                                            <p>
                                                Orginal price:{bike.orginalPrice}
                                            </p>
                                            <p>
                                                Resale-price:{bike.resalePrice}
                                            </p>
                                        </div>
                                    </div>
                                    <div>
                                        {
                                            bike.status === 'available' ?
                                                <>
                                                    <p className='bg-green-500 text-white rounded-full px-3'>Available</p>
                                                </>
                                                :
                                                <>
                                                    <p className='bg-red-500 w-14 text-white rounded-full px-3'>Sold</p>

                                                </>
                                        }
                                        <p>{bike.postdate}</p>
                                        <p>{bike.sellerNumber}</p>
                                    </div>
                                    <div>
                                        <p>
                                            Bike Condition : {bike.condition}
                                        </p>

                                        <p>
                                            Location: {bike.sellerLocation}
                                        </p>
                                        <p>
                                            Total Driven: {bike.totalDriven} km
                                        </p>
                                    </div>
                                    <div className='absolute right-2'>
                                        <div className="dropdown dropdown-end">
                                            <label tabIndex={0} className=" m-1">

                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
                                                </svg>


                                            </label>
                                            <ul tabIndex={0} className="dropdown-content menu p-2 shadow-lg bg-gray-100 rounded-box w-52">

                                               
                                                <li><button onClick={() => handleDelete(bike._id)} className='text-red-500'>Delete</button></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                            </div>)
                        }

                    </>
            }
      </div>

        </div>
    );
};

export default ReportedItems;