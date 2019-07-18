import React from "react";
import PropTypes from "prop-types";

// react plugin for creating vector maps
//import { VectorMap } from "react-jvectormap";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// import Icon from "@material-ui/core/Icon";

// // @material-ui/icons
// // import ContentCopy from "@material-ui/icons/ContentCopy";
// import Store from "@material-ui/icons/Store";
// // import InfoOutline from "@material-ui/icons/InfoOutline";
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

//import PictureUpload from "../components/CustomUpload/PictureUpload.jsx";
import dashboardStyle from "../assets/jss/material-dashboard-pro-react/views/dashboardStyle";
// import { getAllUsers } from '../util/APIUtils'
import { getAllUsers, getCurrentUser } from '../util/APIUtils'
// import defaultImage from "../assets/img/default-avatar.png";
// import ucu from '../assets/img/ucu_badge.png';
import ChatHeads from "./ChatHeads.jsx";
import ChatRoom from "./ChatRoom.jsx";
import bgChats from "../assets/img/register.jpeg"
import defaultImage from "../assets/img/default-avatar.png";
import './App.css';


class Dashboard extends React.Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      isOpen: false,
      users: [],
      userId: 0,
      currentUserId: 0,
      currentUser: [],
      cardAnimation: 'cardHidden',
      imagePreviewUrl: defaultImage
    }; 
    this.displayUsers = this.displayUsers.bind(this);
    this.loadCurrentUser = this.loadCurrentUser.bind(this);
  }

  loadCurrentUser() {
    getCurrentUser()
      .then(response => {
        this.setState({ currentUser: response });
        this.setState({ currentUserId: this.state.currentUser.id });

        console.log(" currentUserId: " + this.state.currentUserId);
      }).catch(error => {
        alert(error.message || 'sorry! Something went wrong. Please try again!');
      });
    return this.state.currentUserId;
  }

  displayUsers() {
    this.loadCurrentUser();
    // const josh = spaces.matches("[ -]*")
    // console.log(josh.length);
    getAllUsers()
      .then(response => {
        this.setState({ users: response })
        // console.log("Before: "+this.state.user);
        /*
        * exclude the current user
        */
        console.log("CurrentUser: " + this.state.currentUser.length);
        const otherUsers = this.state.users.filter(user => {
          return (user.username !== this.state.currentUser.username);
        });
        // console.log("After: " +this.state.users);
        this.setState({
          users: [...otherUsers]
        });
      }).catch(error => {
        alert(error.message || 'sorry! Something went wrong. Please try again!');
      });
  }
  componentDidMount(){
    this._isMounted = true;
    this.timeOutFunction = setTimeout(
      function() {
        if (this._isMounted) {
         this.setState({ cardAnimation: "" });
        }
        this.displayUsers();
      }.bind(this),
      700
    );
  }

  componentWillMount(){
    this._isMounted = false;
    clearTimeout(this.timeOutFunction);
    this.timeOutFunction = null;
  }



  openChatRoom(id){
    
    if (id === this.state.userId && this.loadCurrentUser() === this.state.currentUserId ){
      this.setState(
        // oldState => ({ isOpen: !oldState.isOpen })
        { isOpen: true }
      );
    }
    else {
      this.setState({ userId: id, isOpen: false });
    }
    console.log("I work in setUserId");
    console.log("After: " + this.state.userId);
  }


  onClick(id){
    console.log("Before: " + id)
    // this.openChatRoom(userId);
    this.openChatRoom(id);
  }

  render() {

    const isOpen = this.state.isOpen;
    const items = this.state.users.map((user) => 
      <li 
        key={user.id}
        style={{ borderBottom: '1px solid #aaa' }} 
        onClick={() => this.onClick(user.id)}
      >
        <div 
          style={{ boxSizing: 'border-box', padding: '2px 10px', display:'inline-block', textAlign: 'center', }}
        >
              <img 
                style={{ 
                  margin:'5px 0px', 
                  width: '50px', 
                  height: 'auto', 
                  align: 'middle',
                  borderRadius: '50%',
                  boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'
                }}
                src={this.state.imagePreviewUrl}
                alt="..."
              />
              <div style={{ textAlign:'center', float: 'right' }}>
                <h3 style={{ margin: '20px' }} >{user.username}</h3>
              </div>
          </div>
      </li>
    );

    // const users = this.state.users.map();
      // <li
      //   //data-selected={this.props.item.selected}
        
      //   style={{ borderBottom: '1px solid #aaa' }}
      //   onClick={this.openChatRoom}
      // >
      //   <div
      //     style={{ boxSizing: 'border-box', padding: '2px 10px', display: 'inline-block', textAlign: 'center', }}
      //   >
      //     <img
      //       style={{
      //         margin: '5px 0px',
      //         width: '50px',
      //         height: 'auto',
      //         align: 'middle',
      //         borderRadius: '50%',
      //         boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'
      //       }}
      //       src={this.state.imagePreviewUrl}
      //       alt="..."
      //     />
      //     <div style={{ textAlign: 'center', float: 'right' }}>
      //       <h3 style={{ margin: '20px' }} >{user.username}</h3>
      //     </div>
      //   </div>
      // </li>
    
    return (
      <div 
        style={{
          backgroundImage: `url(${bgChats})`,
          backgroundPosition: 'left top',
          backgroundAttachment: 'fixed',
          backgroundRepeatY: 'repeat',
          height: '100%',
          minHeight: '100vh'
        }}
      >
        <div
          style={{
            height: '100%',
            float: 'right',
            width: '25%',
            minHeight: '100vh'
          }}
          >
          <ChatHeads items={items} />

        </div>
        <div
          style={{
            minHeight: '100%',
            width: '75%',
            float: 'left',
            alignItems: 'center',
            justifyContent: 'center'
        }}
        >
          {isOpen && <ChatRoom currentUserId={this.state.currentUserId} userId={this.state.userId}/>}
        </div>
      </div>
    );
    
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(Dashboard);
