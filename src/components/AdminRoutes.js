import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

function AdminRoutes({role}) {
    if(role==="" || role===null || role==="USER" || role==="DEALER"){
        alert("권한이 없습니다.");
    }
    return role==="ADMIN" ? <Outlet/> : <Navigate to="/"/>
}

export default AdminRoutes;