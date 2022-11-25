import React from 'react';

const MybuyersCard = ({ buyer,i }) => {

    const {

        buyerName,
        buyerNumber,
        meetLocation,
        bikeModel,
        bikePrice,
    }
        = buyer;

    return (
        <div>
            <div className='flex rounded-lg px-4 bg-gray-200  py-4 shadow-lg  w-[700px] mx-auto relative my-4 border items-center font-semibold gap-5'>

                <p>
                   {i+1}.
                </p>
                <div>
                    <h1>Buyer Name : {buyerName}</h1>
                    <p>
                        Number : {buyerNumber}
                    </p>
                </div>
                <div>

                    <div>
                        <p>
                            Model : {bikeModel}
                        </p>
                        <p>
                            Price:{bikePrice}
                        </p>
                    </div>
                </div>

                <div>


                    <p>
                        Location: {meetLocation}
                    </p>


                </div>
                {/* <div className='absolute right-20'>
                    <button className='bg-teal-500 text-white font-semibold py-1 px-4 rounded-lg'>Pay</button>
                </div>
                <div className='absolute right-2'>
                    <div className="dropdown dropdown-end">
                        <label tabIndex={0} className=" m-1">

                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
                            </svg>


                        </label>
                        <ul tabIndex={0} className="dropdown-content menu p-2 shadow-lg bg-gray-100 rounded-box w-52">
                            <li><button
                                onClick={() => handleCancelBook(_id)}
                                className='text-red-500'>Cancel Book</button></li>
                        </ul>
                    </div>
                </div> */}
            </div>
        </div>
    );
};

export default MybuyersCard;