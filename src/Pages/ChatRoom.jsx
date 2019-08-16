import React from "react";
// import PropTypes from "prop-types";
import ReactDOM from 'react-dom';
import io from 'socket.io-client';

import './App.css';
import defaultImage from "../assets/img/default-avatar.png";
import { sendMessage, getChatHistory } from "../util/APIUtils.js";
import DisplayConversation from "./DisplayCoversation.jsx";
import MessagingBox from "./MessagingBox";

class ChatRooom extends React.Component {
    _isMounted = false;
    // socket = {}
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
        this.typing= this.typing.bind(this);
        this.notTyping = this.notTyping.bind(this);

        // Connect to the server
        this.socket = io('http://10.102.4.40:4008').connect();
        // this.socket = io('http://10.102.4.94:4008').connect();

        // Listen for messages from the server
        this.socket.on('server:message', message => {
            this.addMessage(message);
        });

        // Listen for typying message from the server
        this.socket.on('notifyTyping', message => {
            this.isOrNotTyping(message);
        });

        // Listen for typying message from the server
        this.socket.on('notifyStopTyping', message => {
            this.isOrNotTyping(message);
        });
    }

    isOrNotTyping( data){
        ReactDOM.findDOMNode(this.refs.typing).innerHTML = '<p><em>' + data + '</em><p>';
    }
    typing(){
            this.socket.emit('client:typing', '...is typing');        
    }
    notTyping(){
        setTimeout(() => {
            this.socket.emit('client:stopTyping', ' ')
        }, 2000);
        
    }

    submitMessage(e, value) {
        e.preventDefault();
        let msg = value;
        msg.trim();
        // console.log(ReactDOM.findDOMNode(this.refs.typing).innerHTML);
        
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

           // Emit the message to the server
            this.socket.emit("client:message", sentMessage);

            sendMessage(sentMessage)
                .then(response => {
                    // Do nothing after sending the message
                }).catch(error => {
                    alert(error.message || 'sorry! Something went s. Please try again!');
                });
            this.setState({
                chatMessages: this.state.chatMessages.concat([{ 
                    id: this.props.currentUserId,
                    content: <p>{msg}</p>,
                    // img: "http://i.imgur.com/Tj5DGiO.jpg",
                }])
            }, () => {
                msg = "";
            }); 
        }
    }

    addMessage(message) {
        // Append the message to the component state
        this.setState({ 
            chatMessages: this.state.chatMessages.concat([{ 
                id: message.senderId,
                content: <p>{message.content}</p>
            }])
        });
      }

    componentDidMount() {
        this.scrollToBot();

        // console.log("cur "+this.props.userId)
            getChatHistory(this.props.currentUserId, this.props.clickedUserId)
            .then(response => {
                // console.log(response)
                this.setState({
                    chatMessages: response
                })
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
                                    display: 'inline-block',
                                    justifyContent: 'center',
                                    color: '#fff',
                                    padding: '5px 0px', 
                                    margin: 0,
                                 }}
                            >{this.props.clickedUsername}</h2>
                            <div id="feedback" ref='typing' style={{ padding: '0px 10px', color: '#1dd335', display: 'inline-block', align:'center' }}></div>
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
                            
                    <MessagingBox submitMessage={this.submitMessage} typing={this.typing} notTyping={this.notTyping}/>
                        </div>
            </div>
            
        );
    }
}

export default ChatRooom;
