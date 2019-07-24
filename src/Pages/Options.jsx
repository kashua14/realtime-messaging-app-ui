import React, { Component } from "react";
import { withRouter } from "react-router-dom";

// core components
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { ACCESS_TOKEN } from '../constants/index';
import { notification } from 'antd';

// function handleLogout(notificationType = "success", description = "You're successfully logged out.") {
//   localStorage.removeItem(ACCESS_TOKEN);

//   // this.setState({
//   //   currentUser: null,
//   //   isAuthenticated: false
//   // });

//   this.push("/login");

//   notification[notificationType]({
//     message: 'MIS Messenger',
//     description: description,
//   });
// }

// function 

class Options extends Component{
  
  constructor(props){
    super(props);
    this.state = {
      currentUser: null,
      isAuthenticated: false,
      isLoading: false
    }
    this.handleLogout = this.handleLogout.bind(this);

    notification.config({
      placement: 'topRight',
      top: 70,
      duration: 3,
    });
  }

  handleLogout(redirectTo = "/login", notificationType = "success", description = "You're successfully logged out.") {
    localStorage.removeItem(ACCESS_TOKEN);
    console.log("am in log out function")
    this.setState({
      currentUser: null,
      isAuthenticated: false
    });

    this.props.history.push("/login");

    notification[notificationType]({
      message: 'MIS Messenger',
      description: description,
    });
  } 

    render() {
      console.log(this.props)
      return (
        <div
          style={{
            height: '100vh'
          }}
        >
          <List style={{ padding: 0, fontSize: 24 }}>
            <ListItem style={{ borderBottom: '1px solid #aaa' }} button >My Profile</ListItem>
            <ListItem style={{ borderBottom: '1px solid #aaa' }} button onClick={this.handleLogout}>Logout</ListItem>
          </List>
        </div>
      );
    }
  }

export default withRouter(Options);
