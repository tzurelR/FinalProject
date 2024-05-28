import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import '../App.css'
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';
import TableBarIcon from '@mui/icons-material/TableBar';
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';
import LoginIcon from '@mui/icons-material/Login';

export default function MenuBtn() {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const tableReservationClick = () => {
    navigate('/table-reservation');
    setAnchorEl(null);
  }

  const orderOnlineClick = () => {
    navigate('/order-online');
    setAnchorEl(null);
  }

  const loginClock = () => {
    navigate('/login');
    setAnchorEl(null);
  }

  return (
    <div>
      <Button className="iconBtn"
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        style={{color:'whitesmoke'}}
      > 
        <MenuIcon/>
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={tableReservationClick}>Table reservation <TableBarIcon /></MenuItem>
        <MenuItem onClick={orderOnlineClick}>Order online <DeliveryDiningIcon /></MenuItem>
        <MenuItem onClick={handleClose}>Login <LoginIcon /></MenuItem>
      </Menu>
    </div>
  );
}