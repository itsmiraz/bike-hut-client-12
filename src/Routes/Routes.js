
import DashBoardLayout from "../Layout/DashBoardLayout/DashBoardLayout";
import AddAproduct from "../Pages/Dashboard/AddAproduct/AddAproduct";
import AllBuyers from "../Pages/Dashboard/AllBuyers/AllBuyers";
import AllSellers from "../Pages/Dashboard/AllSellers/AllSellers";
import MyOrders from "../Pages/Dashboard/My orders/MyOrders";
import Mybuyers from "../Pages/Dashboard/Mybuyers/Mybuyers";
import MyProducts from "../Pages/Dashboard/MyProducts/MyProducts";
import ReportedItems from "../Pages/Dashboard/ReportedItems/ReportedItems";
import Login from "../Pages/Login/Login";
import Products from "../Pages/Products/Products";
import Register from "../Pages/Register/Register";

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
                path: '/products/:id',
                loader: ({ params }) => fetch(''),
                element:<Products></Products>
            }
        ]
    },
    {
        path: '/dashboard',
        element: <DashBoardLayout></DashBoardLayout>,
        children: [
            {
                path: '/dashboard/myorders',
                element:<MyOrders></MyOrders>
            },
            {
                path: '/dashboard/addaproduct',
                element:<AddAproduct></AddAproduct>
            },
            {
                path: '/dashboard/myproducts',
                element:<MyProducts></MyProducts>
            },
            {
                path: '/dashboard/mybuyers',
                element:<Mybuyers></Mybuyers>
            },
            {
                path: '/dashboard/allsellers',
                element:<AllSellers></AllSellers>
            },
            {   
                path: '/dashboard/allbuyers',
                element:<AllBuyers></AllBuyers>
            },
            {
                path: '/dashboard/reporteditems',
                element:<ReportedItems></ReportedItems>
            }
        ]
    }
])