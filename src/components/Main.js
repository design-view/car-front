import React from 'react';
import CarList from './CarList';

function Main() {
    return (
    <div className='main'>
        <div>
            <h2>국산차 베스트 매물</h2>
            <CarList id={1}/>
        </div>
        <div>
            <h2>수입차 베스트 매물</h2>
            <CarList id={2}/>
        </div>
    </div> 
    );
}

export default Main;