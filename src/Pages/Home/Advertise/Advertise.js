import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import BikeCard from '../../../Components/BikeCard/BikeCard';

const Advertise = () => {


    const [advertisedBikes, setAdvertiseBike] = useState([])

    useEffect(() => {
        fetch('http://localhost:5000/allbikecollection')
            .then(res => res.json())
            .then(data => {
                const adBikes = data.filter(bike => bike.advertise === 'true');
                setAdvertiseBike(adBikes)
        })

    },[])


    return (
        <div>
            {
                advertisedBikes.length === 0 ? <></>
                    :
                    <>
                      <div className='my-20 py-10 bg-gray-200'>
            <h1 className='text-xl font-semibold text-center'>Advertise Bikes {advertisedBikes?.length}</h1>
            <div className='px-20 justify-items-center grid-cols-2 grid '>
                {
                    advertisedBikes.map(bike => <BikeCard
                        key={bike.id}
                        bike={bike}
                    
                    ></BikeCard>)
                }
            </div>
        </div>
                    </>
            }
      </div>
    );
};

export default Advertise;