import React, { Component } from 'react';


class MessagingBox extends Component {

    messageHandler = (e) => {
        // if (e.keyCode === 13) {
            e.preventDefault();
            this.props.submitMessage(e, e.target.message.value);
            e.target.message.value = "";
        // }
    }

    render() {
        return (
            <div id="messagingBox" >
                <form
                    onSubmit={(e) => this.messageHandler(e)}
                    style={{
                        borderTopRightRadius: '5px',
                        borderBottomRightRadius: '5px',
                        display: 'block',
                        alignItems: 'center',
                        width: '95%',
                        height: '20%',
                        padding: '0px 0px 0px 30px'
                    }}
                >
                    <input type="text" id="message" placeholder="Type your message ..." ref="msg"
                        style={{
                            backgroundColor: '#ccc',
                            border: 'none',
                            color: 'black',
                            width: '90%', padding: '0px 10px',
                            fontSize: '15px',
                            borderTopLeftRadius: '25px',
                            borderBottomLeftRadius: '25px',
                            height: '30px',
                        }}
                    />
                    <input type="submit" value="Send"
                        style={{
                            padding: '0px 10px',
                            backgroundColor: '#db0056',
                            border: 'none',
                            color: 'white',
                            height: '30px',
                            borderTopRightRadius: '25px',
                            borderBottomRightRadius: '25px',
                            cursor: 'pointer',
                            fontSize: '15px'
                        }}
                    />
                </form>
            </div>
        );
    }
}

export default MessagingBox;