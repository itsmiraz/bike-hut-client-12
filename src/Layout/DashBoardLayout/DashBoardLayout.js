import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import Footer from '../../Components/Footer/Footer';
import Header from '../../Components/Header/Header';

const DashBoardLayout = () => {
    return (
        <div>
            <Header></Header>
            <div className="drawer   drawer-mobile">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content relative flex flex-col items-center justify-center">
                    <Outlet></Outlet>
                    <label htmlFor="my-drawer-2" className=" bg-teal-500 rounded-full text-white p-2   absolute top-5 left-5 drawer-button lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5" />
                        </svg>


                    </label>

                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                    <ul className="menu font-semibold   p-4 w-80  text-base-content">
                        {/* Buyer */}
                        <li><Link to='/dashboard/userpage'>Profile</Link></li>
                        <li><Link to='/dashboard/myorders'>My orders</Link></li>

                        {/* Seller */}
                        <li><Link to='/dashboard/addaproduct'>Add A product</Link></li>
                        <li><Link to='/dashboard/myproducts'> My Products</Link></li>
                        <li><Link to='/dashboard/mybuyers'> My buyers</Link></li>

                        {/* admin */}
                        <li><Link to='/dashboard/allsellers'>All Sellers</Link></li>
                        <li><Link to='/dashboard/allbuyers'>All Buyers</Link></li>
                        <li><Link to='/dashboard/reporteditems'>Reported Items</Link></li>
                    </ul>

                </div>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default DashBoardLayout;