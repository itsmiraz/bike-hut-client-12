
import React from 'react';
import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import LoadingAnimation from '../../Components/LoadingAnimation/LoadingAnimation';
import { AuthContext } from '../../Context/UserContext';
import useBuyer from '../../Hooks/useBuyer/userBuyer';



const BuyerRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext)
    const [isBuyer,isBuyerLoading] = useBuyer(user?.email)
    const location = useLocation()

    if (loading || isBuyerLoading) {

        return <LoadingAnimation></LoadingAnimation>

    }


    if (user && user.uid && isBuyer) {
        return children
    }
    return <Navigate to='/login' state={{ from: location }} replace></Navigate>
};

export default BuyerRoute;