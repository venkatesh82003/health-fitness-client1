import React from 'react';
import {Navigate,Outlet} from 'react-router-dom';
function ProtectedRoute(props){
    return(
        props.isUserAuthenticated?<Outlet/>:<Navigate to='/'/>
    );
}
export default ProtectedRoute;