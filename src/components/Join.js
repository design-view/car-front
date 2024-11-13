import axios from 'axios';
import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../config/apiurl';
function Join() {
    const navigate = useNavigate();
    const [isEmail, setIsEmail] = useState(false);
    const [isPassword, setIsPassword] = useState(false);
    

    //오류메시지 상태저장
    const [emailMessage, setEmailMessage] = useState('');
    const [passwordMessage, setPasswordMessage] = useState('');
    

    const [formData,setFormData]  = useState({
        name:"",
        email:"",
        password:"",
        address:""
    })
    //input에 변경이일어났을때 상태 업데이트 
    const onChange = (e) => {
        const { name,value} = e.target;
        if(name==="email"){
            onCheckEmail(value);
        }
        if(name==="password"){
            onCheckPassword(value);
        }
        setFormData({
            ...formData,
            [name]:value
        })
    } 
    //초기화
    const onReset = () => {
        setFormData({
            username:"",
            password:""
        })
    }
    //로그인버튼 클릭시
    const onSubmit = (e) => {
        //전송요청이벤트 제거 
        e.preventDefault();
        //입력이 다 되었는지 체크후 함수호출
        if(formData.name && formData.password 
            && formData.email && formData.address && isEmail && isPassword){
            memberJoin();
        }
    }
    // 이메일 체크하기 
    const onCheckEmail = useCallback((mail) => {
        const emailRegex =
        /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/
        const emailCurrent = mail;
        if (!emailRegex.test(emailCurrent)) {
            setEmailMessage('이메일 형식이 틀렸어요! 다시 확인해주세요');
        } else {
            setEmailMessage('올바른 이메일 형식이에요 : )');
            setIsEmail(true);
        }
    }, [])

    // 비밀번호 - 숫자+영문자+특수문자 조합으로 해주세요
    const onCheckPassword = useCallback((pass) => {
        const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/
        const passwordCurrent = pass;

        if (!passwordRegex.test(passwordCurrent)) {
            setPasswordMessage('숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요!');
           
        } else {
            setPasswordMessage('안전한 비밀번호에요 : )');
            setIsPassword(true);
        }
    }, [])

    async function memberJoin(){
        try{
            const response = await axios.post(
                `${API_URL}/site/join`,formData);
            //ok, fail
            if(response.data==="ok"){
                navigate("/login")
            }
        }
        catch(e){
            console.log(e);
        }
       
    }
    return ( 
        <div>
             <h2>회원가입하기</h2>
             <form onSubmit={onSubmit}>
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">이름</label>
                    <input type="text" 
                                name="name"
                                value={formData.name} 
                                onChange={onChange} className="form-control"/>
                </div>
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">이메일</label>
                    <input type="text"
                        placeholder='이메일 형식을 지켜주세요' 
                        name="email"
                        value={formData.email} 
                        onChange={onChange} 
                        className="form-control"/>
                    <div>{emailMessage}</div>
                </div>
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">패스워드</label>
                    <input type="password" placeholder='숫자+영문자+특수문자 조합으로 해주세요' 
                            name="password"
                            value={formData.password} 
                            onChange={onChange} 
                        className="form-control"/>
                    <div>{passwordMessage}</div>
                </div>
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">주소</label>
                    <input type="text" 
                            name="address"
                            value={formData.address} 
                            onChange={onChange} 
                        className="form-control"/>
                </div>
                <div>
                    <button type="submit" className="btn btn-primary">회원가입</button>
                    <button type="reset" className="btn btn-primary" onClick={onReset}>취소</button>
                </div>              
            </form>
        </div>
     );
}

export default Join;