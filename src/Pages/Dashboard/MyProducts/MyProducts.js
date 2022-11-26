import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useState } from 'react';
import { useContext } from 'react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import LoadingAnimation from '../../../Components/LoadingAnimation/LoadingAnimation';
import { AuthContext } from '../../../Context/UserContext';
import EditProductDetails from './EditProductDetails';
import MyBikesCard from './MyBikesCard';

const MyProducts = () => {

    const { user } = useContext(AuthContext)
    const [bikedetails, setbikedetails] = useState(null)
    


    const {data:bikes,isLoading ,refetch} = useQuery({
        queryKey: ['bikes', user?.email],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/allbikes?email=${user?.email}`, {
                headers: {
                    authorization: `bearer ${localStorage.getItem('bikehutAccessToken')}`

                }
            })
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


    const handleSold = (id) => {
        fetch(`http://localhost:5000/bike/${id}`, {
            method: 'PUT',
            headers: {
                authorization: `bearer ${localStorage.getItem('bikehutAccessToken')}`

            }
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
            method: 'PUT',
            headers: {
                authorization: `bearer ${localStorage.getItem('bikehutAccessToken')}`

            }
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
            <h1 className='text-xl text-center my-10 font-semibold'>You have {bikes.length} {bikes.length === 0 ? 'Product' : 'Products'}</h1>
            {
                bikes.length === 0 && <>
                <p className='font-semibold text-xs my-4 text-center'>Wand To <Link to='/dashboard/addaproduct' className='underline'>add a Product</Link></p>
                </>
            }
            <div>
                {/* BIKEs Card  */}
                {
                    bikes.map(bike => <MyBikesCard
                        key={bike._id}
                        bike={bike}
                        handleDelete={handleDelete}
                        handleSold={handleSold}
                        handleAdvertise={handleAdvertise}
                        setbikedetails={setbikedetails}
                    ></MyBikesCard>)
                }


            </div>
            <div>
                {/* Edit Bike Details Modal */}
                {
                    bikedetails && 
                    <EditProductDetails
                            setbikedetails={setbikedetails}
                            biked={bikedetails}
                            refetch={refetch}
                        ></EditProductDetails>
                }
            </div>
        </div>
    );
};

export default MyProducts;