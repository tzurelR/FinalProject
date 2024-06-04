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
export default function ReservationTable(props) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead style={{backgroundColor: '#BCF9FF'}}>
          <TableRow>
            <TableCell style={{fontWeight: 'bold'}}>{props.propsToReservationTable.tableCell[0]}</TableCell>
            {props.propsToReservationTable.tableCell.map((cellName, index) => (
                (index !== 0) ? <TableCell style={{fontWeight: 'bold'}}>{cellName}</TableCell> : null
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {props.propsToReservationTable.tableContent.length !== 0 ? props.propsToReservationTable.tableContent.map((item, index) => (
            <TableRow
              key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {item.table_id}
              </TableCell>
              <TableCell align="1right">{item.chairNumber}</TableCell>
              <TableCell align="1right">{item.hour}</TableCell>
              <TableCell align="1right">{item.date}</TableCell>
              <TableCell align="1right">{item.email}</TableCell>
            </TableRow>
          )): null}
        </TableBody>
      </Table>
    </TableContainer>
  );
}