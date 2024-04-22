import AdminDealerRegList from "./AdminDealerRegList";
import AdminMemberList from "./AdminMemberList";

function AdminMain() {
    return ( 
    <div>
        <h3>관리자 페이지입니다.</h3>
        <div className="flex">
            <AdminMemberList/>
            <AdminDealerRegList/>
        </div>
    </div> );
}

export default AdminMain;