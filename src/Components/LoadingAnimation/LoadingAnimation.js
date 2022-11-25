import React from 'react';
import { PulseLoader } from 'react-spinners';

const LoadingAnimation = () => {
    return (
        <div>
            <div className='flex justify-center m-80'>

            <PulseLoader color="#14e9bf" />
            </div>
        </div>
    );
};

export default LoadingAnimation;