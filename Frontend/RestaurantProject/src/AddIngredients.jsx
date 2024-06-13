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
            setAmount(event.target.value);
        }
    }

    const addClick = async() => {
        if(ingredientName === '' || (isNaN(amount * 1) || (amount * 1) < 1) || ((amount * 1) > 250)) {
            alert('invalid inputs! 🙁');
        } else {
            const amountNum = amount * 1;
            const objToSend = {ingredientName, amountNum}
            const response = await fetch('http://localhost:3000/addIngredient', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(objToSend)
                });
            const res = await response.json();
            console.log(res);
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
            <button style={{ position: 'absolute', bottom: '10px', right: '10px', backgroundColor: '#28a745'}} onClick={addClick}>Add</button>
        </div>
    )
}