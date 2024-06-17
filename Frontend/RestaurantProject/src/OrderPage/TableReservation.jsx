import * as React from 'react';
import { useState, useEffect } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/joy/Button';
import Input from '@mui/joy/Input';
import '../App.css'


export default function TableReservation() {

    const regularExpCheckValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const addDays = (date, days) => {
      const result = new Date(date);
      result.setDate(result.getDate() + days);
      return result;
    }

  
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const currentDate = new Date();
    const datesArr = [`${daysOfWeek[currentDate.getDay()]} ${currentDate.getDate()}/${currentDate.getMonth() + 1}`];
    
    const timeArr = [];
    if (currentDate.getMinutes() == 0 || currentDate.getHours() === 0) {
      timeArr.push(`${currentDate.getHours()}:00`);
    } else {
      const newHour = currentDate.getHours() + 1;
      timeArr.push(`${newHour}:00`);
    }


    
    const peopleArr = ['1', '2', '3', '4', '5', '6', '7', '+8']

    
    for(let i = 1; i <= 15; i++) {
      const resDate = addDays(currentDate, i);
      datesArr.push(`${daysOfWeek[resDate.getDay()]} ${resDate.getDate()}/${resDate.getMonth() + 1}`);
    }

    for(let i = 1; i < 13; i++) {
      const [hours] = timeArr[i - 1].split(':').map(numStr => parseInt(numStr, 10));;
        timeArr.push(`${hours + 1}:00`);
        if(hours === 23) {
          break;
        }
      }



    const [isDateVisible, setIsDateVisible] = useState(false);
    const [isTimeVisible, setIsTimeVisible] = useState(false);
    const [isPeopleVisible, setIsPeopleVisible] = useState(false);
    const [isEmailVisible, setIsEmailVisible] = useState(false);

    const toggleVisibility = (param) => {
      setTableStatus('');
      if(param === 'date') setIsDateVisible(!isDateVisible);
      else if(param === 'time') setIsTimeVisible(!isTimeVisible);
      else if(param === 'people') setIsPeopleVisible(!isPeopleVisible);
      else if(param === 'email') setIsEmailVisible(!isEmailVisible);
    };
  
    const [chosenDate, setChosenDate] = useState('');
    const [chosenTime, setChosenTime] = useState('');
    const [chosenPeople, setChosenPeople] = useState('');
    const [tableStatus, setTableStatus] = useState('');
    const [email, setEmail] = useState('');
    const [emailInvalid, setEmailInvalid] = useState('hidden');


    const menuClick = (event) => {
      if(event.target.className === 'dateBtn') {
        setChosenDate(event.target.textContent);
        toggleVisibility('date');
      } else if(event.target.className === 'timeBtn') {
        setChosenTime(event.target.textContent);
        toggleVisibility('time');
      } else if(event.target.className === 'peopleBtn') {
        setChosenPeople(event.target.textContent);
        toggleVisibility('people');
      } else if(event.target.className === 'MuiInput-input css-1gw9vc6-JoyInput-input') {
        setEmail(event.target.value);
      }
    }

    const checkClick = async() => {
      const objToSend = {
        hour: chosenTime,
        date: chosenDate,
        countOfPeople: chosenPeople,
      }
      if(chosenTime !== '' && chosenDate !== '' && chosenPeople !== '') {
      const response = await fetch('http://localhost:3000/check-emptyTable', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(objToSend)
      })
      const res = await response.json();
      if(res.message === 'There is empty table') {
        setTableStatus('There is empty table, put your mail please: ')
      }
      }
    }

    const sendClick = async() => {
      setEmailInvalid('hidden');
      if(!regularExpCheckValidEmail.test(email)) {
        setEmailInvalid('');
        return;
      }
      const objToSend = {
        hour: chosenTime,
        date: chosenDate,
        countOfPeople: chosenPeople,
        email: email
      }
      const response = await fetch('http://localhost:3000/sendEmail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(objToSend)
      })

      const res = await response.json();
      console.log(res);
      toggleVisibility('email');
    }


  return (  
    <div>
    <div className='orderTitle'>
      <h2>Place an order</h2>
      </div>
    <div className='orderDiv' style={{ display: 'flex', flexDirection: 'row'}}>
      
      <div>
      <Accordion onClick={() => toggleVisibility('date')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          Date {chosenDate}
        <CalendarMonthIcon/>
        </AccordionSummary>
        
      </Accordion>
      {isDateVisible && (
        <ul>
          {datesArr.map((item, index) => (
            <li key={index}><button className='dateBtn' style={{width: '120px', height: '70px'}} onClick={menuClick}>{item}</button></li>
          ))}
        </ul>
      )}
      </div>

      <div>
      <Accordion onClick={() => toggleVisibility('time')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          Time {chosenTime}
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

      <div>
      <Accordion onClick={() => toggleVisibility('people')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3-content"
          id="panel3-header"
        >
          Count of people {chosenPeople}
          <PeopleAltIcon />
        </AccordionSummary>
      </Accordion>
      {isPeopleVisible && (
        <ul>
          {peopleArr.map((item, index) => (
            <li key={index}><button className='peopleBtn' style={{width: '120px', height: '70px'}} onClick={menuClick}>{item}</button></li>
          ))}
        </ul>
      )}
      </div>
      <Button onClick={checkClick} size="sm" style={{backgroundColor:'rgb(200, 124, 25)', width: '80px', height: '45px'}}>Check</Button>

    </div>
    <div>
      {tableStatus}
    </div>
    <div>
    {tableStatus !== '' ? <div><Input color="warning" placeholder="Email" onChange={menuClick} size="sm" height='20px' width="120px"/>
    <Button onClick={sendClick} size="sm" style={{backgroundColor:'rgb(200, 124, 25)', width: '80px', height: '45px'}}>Send</Button> </div>: ''}
    </div>
    <p className={emailInvalid}>The email address is invalid.</p>
    </div>  
  );
}