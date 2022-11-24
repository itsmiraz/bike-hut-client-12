import React from 'react';

const MyOrdersCard = ({ bike }) => {
    const {

        _id,
        buyerEmail,
        img,
        bikeModel,
        bikePrice,
        bikeId,
        meetLocation,
        buyerNumber,

    } = bike





    return (
        <div>


            <div className='flex rounded-lg p-2  relative my-4 border items-center font-semibold gap-5'>
                <img className='w-32' src={img} alt="" />
                <div>
                    <h1 className='text-xl'>
                        {bikeModel.slice(0, 15)}
                    </h1>
                    <div>
                       
                        <p>
                            Price:{bikePrice}
                        </p>
                    </div>
                </div>

                <div>
                  

                    <p>
                        Location: {meetLocation}
                    </p>
                    <p>
                        Number : {buyerNumber}
                    </p>
                   
                </div>
                <div className='absolute right-5'>
                  <button className='bg-teal-500 text-white font-semibold py-2 px-4 rounded-lg'>Pay</button>
                </div>
            </div>

        </div>
    );
};

export default MyOrdersCard;