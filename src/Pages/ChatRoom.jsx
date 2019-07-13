import React from "react";
import PropTypes from "prop-types";
import ReactDOM from 'react-dom';
// react plugin for creating vector maps
//import { VectorMap } from "react-jvectormap";

// @material-ui/core components
import { makeStyles } from "@material-ui/styles";
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
// import withStyles from "@material-ui/core/styles/withStyles";
// import Icon from "@material-ui/core/Icon";

// @material-ui/icons
// import Box from 'react-styled-box';
import SendIcon from '@material-ui/icons/Send'
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

import { getAllUsers } from '../util/APIUtils'
import Message from './Message.js';
import defaultImage from "../assets/img/default-avatar.png";
import './App.css';
// import bgChats from "../assets/img/sidebar-2.jpg"


const useStyles = makeStyles({
    root: {
        // position: 'relative',
        borderRadius: '20px',
        display: 'inline-block',
        alignItems: 'center',
        width: '90%',
        height: '20%',
        margin: '1px 10px',
        padding: '1px 5px'
    },
    input: {
        margin: 8,
        flex: 1,
    },
    iconButton: {
        padding: 10,
        backgroundColor: '#db0056',
        color: 'white'
    }
});

const SendStyles = () => {
    const classes = useStyles();
    return (
        <div>
            <Paper className={classes.root}>
                <InputBase
                    style={{ width: '95%', padding: '0px 5px', margin: '0px 4px', fontSize: '20px', borderRadius: '20px' }}
                    className={classes.input}
                    placeholder="Type your Message here..."
                    type= 'text'
                />
            </Paper>
            <IconButton className={classes.iconButton} aria-label="Send"
                onClick={(e) => this.SendMessage(e)}
            >
                <SendIcon />
            </IconButton>
        </div>
    );
}

class ChatRooom extends React.Component {
    _isMounted = false;
    constructor(props) {
        super(props);
        this.state = {
            value: 0,
            cardAnimation: 'cardHidden',
            isOpen: false,
            message:'',
            users: [],
            imagePreviewUrl: defaultImage,
            chats: [{
                    username: "Kevin Hsu",
                    content: <p>Hello World!</p>,
                    img: "http://i.imgur.com/Tj5DGiO.jpg",
                }, {
                    username: "Alice Chen",
                    content: <p>Love it! :heart:</p>,
                    img: "http://i.imgur.com/Tj5DGiO.jpg",
                }, {
                    username: "Kevin Hsu",
                    content: <p>Check out my Github at https://github.com/WigoHunter</p>,
                    img: "http://i.imgur.com/Tj5DGiO.jpg",
                }, {
                    username: "KevHs",
                    content: <p>Lorem ipsum dolor sit amet, nibh ipsum. Cum class sem inceptos incidunt sed sed. Tempus wisi enim id, arcu sed lectus aliquam, nulla vitae est bibendum molestie elit risus.</p>,
                    img: "http://i.imgur.com/ARbQZix.jpg",
                }, {
                    username: "Kevin Hsu",
                    content: <p>So</p>,
                    img: "http://i.imgur.com/Tj5DGiO.jpg",
                }, {
                    username: "Kevin Hsu",
                    content: <p>Chilltime is going to be an app for you to view videos with friends</p>,
                    img: "http://i.imgur.com/Tj5DGiO.jpg",
                }, {
                    username: "Kevin Hsu",
                    content: <p>You can sign-up now to try out our private beta!</p>,
                    img: "http://i.imgur.com/Tj5DGiO.jpg",
                }, {
                    username: "Alice Chen",
                    content: <p>Definitely! Sounds great!</p>,
                    img: "http://i.imgur.com/Tj5DGiO.jpg",
                }]
        };
        this.displayUsers = this.displayUsers.bind(this);
        this.openChatRoom = this.openChatRoom.bind(this);
        this.SendMessage = this.SendMessage.bind(this);
    }

    openChatRoom() {
        console.log('i work in chats');
        this.setState(
            oldState => ({ isOpen: !oldState.isOpen })
        )
    }

    SendMessage(e) {
        console.log('have sent a message');
        // Stop the form from refreshing the page on submit
        e.preventDefault();

        this.setState({
            chats: this.state.chats.concat([{
                username: "Kevin Hsu",
                content: <p>{ReactDOM.findDOMNode(this.refs.msg).value}</p>,
                img: "http://i.imgur.com/Tj5DGiO.jpg",
            }])
        }, () => {
            ReactDOM.findDOMNode(this.refs.msg).value = "";
        });
    }

    displayUsers() {
        getAllUsers()
            .then(response => {
                this.setState({ users: response })
            }).catch(error => {
                alert(error.message || 'sorry! Something went wrong. Please try again!');
            });
        console.log(this.state.users);
    }

    componentDidMount() {
        this.scrollToBot();
        this.displayUsers();
    }

    componentDidUpdate() {
        this.scrollToBot();
    }

    scrollToBot() {
        ReactDOM.findDOMNode(this.refs.chats).scrollTop = ReactDOM.findDOMNode(this.refs.chats).scrollHeight;
    }


    render() {
        const username = "Kevin Hsu";
        const { chats } = this.state;

        return (
            <div 
                style={{ 
                    boxSizing:'border-box',
                    width: '100%' 
                    }} 
                >
                    {/*
                        // Header elements =====================================================================================
                    */}
                    {/*<div style={{ display:'block' }}>
                        <Box height='5%'
                        style={{
                            background: 'white',
                            minHeight: "100vh",
                            height: '100%'
                        }}
                        width='75%'
                        display="block"
                    > */}
                    <div 
                         style={{ backgroundColor: '#db0056', width: '75%', height: '25%'}}
                    >
                            <h2 
                                style={{
                                    fontFamily: 'Pacifico, cursive',
                        //             borderBottom: '2px solid #db0056',
                                    textAlign: 'center',
                                    padding: '10px 0px',
                                    fontSize: '20px',
                                    display: 'block',
                                    justifyContent: 'center',
                                    color: '#fff',
                                    margin: 0,
                        //     //boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'
                         }}
                            >MIS MESSENGER</h2>
                        </div >
                    {/* </Box>  
                    </div>*/}
                    

                    {/*
                        // Messages =========================================================================================
                    */}
                    <div>
                      {/* <Box height='100%' width='75%' 
                        style={{
                            backgroundColor: "white",
                            position: 'absolute',
                            color: 'grey'
                        }}
                        >
                        */}
                            <ul
                                ref="chats"
                                style={{
                                    padding: '0 20px',
                                    backgroundColor: "blue",
                                    margin: '10px 0 0',
                                    overflowY: 'scroll',
                                    // position: 'absolute'
                                }}
                            >
                                {
                                    chats.map((chat) =>
                                        <Message chat={chat} user={username} />
                                    )
                                }
                            </ul>
                        {/* </Box> */}
                    </div>
                    
                    
                    

                    {/*
                        // Send elements =====================================================================================
                    */}
                        {/* <Box height='10%' width='75%' style={{
                            backgroundColor: "rgba(0,0,0,0)",
                            // bottom: 5,
                            // position: 'absolute',
                            color: 'grey' 
                            }} 
                        > */}
                            <div style={{ width:'100%', margin:'2px' }} >
                                <SendStyles  />
                            </div>
                    {/* </Box>  */}
            </div>
            
        );
    }
}

ChatRooom.propTypes = {
    classes: PropTypes.object.isRequired
};

export default ChatRooom;
