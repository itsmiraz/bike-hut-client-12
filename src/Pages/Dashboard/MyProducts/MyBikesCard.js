import React from 'react';
import { Link } from 'react-router-dom';

const MyBikesCard = ({ bike, handleDelete, handleSold, handleAdvertise, setbikedetails }) => {


    const {
        _id,
        model,
        image,
        postdate,
        condition,
        totalDriven,
        orginalPrice,
        resalePrice,
        sellerNumber,
        sellerLocation,
        status,
        paid,

    } = bike;




    return (
        <div>
            <div className='flex flex-col md:flex-row  select-none shadow-lg bg-white rounded-lg p-2 w-full md:w-[700px] relative my-4 border items-center font-semibold gap-5'>
                <img className='w-32' src={image} alt="" />
                <div>
                    <h1 className='text-xl'>
                        {model.slice(0, 15)}
                    </h1>
                    <div>
                        <p>
                            Orginal price:{orginalPrice}
                        </p>
                        <p>
                            Resale-price:{resalePrice}
                        </p>
                    </div>
                </div>
                <div>
                    {
                        status === 'available' && paid ==='false' ?
                            <>
                                <p className='bg-green-500 text-white rounded-full px-3'>Available</p>
                            </>
                            :
                            <>
                                <p className='bg-red-500 w-14 text-white rounded-full px-3'>Sold</p>

                            </>
                    }
                    <p>{postdate}</p>
                    <p>{sellerNumber}</p>
                </div>
                <div>
                    <p>
                        Bike Condition : {condition}
                    </p>

                    <p>
                        Location: {sellerLocation}
                    </p>
                    <p>
                        Total Driven: {totalDriven} km
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

                            {status === 'available' && paid ==='false' && <>
                                <li>
                                    <button onClick={() => handleSold(_id)} >
                                        Sold
                                    </button>
                                </li>
                                <li>
                                    {
                                        bike.advertise === 'true' ?
                                            <>
                                                <p className='py-0'>
                                                    Product is Live on
                                                    </p>
                                                    <Link to='/' className='underline'>Advertise Seciton</Link>
                                         
                                            </>
                                            :
                                            <>
                                                <button onClick={() => handleAdvertise(_id)}>
                                                    Advertise
                                                </button>
                                            </>
                                    }

                                </li>

                            </>}
                            <li>

                                <label
                                    onClick={() => setbikedetails(bike)}
                                    htmlFor="editdetailsModal">Edit</label>
                            </li>
                            <li><button onClick={() => handleDelete(_id)} className='text-red-500'>Delete</button></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyBikesCard;