import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export default function BasicTable(props) {
  return (
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
          {props.propsToOrderTable.dbAnswerOrders.length !== 0 ? props.propsToOrderTable.dbAnswerOrders.map((item) => (
            <TableRow
              key={item.invite_id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {item.invite_id}
              </TableCell>
              <TableCell align="right">HI Complete</TableCell>
              <TableCell align="right">{item.dishes.map((dish) => <p>{dish.name} X {dish.count}</p>)}</TableCell>
              <TableCell align="right">{item.cost}</TableCell>
              <TableCell align="right">{item.email}</TableCell>
            </TableRow>
          )) : null}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
