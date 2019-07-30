import React from "react";
// import PropTypes from "prop-types";
import ReactDOM from 'react-dom';

import './App.css';
import defaultImage from "../assets/img/default-avatar.png";
import { sendMessage, getChatHistory } from "../util/APIUtils.js";
import DisplayConversation from "./DisplayCoversation.jsx";
import MessagingBox from "./MessagingBox";

class ChatRooom extends React.Component {
    _isMounted = false;
    constructor(props) {
        super(props);
        this.state = {
            value: 0,
            cardAnimation: 'cardHidden',
            imagePreviewUrl: defaultImage,
            message:'',
            id : this.props.currentUserId,
            chatMessages: []
        };
        this.submitMessage = this.submitMessage.bind(this);
    }

    submitMessage(e, value) {
        e.preventDefault();
        let msg = value;
        const data = { senderId: this.state.id, msg: msg }
        this.connection.send(JSON.stringify(data));
        msg.trim();
        /*
        * eliminate strings that contain spaces only 
        */

        if (/\S/.test(msg)){
           const sentMessage = {
               senderId: this.state.id,
               recieverId: this.props.clickedUserId,
               content: msg
           }
           console.log(sentMessage);
            sendMessage(sentMessage)
                .then(response => {
                    // Do nothing after sending the message
                }).catch(error => {
                    alert(error.message || 'sorry! Something went wrong. Please try again!');
                });
            this.setState({
                chatMessages: [...this.state.chatMessages,sentMessage]
            }); 
        }
    }
    // _toConsumableArray(arr) { 
    //     if (Array.isArray(arr)) { 
    //         for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { 
    //             arr2[i] = arr[i]; 
    //         } return arr2; 
    //     } else { return Array.from(arr); } 
    // }
    connection = new WebSocket('ws://localhost:9090/')

    componentDidMount() {
        this.scrollToBot();
        this.connection.onmessage = (message) => {
            // console.log(data)
            const data = JSON.parse(message.data)
            console.log(data)
            // _toConsumableArray(ChatMessages).concat(data)
            // this.setState({ ChatMessages: [...this.state.ChatMessages, data] })
        }

        // console.log("cur "+this.props.userId)
        getChatHistory(this.props.currentUserId, this.props.clickedUserId)
            .then(response => {
                // console.log(response)
                this.setState({
                    chatMessages: response
                })
                console.log(this.state.chats);
                // const otherUsers = this.state.users.filter(user => {
                //     return (user.username !== this.state.currentUser.username);
                // });
            }).catch(error => {
                alert(error.message || 'sorry! Something went wrong. Please try again!');
            });
        console.log(this.state.chatMessages);
    }

    componentDidUpdate() {
        this.scrollToBot();
    }

    scrollToBot() {
        ReactDOM.findDOMNode(this.refs.chats).scrollTop = ReactDOM.findDOMNode(this.refs.chats).scrollHeight;
    }


    render() {

        return (
            <div 
                style={{ 
                    boxSizing:'border-box',
                    width: '100%'
                }} 
                >
                    <div 
                        style={{ backgroundColor: '#db0056', width: '100%', height: '25%'}}
                    >
                        <img 
                            style={{  
                            width: '100px',
                            float: 'left', 
                            height: 'auto', 
                            align: 'middle',
                            margin: '10px',
                            borderRadius: '50%',
                            boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'
                            }}
                            src={this.state.imagePreviewUrl}
                            alt="..."
                        />
                            <h2 
                                style={{
                                    fontFamily: 'Pacifico, cursive',
                                    textAlign: 'center', 
                                    fontSize: '40px',
                                    display: 'block',
                                    justifyContent: 'center',
                                    color: '#fff',
                                    padding: '5px 0px', 
                                    margin: 0,
                                 }}
                            >{this.props.clickedUsername}</h2>
                        </div >
                    {/*
                        // Messages ====================================================================================
                    */}
                        <div style={{ backgroundColor: 'rgba(0,0,0,0.6)', minHeight: '100vh'}}>
                            <DisplayConversation 
                                chatMessages={this.state.chatMessages}
                                id={this.state.id}
                                ref="chats"
                            />
                            <MessagingBox submitMessage={this.submitMessage}/>
                        </div>
            </div>
            
        );
    }
}

// ChatRooom.propTypes = {
//     classes: PropTypes.object.isRequired
// };

export default ChatRooom;
