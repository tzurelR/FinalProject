import * as React from 'react';
import { useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import israeliSaladImg from '../../public/images/israeli-salad.jpeg';
import houseBreadImg from '../../public/images/house-bread.jpeg';
import araisImg from '../../public/images/arais.jpeg';
import grilledPulletImg from '../../public/images/grilled-chicken.jpeg';
import entrecoteSteakImg from '../../public/images/entrecote-steak.jpeg';
import hamburgerImg from '../../public/images/hamburger.jpg';
import colaImg from '../../public/images/cola.png';
import beerImg from '../../public/images/beerImg.jpeg'

//! When I do menu pull the prices from menu collection!!!

export default function OrderOnline() {

  const navigate = useNavigate();
  const [israeliSaladCount, setIsraeliSaladCount] = useState(0);
  const [araisCount, setAraisCount] = useState(0);
  const [grilledPulletCount, setGrilledPulletCount] = useState(0);
  const [hamburgerCount, setHamburgerCount] = useState(0);
  const [colaCount, setColaCount] = useState(0);
  const [beerCount, setBeerCount] = useState(0);
  const [israeliSaladCost, araisCost, grilledPulletCost, hamburgerCost, colaCost, beerCost] = [8, 10, 15, 12, 3, 6]

  const setCount = (param, operator) => {
    switch(param) {
      case 'israeliSalad':
        setIsraeliSaladCount(operator === '+' ? israeliSaladCount + 1 : Math.max(0, israeliSaladCount - 1));
        break;
  
      case 'arais':
        setAraisCount(operator === '+' ? araisCount + 1 : Math.max(0, araisCount - 1));
        break;
      
      case 'grilledPullet':
        setGrilledPulletCount(operator === '+' ? grilledPulletCount + 1 : Math.max(0, grilledPulletCount - 1));
        break;

      case 'hamburger':
        setHamburgerCount(operator === '+' ? hamburgerCount + 1 : Math.max(0, hamburgerCount - 1));
        break;

      case 'cola':
        setColaCount(operator === '+' ? colaCount + 1 : Math.max(0, colaCount - 1));
        break;

      case 'beer':
        setBeerCount(operator === '+' ? beerCount + 1 : Math.max(0, beerCount - 1));
        break;
    }
  }

  const goToPay = () => {
    const countObj = {
      israeliSalad: ['Israeli Salad', israeliSaladCount, israeliSaladCost],
      arais: ['Arais', araisCount, araisCost],
      grilledPullet: ['Grilled Pullet', grilledPulletCount, grilledPulletCost],
      hamburgerCount: ['Hamburger', hamburgerCount, hamburgerCost],
      colaCount: ['Cola', colaCount, colaCost],
      beerCount: ['Beer', beerCount, beerCost]
    }
    navigate('/order-online/payment', { state: countObj });
  }




  return (
    <div>
      <div>
        <h4>STARTERS:</h4>
      </div>
      <Accordion>
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
      </Accordion>

      <Button variant="contained" style={{marginTop:'40px'}} onClick={goToPay}>PAY</Button>
    </div>
  );
}