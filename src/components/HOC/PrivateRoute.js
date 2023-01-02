import React from 'react';
import {Navigate,Outlet} from "react-router-dom";

function PrivateRoute(props) {
    const token  = localStorage.getItem('token')
    return token ? <Outlet/> : <Navigate to={'signin'}/>
}

export default PrivateRoute;
