import * as React from 'react';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import FormHelperText from '@mui/joy/FormHelperText';
import Input from '@mui/joy/Input';
import { useState } from 'react';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';
import './App.css'

const Login = () => {

    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isActive, setIsActive] = useState('hidden');
    const regularExpCheckValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const login = async() => {
        signInClick();
        const objToSend = {
            email,
            password
        }
        const response = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(objToSend)
        });
        const res = await response.json();
        if(response.status === 200) {
            //! here need to navigate to the new page!
            navigate('/login/managerPage');
        } else {
            setIsActive('');
        }
    }

    const handleChange = (event) => {
        event.target.placeholder === 'Email*' ? setEmail(event.target.value) : '';
        event.target.placeholder === 'Password*' ? setPassword(event.target.value) : '';        
    }

    const signInClick = () => {
        if(regularExpCheckValidEmail.test(email) && password !== '') {
            setIsActive('hidden');
        } else {
            setIsActive('');
        }
    }
    
    return (
    <div>
        <h1 style={{color: '#9FF6FF'}}>Login  <LockOpenIcon/></h1>
        <div>
        <FormControl>
        <FormLabel style={{color: '#1CCBFF', fontSize: '20px'}}>Email Adress:</FormLabel>
        <Input placeholder="Email*" onChange={handleChange}/>
        </FormControl>
        </div>
        <div style={{marginTop: '20px'}}>
        <FormControl>
        <FormLabel style={{color: '#1CCBFF', fontSize: '20px'}}>Password:</FormLabel>
        <Input placeholder="Password*" onChange={handleChange} type='password'/>
        </FormControl>
        </div>
        <Button style={{marginTop: '20px'}} variant="contained" onClick={login}>SIGN IN</Button>
        <div>
            <p className={isActive} style={{color: '#FF2121'}}>Your Email or Password invalid</p>
        </div>
    
    </div>
    )
}

export {Login}