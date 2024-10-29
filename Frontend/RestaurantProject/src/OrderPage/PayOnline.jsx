import * as React from 'react';
import {useState} from 'react';
import { useLocation } from 'react-router-dom';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

export default function PayOnline() {

    const regularExpCheckValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const location = useLocation();
    const paramValueFromOrderOnline = location.state;

    const currentDate = new Date();
    const timeArr = [];
    if (currentDate.getMinutes() == 0 || currentDate.getHours() === 0) {
      timeArr.push(`${currentDate.getHours()}:00`);
    } else {
      const newHour = currentDate.getHours() + 1;
      timeArr.push(`${newHour}:00`);
    }

    for(let i = 1; i < 13; i++) {
        const [hours] = timeArr[i - 1].split(':').map(numStr => parseInt(numStr, 10));;
          timeArr.push(`${hours + 1}:00`);
          if(hours === 23) {
            break;
        }
    }

    const [isTimeVisible, setIsTimeVisible] = useState(false);
    const [chosenTime, setChosenTime] = useState('');
    const [email, setEmail] = useState('');
    const [orderType, setOrderType] = useState('delivery');
    const [messageToClient, setMessageToClient] = useState('');

    let cost = 0;
    for(let key in paramValueFromOrderOnline) {
        cost += paramValueFromOrderOnline[key][1] * paramValueFromOrderOnline[key][2];
    }

    const toggleVisibility = () => {
        setIsTimeVisible(!isTimeVisible);
    }

    const menuClick = (event) => {
        if(event.target.className === 'timeBtn') {
            setChosenTime(event.target.textContent);
            toggleVisibility();
        } else if(event.target.id === "filled-basic") {
            setEmail(event.target.value);
        } else if(event.target.id === "takeAwayBtn") {
            setOrderType('take away');
        } else if(event.target.id === "deliveryBtn") {
            setOrderType('delivery');
        }
    }

    const payClick = async() => {
        const objToSend = [];
        for(let key in paramValueFromOrderOnline) {
            objToSend.push({name: paramValueFromOrderOnline[key][0], count: paramValueFromOrderOnline[key][1]})
        }
        objToSend.push({
            typeOfOrder: orderType,
            chosenTime,
            email,
            cost
        });

        if(!regularExpCheckValidEmail.test(email)) {
            return alert('The email address is invalid')
        }
        const response = await fetch('http://localhost:3000/order-online', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(objToSend)
        })
        if(response.status === 200) {
            const res = await response.json();
        } else {
            const obj = {message: 'Dear manager, there is a significant shortage of ingredients. Please update the ingredient list in the App accordingly'}
            const errResponse = await fetch('http://localhost:3000/order-online/ingredients-shortage', {
                method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(obj)
            })
            const res2 = await errResponse.json();
            console.log(res2);
        }
        
    }
    
  return (
    
    <div>
        <div style={{display: 'flex'}}>
            <h3 style={{marginRight: '30px'}}>choose one:</h3>
            <ButtonGroup
            disableElevation
            variant="contained"
            aria-label="Disabled button group"
            >
            <Button id="takeAwayBtn" onClick={menuClick}>Take Away</Button>
            <Button id="deliveryBtn" onClick={menuClick}>Delivery</Button>
            </ButtonGroup>
        </div>

        <div style={{marginTop: '30px'}}>
            <Accordion onClick={toggleVisibility} style={{backgroundColor: 'rgb(124, 207, 255)'}}>
            <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
            >
            choose when the food will ready {chosenTime}
            <AccessTimeIcon />
            </AccordionSummary>
            </Accordion>
            {isTimeVisible && (
            <ul>
            {timeArr.map((item, index) => (
                <li key={index}><button className='timeBtn' style={{width: '120px', height: '70px'}} onClick={menuClick}>{item}</button></li>
            ))}
            </ul>
            )}
        </div>

        <div style={{display: 'flex', marginTop: '30px'}}>
            <h3 style={{marginRight: '75px'}}>put email:</h3>
            <TextField id="filled-basic" label="Email" variant="filled" style={{backgroundColor: 'rgb(124, 207, 255)'}} onChange={menuClick}/>
        </div>

        <div style={{display: 'flex', marginTop: '30px'}}>
            <h3>COST: {cost} $</h3>
        </div>

        <div style={{marginTop: '30px'}}>
            {cost !== 0 ? <div><Button variant="outlined" style={{color: 'whitesmoke'}} onClick={payClick}>PAY</Button>
            <h3 style={{color: '#2EC1FF'}}>{messageToClient}</h3></div> : <p style={{color: 'red'}}>The cost is 0$. Please choose your dishes.</p>}
        </div>
    </div>
  );
}
