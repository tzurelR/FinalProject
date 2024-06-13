import * as React from 'react';
import { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';

export default function AddIngredients() {
    return (
        <div className='AddIngredientsDiv'>
            <button style={{backgroundColor: '#3FFF29', position: 'absolute', top: '0', left: '0', color: 'black'}}><CloseIcon/></button>
            <div style={{position: 'absolute', top: '50%', left: '35%'}}>
                <input placeholder='ingredient name' style={{backgroundColor: 'white', color: 'black', height: '25px'}}/>
            </div>
            <div style={{position: 'absolute', top: '60%', left: '35%',}}>
                <input placeholder='amount' style={{backgroundColor: 'white', color: 'black', height: '25px'}}/>
            </div>
        </div>
    )
}