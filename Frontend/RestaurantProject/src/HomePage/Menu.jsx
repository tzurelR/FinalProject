import React, {useState, useEffect} from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import CommentIcon from '@mui/icons-material/Comment';
import ClearIcon from '@mui/icons-material/Clear';
import homePageImg from '../../public/images/homePageImg.jpeg';
import '../App.css'


const Menu = (props) => {

  const [data, setData] = useState(null);
  useEffect(() => {
    const menuData = async() => {
      try{
      const response = await fetch('http://localhost:3000/getMenu', {
        method: 'GET',
        headers: {
       'Content-Type': 'application/json'
        }
      })
      const res = await response.json();
      setData(res);
      } catch {
        console.error('Error from getMenu in Frontend');
      }
    } 
    menuData();
  })

  if(data === null) return <div>Loading...</div>;

  return (
    <div className='container'>
      <div className='background' >
        <img src={homePageImg} style={{marginTop: '50px', width: '1100px', height: '600px'}}/>
      </div>
      <div className={`menu ${props.hidden}`} style={{position: 'absolute', top: 0, left: 140, right: 0, bottom: 0}}>
      <button className='clearMenuBtn' style={{marginRight: '600px', backgroundColor: '#025E80'}} onClick={props.toggleHidden}><ClearIcon/></button>
    
      <ul style={{backgroundColor: 'white', width: '800px'}}>
        {data.data.map((value, index) => (
        <li key={index} style={{color: '#000000'}}>
          <div className='menuText'>
           <p style={{color: '#396810', fontSize: 'larger', textAlign: 'left', fontWeight: 'bold'}}> {`${value.dishName}..........................................................................................${value.cost}＄`} </p>
           {value.ingredients.map((item, index) => (
            <p key={index} style={{display:'inline-block', color: '#001E02', textAlign: 'left'}}>{item.ingredientName} {index + 1 === value.ingredients.length ? '' : ','}</p>
           ))}
          </div>
        </li>
      ))}
      </ul>
      </div>
    </div>
  );
}

export default Menu;