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
            const res = await fetch(`https://bike-hut-server.vercel.app/buyers?email=${user?.email}`)
            const data = await res.json()
            return data
        }
    })


    if (isLoading) {
        return <LoadingAnimation></LoadingAnimation>
    }


    return (
        <div className='h-screen'>
            {
                
                buyers.length === 0 ? 
                    <>
                        <p className='text-center my-10 mb-52 text-xl font-semibold'>
                            You haven't any buyer yet.  
                        </p>
                    </>
                    :
                    <>
                        <h1 className='text-center text-xl font-semibold my-10'>You Have total {buyers.length} { buyers.length > 1 ? 'buyers': 'buyer'}</h1>
                    </>
           }
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