import React, { useContext, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import BikeCard from '../../Components/BikeCard/BikeCard';
import { AuthContext } from '../../Context/UserContext';
import BookNowModal from './BookNowModal';

const Bikes = () => {
    const data = useLoaderData()
    const {user} = useContext(AuthContext)
    const [bikedetails, setBikedetails] = useState(null)
    
    
    return (
        <div className='px-20 my-10'>
            <h1 className='text-center my-10 font-semibold text-xl'>We have total {data.length > 0 ? <>{ data.length} Results on this Catagory </> : <>0 Result in this Catagory</> }</h1>
            <div className='grid grid-cols-2 justify-items-center gap-10'>
                {
                    data?.map(bike => <BikeCard
                        key={bike._id}
                        bike={bike}
                        setBikedetails={setBikedetails}
                    ></BikeCard>)
                }
            </div>
            {
                bikedetails && 
                <BookNowModal
                user={user}
                bikedetails={bikedetails}
                setBikedetails={setBikedetails}
              
            ></BookNowModal>
            }
        </div>
    );
};

export default Bikes;