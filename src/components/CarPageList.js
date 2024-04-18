import axios from 'axios';
import React, { useEffect } from 'react';
import useAsync from '../customHook/useAsync';
import { Link, useParams } from 'react-router-dom';

//함수
async function getCarList(id,maker,model){
    //http://localhost:8081/carlist?categoryId=1&maker=5&model=4
    const response = await axios.get("http://localhost:8081/carlist?categoryId="+id
    +"&maker="+maker+"&model="+model);
    return response.data;
}
function CarPageList({categoryId, maker, model}) {
    
    const [state] =  useAsync(getCarList,categoryId,maker,model);
    const { loading,data,error} = state;
    
    if(loading) return <div>로딩중...</div>;
    if(error) return <div>에러가 발생했습니다.</div>;
    if(!data) return null;
    return (
        <div>
            <h4>등록 {data.length}대</h4>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">사진</th>
                        <th scope="col">차량정보</th>
                        <th scope="col">연식</th>
                        <th scope="col">연료</th>
                        <th scope="col">주행</th>
                        <th scope="col">가격</th>
                        <th scope="col">딜러</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((car,index)=>(
                        <tr key={index}>
                            <td><img src={"http://localhost:8081/image?image="+car.imgName} 
                            width="160px" /></td>
                            <td> <Link to={"/carDetail/"+car.id}>
                                {car.title}</Link></td>
                            <td>{car.year}</td>
                            <td>{car.fuel}</td>
                            <td>{car.mileage}</td>
                            <td>{car.price}</td>
                            <td>{car.dealer.name}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default CarPageList;