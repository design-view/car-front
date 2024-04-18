import axios from 'axios';
import React, { useEffect, useState } from 'react';
import useAsync from '../customHook/useAsync';

async function getCategory(category,maker){
    const response = await axios.get("http://localhost:8081/category?category="
    +category+"&maker="+maker);
    return response.data;
}
function Category({categoryId,keyword,onSearch}) {
    const [state,refetch] =useAsync(getCategory);
    const [makerView, setMakerView] = useState(false);
    const [modelView, setModelView] = useState(false);
    
    const onChangeModel = (id) => {
        refetch({
            category:categoryId,
            maker:id
        })
    }
    
    const {loading,data,error} = state;
    useEffect(()=>{
        setMakerView(false);
        setModelView(false);
        refetch({category:categoryId,maker:0});
    },[categoryId])
    if(loading) return <div>로딩중입니다.</div>
    if(error) return <div>에러가발생했습니다.</div>
    if(!data) return <div>데이터가 없습니다.</div>
    const { maker, model } = keyword;  //제조사, 모델 
    return ( 
        <div className='category'>
            <h4>제조사별/모델별 검색</h4>
            <ul className='listUl'>
                <li onClick={()=> {
                    setMakerView(true); 
                    setModelView(false);
                }}>{maker}</li>
                <li onClick={()=>{
                    setModelView(true);
                    setMakerView(false);
                    }}>{model}</li>
            </ul>
            <div className={'makerDiv '+(makerView && 'view')}>
                <ul>
                    {data.makers.map(li=>(
                        <li key={li.id} onClick={()=>{ 
                            onSearch({
                                maker:li.makerName,
                                model:"모델"
                            })
                            onChangeModel(li.id)
                            setMakerView(false)
                            }}>
                        {li.makerName}
                        </li>
                    ))}
                </ul>
            </div>
            <div className={'modelDiv '+(modelView && 'view')}>
                <ul>
                    {data.models.map(li=>(
                        <li key={li.id} onClick={()=>{ 
                            onSearch({"model":li.modelName})
                            setModelView(false)
                            }}>
                        {li.modelName}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
     );
}

export default Category;