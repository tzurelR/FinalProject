import * as React from 'react';
import { useState, useEffect } from 'react';
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
  // const [israeliSaladCount, setIsraeliSaladCount] = useState(0);
  // const [araisCount, setAraisCount] = useState(0);
  // const [grilledPulletCount, setGrilledPulletCount] = useState(0);
  // const [hamburgerCount, setHamburgerCount] = useState(0);
  // const [colaCount, setColaCount] = useState(0);
  // const [beerCount, setBeerCount] = useState(0);

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
    menu.data.map((dish) => {
      const varName = changeDishNameToVar(dish.dishName);
      countObj[changeDishNameToVar(dish.dishName)] = [dish.dishName, counts[`${changeDishNameToVar(dish.dishName)}Count`], dish.cost]
    })
    console.log(countObj);
    navigate('/order-online/payment', { state: countObj });
  }



  if(menu === null) return <div>Loading...</div>;
  
  return (
    <div>
      <div>
      </div>
      {menu.data.map((dish) => (
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
        <img src = {`../../public/images/${dish.dishName}.jpeg`} style={{ width: '250px', height: '150px' }}/>
        <div style={{ display: 'flex' }}>
        <Button variant="contained" onClick={() => setCount(`${`${changeDishNameToVar(dish.dishName)}Count`}`, '+')}>+</Button>
        <h4 style={{ marginLeft: '20px', marginRight: '20px'}}>{counts[`${changeDishNameToVar(dish.dishName)}Count`]}</h4>
        <Button variant="contained" onClick={() => setCount(`${`${changeDishNameToVar(dish.dishName)}Count`}`, '-')}>-</Button>
        </div>
      </Accordion>
      ))}

      {/* <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          Israeli salad {israeliSaladCost}$
        </AccordionSummary>
        <AccordionDetails>
          refreshing and colorful dish made from diced tomatoes, and cucumbers, dressed with olive oil, lemon juice, salt, and pepper.
        </AccordionDetails>
        <img src = {israeliSaladImg} style={{ width: '250px', height: '150px' }}/>
        <div style={{ display: 'flex' }}>
        <Button variant="contained" onClick={() => setCount('israeliSalad', '+')}>+</Button>
        <h4 style={{ marginLeft: '20px', marginRight: '20px'}}>{israeliSaladCount}</h4>
        <Button variant="contained" onClick={() => setCount('israeliSalad', '-')}>-</Button>
        </div>
      </Accordion>
      
    
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          ARAIS {araisCost}$
        </AccordionSummary>
        <AccordionDetails>
          made with seasoned ground meat (typically lamb or beef) stuffed inside pita bread and toasted until crispy
        </AccordionDetails>
        <img src = {araisImg} style={{ width: '300px', height: '200px' }}/>
        <div style={{ display: 'flex' }}>
        <Button variant="contained" onClick={() => setCount('arais', '+')}>+</Button>
        <h4 style={{ marginLeft: '20px', marginRight: '20px'}}>{araisCount}</h4>
        <Button variant="contained" onClick={() => setCount('arais', '-')}>-</Button>
        </div>
      </Accordion>

      <div>
        <h4>MAINS</h4>
      </div>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          Grilled pullet {grilledPulletCost}$
        </AccordionSummary>
        <AccordionDetails>
          young chicken cooked over an open flame or on a grill
        </AccordionDetails>
        <img src = {grilledPulletImg} style={{ width: '250px', height: '150px' }}/>
        <div style={{ display: 'flex' }}>
        <Button variant="contained" onClick={() => setCount('grilledPullet', '+')}>+</Button>
        <h4 style={{ marginLeft: '20px', marginRight: '20px'}}>{grilledPulletCount}</h4>
        <Button variant="contained" onClick={() => setCount('grilledPullet', '-')}>-</Button>
        </div>
      </Accordion>

      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          Hamburger {hamburgerCost}$
        </AccordionSummary>
        <AccordionDetails>
          Our classic hamburger features a succulent beef patty, ripe tomatoes, and tangy pickles, all sandwiched between soft brioche buns, served with a side of golden fries for a timeless taste of comfort.
        </AccordionDetails>
        <img src = {hamburgerImg} style={{ width: '250px', height: '150px' }}/>
        <div style={{ display: 'flex' }}>
        <Button variant="contained" onClick={() => setCount('hamburger', '+')}>+</Button>
        <h4 style={{ marginLeft: '20px', marginRight: '20px'}}>{hamburgerCount}</h4>
        <Button variant="contained" onClick={() => setCount('hamburger', '-')}>-</Button>
        </div>
      </Accordion>

      <div>
        <h4>DRNIKS</h4>
      </div>

      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          Cola 3$
        </AccordionSummary>
        <img src = {colaImg} style={{ width: '200px', height: '200px' }}/>
        <div style={{ display: 'flex' }}>
        <Button variant="contained" onClick={() => setCount('cola', '+')}>+</Button>
        <h4 style={{ marginLeft: '20px', marginRight: '20px'}}>{colaCount}</h4>
        <Button variant="contained" onClick={() => setCount('cola', '-')}>-</Button>
        </div>
      </Accordion>

      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          Beer {beerCost}$
        </AccordionSummary>
        <AccordionDetails>
          Crafted in-house, our refreshing brew offers a delightful balance of flavors, perfect for sipping and savoring in the comfort of your own space.
        </AccordionDetails>
        <img src = {beerImg} style={{ width: '250px', height: '200px' }}/>
        <div style={{ display: 'flex' }}>
        <Button variant="contained" onClick={() => setCount('beer', '+')}>+</Button>
        <h4 style={{ marginLeft: '20px', marginRight: '20px'}}>{beerCount}</h4>
        <Button variant="contained" onClick={() => setCount('beer', '-')}>-</Button>
        </div>
      </Accordion> */}

      <Button variant="contained" style={{marginTop:'40px'}} onClick={goToPay}>PAY</Button>
    </div>
  );
}