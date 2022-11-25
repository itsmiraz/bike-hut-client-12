
import React from 'react';
import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import LoadingAnimation from '../../Components/LoadingAnimation/LoadingAnimation';
import { AuthContext } from '../../Context/UserContext';
import useAdmin from '../../Hooks/useAdmin/useAdmin';



const AdminRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext)
  const [isAdmin,isAdminLoading]  = useAdmin(user?.email)
    const location = useLocation()

    if (loading || isAdminLoading) {

        return <LoadingAnimation></LoadingAnimation>

    }


    if (user && user.uid && isAdmin) {
        return children
    }
    return <Navigate to='/login' state={{ from: location }} replace></Navigate>
};

export default AdminRoute;