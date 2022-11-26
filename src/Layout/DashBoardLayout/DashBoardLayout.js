import React from 'react';
import { useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import Footer from '../../Components/Footer/Footer';
import Header from '../../Components/Header/Header';
import { AuthContext } from '../../Context/UserContext';
import useAdmin from '../../Hooks/useAdmin/useAdmin';
import useBuyer from '../../Hooks/useBuyer/userBuyer';
import useSeller from '../../Hooks/useSeller/useSeller';

const DashBoardLayout = () => {
    const { user } = useContext(AuthContext)
    const [isAdmin] = useAdmin(user?.email)
    console.log('admin',isAdmin);
    const [isSeller] = useSeller(user?.email)
    console.log('seller', isSeller)
    const[isBuyer] = useBuyer(user?.email)
    return (
        <div>
            <Header></Header>
            <div className="drawer z-10  drawer-mobile">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content bg-gray-200 relative flex flex-col items-center justify-center">
                    <Outlet></Outlet>
                    <label htmlFor="my-drawer-2" className=" bg-teal-500 rounded-full text-white p-2   absolute top-5 left-5 drawer-button lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5" />
                        </svg>


                    </label>

                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                    <ul className="menu font-semibold z-10  md:bg-transparent bg-gray-300  p-4 w-80  text-base-content">
                        {/* Buyer */}
                        <li><Link to='/dashboard/userpage'>Profile</Link></li>

                        {
                            isBuyer &&
                            <li><Link to='/dashboard/myorders'>My orders</Link></li>
                       }

                        {/* Seller */}
                        {
                            isSeller &&
                            <>
                                <li><Link to='/dashboard/addaproduct'>Add A product</Link></li>
                                <li><Link to='/dashboard/myproducts'> My Products</Link></li>
                                <li><Link to='/dashboard/mybuyers'> My buyers</Link></li>
                            </>
                        }

                        {/* admin */}
                        {
                            isAdmin &&
                            <>
                                <li><Link to='/dashboard/allsellers'>All Sellers</Link></li>
                                <li><Link to='/dashboard/allbuyers'>All Buyers</Link></li>
                                <li><Link to='/dashboard/reporteditems'>Reported Items</Link></li>
                                <li><Link to='/dashboard/allusers'>All Users</Link></li>
                            </>
                        }
                    </ul>

                </div>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default DashBoardLayout;