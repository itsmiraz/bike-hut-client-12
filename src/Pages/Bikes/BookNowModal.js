import React from 'react';
import { useContext } from 'react';
import { AuthContext } from '../../Context/UserContext';

const BookNowModal = ({ bikedetails, setBikedetails }) => {

    const { user } = useContext(AuthContext)
    
    const {
        _id,
        model,
        image,
        resalePrice,

    } = bikedetails;

    const handlebook = e => {
        e.preventDefault()
        setBikedetails(null)
        const form = e.target;

        const bookedDetails = {
            buyerEmail: user?.email,
            img: image,
            bikeModel: model,
            bikePrice: resalePrice,
            bikeId: _id,
            meetLocation: form.location.value,
            buyerNumber:form.number.value,
        }
        console.log(bookedDetails)


    }
    return (
        <div>
            <input type="checkbox" id="bookNowModal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor="bookNowModal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <form onSubmit={handlebook}>
                        <h1 className='text-xl font-semibold'>Booking Details</h1>
                        <label className="label">
                            <span className="label-text">Buyer Name</span>
                          
                        </label>
                        <input readOnly   defaultValue={user?.displayName} type="text" placeholder="Type here" className="input input-bordered w-full my-2" />

                        <label className="label">
                            <span className="label-text">Buyer Email</span>
                          
                        </label>
                        <input readOnly defaultValue={user?.email} type="text" placeholder="Type here" className="input input-bordered w-full my-2" />
                        
                        <label className="label">
                            <span className="label-text">Bike Model</span>
                          
                        </label>
                        <input readOnly defaultValue={model} type="text" placeholder="Type here" className="input input-bordered w-full my-2" />
                       
                        <label className="label">
                            <span className="label-text">Price (Tk)</span>
                          
                        </label>
                        <input readOnly defaultValue={resalePrice} type="text" placeholder="Type here" className="input input-bordered w-full my-2" />
                        
                        <label className="label">
                            <span className="label-text">Meeting Location</span>
                          
                        </label>
                        <input name='location' required type="text" placeholder="Location" className="input input-bordered w-full my-2" />
                       
                        <label className="label">
                            <span className="label-text">Phone Number</span>
                          
                        </label>
                        <input name='number' required type="text" placeholder="Type here" className="input input-bordered w-full my-2" />
                        <button type='submit' className='w-full bg-teal-500 text-white font-semibold py-3 my-2 rounded-lg'>Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default BookNowModal;