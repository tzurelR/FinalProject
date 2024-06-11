import * as React from 'react';
import { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


export default function MenuTable(props) {
    
    const [dishNameChange, setDishNameChange] = useState('');
    const [priceChange, setPriceChange] = useState('');

    const handleInputChange = (event) => {
        if(event.target.className === 'dishInput') {
            props.propsToMenuTable.setInputsArr((prev) => {
              const index = prev.findIndex(item => item[0] === event.target.placeholder);
              if (index === -1) {
                return prev;
              }
              const newArray = [...prev];

              newArray[index] = [newArray[index][0], newArray[index][1], event.target.value, newArray[index][3]];
              return newArray;
            })
        } else if (event.target.className.includes('priceInput')) {
            props.propsToMenuTable.setInputsArr((prev) => {
              const index = prev.findIndex(item => item[0] === event.target.className.split('-')[1]);
              if (index === -1) {
                return prev;
              }
              const newArray = [...prev];

              newArray[index] = [newArray[index][0], newArray[index][1], newArray[index][2], event.target.value];
              return newArray;
            })
        }
    }

    const changeDish = async(event) => {
      props.propsToMenuTable.inputsArr.forEach(async(item) => {
        if(item[0] === event.target.className) {
          const newName = (item[2] === '') ? item[0]: item[2];
          const newCost = (!isNaN(item[3] * 1) && !((item[3] * 1) < 1) && !((item[3] * 1) > 200)) ? item[3] : item[1]; 
          const objToSend = {dishName: event.target.className, newName, newCost}
          const response = await fetch('http://localhost:3000/changeMenu', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(objToSend)
            });
          const res = await response.json();
          console.log('AAA');
          props.propsToMenuTable.fetchMenu('fromMenuTable.jsx');
        }
      })

      props.propsToMenuTable.setInputsArr((prev) => {
          const newArr = prev.map(item => {
            return [item[0], item[1], '', ''];
          })
          return newArr;
        })
        console.log(props.propsToMenuTable.inputsArr);
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

              </TableCell>
            </TableRow>
          )) : null}

        </TableBody>
      </Table>
    </TableContainer>
  );
}