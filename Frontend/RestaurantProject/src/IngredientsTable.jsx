import * as React from 'react';
import { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';


export default function IngredientsTable(props) {

    const handleInputChange = (event) => {
        props.propsToIngredientsTable.setIngredientChangeArr((prev) => {
            const index = prev.findIndex(item => item[0] === event.target.className)
            const temp = [...prev];
            temp[index][2] = event.target.value;
            return temp;
        })
    }

    const changeClick = async(event) => {
        const pointer = props.propsToIngredientsTable.ingredientChangeArr;
        let index;
        let objToSend = {};
        for(const item in pointer) {
            if(pointer[item][0] === event.target.className) {
                index = item;
                const newAmount = (!isNaN(pointer[item][2] * 1) && !((pointer[item][2] * 1) < 1) && !((pointer[item][2] * 1) > 250)) ? pointer[item][2] * 1 : pointer[item][1] * 1;
                objToSend = {ingredientName: pointer[item][0], amount: newAmount}
            }
        }
        if(index >= 0) {
            const response = await fetch('http://localhost:3000/changeIngredients', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(objToSend)
                });
            const res = await response.json();
            console.log(res);
        }

        props.propsToIngredientsTable.fetchIngredients('fromIngredientsTable.jsx');

        props.propsToIngredientsTable.setIngredientChangeArr((prev, index) => {
            const temp = [...prev];
            temp.map((item) => item[2] = '')
            return temp;
        })
        console.log(props.propsToIngredientsTable.ingredientChangeArr);
    }

  return (
    <div>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="a dense table">
        <TableHead style={{backgroundColor: '#BCF9FF'}}>
          <TableRow>
            <TableCell style={{fontWeight: 'bold'}}>{props.propsToIngredientsTable.tableCell[0]}</TableCell>
            {props.propsToIngredientsTable.tableCell.map((value, index) => (
                (index !== 0) ?
                    <TableCell style={{fontWeight: 'bold'}} align="right">{value}</TableCell> : null
                
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {props.propsToIngredientsTable.ingredientsArr.length !== 0 ? props.propsToIngredientsTable.ingredientsArr.message.map((item, index) => (
            <TableRow
              key={item.ingredientName}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {item.ingredientName}
              </TableCell>
              <TableCell align="right"><input className={item.ingredientName} placeholder= {item.amount} style={{width: '20px', backgroundColor: 'white', color: 'black', border: '1px solid #ccc', }} onChange={handleInputChange}/></TableCell>
              <TableCell align="right"><button style={{backgroundColor: '#FFBD06'}} className={`${item.ingredientName}`} onClick={changeClick}>change</button></TableCell>
              </TableRow>
          )) : null}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  );
}
