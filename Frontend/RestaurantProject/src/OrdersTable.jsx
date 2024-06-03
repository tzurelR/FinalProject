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

export default function OrdersTable(props) {

  const deleteOrder = async(event) => {
    const inviteID = event.target.className * 1;
    const objToSend = {
      inviteID
    }
    const response = await fetch('http://localhost:3000/deleteOrder', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(objToSend)
    });
    const res = await response.json();
    console.log(res);
    props.propsToOrderTable.fetchOrders('fromOrderTable.jsx');
  }

  return (
    <div>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell style={{fontWeight: 'bold'}}>{props.propsToOrderTable.tableCell[0]}</TableCell>
            {props.propsToOrderTable.tableCell.map((value, index) => (
                (index !== 0) ?
                    <TableCell style={{fontWeight: 'bold'}} align="right">{value}</TableCell> : null
                
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {props.propsToOrderTable.dbAnswerOrders.length !== 0 ? props.propsToOrderTable.dbAnswerOrders.map((item, index) => (
            <TableRow
              key={item.invite_id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {item.invite_id}
              </TableCell>
              <TableCell align="1right">{item.dishes.map((dish) => <p>{dish.name} X {dish.count}</p>)}</TableCell>
              <TableCell align="1right">{item.typeOfOrder}</TableCell>
              <TableCell align="1right">{item.cost}</TableCell>
              <TableCell align="1right">{item.email}</TableCell>
              <TableCell align="1right"><button style={{backgroundColor: 'red'}} className={`${item.invite_id}`} onClick={deleteOrder}>delete</button></TableCell>
              </TableRow>
          )) : null}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  );
}
