import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import dashboardStyle from "../assets/jss/material-dashboard-pro-react/views/dashboardStyle";
// import { getAllUsers } from '../util/APIUtils'
import { getAllUsers, getCurrentUser } from '../util/APIUtils'
import ChatNav from "./ChatNav.jsx"
import ChatRoom from "./ChatRoom.jsx";
import bgChats from "../assets/img/register.jpeg"
import defaultImage from "../assets/img/default-avatar.png";
import './App.css';
// import Wizard from "./Wizard";
// import Chats from "./Chats";


class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      users: [],
      clickedUserId: 0,
      clickedUsername: "",
      currentUserId: 0,
      currentUser: [],
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
    getAllUsers()
      .then(response => {
        this.setState({ users: response })
        /*
        * exclude the current user
        */
        const otherUsers = this.state.users.filter(user => {
          return (user.username !== this.state.currentUser.username);
        });
        this.setState({
          users: [...otherUsers]
        });
      }).catch(error => {
        alert(error.message || 'sorry! Something went wrong. Please try again!');
      });
  }
  componentDidMount(){
        this.displayUsers();
  }


  openChatRoom(id, username){
    
    if (id === this.state.clickedUserId && this.loadCurrentUser() === this.state.currentUserId ){
      this.setState(
        // oldState => ({ isOpen: !oldState.isOpen })
        { isOpen: true }
      );
    }
    else {
      this.setState({ 
        clickedUserId: id, 
        isOpen: false,
        clickedUsername: username
      });
    }
    console.log("I work in setUserId");
    console.log("After: " + this.state.clickedUserId);
  }


  onClick(id, username){
    console.log("Before: " + username)
    // this.openChatRoom(userId);
    this.openChatRoom(id, username);
  }

  render() {

    const isOpen = this.state.isOpen;
    const items = this.state.users.map((user) => (
      // <List style={{ padding: 0 }}>
        <ListItem key={user.id} 
          style={{ 
            borderBottom: '1px solid #aaa'
          }} 
          button onClick={() => this.onClick(user.id, user.username)}
        >
          <div
          style={{ boxSizing: 'border-box', padding: '2px 10px', display:'inline-block', textAlign: 'center', }}
        >
          <img
            style={{
              margin: '5px 0px',
              width: '50px',
              height: 'auto',
              align: 'middle',
              borderRadius: '50%',
              boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'
            }}
            src={this.state.imagePreviewUrl}
            alt="..."
          />
          <div style={{ textAlign: 'center', float: 'right' }}>
            <h3 style={{ margin: '20px' }} >{user.username}</h3>
          </div>
          {/* <ListItemText primary style={{ textAlign: 'center', float: 'right' }} /> */}
          </div>
        </ListItem>
      // </List>
    )
      
    );

    return (
      <div 
        style={{
          overflow: 'hidden',
          backgroundImage: `url(${bgChats})`,
          backgroundPosition: 'left top',
          backgroundAttachment: 'fixed',
          backgroundRepeat: 'no-repeat',
          height: '100%',
          minHeight: '100vh',
          // position: 'fixed',
        }}
      >
        <div
          style={{
            height: '100%',
            float: 'right',
            width: '25%',
            position: 'fixed',
            right: 0,
            minHeight: '100vh'
          }}
          >
          <ChatNav items={items} />
        </div>
        {/* <Wizard /> */}
        <div
          style={{
            minHeight: '100%',
            width: '75%',
            float: 'left',
            position: 'fixed',
            alignItems: 'center',
            justifyContent: 'center'
        }}
        >
          {
            isOpen && 
            <ChatRoom 
              currentUserId={this.state.currentUserId} 
              clickedUserId={this.state.clickedUserId}
              clickedUsername={this.state.clickedUsername}
            />
          }
        </div>
      </div>
    );
    
  }
}

// Dashboard.propTypes = {
//   classes: PropTypes.object.isRequired
// };

export default withStyles(dashboardStyle)(Dashboard);
