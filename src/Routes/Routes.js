
import DashBoardLayout from "../Layout/DashBoardLayout/DashBoardLayout";
import Bikes from "../Pages/Bikes/Bikes";
import Blogs from "../Pages/Blogs/Blogs";
import AddAproduct from "../Pages/Dashboard/AddAproduct/AddAproduct";
import AllBuyers from "../Pages/Dashboard/AllBuyers/AllBuyers";
import AllSellers from "../Pages/Dashboard/AllSellers/AllSellers";
import Alluser from "../Pages/Dashboard/Allusers/Alluser";
import MyOrders from "../Pages/Dashboard/My orders/MyOrders";
import Payment from "../Pages/Dashboard/My orders/Payment";
import Mybuyers from "../Pages/Dashboard/Mybuyers/Mybuyers";
import MyProducts from "../Pages/Dashboard/MyProducts/MyProducts";
import ReportedItems from "../Pages/Dashboard/ReportedItems/ReportedItems";
import UserPage from "../Pages/Dashboard/UserPage/UserPage";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import AdminRoute from "./AdminRoute/AdminRoute";
import BuyerRoute from "./BuyerRoute/BuyerRoute";
import PrivateRoute from "./PrivateRoute/PrivateRoute";
import SellerRoute from "./SellerRoute/SellerRoute";

const { createBrowserRouter } = require("react-router-dom");
const { default: Main } = require("../Layout/Main/Main");
const { default: Home } = require("../Pages/Home/Home/Home");

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/register',
                element: <Register></Register>
            },
            {
                path: '/blogs',
                element:<Blogs></Blogs>
            },
            {
                path: '/bikes/:id',
                loader: ({ params }) => fetch(`https://bike-hut-server.vercel.app/bikes/${params.id}`),
                element:<Bikes></Bikes>
            },
            {
                path: '*',
                element:<ErrorPage></ErrorPage>
            }
        ]
    },
    {
        path: '/dashboard',
        element: <PrivateRoute><DashBoardLayout></DashBoardLayout></PrivateRoute>,
        children: [
        // normal User Route
            {
                path: '/dashboard/myorders',
                element:<PrivateRoute><BuyerRoute><MyOrders></MyOrders></BuyerRoute></PrivateRoute>
            },
            
            {
                path: '/dashboard/userpage',
                element:<PrivateRoute><UserPage></UserPage></PrivateRoute>
            },
            // seller Routes
            {
                path: '/dashboard/addaproduct',
                element:<PrivateRoute><SellerRoute><AddAproduct></AddAproduct></SellerRoute></PrivateRoute>
            },
            {
                path: '/dashboard/myproducts',
                element:<PrivateRoute><SellerRoute><MyProducts></MyProducts></SellerRoute></PrivateRoute>
            },
            {
                path: '/dashboard/mybuyers',
                element:<PrivateRoute><SellerRoute><Mybuyers></Mybuyers></SellerRoute></PrivateRoute>
            },

            // Admin Route
            {
                path: '/dashboard/allsellers',
                element:<PrivateRoute><AdminRoute><AllSellers></AllSellers></AdminRoute></PrivateRoute>
            },
            {   
                path: '/dashboard/allbuyers',
                element:<PrivateRoute><AdminRoute><AllBuyers></AllBuyers></AdminRoute></PrivateRoute>
            },
            {
                path: '/dashboard/reporteditems',
                element:<PrivateRoute><AdminRoute><ReportedItems></ReportedItems></AdminRoute></PrivateRoute>
            },
            
            {
                path: '/dashboard/allusers',
                element: <PrivateRoute><AdminRoute><Alluser></Alluser></AdminRoute></PrivateRoute>
            },
           
            {
                path: "/dashboard/payment/:id",
                loader: ({ params }) =>
                  fetch(`https://bike-hut-server.vercel.app/bookings/${params.id}`),
                element: <PrivateRoute><Payment></Payment></PrivateRoute>
            },
            {
                path: "*",
                element:<ErrorPage></ErrorPage>
            },
        ]
    }
])