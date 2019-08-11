import React from 'react';
import './App.css';

const Message = ({chat, id}) => ( 
    
    <li 
        key={chat.id}
    // className={`chat ${userId === chat.id ? "right" : "left"}`}
        style={{
            background: 'rgba(255, 255, 255, 0.8)',
            position: 'relative',
            padding: '5px 13px',
            fontSize: '14px',
            borderRadius: '10px',
            listStyle: 'none',
            float: `${id === chat.senderId ? "left" : "right"}`,
            clear: 'both',
            margin: '10px 0',
            maxWidth: '400px'
        }}
        
    >
        {chat.content}
    </li>
);

export default Message;