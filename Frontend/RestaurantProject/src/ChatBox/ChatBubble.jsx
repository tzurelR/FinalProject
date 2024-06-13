import React from 'react';

export default function ChatBubble (props) {
    const bubbleStyle = {
        backgroundColor: position === 'right' ? '#DCF8C6' : '#F0F0F0',
        borderRadius: '8px',
        padding: '8px',
        marginBottom: '8px',
        maxWidth: '80%',
        alignSelf: position === 'right' ? 'flex-end' : 'flex-start',
      };

      return (
        <div style={bubbleStyle}>
            {props.message}
        </div>
      )
    
}