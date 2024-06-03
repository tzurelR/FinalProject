import * as React from 'react';
import { useState } from 'react';
import Button from '@mui/material/Button';
import TableRestaurantIcon from '@mui/icons-material/TableRestaurant';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import SetMealIcon from '@mui/icons-material/SetMeal';
import OrdersTable from './OrdersTable';
import ReservationTable from './ReservationTable';
import './App.css'

const ManagerPage = () => {

    //* GET ORDERS
    const [dbAnswerOrders, setDbAnswerOrders] = useState('');
    const [orderTableHidden, setOrderTableHidden] = useState('hidden');

    const fetchOrders = async(param) => {
        try {
        if(orderTableHidden === 'hidden' || param === 'fromOrderTable.jsx') {
        setOrderTableHidden('');
        const response = await fetch('http://localhost:3000/fetchOrders', {
        method: 'GET',
        headers: {
       'Content-Type': 'application/json'
            }
        })
        const res = await response.json();
        setDbAnswerOrders(res);
        } else {
            setOrderTableHidden('hidden');
        }
        } catch (err) {
            console.error('error from ManagerPage,jsx - fetchOrders method');
        }
    }

    const propsToOrderTable = {
        tableCell: ['ID', 'Dish X count', 'type of order', 'price', 'email'],
        dbAnswerOrders,
        fetchOrders
    }

    
    return (
        <div>
            <div className='buttonsManagerPage'>
            <Button style={{fontSize: '1.1em'}} className='side-button' variant="contained" color="secondary" onClick={fetchOrders}>
            Get Orders <FastfoodIcon/>
            </Button>
            <Button style={{marginTop: '40px', fontSize: '1.1em'}} className='side-button' variant="contained" color="secondary">
            Get Table Reservations <TableRestaurantIcon/>
            </Button>
            <Button style={{marginTop: '40px', fontSize: '1.1em'}} className='side-button' variant="contained" color="secondary">
            Change Menu <RestaurantMenuIcon/>
            </Button>
            <Button style={{marginTop: '40px', fontSize: '1.1em'}} className='side-button' variant="contained" color="secondary">
            Update Ingredients <SetMealIcon/>
            </Button>
            </div>
            {orderTableHidden === 'hidden' ? null : <OrdersTable className='orderTable' propsToOrderTable={propsToOrderTable}/>}
            <ReservationTable/>
        </div>
    )
}

export {ManagerPage}