import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useForm } from 'react-hook-form';

const EditProductDetails = ({bikedetails,setbikedetails}) => {

    const { register, handleSubmit, formState: { errors } } = useForm()


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
    }

    return (
        <div>
              <input type="checkbox" id="editdetailsModal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor="editdetailsModal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <form onSubmit={handleSubmit(handleEditDetails)}>
                    <div>
                        <label className="label">
                            <span className="label-text font-semibold">Image</span>
                        </label>
                        <input
                            {...register('image', { required: true })}
                            type="file" className="file-input w-full max-w-xs" />
                        {errors.image && <span className='mx-2'>This field is required</span>}
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
                            <option>New</option>
                            <option>Fresh</option>
                            <option>Used</option>

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
                            <span className="label-text font-semibold">Purchase Date</span>
                        </label>
                        <input type='text'
                            {...register('purchaseDate', { required: true })}
                            className='input input-bordered w-full my-2' placeholder="dd/mm/yy" />
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
        </div>
    );
};

export default EditProductDetails;