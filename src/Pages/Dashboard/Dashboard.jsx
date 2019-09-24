import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import dashboardStyle from "../../assets/jss/material-dashboard-pro-react/views/dashboardStyle";
// import { getAllUsers } from '../util/APIUtils'
import { getAllUsers } from '../../util/APIUtils'
import ChatNav from "../chatNav/ChatNav.jsx"
import ChatRoom from "../chatRoom/ChatRoom.jsx";
import bgChats from "../../assets/img/register.jpeg"
import defaultImage from "../../assets/img/default-avatar.png";

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
      currentUserId: null,
      // currentUser: null,
      imagePreviewUrl: defaultImage
    }; 
    this.displayUsers = this.displayUsers.bind(this);
  }

  displayUsers() {
    getAllUsers()
      .then(response => {
        this.setState({ users: response });
      }).catch(error => {
        alert(error.message || 'sorry! Something went wrong. Please try again!');
      });
  }

  componentDidMount(){
        this.displayUsers();
        // updateUserStatus()
  }

  openChatRoom(id, username){
    if (id === this.state.clickedUserId ){
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
  }

  onClick(id, username){
    console.log("current user: " + this.props.currentUser.id);
    this.setState({ currentUserId: this.props.currentUser.id })
    this.openChatRoom(id, username);
  }

  render() {

    const isOpen = this.state.isOpen;
    const items = this.state.users.map((user) => (
        <ListItem 
          key={user.id} 
          style={{ borderBottom: '1px solid #aaa' }} 
          button 
          onClick={() => this.onClick(user.id, user.username)}
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
            {/* <p>{user.content}</p> */}
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
            width: '20%',
            position: 'fixed',
            right: 0,
            minHeight: '100vh'
          }}
          >
          <ChatNav items={items} />
        </div>
        <div
          style={{
            minHeight: '100%',
            width: '80%',
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
