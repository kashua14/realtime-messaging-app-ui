import React from "react";
// import PropTypes from "prop-types";
import ReactDOM from 'react-dom';
// react plugin for creating vector maps
//import { VectorMap } from "react-jvectormap";

// @material-ui/core components
// import { makeStyles } from "@material-ui/styles";
// import Paper from '@material-ui/core/Paper';
// import InputBase from '@material-ui/core/InputBase';
// import IconButton from '@material-ui/core/IconButton';
// import withStyles from "@material-ui/core/styles/withStyles";
// import Icon from "@material-ui/core/Icon";

// @material-ui/icons
// import Box from 'react-styled-box';
// import SendIcon from '@material-ui/icons/Send'
// import ContentCopy from "@material-ui/icons/ContentCopy";
// import Store from "@material-ui/icons/Store";
// import InfoOutline from "@material-ui/icons/InfoOutline";
// import Warning from "@material-ui/icons/Warning";
// import DateRange from "@material-ui/icons/DateRange";
// import LocalOffer from "@material-ui/icons/LocalOffer";
// import Update from "@material-ui/icons/Update";
// import ArrowUpward from "@material-ui/icons/ArrowUpward";
// import AccessTime from "@material-ui/icons/AccessTime";
// import Refresh from "@material-ui/icons/Refresh";
// import Edit from "@material-ui/icons/Edit";
// import Place from "@material-ui/icons/Place";
// import ArtTrack from "@material-ui/icons/ArtTrack";
// import Language from "@material-ui/icons/Language";

// core components
// import ChatBubble from 'react-chat-bubble';
// import App from "./App.jsx";
// import sidebarStyle from "../assets/jss/material-dashboard-pro-react/components/sidebarStyle.jsx";
// import CustomInput from "../components/CustomInput/CustomInput.jsx";
// import Button from "../components/CustomButtons/Button.jsx";
// import GridContainer from "../components/Grid/GridContainer.jsx";
// import GridItem from "../components/Grid/GridItem.jsx";
// import Button from "../components/CustomButtons/Button.jsx";
// import Danger from "../components/Typography/Danger.jsx";
// import Card from "../components/Card/Card.jsx";
// import CardHeader from "../components/Card/CardHeader.jsx";
// import CardIcon from "../components/Card/CardIcon.jsx";
// import CardBody from "../components/Card/CardBody.jsx";
// import CardFooter from "../components/Card/CardFooter.jsx";

// import { getAllUsers } from '../util/APIUtils'
import Message from './Message.js';
// import defaultImage from "../assets/img/default-avatar.png";
import './App.css';
import defaultImage from "../assets/img/default-avatar.png";
import { sendMessage, getChatHistory } from "../util/APIUtils.js";
// import bgChats from "../assets/img/sidebar-2.jpg"

class ChatRooom extends React.Component {
    _isMounted = false;
    constructor(props) {
        super(props);
        this.state = {
            value: 0,
            cardAnimation: 'cardHidden',
            imagePreviewUrl: defaultImage,
            message:'',
            chatMessages: []
        };
        this.submitMessage = this.submitMessage.bind(this);
    }

    submitMessage(e) {
        e.preventDefault();
        const msg = ReactDOM.findDOMNode(this.refs.msg).value;
        msg.trim();
        /*
        * eliminate strings that contain spaces only 
        */

        if (/\S/.test(msg)){
           const sentMessage = {
               senderId: this.props.currentUserId,
               recieverId: this.props.clickedUserId,
               content: ReactDOM.findDOMNode(this.refs.msg).value
           }
           console.log(sentMessage);
            sendMessage(sentMessage)
                .then(response => {
                    // Do nothing after sending the message
                }).catch(error => {
                    alert(error.message || 'sorry! Something went wrong. Please try again!');
                });
            this.setState({
                chatMessages: this.state.chatMessages.concat([{
                    id: this.props.currentUserId,
                    content: <p 
                        // style={{margin: 0, display: 'inline-block', textOverflow: 'clip' }}
                    >{ReactDOM.findDOMNode(this.refs.msg).value}</p>,
                    // img: "http://i.imgur.com/Tj5DGiO.jpg",
                }])
            }, () => {
                ReactDOM.findDOMNode(this.refs.msg).value = "";
            }); 
        }else{
            ReactDOM.findDOMNode(this.refs.msg).value = "";
        }
        // console.log(this.props.userId);
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
        const id = this.props.currentUserId;
        const { chatMessages } = this.state;
        // let userId = this.props.userId;
        console.log(this.state.chatMessages);

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
                    <div >
                        <div style={{ backgroundColor: 'rgba(0,0,0,0.6)', minHeight: '100vh'}}>
                            <ul
                                id="messageArea"
                                ref="chats"
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
                                    chatMessages.map(chat => 
                                        <Message 
                                            chat={chat} 
                                            id={id} 
                                        />
                                    )
                                }
                            </ul>
                            <form 
                                onSubmit={(e) => this.submitMessage(e)}
                                style={{
                                    borderTopRightRadius: '5px',
                                    borderBottomRightRadius: '5px',
                                    display: 'block',
                                    alignItems: 'center',
                                    width: '100%',
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
                    </div>
            </div>
            
        );
    }
}

// ChatRooom.propTypes = {
//     classes: PropTypes.object.isRequired
// };

export default ChatRooom;
