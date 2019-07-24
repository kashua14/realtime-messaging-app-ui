import React from 'react';
import { Component } from 'react'
import {
  Route,
  Switch,
  withRouter
} from 'react-router-dom';
import './App.css'

import { getCurrentUser } from './util/APIUtils';
import { ACCESS_TOKEN } from './constants';

import Dashboard from './Pages/Dashboard';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import Profile from './Pages/profile/Profile';

import LoadingIndicator from './common/LoadingIndicator';

import { notification } from 'antd';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null,
      isAuthenticated: false,
      isLoading: false
    }
    this.handleLogout = this.handleLogout.bind(this);
    this.loadCurrentUser = this.loadCurrentUser.bind(this);
    this.handleLogin = this.handleLogin.bind(this);

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

  handleLogout(redirectTo = "/login", notificationType = "success", description = "You're successfully logged out.") {
    localStorage.removeItem(ACCESS_TOKEN);

    this.setState({
      currentUser: null,
      isAuthenticated: false
    });

    this.props.history.push(redirectTo);

    notification[notificationType]({
      message: 'MIS Messenger',
      description: description,
    });
  }

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
        <Route path="/login"
          render={(props) => <Login onLogin={this.handleLogin} {...props} />}></Route>
        <Route path="/signup" component={Signup}></Route>
        {/* <Route path="/signup" component={Wizard}></Route> */}
        <Route path="/users/:username"
          render={(props) => <Profile isAuthenticated={this.state.isAuthenticated} currentUser={this.state.currentUser} {...props} />}>
        </Route>
      </Switch>
    );
  }
  
}

export default withRouter(App);
