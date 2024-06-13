import * as React from 'react';
import { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';

export default function AddIngredients() {

    const [ingredientName, setIngredientName] = useState('');
    const [amount, setAmount] = useState(0);

    const handleChange = (event) => {
        if(event.target.className === 'IngredientInput') {
            setIngredientName(event.target.value);
        } else if (event.target.className === 'amountInput') {
            // const newAmount = (!isNaN(temp * 1) && !(temp * 1) < 1) && !((temp * 1) > 250);
            setAmount(event.target.value);
        }
    }

    


    return (
        <div className='AddIngredientsDiv'>
            <button style={{backgroundColor: '#FF9E9E', position: 'absolute', top: '0', left: '0', color: 'black'}}><CloseIcon/></button>
            <div style={{position: 'absolute', top: '50%', left: '35%'}}>
                <input className='IngredientInput' placeholder='ingredient name' style={{backgroundColor: 'white', color: 'black', height: '25px'}} onChange={handleChange}/>
            </div>
            <div style={{position: 'absolute', top: '60%', left: '35%',}}>
                <input className='amountInput' placeholder='amount' style={{backgroundColor: 'white', color: 'black', height: '25px'}} onChange={handleChange}/>
            </div>
            <button style={{ position: 'absolute', bottom: '10px', right: '10px', backgroundColor: '#28a745'}}>Add</button>
        </div>
    )
}