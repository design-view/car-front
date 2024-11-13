import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAsync from '../customHook/useAsync';
import { API_URL } from '../config/apiurl';
async function getCategory(id,maker){
    const response = await axios.get
    (`${API_URL}/car/category?category=`+id+"&maker="+maker);
    console.log(response);
    return response.data;
}
function CarAdd() {
     //1)카테고리 선택, 메이커선택 값을 관리 
     const [ cate, setCate] = useState({
        category:1,
        maker:1
    });

    const [cateState,refetch] = useAsync(getCategory,0,0,0);
    const { loading,data,error} = cateState;
    const navigate = useNavigate();

   
    const [formData,setFormData]  = useState({
        title:"",    //제목
        cardesc:"",  //설명    textarea
        color:"",    //색상
        registerNumber:"",   //차량등록번호
        year:"",             //년도
        price:"",            //가격(만원단위로 입력)
        displacement:"",     //배기량
        mileage:"",          //주행거리
        transmission: "자동",    //변속기 select 자동/수동/CVT/듀얼클러치
        fuel:"전기",              //연료   select 전기/가솔린/수소/디젤/하이브리드/LPG
        modelId:"1"
    })
    //폼을 생성 해서 carformData에 할당
    const carformData = new FormData();
    //파일업로시 동작 
    const onChangeImage =  (e) => {
        const { name } = e.target;
        console.log(e.target);
        if (e.target.files && e.target.files.length > 0) {
           //폼테크에 속성 추가하기 
            carformData.append(name, e.target.files[0]);
        }    
    }

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
            title:"", 
            cardesc:"",
            color:"", 
            registerNumber:"",
            year:"",
            price:"",
            dealerId:"1",
            displacement:"",
            mileage:"",
            transmission: "",
            fuel:""
        })
    }
    //2)카테고리, 메이커 선택 변경했을때 실행 
    const onCateChange =  (e) => {
        //이벤트를 발생시킨 select의 name값과 value값 각각 변수에 할당
        const {name,value} = e.target;
        console.log(name);
        console.log(value);
        //상태 업데이트 
        setCate(state=>
            ({
            ...state,
            [name]:value,
            maker: name!=="category" ? value : value===2 ? 6 : 1 
            })
        );  
    }
    //자동차버튼 클릭시
    const onSubmit = (e) => {
        //전송요청이벤트 제거 
        e.preventDefault();
        //입력이 다 되었는지 체크후 함수호출
        registerCar();
        
    }
    async function registerCar(){
        const dealerId = sessionStorage.getItem("dealerId");
        console.log("여기에요딜러아이디"+dealerId)
        //carformData.append("CarAddDto", new Blob([JSON.stringify(formData)], { type: "multipart/form-data" }));
        carformData.append("title",formData.title);
        carformData.append("mileage",formData.mileage);
        carformData.append("color",formData.color);
        carformData.append("registerNumber",formData.registerNumber);
        carformData.append("year",formData.year);
        carformData.append("price",formData.price);
        carformData.append("dealerId",dealerId);
        carformData.append("displacement",formData.displacement);
        carformData.append("cardesc",formData.cardesc);
        carformData.append("transmission",formData.transmission);
        carformData.append("modelId",formData.modelId);
        carformData.append("fuel",formData.fuel);
        carformData.append("categoryId",cate.category);
        carformData.append("makerId",cate.maker);
        const token = sessionStorage.getItem("jwt");
        console.log("여기에요"+carformData);
        try{
            const response = await axios.post(
                `{$API_URL}/dealer/addCar`,carformData, {
                    headers: {
                      "Content-Type": "multipart/form-data",
                      "Authorization": token
                    },
                  });
            //ok, fail
            if(response.data==="ok"){
                navigate("/")
            }
        }
        catch(e){
            console.log(e);
        }
       
    }
    useEffect(() => {
        refetch(cate.category,cate.maker);
    }, [cate]);
    if(loading) return <div>로딩중입니다.</div>;
    if(error) return <div>에러가 발생했습니다.</div>;
    if(!data) return <div>데이터가 없습니다.</div>;
   
    
    return ( 
    <div>
        <h2>차량 등록 하기</h2>
        <form onSubmit={onSubmit}>
                <div class="mb-3">
                    <label for="category" className="form-label">카테고리</label>
                    <select name="category" id="category" onChange={onCateChange}
                    value={cate.category} className="form-control" >
                        {data.categories.map(li=>(
                            <option value={li.id} key={li.id}>{li.categoryName}</option>
                        ))}
                    </select>
                </div>
                <div class="mb-3">
                    <label for="maker" className="form-label" >브랜드</label>
                    <select name="maker" id="maker" onChange={onCateChange}
                    value={cate.maker} className="form-control" >
                        {data.makers.map(li=>(
                            <option value={li.id} key={li.id}>{li.makerName}</option>
                        ))}
                    </select>
                </div>
                <div class="mb-3">
                    <label for="modelId" className="form-label">모델</label>
                    <select name="modelId" id="modelId" className="form-control" 
                    onChange={onChange} value={formData.modelId}> 
                        {data.models.map(li=>(
                            <option value={li.id} key={li.id}>{li.modelName}</option>
                        ))}
                    </select>
                </div>
                <div class="mb-3">
                    <label for="title" className="form-label">제목</label>
                    <input type="text" 
                    name="title"
                    value={formData.title} 
                    onChange={onChange} className="form-control" 
                    id="title" aria-describedby="titleHelp" 
                    />
                </div>
                <div class="mb-3">
                    <label for="displacement" className="form-label">배기량</label>
                    <input type="text" 
                    name="displacement"
                    value={formData.displacement} 
                    onChange={onChange} className="form-control" 
                    id="displacement" aria-describedby="displacementlHelp" 
                    />
                </div>
                <div class="mb-3">
                    <label for="color" className="form-label">색상</label>
                    <input type="text" 
                    name="color"
                    value={formData.color} 
                    onChange={onChange} className="form-control" 
                    id="color" aria-describedby="colorHelp" 
                    />
                </div>
                <div class="mb-3">
                    <label for="registerNumber" className="form-label">등록번호</label>
                    <input type="text" 
                    name="registerNumber"
                    value={formData.registerNumber} 
                    onChange={onChange} className="form-control" 
                    id="registerNumber" aria-describedby="registerNumberHelp" 
                    />
                </div>
                <div class="mb-3">
                    <label for="price" className="form-label">가격</label>
                    <input type="text" 
                    name="price"
                    placeholder='만원단위로 입력하세요'
                    value={formData.price} 
                    onChange={onChange} className="form-control" 
                    id="price" aria-describedby="priceHelp" 
                    />
                </div>
                <div class="mb-3">
                    <label for="year" className="form-label">년도</label>
                    <input type="text" 
                    name="year"
                    value={formData.year} 
                    onChange={onChange} className="form-control" 
                    id="year" aria-describedby="yearHelp" 
                    />
                </div>
                <div class="mb-3">
                    <label for="mileage" className="form-label">주행거리</label>
                    <input type="text" 
                    name="mileage"
                    value={formData.mileage} 
                    onChange={onChange} className="form-control" 
                    id="mileage" aria-describedby="mileageHelp" 
                    />
                </div>
                <div class="mb-3">
                    <label for="mileage" className="form-label">변속기</label>
                    <select  
                    name="mileage"
                    value={formData.mileage} 
                    onChange={onChange} className="form-control" 
                    id="mileage" aria-describedby="mileageHelp" 
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
                    value={formData.fuel} 
                    onChange={onChange} className="form-control" 
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
                    value={formData.cardesc} 
                    onChange={onChange} className="form-control" 
                    id="cardesc"  
                    ></textarea>
                </div>
                <div class="mb-3">
                    <label for="year" className="form-label">이미지1</label>
                    <input type='file' className='custom-file-input form-control' 
                            name='uploadFiles' onChange={onChangeImage}/>
                </div>
                <div class="mb-3">
                    <label for="year" className="form-label">이미지2</label>
                    <input type='file' className='custom-file-input form-control' 
                            name='uploadFiles' onChange={onChangeImage}/>
                </div>
                <div class="mb-3">
                    <label for="year" className="form-label">이미지3</label>
                    <input type='file' className='custom-file-input form-control' 
                            name='uploadFiles' onChange={onChangeImage}/>
                </div>
                <div class="mb-3">
                    <label for="year" className="form-label">이미지4</label>
                    <input type='file' className='custom-file-input form-control' 
                            name='uploadFiles' onChange={onChangeImage}/>
                </div>
                <div class="mb-3">
                    <label for="year" className="form-label">이미지5</label>
                    <input type='file' className='custom-file-input form-control' 
                            name='uploadFiles' onChange={onChangeImage}/>
                </div>
                <div> 
                    <button className="btn btn-primary" type="submit">등록</button>
                    <button  className="btn btn-primary"type="reset" onClick={onReset}>취소</button>
                </div>      
            </form>
    </div> 
    );
}

export default CarAdd;
