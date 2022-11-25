import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useForm } from 'react-hook-form';

const EditProductDetails = ({ biked, setbikedetails }) => {
    
    const imgHostKey = process.env.REACT_APP_imgbbKey
    const { register, handleSubmit, formState: { errors } } = useForm()

    const {


        model,
        image,
        catagoryId,
        condition,
        totalDriven,
        orginalPrice,
        resalePrice,
        sellerNumber,
        sellerLocation,
        bikedetails,
        purchaseDate,
        status,

    } = biked;


    const { data: brands = [], } = useQuery({
        queryKey: ['brand'],
        queryFn: async () => {
            const res = await fetch('https://bike-hut-server.vercel.app/catagories')
            const data = await res.json()
            return data;
        }
    })

    const handleEditDetails = data => {
        setbikedetails(null)
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

                    const editBikeDetails = {
                        model: data.model,
                        image: imgData.data.url,
                        catagoryId : data.brand,
                        condition: data.condition,
                        totalDriven: data.totalDriven,
                        orginalPrice: data.orginalPrice,
                        resalePrice: data.resalePrice,
                        sellerNumber: data.sellerNumber,
                        sellerLocation: data.sellerLocation,
                        bikedetails: data.details,
                        status:data.status,
                        purchaseDate : data.purchaseDate,
                    }
                    console.log(editBikeDetails)

           }
            })

    }


    return (
        <div>
            <input type="checkbox" id="editdetailsModal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor="editdetailsModal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <form onSubmit={handleSubmit(handleEditDetails)}>
                        <div className='flex items-center' >
                            <img src={image } className='w-40' alt="" />
                       
                            <div>
                            <label className="label">
                                <span className="label-text font-semibold">Update Image</span>
                            </label>
                            <input
                                    {...register('image')}
                                   
                                type="file" className="file-input w-full max-w-xs" />
                                
                           </div>
                       
                       
                        </div>
                        <div>
                            <label className="label">
                                <span className="label-text font-semibold">Bike Model</span>
                            </label>
                            <input defaultValue={model} type='text'
                                {...register('model', { required: true })}
                                className='input input-bordered w-full my-2' placeholder="Bike Model" />
                            {errors.model && <span className='mx-2'>This field is required</span>}
                        </div>

                        <div>
                            <label className="label">
                                <span className="label-text font-semibold">Brand</span>
                            </label>
                            <select {...register('brand', { required: true })} className="select select-bordered w-full ">
                                <option defaultValue={catagoryId} >Select Brand</option>
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
                            <select  {...register('condition', { required: true })} className="select select-bordered w-full ">
                                <option>New</option>
                                <option defaultValue={condition} disabled>{ condition}</option>
                                <option>Fresh</option>
                                <option>Used</option>

                            </select>
                            {errors.condition && <span className='mx-2'>This field is required</span>}


                        </div>
                        <div>
                            <label className="label">
                                <span className="label-text font-semibold">Status</span>
                            </label>
                            <select  {...register('status', { required: true })} className="select select-bordered w-full ">
                              
                                <option defaultValue={status} disabled>{ status}</option>
                                <option>available</option>
                                <option>sold</option>

                            </select>
                            {errors.condition && <span className='mx-2'>This field is required</span>}


                        </div>
                        <div>
                            <label className="label">
                                <span className="label-text font-semibold">How Many km have driven?</span>
                            </label>
                            <input defaultValue={totalDriven} type='text'
                                {...register('totalDriven', { required: true })}
                                className='input input-bordered w-full my-2' placeholder="000 k/m" />
                            {errors.totalDriven && <span className='mx-2'>This field is required</span>}

                        </div>
                        <div>
                            <label className="label">
                                <span className="label-text font-semibold">Purchase Date</span>
                            </label>
                            <input defaultValue={purchaseDate} type='text'
                                {...register('purchaseDate', { required: true })}
                                className='input input-bordered w-full my-2' placeholder="dd/mm/yy" />
                            {errors.purchaseDate && <span className='mx-2'>This field is required</span>}

                        </div>
                        <div>
                            <label className="label">
                                <span className="label-text font-semibold">Details</span>
                            </label>
                              
                            <textarea defaultValue={bikedetails} type='text'
                                {...register('details', { required: true })}
                                className='input input-bordered h-32 w-full my-2' placeholder="Details" />
                            {errors.details && <span className='mx-2'>This field is required</span>}

                        </div>
                        <div>
                            <label className="label">
                                <span className="label-text font-semibold">Orginal Price</span>
                            </label>
                            <input defaultValue={orginalPrice} type='text'
                                {...register('orginalPrice', { required: true })}
                                className='input input-bordered w-full my-2' placeholder="Orginal Price" />
                            {errors.orginalPrice && <span className='mx-2'>This field is required</span>}

                        </div>
                        <div>
                            <label className="label">
                                <span className="label-text font-semibold">Resale Price</span>
                            </label>
                            <input defaultValue={resalePrice} type='text'
                                {...register('resalePrice', { required: true })}
                                className='input input-bordered w-full my-2' placeholder="Resale Price" />

                            {errors.resalePrice && <span className='mx-2'>This field is required</span>}

                        </div>
                        <div>
                            <label className="label">
                                <span className="label-text font-semibold">Phone Number</span>
                            </label>
                            <input defaultValue={sellerNumber} type='text'
                                {...register('sellerNumber', { required: true })}
                                className='input input-bordered w-full my-2' placeholder="Number" />

                            {errors.sellerNumber && <span className='mx-2'>This field is required</span>}

                        </div>
                        <div>
                            <label className="label">
                                <span className="label-text font-semibold">Location</span>
                            </label>
                            <input defaultValue={sellerLocation} type='text'
                                {...register('sellerLocation', { required: true })}
                                className='input input-bordered w-full my-2' placeholder="location" />

                            {errors.sellerLocation && <span className='mx-2'>This field is required</span>}

                        </div>

                        <input value='Post' className='btn w-full my-2' type="submit" />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditProductDetails;