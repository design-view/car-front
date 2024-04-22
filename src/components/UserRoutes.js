import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

function UserRoutes({role}) {
    if(role==="" || role===null){
        alert("로그인한 회원만 등록이 가능합니다.");
    }
    if(role==="DEALER"){
        alert("이미 딜러로 등록되어있습니다.");
    }
    return role==="USER" ? <Outlet/> : <Navigate to="/login"/>
}

export default UserRoutes;