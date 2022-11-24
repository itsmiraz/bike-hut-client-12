import React from 'react';

const BikeCard = ({ bike }) => {
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

    } = bike;
    return (
        <div>
            <div className='font-semibold bg-white rounded-lg shadow-lg border p-4 relative w-[450px]'>
                <p>Seller : {sellerName}</p>
                <img src={image} className='w-96' alt="" />

                <h1 className='text-2xl font-semibold'>{model}</h1>
                <div className='grid shadow-lg bg-gray-200 my-4 p-2 rounded-lg grid-cols-2 gap-3'>
                    <div className=''>
                        <h1>Brand : {brand}</h1>
                        <p>Conditon : {condition}</p>
                        <p>New Price : {orginalPrice}</p>
                        <p>Resale Price : {resalePrice}</p>




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
                <button className='bg-teal-600 mt-4 shadow-lg text-white my-2 rounded-full px-4 py-2'>Book Now</button>

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