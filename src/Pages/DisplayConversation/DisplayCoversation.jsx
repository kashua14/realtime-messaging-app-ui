import React, { Component } from 'react';
import Message from './Message.js';

class DisplayConversation extends Component {
    render() {
        return (
                <ul
                    id="messageArea"
                    style={{
                        padding: '0px 20px 0px 0px',
                        height: '80vh',
                        margin: 0,
                        overflowY: 'auto',
                        overflowX: 'hidden',
                        boxSizing: 'border-box'
                    }}
                >
                    {
                        this.props.chatMessages.map((chat, index) =>
                            <Message
                                key={index}
                                chat={chat}
                                id={this.props.id}
                            />
                        )
                    }
                </ul>
        );
    }
}

export default DisplayConversation;