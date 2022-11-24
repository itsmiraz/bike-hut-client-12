import { async } from '@firebase/util';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../../Context/UserContext';

const AddAproduct = () => {
    const { register, handleSubmit, formState: { errors } } = useForm()
    const imgHostKey = process.env.REACT_APP_imgbbKey
    const {user} = useContext(AuthContext)

    const handleAddaProduct = (data) => {
        const image = data.image[0];
        const formData = new FormData();
        formData.append('image',image);
        const url = `https://api.imgbb.com/1/upload?key=${imgHostKey}`
        fetch(url,{
            method:'POST',
            body: formData,
        })
            .then(res => res.json())
            .then(imgData=>{

                if (imgData.success) {
                    
                    const product = {
                        model: data.model,
                        image: imgData.data.url,
                        brand: data.brand,
                        condition: data.condition,
                        totalDriven: data.totalDriven,
                        orginalPrice: data.orginalPrice,
                        resalePrice: data.resalePrice,
                        sellerNumber:data.sellerNumber,
                        sellerLocation: data.sellerLocation,
                        sellerEmail: user?.email,
                        sellerName: user?.displayName,
                    
                        
                    }

                    console.log(product)




                }


            })

    }



    const {data:brands=[],} = useQuery({
        queryKey: ['brand'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/catagories')
            const data = await res.json()
            return data;
        }
    })



    return (
        <div className='h-screen w-full'>
            <h1 className='text-center text-xl font-semibold'>Add A Product</h1>
            <div className='w-[500px] mx-auto my-10'>
                <form onSubmit={handleSubmit(handleAddaProduct)}>
                    <div>
                        <label className="label">
                            <span className="label-text font-semibold">Image</span>
                        </label>
                        <input
                         {...register('image', { required: 'image is Required' })}
                            type="file" className="file-input w-full max-w-xs" />
                    </div>
                    <div>
                        <label className="label">
                            <span className="label-text font-semibold">Bike Model</span>
                        </label>
                        <input type='text'
                            {...register('model', { required: 'model is Required' })}
                            className='input input-bordered w-full my-2' placeholder="Bike Model" />

                    </div>
                     
                    <div>
                        <label className="label">
                            <span className="label-text font-semibold">Brand</span>
                        </label>
                        <select {...register('brand', { required: 'brand is Required' })} className="select select-bordered w-full ">
                            <option value='Buyer'>Select Brand</option>
                            {
                                brands.map((brand,i) => <option
                                key={i}
                                >
                                    {brand.name}
                                </option>)
                            }
                            <option>Other</option>

                        </select>


                    </div>
                    <div>
                        <label className="label">
                            <span className="label-text font-semibold">Condition</span>
                        </label>
                        <select {...register('condition', { required: 'condition is Required' })} className="select select-bordered w-full ">
                            <option value='Select Condition' disabled>Select Condition</option>
                            <option>New</option>
                            <option>Fresh</option>
                            <option>Used</option>

                        </select>


                    </div>
                    <div>
                        <label className="label">
                            <span className="label-text font-semibold">How Many km have driven?</span>
                        </label>
                        <input type='text'
                            {...register('totalDriven', { required: 'Required' })}
                            className='input input-bordered w-full my-2' placeholder="000 k/m" />
                    </div>
                    <div>
                        <label className="label">
                            <span className="label-text font-semibold">Orginal Price</span>
                        </label>
                        <input type='text'
                            {...register('orginalPrice', { required: 'Required' })}
                            className='input input-bordered w-full my-2' placeholder="Orginal Price" />
                    </div>
                    <div>
                        <label className="label">
                            <span className="label-text font-semibold">Resale Price</span>
                        </label>
                        <input type='text'
                            {...register('resalePrice', { required: 'Required'})}
                            className='input input-bordered w-full my-2' placeholder="Resale Price" />


                    </div>
                    <div>
                        <label className="label">
                            <span className="label-text font-semibold">Phone Number</span>
                        </label>
                        <input  type='text'
                            {...register('sellerNumber', { required: 'Required' })}
                            className='input input-bordered w-full my-2' placeholder="Number" />


                    </div>
                    <div>
                        <label className="label">
                            <span className="label-text font-semibold">Location</span>
                        </label>
                        <input  type='text'
                            {...register('sellerLocation', { required: 'Required' })}
                            className='input input-bordered w-full my-2' placeholder="location" />


                    </div>

                    <input value='Add Product' className='btn w-full my-2' type="submit" />
                </form>
            </div>
        </div>
    );
};

export default AddAproduct;