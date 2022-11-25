import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useContext } from 'react';
import LoadingAnimation from '../../../Components/LoadingAnimation/LoadingAnimation';
import { AuthContext } from '../../../Context/UserContext';
import MybuyersCard from './MybuyersCard';

const Mybuyers = () => {

    const { user } = useContext(AuthContext)

    const { data: buyers, isLoading } = useQuery({
        queryKey: ['buyers', user?.email],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/buyers?email=${user?.email}`)
            const data = await res.json()
            return data
        }
    })


    if (isLoading) {
        return <LoadingAnimation></LoadingAnimation>
    }


    return (
        <div className='h-screen w-full'>
            <h1 className='text-center text-xl font-semibold my-10'>My Buyers  : {buyers.length}</h1>
            <div className='px-10'>
                {

                    buyers.map((buyer,i) => <MybuyersCard
                        i={i}
                        key={buyer._id}
                        buyer={buyer}
                    ></MybuyersCard>)

                }
            </div>

        </div>
    );
};

export default Mybuyers;