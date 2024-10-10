
import Header from './components/Header';
import CarList from './components/CarList';
import { Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import { useState } from 'react';
import Join from './components/Join';
import CarAdd from './components/CarAdd';
import CarDetail from './components/CarDetail';
import Main from './components/Main';
import CarPageList from './components/CarPageList';
import List from './components/List';
import DealerReg from './components/DealerReg';
import UserRoutes from './components/UserRoutes';
import DealerRoutes from './components/DealerRoutes';
import DealerCarList from './components/DealerCarList';
import DealerCarEdit from './components/DealerCarEdit';
import AdminRoutes from './components/AdminRoutes';
import AdminMain from './components/AdminMain';
import './App.css';
function App() {
  //로그인 한상태인지 상태관리
  const [isAuthenticated, setAuth] = useState(false);
  const role = sessionStorage.getItem("role");
  console.log("role은 : " +role);
  return (
    <div className="App">
      <Header role={role} isAuthenticated={isAuthenticated} setAuth={setAuth}/>
      <div className='container'>
      <Routes>
        <Route path='/' element={<Main/>}/>
        <Route path="/carList/:categoryId" element={<List/>} />
        <Route path='/login' element={<Login isAuthenticated={isAuthenticated} setAuth={setAuth}/>} />
        <Route path="/join" element={<Join/>} />
        <Route path='/carDetail/:carId' element={<CarDetail/>} />
        <Route element={<DealerRoutes role={role}/>}>
          <Route path='/addCar' element={<CarAdd/>} />
          <Route path='/dealerList' element={<DealerCarList/>} />
          <Route path='/carEdit/:carId' element={<DealerCarEdit/>} />
        </Route>
        <Route element={<UserRoutes role={role} />}>
          <Route path='/dealer' element={<DealerReg/>} />
        </Route>
        <Route element={<AdminRoutes role={role} />}>
          <Route path='/admin' element={<AdminMain />} />
        </Route>
      </Routes>
      </div>
    </div>
  );
}

export default App;
