import React from 'react';
import { Component } from 'react'
import {
  Route,
  Switch,
  withRouter
} from 'react-router-dom';
import './App.css'

import { getCurrentUser } from './util/APIUtils';
// import { ACCESS_TOKEN } from './constants';

import Dashboard from './Pages/Dashboard';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import Profile from './Pages/profile/Profile';
// import AppHeader from './common/AppHeader';
import PrivateRoute from './common/PrivateRoute';

// import { Layout, notification } from 'antd';
import LoadingIndicator from './common/LoadingIndicator';
// import Options from './Pages/Options';
// import { ACCESS_TOKEN } from './constants/index';
// import { notification } from 'antd';
// import Options from './Pages/Options';

// const { Content } = Layout;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null,
      isAuthenticated: false,
      isLoading: false
    }
    // this.handleLogout = this.handleLogout.bind(this);
    this.loadCurrentUser = this.loadCurrentUser.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    // this.handleLogout = this.handleLogout.bind(this);

    // notification.config({
    //   placement: 'topRight',
    //   top: 70,
    //   duration: 3,
    // });  
  }

  loadCurrentUser() {
    this.setState({
      isLoading: true
    });
    getCurrentUser()
      .then(response => {
        this.setState({
          currentUser: response,
          isAuthenticated: true,
          isLoading: false
        });
      }).catch(error => {
        this.setState({
          isLoading: false
        });
      });
  }

  componentDidMount() {
    this.loadCurrentUser();
  }

  // handleLogout(redirectTo="/login", notificationType = "success", description = "You're successfully logged out.") {
  //   localStorage.removeItem(ACCESS_TOKEN);
  //   console.log("am in log out function")
  //   this.setState({
  //     currentUser: null,
  //     isAuthenticated: false
  //   });

  //   this.props.history.push("/login");

  //   notification[notificationType]({
  //     message: 'MIS Messenger',
  //     description: description,
  //   });
  // }

  handleLogin() {
    alert("You're successfully logged in.")
    this.loadCurrentUser();
    this.props.history.push("/dashboard");
  }


  render() {
    if (this.state.isLoading) {
      return <LoadingIndicator />
    }
    return (
      <Switch>
        <Route path="/dashboard"
          render={(props) => <Dashboard component={Dashboard} {...props} />}></Route>
        <Route exact path="/login"
          render={(props) => <Login onLogin={this.handleLogin} {...props} />}></Route>
        <Route path="/signup" component={Signup}></Route>
        <Route path="/users/:username"
          render={(props) => <Profile isAuthenticated={this.state.isAuthenticated} currentUser={this.state.currentUser} {...props} />}>
        </Route>
        <PrivateRoute authenticated={this.state.isAuthenticated} path="/login" component={Login} handleLogout={this.handleLogout}></PrivateRoute>
      </Switch>
    );
  }
  
}

export default withRouter(App);
