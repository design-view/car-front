import React, { useEffect, useState } from 'react';
import './CarDetail.css';
import { useParams} from 'react-router-dom';
import axios from 'axios';
import useAsync from '../customHook/useAsync';
//전달할 함수 http://localhost:8081/car/12
async function getCar(id){
    const response = await axios.get("http://localhost:8081/car/car/"+id);
    return response.data;
}

function CarDetail() {
    const { carId } = useParams() 
    const [ state ]  = useAsync(getCar,carId);
    const { loading, data, error } = state;
    const [bigImg,setBigImg] =  useState(null);
    const onImgch = (e) => {
       const {img} = e.target.dataset;
       console.log(img);
       setBigImg(img);
    }
    if(loading) return <div>로딩중....</div>;
    if(error) return <div>에러가 발생했습니다.</div>;
    if(!data) return null;
    console.log(carId);
    return ( 
        <div>
             <h4>{data.title}</h4>
            {/* 이미지 차량정보 */}
            <div className='detail'>
                <div className='detailView'>
                    <div className='viewImg'>
                    <img src={"http://localhost:8081/car/image?image="
                    +(bigImg==null ? data.carImageDtos[0].imgName: bigImg)} 
                        className="card-img-top" style={{width:"100%"}} alt="..."/ >
                    </div>
                   
                    <ul>
                        {
                            data.carImageDtos.map(img=>(
                                <li>
                                    <img src={"http://localhost:8081/image?image="
                                    +img.imgName } data-img={img.imgName} onMouseEnter={onImgch} 
                                className="card-img-top" style={{width:"100%"}} 
                                alt="..."/ ></li>
                            ))
                        }
                       
                    </ul>
                </div>
                <div className='detailInfo'>
                    <div className='carInfo'>
                        <div className='carTitle'>{data.model}</div>
                        <div>
                            <ul>
                                <li><b>{data.year}</b>년식</li>
                                <li><b>{data.mileage}</b>km</li>
                                <li><b>{data.fuel}</b></li>
                            </ul>
                        </div>
                        <div className='price'><span>{data.price}</span>만원</div>
                    </div>
                    <div className='dealer'>
                        <div className='profile'>
                            <div><img /></div>
                            <div>
                                <span>이름 : {data.dealer.name}</span>
                                <div>
                                    판매중 <span>25</span>
                                    판매중 <span>30</span>
                                </div>
                            </div>
                        </div>
                        <div>
                            <table>
                                <tr>
                                    <td>휴대폰</td>
                                    <td>{data.dealer.phone}<br/>053-123-4567</td>
                                </tr>
                                <tr>
                                    <td>종사원증</td>
                                    <td>19-053-00397</td>
                                </tr>
                                <tr>
                                    <td>소속</td>
                                    <td>올카모터스(053-123-0000)</td>
                                </tr>
                                <tr>
                                    <td>주소</td>
                                    <td>{data.dealer.location}</td>
                                </tr>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            {/* 설명부분 */}
            <h3>차량설명</h3>
            <div className='detaildesc'>
                {data.cardesc}
            </div>
        </div>
     );
}

export default CarDetail;