import { useState } from "react"
import Input from '@mui/joy/Input';

//! NEED TO WORK ON THIS OTP!

const Otp = () => {
    const [otp, setOtp] = useState(new Array(6).fill(''));
    
    const handleChange = (event, index) => {
        //* if it's not number return!
        console.log(event.target.value);
        if(isNaN(event.target.value)) {
            return;
        } 
        setOtp(otp.map((data, i) => {
            index === i ? event.target.value : data;
        }))

        if(event.target.value && event.target.nextSibling) {
            event.target.nextSibling.focus();
        }
    }


    return (
        <div className="otp-area">
            {otp.map((data, index) => {
                return <input maxLength={1} onChange={(event) => handleChange(event, index)} value={data}/>
            })}
        </div>
    )
}

export default Otp;