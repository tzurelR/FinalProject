import React, {useState} from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
//import MenuIcon from '@mui/icons-material/Menu';
import DinnerDiningIcon from '@mui/icons-material/DinnerDining';
import Menu from './Menu';
import MenuBtn from './MenuBtn';
import homePageImg from '../../public/images/homePageImg.jpeg';
import '../App.css';


export default function Title() {

  const [hiddenMenu, setHiddenMenu] = useState('hidden');

  const toggleHidden = () => {
    setHiddenMenu(hiddenMenu === 'hidden' ? '' : 'hidden');
  }

  return (
    <div className='divTitle' style={{position: 'sticky'}}>
    <Box sx={{ flexGrow: 1 }} className='myTitle'>
      <AppBar position="static" >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
          >
            <MenuBtn />
          </IconButton>
          <DinnerDiningIcon/>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          LumiBite
          </Typography>

          <Button color="inherit" onClick={toggleHidden}>Menu</Button>
        </Toolbar>
      </AppBar>
    </Box>
    <Menu hidden={hiddenMenu} toggleHidden={toggleHidden}/>
    </div>

  );
}
