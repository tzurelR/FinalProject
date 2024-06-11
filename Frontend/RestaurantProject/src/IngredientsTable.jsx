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

  console.log(props);
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
              <TableCell align="right">{item.amount}</TableCell>
              <TableCell align="1right"><button style={{backgroundColor: 'red'}} className={`${item.invite_id}`}>delete</button></TableCell>
              </TableRow>
          )) : null}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  );
}
