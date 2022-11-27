import React from 'react';
import useTitle from '../../../Hooks/useTitle/useTitle';
import Advertise from '../Advertise/Advertise';
import Catagories from '../Catagories/Catagories';
import Facilites from '../Facilites/Facilites';
import Hero from '../Hero/Hero';
import Testimonels from '../Testimoniels/Testimonels';

const Home = () => {
    useTitle('Home')
    return (
        <div >
            <Hero></Hero>
            <Advertise></Advertise>
            <Catagories></Catagories>
            <Testimonels></Testimonels>
            <Facilites></Facilites>
        </div>
    );
};

export default Home;