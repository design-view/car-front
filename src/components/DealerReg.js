import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function DealerReg() {
    const navigate = useNavigate();
    const [formData,setFormData]  = useState({
        name:"",
        phone:"",
        message:"",
        location:"",
        memberId:sessionStorage.getItem("memberId")
    })
    //input에 변경이일어났을때 상태 업데이트 
    const onChange = (e) => {
        const { name,value} = e.target;
        setFormData({
            ...formData,
            [name]:value
        })
    } 
    //초기화
    const onReset = () => {
        setFormData({
            name:"",
            phone:"",
            message:"",
            location:"",
        })
    }
    //등록버튼 클릭시
    const onSubmit = (e) => {
        //전송요청이벤트 제거 
        e.preventDefault();
        //입력이 다 되었는지 체크후 함수호출
        if(formData.name && formData.phone 
            && formData.location && formData.memberId){
            dealerRegister();
        }
    }
    async function dealerRegister(){
        //세션스토리지에 저장된 값을반환
        const token =  sessionStorage.getItem("jwt");
        //axios.post("경로",전송데이터,옵션)
        try{
            const response = await axios.post(
                "http://localhost:8081/member/register",formData,
                { 
                    headers: {
                    "Authorization":token
                    }
                });
            //ok, fail
            if(response.data=="ok"){
                navigate("/")
            }
        }
        catch(e){
            console.log(e);
        }
       
    }
    return ( 
        <div>
             <h2>딜러등록 신청하기</h2>
             <form onSubmit={onSubmit}>
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">이름</label>
                    <input type="text" 
                                name="name"
                                value={formData.name} 
                                onChange={onChange} className="form-control"/>
                </div>
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">연락처</label>
                    <input type="text" 
                        name="phone"
                        value={formData.phone} 
                        onChange={onChange} 
                        className="form-control"/>
                </div>
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">주소</label>
                    <input type="text" 
                            name="location"
                            value={formData.location} 
                            onChange={onChange} 
                        className="form-control"/>
                </div>
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">요청사항</label>
                    <textarea name="message" value={formData.message}
                    onChange={onChange} className="form-control"
                    ></textarea>
                </div>
                <div>
                    <button type="submit" className="btn btn-primary">딜러신청</button>
                    <button type="reset" className="btn btn-primary" onClick={onReset}>취소</button>
                </div>              
            </form>
        </div>
     );
}

export default DealerReg;