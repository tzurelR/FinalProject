import * as React from 'react';
import Button from '@mui/material/Button';

const ManagerPage = () => {
    return (
        <div className='managerPageDiv'>
            <div className='buttonsManagerPage'>
            <Button style={{fontSize: '1.1em'}} className='side-button' variant="contained" color="secondary">
            Get Orders
            </Button>
            <Button style={{marginTop: '40px', fontSize: '1.1em'}} className='side-button' variant="contained" color="secondary">
            Get Table Reservations
            </Button>
            <Button style={{marginTop: '40px', fontSize: '1.1em'}} className='side-button' variant="contained" color="secondary">
            Change Menu
            </Button>
            <Button style={{marginTop: '40px', fontSize: '1.1em'}} className='side-button' variant="contained" color="secondary">
            Update Ingredients
            </Button>
            </div>
        </div>
    )
}

export {ManagerPage}