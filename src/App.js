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

    notification.config({
      placement: 'topRight',
      top: 70,
      duration: 3,
    });
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

  handleLogout(redirectTo = "/", notificationType = "success", description = "You're successfully logged out.") {
    localStorage.removeItem(ACCESS_TOKEN);

    this.setState({
      currentUser: null,
      isAuthenticated: false
    });

    this.props.history.push(redirectTo);

    notification[notificationType]({
      message: 'Polling App',
      description: description,
    });
  }

  handleLogin() {
    notification.success({
      message: 'Polling App',
      description: "You're successfully logged in.",
    });
    this.loadCurrentUser();
    this.props.history.push("/NewPoll");
  }


  render() {
    if (this.state.isLoading) {
      return <LoadingIndicator />
    }
    return (
      <Switch>
        <Route path="/login"
          render={(props) => <Login onLogin={this.handleLogin} {...props} />}></Route>
        <Route path="/signup" component={Signup}></Route>
        <Route path="/users/:username"
          render={(props) => <Profile isAuthenticated={this.state.isAuthenticated} currentUser={this.state.currentUser} {...props} />}>
        </Route>
      </Switch>
    );
  }
  
}

export default withRouter(App);
