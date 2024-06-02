import * as React from 'react';
import Button from '@mui/material/Button';
import TableRestaurantIcon from '@mui/icons-material/TableRestaurant';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import SetMealIcon from '@mui/icons-material/SetMeal';

const ManagerPage = () => {
    
    

    return (
        <div className='managerPageDiv'>
            <div className='buttonsManagerPage'>
            <Button style={{fontSize: '1.1em'}} className='side-button' variant="contained" color="secondary">
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
        </div>
    )
}

export {ManagerPage}