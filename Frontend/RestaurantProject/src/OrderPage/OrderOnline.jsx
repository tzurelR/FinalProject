import * as React from 'react';
import { useState, useEffect } from 'react';
import Chat from '../ChatBox/Chat';
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

export default function OrderOnline() {

  const [menu, setMenu] = useState(null);

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
      setMenu(res);
      } catch {
        console.error('Error from getMenu in Frontend');
      }
    } 
    menuData();
  }, [])


  const navigate = useNavigate();
  //* need this array for cost and the images. The code in the future will be more generic, with save the url of images in DB.
  const sourceDishNames = ['Israeli Salad', 'Arais', 'Grilled Pullet', 'Hamburger', 'Cola', 'Beer'];

  const [counts, setCounts] = useState({
    israeliSaladCount: 0,
    araisCount: 0,
    grilledPulletCount: 0,
    hamburgerCount: 0,
    colaCount: 0,
    beerCount: 0
  })

  const setCount = (param, operator) => {
    setCounts(prev => {
      if(operator === '+') {
        return {
          ...prev,
          [param]: Math.min(12, prev[param] + 1)
        }
      } else if(operator === '-') {
        return {
          ...prev,
          [param]: Math.max(0, prev[param] - 1)
        }
      }
    })
  }


  const changeDishNameToVar = (dish) => {
    let temp = dish.charAt(0).toLowerCase() + dish.slice(1);
    temp.includes(' ') ? temp = temp.split(' ').join('') : temp;
    return temp;
  }



  const goToPay = () => {
    const countObj = {}
    menu.data.map((dish, index) => {
      countObj[changeDishNameToVar(dish.dishName)] = [sourceDishNames[index], counts[`${changeDishNameToVar(sourceDishNames[index])}Count`], dish.cost]
    })
    navigate('/order-online/payment', { state: countObj });
  }



  if(menu === null) return <div>Loading...</div>;
  
  return (
    <div>
      <div>
      </div>
      {menu.data.map((dish, index) => (
        <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          {dish.dishName} {dish.cost}$
        </AccordionSummary>
        {dish.ingredients.map((ingredient, index) => (
          
          <AccordionDetails>
            {ingredient.ingredientName} X {ingredient.ingredientAmount} {index+1 !== dish.ingredients.length ? ',' : ''}
          </AccordionDetails> 
        ))}
        <img src = {`../../public/images/${sourceDishNames[index]}.jpeg`} style={{ width: '250px', height: '150px' }}/>
        <div style={{ display: 'flex' }}>
        <Button variant="contained" onClick={() => setCount(`${`${changeDishNameToVar(sourceDishNames[index])}Count`}`, '+')}>+</Button>
        <h4 style={{ marginLeft: '20px', marginRight: '20px'}}>{counts[`${changeDishNameToVar(sourceDishNames[index])}Count`]}</h4>
        <Button variant="contained" onClick={() => setCount(`${`${changeDishNameToVar(sourceDishNames[index])}Count`}`, '-')}>-</Button>
        </div>
      </Accordion>
      ))}

      <Button variant="contained" style={{marginTop:'40px'}} onClick={goToPay}>PAY</Button>
      <Chat />
    </div>
  );
}
