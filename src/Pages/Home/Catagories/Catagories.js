import { useQuery } from '@tanstack/react-query';
import React from 'react';
import LoadingAnimation from '../../../Components/LoadingAnimation/LoadingAnimation';

const Catagories = () => {

    const {data:catagorires, isLoading } = useQuery({
        queryKey: ['catagory'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/catagories')
            const data = await res.json()
            return data
        }
    })


    if (isLoading) {
        return <LoadingAnimation></LoadingAnimation>
    }

    return (
        <div className='my-20'>
            <h1 className='text-center text-xl font-semibold'>Catagories </h1>
            
            <div className='flex px-20 items-center justify-around'>
                {
                    catagorires.map((catagory,i) =>
                        <div key={i}>
                            <img src={ catagory.img} className='w-40  p-2' alt="" />

                    </div>)
                }
            </div>
        </div>
    );
};

export default Catagories;