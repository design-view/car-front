import axios from 'axios';
import React, { useState } from 'react';
import useAsync from '../customHook/useAsync';
import { useNavigate, useParams } from 'react-router-dom';
import EditCategory from './EditCategory';
import { API_URL } from '../config/apiurl';
async function getCar(id){
    const response = await axios.get(`${API_URL}/car/car/`+id);
    return response.data;
}
function DealerCarEdit() {
    const { carId } = useParams();
    const navigate = useNavigate(); 
    const [ state ]  = useAsync(getCar,carId);
    const { loading, data, error } = state;
   
    //자동차버튼 클릭시
    const onSubmit = (e) => {
        //전송요청이벤트 제거 
        e.preventDefault();
        console.log(e.target);
        //입력이 다 되었는지 체크후 함수호출
        registerCar(e.target);
        
    }
    async function registerCar(form){
        const dealerId = sessionStorage.getItem("dealerId");
        const token = sessionStorage.getItem("jwt");
        try{
            const response = await axios.post(
                "http://localhost:8081/dealer/carEdit",form, {
                    headers: {
                      "Content-Type": "multipart/form-data",
                      "Authorization": token
                    },
                  });
            //ok, fail
            if(response.data==="ok"){
                navigate("/dealerList")
            }
        }
        catch(e){
            console.log(e);
        }
       
    }
    console.log(data);
    if(loading) return <div>로딩중....</div>;
    if(error) return <div>에러가 발생했습니다.</div>;
    if(!data) return null;
    return ( 
    <div>
        <h2>차량 수정 하기</h2>
        
        <form onSubmit={onSubmit}>
        <EditCategory categoryId={data.categoryId} makerId={data.makerId} modelId={data.modelId}/>
                <input type="hidden" name="id" value={carId} />
                <div class="mb-3">
                    <label for="title" className="form-label">제목</label>
                    <input type="text" defaultValue={data.title}
                    name="title" className="form-control" 
                    id="title" aria-describedby="titleHelp" 
                    />
                </div>
                <div class="mb-3">
                    <label for="displacement" className="form-label">배기량</label>
                    <input type="text" 
                    name="displacement"
                    defaultValue={data.displacement}
                    className="form-control" 
                    id="displacement" aria-describedby="displacementlHelp" 
                    />
                </div>
                <div class="mb-3">
                    <label for="color" className="form-label">색상</label>
                    <input type="text" 
                    name="color"
                    defaultValue={data.color} 
                    className="form-control" 
                    id="color" aria-describedby="colorHelp" 
                    />
                </div>
                <div class="mb-3">
                    <label for="registerNumber" className="form-label">등록번호</label>
                    <input type="text" 
                    name="registerNumber"
                    defaultValue={data.registerNumber}
                    className="form-control" 
                    id="registerNumber" aria-describedby="registerNumberHelp" 
                    />
                </div>
                <div class="mb-3">
                    <label for="price" className="form-label">가격</label>
                    <input type="text" 
                    name="price"
                    placeholder='만원단위로 입력하세요'
                    defaultValue={data.price}
                    className="form-control" 
                    id="price" aria-describedby="priceHelp" 
                    />
                </div>
                <div class="mb-3">
                    <label for="year" className="form-label">년도</label>
                    <input type="text" 
                    name="year"
                    defaultValue={data.year}
                    className="form-control" 
                    id="year" aria-describedby="yearHelp" 
                    />
                </div>
                <div class="mb-3">
                    <label for="mileage" className="form-label">주행거리</label>
                    <input type="text" 
                    name="mileage"
                    defaultValue={data.mileage}
                    className="form-control" 
                    id="mileage" aria-describedby="mileageHelp" 
                    />
                </div>
                <div class="mb-3">
                    <label for="transmission" className="form-label">변속기</label>
                    <select  
                    name="transmission"
                    defaultValue={data.transmission} 
                    className="form-control" 
                    id="transmission" aria-describedby="mileageHelp" 
                    >
                    <option value="자동">자동</option>
                    <option value="수동">수동</option> 
                    <option value="CVT">CVT</option> 
                    <option value="듀얼클러치">듀얼클러치</option>     
                    </select>
                </div>
                <div class="mb-3">
                    <label for="fuel" className="form-label">연료</label>
                    <select  
                    name="fuel"
                    defaultValue={data.fuel} 
                    className="form-control" 
                    id="fuel" aria-describedby="fuelHelp" 
                    >
                    <option value="전기">전기</option>
                    <option value="가솔린">가솔린</option> 
                    <option value="수소">수소</option> 
                    <option value="디젤">디젤</option> 
                    <option value="하이브리드">하이브리드</option>
                    <option value="LPG">LPG</option>       
                    </select>
                </div>
                <div class="mb-3">
                    <label for="cardesc" className="form-label">설명글</label>
                    <textarea type="text" 
                    name="cardesc"
                    defaultValue={data.cardesc} 
                    className="form-control" 
                    id="cardesc"  
                    ></textarea>
                </div>
                <div> 
                    <button className="btn btn-primary" type="submit">등록</button>
                    <button  className="btn btn-primary"type="reset">취소</button>
                </div>      
            </form>
    </div> 
    );
}

export default DealerCarEdit;