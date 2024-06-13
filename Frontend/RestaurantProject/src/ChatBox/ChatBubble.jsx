import React from 'react';

export default function ChatBubble (props) {
    console.log(props.position);
    const bubbleStyle = {
        backgroundColor: props.position === 'right' ? '#DCF8C6' : '#F0F0F0',
        borderRadius: '8px',
        padding: '8px',
        marginBottom: '8px',
        maxWidth: '50%',
        alignSelf: props.position === 'right' ? 'flex-start' : 'flex-end',
      };

      return (
        <div style={bubbleStyle}>
            {props.message}
        </div>
      )
    
}