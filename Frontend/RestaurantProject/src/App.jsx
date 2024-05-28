import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Title from './HomePage/Title';
import TableReservation from './OrderPage/TableReservation';
import OrderOnline from './OrderPage/OrderOnline';
import PayOnline from './OrderPage/PayOnline';


function App() {

  return (
    <BrowserRouter>
        <Routes>
          <Route path='/' element={<Title />} />
          <Route path='/table-reservation' element={<TableReservation />} />
          <Route path='/order-online' element={<OrderOnline />} />
          <Route path='/order-online/payment' element={<PayOnline />} />
        </Routes>
      </BrowserRouter>
        
  )
}

export default App
