import * as React from 'react';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import FormHelperText from '@mui/joy/FormHelperText';
import Input from '@mui/joy/Input';
import { useState } from 'react';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import Button from '@mui/material/Button';

const AdminPage = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
    <div>
        <h1 style={{color: '#9FF6FF'}}>Login  <LockOpenIcon/></h1>
        <div>
        <FormControl>
        <FormLabel style={{color: '#1CCBFF', fontSize: '20px'}}>Email Adress:</FormLabel>
        <Input placeholder="Email*" />
        </FormControl>
        </div>
        <div style={{marginTop: '20px'}}>
        <FormControl>
        <FormLabel style={{color: '#1CCBFF', fontSize: '20px'}}>Password:</FormLabel>
        <Input placeholder="Password*" />
        </FormControl>
        </div>
        <Button style={{marginTop: '20px'}} variant="contained">SIGN IN</Button>
        <div style={{marginTop: '20px', marginRight: '120px'}}>
            <Button>Forgot password?</Button>
        </div>
    </div>
    )
}

export {AdminPage}