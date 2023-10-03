import React from 'react'
import { isUserLoggedIn } from '../services/AuthService'
import { Navigate } from 'react-router-dom';

const AuthenticatedRoute = ({children}) => {

    const isAuth = isUserLoggedIn();

    if (isAuth) {
        return children;
    } else {
        return <Navigate to="/"/>
    }

}

export default AuthenticatedRoute