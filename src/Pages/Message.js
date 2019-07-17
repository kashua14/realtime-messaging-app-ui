import React from 'react';
import './App.css';

const Message = ({chat, user}) => (
    <li className={`chat ${user === chat.username ? "right" : "left"}`}
        style={{
            background: 'rgba(255, 255, 255, 0.8)',
            position: 'relative',
            padding: '5px 13px',
            fontSize: '14px',
            borderRadius: '10px',
            listStyle: 'none',
            float: `${user === chat.username ? "left" : "right"}`,
            clear: 'both',
            margin: '10px 0',
            maxWidth: '500px'
        }}
    >
        {user !== chat.username
            && <img 
                    src={chat.img} 
                    alt={`${chat.username}'s profile pic`} 
                    style={{
                        width: '20px',
                        height: '20px',
                        borderRadius: '50%',
                        position: 'absolute',
                        top: '-10px',
                        left: '0px'
                    }}
                />
              }
        {chat.content}
    </li>
);

export default Message;