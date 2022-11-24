import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useContext } from 'react';
import toast from 'react-hot-toast';
import LoadingAnimation from '../../../Components/LoadingAnimation/LoadingAnimation';
import { AuthContext } from '../../../Context/UserContext';
import MyBikesCard from './MyBikesCard';

const MyProducts = () => {

    const { user } = useContext(AuthContext)
    
    const {data:bikes,isLoading ,refetch} = useQuery({
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


    const handleDelete = (id) => {
        fetch(`http://localhost:5000/bike/${id}`, {
            method: 'DELETE',
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount > 0) {
                    refetch()
                    toast.error('Post Delete SuccessFully')
            }
        })
       
    }


    const handleSold = (id) => {
        fetch(`http://localhost:5000/bike/${id}`, {
            method:'PUT'
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                refetch()
                toast.success('Product Sold')
        })
    }

    const handleAdvertise = (id) => {
        fetch(`http://localhost:5000/advertiseBike/${id}`, {
            method:'PUT'
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                refetch()
                toast.success('Product is Live on Ad Section')
        })
    }


    return (
        <div className='h-screen'>
            <h1 className='text-xl font-semibold'>My Bikes {bikes.length}</h1>
            <div>

                {
                    bikes.map(bike => <MyBikesCard
                        key={bike._id}
                        bike={bike}
                        handleDelete={handleDelete}
                        handleSold={handleSold}
                        handleAdvertise={handleAdvertise}
                    ></MyBikesCard>)
                }


            </div>
        </div>
    );
};

export default MyProducts;