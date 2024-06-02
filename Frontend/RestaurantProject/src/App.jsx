import './App.css'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Title from './HomePage/Title';
import TableReservation from './OrderPage/TableReservation';
import OrderOnline from './OrderPage/OrderOnline';
import PayOnline from './OrderPage/PayOnline';
import { Login } from './Login';
import { ManagerPage } from './ManagerPage';


function App() {

  return (
    <BrowserRouter>
        <Routes>
          <Route path='/' element={<Title />} />
          <Route path='/table-reservation' element={<TableReservation />} />
          <Route path='/order-online' element={<OrderOnline />} />
          <Route path='/order-online/payment' element={<PayOnline />} />
          <Route path='/login' element={<Login />} />
          <Route path='/login/managerPage' element={<ManagerPage/>} />
        </Routes>
      </BrowserRouter>
        
  )
}

export default App
