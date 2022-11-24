import React from 'react';
import Advertise from '../Advertise/Advertise';
import Catagories from '../Catagories/Catagories';
import Hero from '../Hero/Hero';

const Home = () => {
    return (
        <div >
            <Hero></Hero>
            <Advertise></Advertise>
            <Catagories></Catagories>
        </div>
    );
};

export default Home;