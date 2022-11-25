
import DashBoardLayout from "../Layout/DashBoardLayout/DashBoardLayout";
import Bikes from "../Pages/Bikes/Bikes";
import Blogs from "../Pages/Blogs/Blogs";
import AddAproduct from "../Pages/Dashboard/AddAproduct/AddAproduct";
import AllBuyers from "../Pages/Dashboard/AllBuyers/AllBuyers";
import AllSellers from "../Pages/Dashboard/AllSellers/AllSellers";
import Alluser from "../Pages/Dashboard/Allusers/Alluser";
import MyOrders from "../Pages/Dashboard/My orders/MyOrders";
import Mybuyers from "../Pages/Dashboard/Mybuyers/Mybuyers";
import MyProducts from "../Pages/Dashboard/MyProducts/MyProducts";
import ReportedItems from "../Pages/Dashboard/ReportedItems/ReportedItems";
import UserPage from "../Pages/Dashboard/UserPage/UserPage";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import AdminRoute from "./AdminRoute/AdminRoute";
import PrivateRoute from "./PrivateRoute/PrivateRoute";

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
                loader: ({ params }) => fetch(`http://localhost:5000/bikes/${params.id}`),
                element:<Bikes></Bikes>
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
                element:<MyOrders></MyOrders>
            },
            
            {
                path: '/dashboard/userpage',
                element:<UserPage></UserPage>
            },
            // seller Routes
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
                element:<PrivateRoute><AdminRoute></AdminRoute></PrivateRoute>
            },
            
            {
                path: '/dashboard/allusers',
                element: <PrivateRoute><AdminRoute><Alluser></Alluser></AdminRoute></PrivateRoute>
            }
        ]
    }
])