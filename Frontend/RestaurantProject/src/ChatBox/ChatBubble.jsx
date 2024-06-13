import React from 'react';
import LaptopIcon from '@mui/icons-material/Laptop';
import PersonIcon from '@mui/icons-material/Person';

export default function ChatBubble (props) {
    console.log(props.position);
    const bubbleStyle = {
        backgroundColor: props.position === 'right' ? '#DCF8C6' : '#F0F0F0',
        borderRadius: '8px',
        padding: '8px',
        marginBottom: '8px',
        maxWidth: '50%',
        alignSelf: props.position === 'right' ? 'flex-start' : 'flex-end',
        whiteSpace: 'pre-wrap',
        wordBreak: 'break-word',
      };

      return (
        <div style={bubbleStyle}>
            {props.index % 2 === 0 ? <div> <PersonIcon/>{props.message} </div> : <div> {props.message} <LaptopIcon/></div>}
        </div>
      )
    
}