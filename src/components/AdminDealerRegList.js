import axios from 'axios';
import React from 'react';
import useAsync from '../customHook/useAsync';

async function getDelaerReg(){
    const response = await axios.get("http://localhost:8081/admin/dealerRegList",{
        headers: {
            "Authorization": sessionStorage.getItem("jwt")
        }
    });
    return response.data;
}
function AdminDealerRegList() {
    const [state] = useAsync(getDelaerReg);
    const { data, loading, error} = state;
    const addDealer = async (e) => {
        const dataset = e.target.dataset;
        const response = await axios.post("http://localhost:8081/admin/dealerAdd",JSON.stringify(dataset),{
            headers:{
                "Content-Type":"application/json",
                "Authorization":sessionStorage.getItem("jwt")
            }
        })
        if(response.data==="OK"){
            alert("딜러등록되었습니다.");
        }else {
            alert("문제가 발생");
        }
    }
    if(loading) return <div>로딩중...</div>;
    if(error) return <div>에러발생</div>;
    if(!data) return null;
    return (
        <div>
            <h3>딜러요청목록</h3>
            <table className="table">
                <tr>
                    <th scope='col'>이름</th>
                    <th scope='col'>연락처</th>
                    <th scope='col'>위치</th>
                    <th scope='col'>메세지</th>
                    <th scope='col'>회원아이디</th>
                </tr>
                {data.map(dealerReg=> 
                 <tr>
                    <td>{dealerReg.name}</td>
                    <td>{dealerReg.phone}</td>
                    <td>{dealerReg.location}</td>
                    <td>{dealerReg.message}</td>
                    <td>{dealerReg.memberId} <button 
                    data-name={dealerReg.name} 
                    data-phone={dealerReg.phone}
                    data-location={dealerReg.location}
                    data-memberid={dealerReg.memberId}
                    onClick={addDealer}
                    >승인</button></td>
                </tr>
                )}
            </table>
        </div>
    );
}

export default AdminDealerRegList;