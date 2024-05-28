import * as React from 'react';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import FormHelperText from '@mui/joy/FormHelperText';
import Input from '@mui/joy/Input';
import { useState } from 'react';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import Button from '@mui/material/Button';
import './App.css'

const AdminPage = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isActive, setIsActive] = useState('hidden');
    const regularExpCheckValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const handleChange = (event) => {
        event.target.placeholder === 'Email*' ? setEmail(event.target.value) : '';
        event.target.placeholder === 'Password*' ? setPassword(event.target.value) : '';        
    }

    const signInClick = () => {
        if(regularExpCheckValidEmail.test(email) && password !== '') {
            setIsActive('hidden');
            console.log('need to work :)');
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
        <Input placeholder="Password*" onChange={handleChange}/>
        </FormControl>
        </div>
        <Button style={{marginTop: '20px'}} variant="contained" onClick={signInClick}>SIGN IN</Button>
        <div>
            <p className={isActive} style={{color: '#FF2121'}}>Your Email or Password invalid</p>
        </div>
        <div style={{marginTop: '20px', marginRight: '120px'}}>
            <Button>Forgot password?</Button>
        </div>
    </div>
    )
}

export {AdminPage}