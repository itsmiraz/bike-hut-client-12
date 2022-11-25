import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { Link } from 'react-router-dom';
import LoadingAnimation from '../../../Components/LoadingAnimation/LoadingAnimation';

const Catagories = () => {

    const {data:catagorires, isLoading } = useQuery({
        queryKey: ['catagory'],
        queryFn: async () => {
            const res = await fetch('https://bike-hut-server.vercel.app/catagories')
            const data = await res.json()
            return data
        }
    })


    if (isLoading) {
        return <LoadingAnimation></LoadingAnimation>
    }

    return (
        <div className='my-2 md:my-20'>
            <h1 className='text-center text-3xl font-semibold'>Catagories </h1>
            
            <div className='flex flex-col md:flex-row px-20 gap-5 md:gap-0 items-center justify-around'>
                {
                    catagorires.map((catagory,i) =>
                        <div key={i}>
                            <Link to={`/bikes/${catagory.catatgory_id}`}>
                            <img src={ catagory.img} className='w-full md:w-40  p-2' alt="" />
                            </Link>

                    </div>)
                }
            </div>
        </div>
    );
};

export default Catagories;