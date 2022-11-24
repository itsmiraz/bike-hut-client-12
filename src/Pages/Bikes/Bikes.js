import React from 'react';
import { useLoaderData } from 'react-router-dom';
import BikeCard from '../../Components/BikeCard/BikeCard';

const Bikes = () => {
    const data = useLoaderData()
    return (
        <div className='px-20 my-10'>
            <h1 className='text-center my-10 font-semibold text-xl'>We have {data?.length} {data.length>0 ? `${data?.length > 0 ? 'Bikes': 'Bike'} on ${data[0]?.brand} brand`: 'Results' }</h1>
            <div className='grid grid-cols-2 justify-items-center gap-10'>
                {
                    data?.map(bike => <BikeCard
                        key={bike._id}
                        bike={bike}
                    ></BikeCard>)
                }
            </div>
        </div>
    );
};

export default Bikes;