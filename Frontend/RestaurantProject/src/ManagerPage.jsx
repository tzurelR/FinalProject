import * as React from 'react';
import { useState } from 'react';
import Button from '@mui/material/Button';
import TableRestaurantIcon from '@mui/icons-material/TableRestaurant';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import SetMealIcon from '@mui/icons-material/SetMeal';
import OrdersTable from './OrdersTable';
import ReservationTable from './ReservationTable';
import MenuTable from './MenuTable';
import './App.css'

const ManagerPage = () => {

    //* GET ORDERS
    const [dbAnswerOrders, setDbAnswerOrders] = useState('');
    const [orderTableHidden, setOrderTableHidden] = useState('hidden');

    const fetchOrders = async(param) => {
        setReservationTableHidden('hidden');
        setMenuTableHidden('hidden');

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
            console.error('error from ManagerPage.jsx - fetchOrders method');
        }
    }

    const propsToOrderTable = {
        tableCell: ['ID', 'Dish X Count', 'Type Of Order', 'Price', 'EMAIL'],
        dbAnswerOrders,
        fetchOrders
    }

    //* GET RESERVATIONS
    const [reservationArr, setReservationArr] = useState('');
    const [reservationTableHidden, setReservationTableHidden] = useState('hidden');

    const fetchReservations = async(param) => {
        setOrderTableHidden('hidden');
        setMenuTableHidden('hidden');

        try {
            if(reservationTableHidden === 'hidden') {
            setReservationTableHidden('');
            const response = await fetch('http://localhost:3000/fetchReservation', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const res = await response.json();
            setReservationArr(res);
            } else {
                setReservationTableHidden('hidden');
            }
        } catch {
            console.error('error from ManagerPage.jsx - fetchReservation method');
        }
    }
    const propsToReservationTable = {
        tableCell: ['Table ID', 'Chairs Number', 'Hour', 'Date', 'EMAIL'],
        tableContent: reservationArr
    }

    //* GET MENU
    const [menu, setMenu] = useState('');
    const [menuTableHidden, setMenuTableHidden] = useState('hidden');
    const [inputsArr, setInputsArr] = useState([]);

    const fetchMenu = async(param) => {
        setReservationTableHidden('hidden');
        setOrderTableHidden('hidden');

        try {
            if(menuTableHidden === 'hidden'  || param === 'fromMenuTable.jsx') {
            setMenuTableHidden('');
            const response = await fetch('http://localhost:3000/fetchMenu', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const res = await response.json();
            setMenu(res);
            const temp = [];
            res.map((item) => temp.push([item.dishName, item.cost, '', '']));
            setInputsArr(temp)
            } else {
                setMenuTableHidden('hidden');
            }
        } catch {
            console.error('error from ManagerPage.jsx - fetchMenu method');
        }
    }
    const propsToMenuTable = {
        tableCell: ['Dish Name', 'Price', 'Ingredients'],
        menu,
        inputsArr,
        setInputsArr,
        fetchMenu
    }
    
    return (
        <div>
            <div className='buttonsManagerPage'>
            <Button style={{fontSize: '1.1em'}} className='side-button' variant="contained" color="secondary" onClick={fetchOrders}>
            Get Orders <FastfoodIcon/>
            </Button>
            <Button style={{marginTop: '40px', fontSize: '1.1em'}} className='side-button' variant="contained" color="secondary" onClick={fetchReservations}>
            Get Table Reservations <TableRestaurantIcon/>
            </Button>
            <Button style={{marginTop: '40px', fontSize: '1.1em'}} className='side-button' variant="contained" color="secondary" onClick={fetchMenu}>
            Change Menu <RestaurantMenuIcon/>
            </Button>
            <Button style={{marginTop: '40px', fontSize: '1.1em'}} className='side-button' variant="contained" color="secondary">
            Update Ingredients <SetMealIcon/>
            </Button>
            </div>
            {orderTableHidden === 'hidden' ? null : <OrdersTable className='orderTable' propsToOrderTable={propsToOrderTable}/>}
            {reservationTableHidden === 'hidden' ? null : <ReservationTable propsToReservationTable={propsToReservationTable}/>}
            {menuTableHidden === 'hidden' ? null : <MenuTable propsToMenuTable={propsToMenuTable}/>}
        </div>
    )
}

export {ManagerPage}