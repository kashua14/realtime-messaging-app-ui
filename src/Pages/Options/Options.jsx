import React, { Component } from "react";
import { withRouter } from "react-router-dom";

// core components
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { ACCESS_TOKEN } from '../../constants/index';
// import { updateUserStatus } from "../util/APIUtils";

class Options extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentUser: null,
      isAuthenticated: false,
      isLoading: false
    }
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout() {
    localStorage.removeItem(ACCESS_TOKEN);
    console.log("am in log out function")
    this.setState({
      currentUser: null,
      isAuthenticated: false
    });
    // updateUserStatus(currentUserId);
    this.props.history.push("/");
  }

  render() {
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