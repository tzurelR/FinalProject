import * as React from 'react';
import { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Input from '@mui/joy/Input';


export default function MenuTable(props) {
    
    const [dishNameChange, setDishNameChange] = useState('');
    const [priceChange, setPriceChange] = useState('');

    const handleInputChange = (event) => {
        console.log(event.target.className.includes('priceInput'));
        if(event.target.className === 'dishInput') {
            console.log(event.target.placeholder);
        } else if (event.target.className.includes('priceInput')) {
            console.log(event.target.className.split('-')[1]);
        }
    }

    const changeDish = async(event) => {
        //! check dish name
        //! check price is number, and its not very big number!
        //! popup if you need alert!!! after click change you need to reset the inputsObject!!! [dis, cost, '', '']

    }

    const deleteDish = async(event) => {
        try {
        const objToSend = {
            dishToDelete: event.target.className
        }
        const response = await fetch('http://localhost:3000/deleteDish', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(objToSend)
        });
        
        props.propsToMenuTable.fetchMenu();
        } catch (error) {
            console.error('error from MenuTable.jsx - deleteDish');
        }
    }
    return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead style={{backgroundColor: '#BCF9FF'}}>
          <TableRow>
            <TableCell style={{fontWeight: 'bold'}}>{props.propsToMenuTable.tableCell[0]}</TableCell>
            {props.propsToMenuTable.tableCell.map((item, index) => (index !== 0 ? 
               <TableCell style={{fontWeight: 'bold'}}>{item}</TableCell> : null 
            ))}
            <TableCell align='1right' style={{fontWeight: 'bold'}}>CHANGES</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.propsToMenuTable.menu.length !== 0 ? props.propsToMenuTable.menu.map((item, index) => (
            <TableRow
              key={item.dishName}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                <input className='dishInput' onChange={handleInputChange} type='text' placeholder={`${item.dishName}`} style={{backgroundColor: 'white', color: 'black', border: '1px solid #ccc', }}/>
              </TableCell>

              <TableCell align="1right"><input className={`priceInput-${item.dishName}`} onChange={handleInputChange} type='text' placeholder={item.cost} style={{width: '20px', backgroundColor: 'white', color: 'black', border: '1px solid #ccc', }}/></TableCell>

              <TableCell align="1right">{item.ingredients.map((ingredient) => (<p>{ingredient.ingredientName} X {ingredient.ingredientAmount}</p>))}</TableCell>

              <TableCell align="1right">

              <button onClick={changeDish} style={{backgroundColor: '#FFBD06', marginTop: '20px'}} className={item.dishName}>Change</button>

              <button onClick={deleteDish} style={{backgroundColor: 'red', marginLeft: '20px'}} className={`${item.dishName}`}>delete</button>

              {index + 1 === props.propsToMenuTable.menu.length ? <button style={{backgroundColor: '#4BCB00', marginLeft: '20px'}} className={item.invite_id}>Add</button> : null}
              </TableCell>
            </TableRow>
          )) : null}

        </TableBody>
      </Table>
    </TableContainer>
  );
}