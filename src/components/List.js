import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CarPageList from './CarPageList';
import Category from './Category';

function List() {
    //param객체 주소창:/page/10 ---> <Route path="/page/:categoryId">  {categoryId:10}
    const { categoryId } = useParams(); //-->param객체 리턴
    console.log(categoryId);
    const [keyword, setKeyword] = useState({
        maker:"제조사",
        model: "모델"
    })
    
    const onReset = () => {
        setKeyword({
            maker:"제조사",
            model: "모델"
        })
    }
    const onSearch = (state) => {
        setKeyword({
            ...keyword,
            ...state
        })
       
    }
    useEffect(()=>{
        onReset();
    },[categoryId])
    return (
        <div>
            <Category  categoryId={categoryId} keyword={keyword} onSearch={onSearch}/>
            <CarPageList categoryId={categoryId} maker={keyword.maker} model={keyword.model}/>
        </div>
      );
}

export default List;