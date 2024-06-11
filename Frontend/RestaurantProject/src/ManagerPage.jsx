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
import IngredientsTable from './IngredientsTable';
import './App.css'

const ManagerPage = () => {

    //* GET ORDERS
    const [dbAnswerOrders, setDbAnswerOrders] = useState('');
    const [orderTableHidden, setOrderTableHidden] = useState('hidden');

    const fetchOrders = async(param) => {
        setReservationTableHidden('hidden');
        setMenuTableHidden('hidden');
        setIngredientsTableHidden('hidden');

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
        setIngredientsTableHidden('hidden');

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
        setIngredientsTableHidden('hidden');

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

    //* GET INGREDIENTS
    const [ingredientsArr, setIngredientsArr] = useState([]);
    const [ingredientsTableHidden, setIngredientsTableHidden] = useState('hidden');
    const [ingredientChangeArr, setIngredientChangeArr] = useState([]);

    const fetchIngredients = async(param) => {
        setReservationTableHidden('hidden');
        setOrderTableHidden('hidden');
        setMenuTableHidden('hidden');

        try {
        if(ingredientsTableHidden === 'hidden' || param === 'fromIngredientsTable.jsx') {
            setIngredientsTableHidden('');    
            const response = await fetch('http://localhost:3000/fetchIngredients', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const temp = [];
            const res = await response.json();
            res.message.map((ingredient) => temp.push([ingredient.ingredientName, ingredient.amount, '']));
            setIngredientChangeArr(temp);
            setIngredientsArr(res);
        } else {
            setIngredientsTableHidden('hidden');
        }
        } catch {
            console.error('error from ManagerPage.jsx - fetchIngredients method');
        }
    }

    const propsToIngredientsTable = {
        tableCell: ['Ingredient Name', 'amount'],
        ingredientsArr,
        ingredientChangeArr,
        setIngredientChangeArr,
        fetchIngredients
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
            <Button onClick={fetchIngredients} style={{marginTop: '40px', fontSize: '1.1em'}} className='side-button' variant="contained" color="secondary">
            Update Ingredients <SetMealIcon/>
            </Button>
            </div>
            {orderTableHidden === 'hidden' ? null : <OrdersTable className='orderTable' propsToOrderTable={propsToOrderTable}/>}
            {reservationTableHidden === 'hidden' ? null : <ReservationTable propsToReservationTable={propsToReservationTable}/>}
            {menuTableHidden === 'hidden' ? null : <MenuTable propsToMenuTable={propsToMenuTable}/>}
            {ingredientsTableHidden === 'hidden' ? null : <IngredientsTable propsToIngredientsTable={propsToIngredientsTable}/>}
        </div>
    )
}

export {ManagerPage}