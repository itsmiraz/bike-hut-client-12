import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
    return (
        <div>
            <div>
                <div className="hero my-10">
                    <div className="hero-content flex-col lg:flex-row-reverse">
                        <img alt='' src="https://i.ibb.co/cXtQYSH/pngfind-com-png-for-picsart-hd-1109055.png" className=" w-[50%] rounded-lg " />
                        <div className='w-[50%]'>
                            <h1 className="text-5xl font-bold">Welcome To BIKE HUT!</h1>
                            <p className="py-4 w-96">Bike hut is a online based bike selling and buying platform. Where anyone can come and sell or buy bikes.</p>
                            <Link to='/login'>
                                <button className="py-2 px-4 text-white font-semibold bg-teal-500 rounded-full ">Get Started</button>

                            </Link>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;