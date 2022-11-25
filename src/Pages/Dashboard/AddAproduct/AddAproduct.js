import { async } from '@firebase/util';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { AuthContext } from '../../../Context/UserContext';
import {  format } from 'date-fns'
import { useNavigate } from 'react-router-dom';
const AddAproduct = () => {
    const { register, handleSubmit, formState: { errors } } = useForm()
    const imgHostKey = process.env.REACT_APP_imgbbKey
    const { user } = useContext(AuthContext)
    const navigate = useNavigate()

    const data = new Date()
    const date = format(data, 'PP')
    // console.log(date);

    const handleAddaProduct = (data) => {
        console.log(data.brand);
     const image = data.image[0];
        const formData = new FormData();
        formData.append('image', image);
        const url = `https://api.imgbb.com/1/upload?key=${imgHostKey}`
        fetch(url, {
            method: 'POST',
            body: formData,
        })
            .then(res => res.json())
            .then(imgData => {

                if (imgData.success) {

                    const bikedetails = {
                        model: data.model,
                        image: imgData.data.url,
                        catagoryId : data.brand,
                        condition: data.condition,
                        totalDriven: data.totalDriven,
                        orginalPrice: data.orginalPrice,
                        resalePrice: data.resalePrice,
                        sellerNumber: data.sellerNumber,
                        sellerLocation: data.sellerLocation,
                        sellerEmail: user?.email,
                        bikedetails: data.details,
                        postdate: date,
                        status:'available',
                        sellerName: user?.displayName,
                        purchaseDate : data.purchaseDate,
                    }

                    console.log(bikedetails)
                    fetch('https://bike-hut-server.vercel.app/addbikes', {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json'
                        },
                        body: JSON.stringify(bikedetails)
                    })
                        .then(res => res.json())
                        .then(data => {
                            if (data.acknowledged) {
                                console.log(data);
                                toast.success('Product Added SuccessFully')
                                navigate('/dashboard/myproducts')
                            }

                        })



                }


            })

    }



    const { data: brands = [], } = useQuery({
        queryKey: ['brand'],
        queryFn: async () => {
            const res = await fetch('https://bike-hut-server.vercel.app/catagories')
            const data = await res.json()
            return data;
        }
    })



    return (
        <div className='h-screen py-10 w-full'>
            <h1 className='text-center text-xl my-4 font-semibold'>Add A Product</h1>
            <div className='w-[500px] rounded-lg bg-white p-5 mx-auto '>
                <form onSubmit={handleSubmit(handleAddaProduct)}>
                    <div>
                        <label className="label">
                            <span className="label-text font-semibold">Image</span>
                        </label>
                        <input
                            {...register('image', { required: true })}
                            type="file" className="file-input w-full max-w-xs" />
                        {errors.image && <span className='mx-2'>This field is required</span>}
                        <p className='text-sm my-1'>Please Upload 1:1 aspect Ratio Image</p>
                    </div>
                    <div>
                        <label className="label">
                            <span className="label-text font-semibold">Bike Model</span>
                        </label>
                        <input type='text'
                            {...register('model', { required: true })}
                            className='input input-bordered w-full my-2' placeholder="Bike Model" />
                        {errors.model && <span className='mx-2'>This field is required</span>}
                    </div>

                    <div>
                        <label className="label">
                            <span className="label-text font-semibold">Brand</span>
                        </label>
                        <select {...register('brand', { required: true })} className="select select-bordered w-full ">
                            <option value='Buyer'>Select Brand</option>
                            {
                                brands.map((brand, i) => <option
                                    key={i}
                                    value={brand.catatgory_id}
                                >
                                    {brand.name}
                                </option>)
                            }
                           

                        </select>
                        {errors.brand && <span className='mx-2'>This field is required</span>}


                    </div>
                    <div>
                        <label className="label">
                            <span className="label-text font-semibold">Condition</span>
                        </label>
                        <select {...register('condition', { required: true })} className="select select-bordered w-full ">
                            <option value='Select Condition' disabled>Select Condition</option>
                            <option>Excellent</option>
                            <option>Good</option>
                            <option>Fair</option>

                        </select>
                        {errors.condition && <span className='mx-2'>This field is required</span>}


                    </div>
                    <div>
                        <label className="label">
                            <span className="label-text font-semibold">How Many km have driven?</span>
                        </label>
                        <input type='text'
                            {...register('totalDriven', { required: true })}
                            className='input input-bordered w-full my-2' placeholder="000 k/m" />
                        {errors.totalDriven && <span className='mx-2'>This field is required</span>}

                    </div>
                    <div>
                        <label className="label">
                            <span className="label-text font-semibold">Purchase Year</span>
                        </label>
                        <input type='text'
                            {...register('purchaseDate', { required: true })}
                            className='input input-bordered w-full my-2' placeholder="YY" />
                        {errors.purchaseDate && <span className='mx-2'>This field is required</span>}

                    </div>
                    <div>
                        <label className="label">
                            <span className="label-text font-semibold">Details</span>
                        </label>
                        <textarea type='text'
                            {...register('details', { required: true })}
                            className='input input-bordered h-32 w-full my-2' placeholder="Details" />
                        {errors.details && <span className='mx-2'>This field is required</span>}

                    </div>
                    <div>
                        <label className="label">
                            <span className="label-text font-semibold">Orginal Price</span>
                        </label>
                        <input type='text'
                            {...register('orginalPrice', { required: true })}
                            className='input input-bordered w-full my-2' placeholder="Orginal Price" />
                        {errors.orginalPrice && <span className='mx-2'>This field is required</span>}

                    </div>
                    <div>
                        <label className="label">
                            <span className="label-text font-semibold">Resale Price</span>
                        </label>
                        <input type='text'
                            {...register('resalePrice', { required: true })}
                            className='input input-bordered w-full my-2' placeholder="Resale Price" />

                        {errors.resalePrice && <span className='mx-2'>This field is required</span>}

                    </div>
                    <div>
                        <label className="label">
                            <span className="label-text font-semibold">Phone Number</span>
                        </label>
                        <input type='text'
                            {...register('sellerNumber', { required: true })}
                            className='input input-bordered w-full my-2' placeholder="Number" />

                        {errors.sellerNumber && <span className='mx-2'>This field is required</span>}

                    </div>
                    <div>
                        <label className="label">
                            <span className="label-text font-semibold">Location</span>
                        </label>
                        <input type='text'
                            {...register('sellerLocation', { required: true })}
                            className='input input-bordered w-full my-2' placeholder="location" />

                        {errors.sellerLocation && <span className='mx-2'>This field is required</span>}

                    </div>

                    <input value='Post' className='btn w-full my-2' type="submit" />
                </form>
            </div>
        
        </div>
    );
};

export default AddAproduct;