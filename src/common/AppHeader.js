import React, { Component } from 'react';
import {
    Link,
    withRouter
} from 'react-router-dom';
import './AppHeader.css';
// import pollIcon from '../poll.svg';
import { Layout, Menu, Dropdown, Icon } from 'antd';
const Header = Layout.Header;
    
class AppHeader extends Component {
    constructor(props) {
        super(props);   
        this.handleMenuClick = this.handleMenuClick.bind(this);   
    }

    handleMenuClick({ key }) {
      if(key === "logout") {
        this.props.onLogout();
      }
    }

    render() {
        let menuItems;
        if(this.props.currentUser) {
          menuItems = [
            <Menu.Item key="/login" style={{ display: 'inline' }}>
              <Link to="/login">
                <Icon type="home" style={{ fontSize: '20px'}} />
              </Link>
            </Menu.Item>,
          //   <Menu.Item key="/poll/new">
          //   <Link to="/poll/new">
          //     <img src={pollIcon} alt="poll" className="poll-icon" />
          //   </Link>
          // </Menu.Item>,
            <Menu.Item key="/profile" style={{ fontSize: '14px', color: 'rgba(0, 0, 0, 0.65)' }}>
                <ProfileDropdownMenu 
                  currentUser={this.props.currentUser} 
                  handleMenuClick={this.handleMenuClick}/>
            </Menu.Item>
          ]; 
        } else {
          menuItems = [
            <Menu.Item key="/login">
              <Link to="/login">Login</Link>
            </Menu.Item>,
            <Menu.Item key="/signup">
              <Link to="/signup">Signup</Link>
            </Menu.Item>                  
          ];
        }

        return (
            <Header 
              style={{
                position: 'fixed',
                width: '100%',
                boxShadow: '0 2px 8px #f0f1f2',
                zIndex: 10,
                padding: 0,
              }}
            >
            <div 
              style={{ 
                // maxWidth: '100%',
                marginLeft: 'auto',
                marginRight: 'auto',
                paddingLeft: '15px',
                paddingRight: '15px'
              }}
            >
              <div style={{ float: 'left' }} >
                <Link to="/login"
                  style={{
                    textDecoration: 'none',
                    lineHeight: '64px',
                    fontSize: '21px',
                    display: 'inline-block'
                  }}
                >M.I.S Messenger</Link>
              </div>
              <Menu
                mode="horizontal"
                selectedKeys={[this.props.location.pathname]}
                style={{ lineHeight: '64px',display: 'inline-block', float: 'right' }} >
                  {menuItems}
              </Menu>
            </div>
          </Header>
        );
    }
}

function ProfileDropdownMenu(props) {
  const dropdownMenu = (
    <Menu onClick={props.handleMenuClick} style={{ minWidth: '180px' }}>
      <Menu.Item key="user-info" style={{ padding: '10px 12px', margin: '-10px - 12px'}} disabled>
        <div 
          style={{
            fontSize: '17px',
            fontWeight: 600,
            color: 'rgba(0,0,0,0.85)'
      }}
    >
          {props.currentUser.name}
        </div>
        <div style={{ fontSize: '14px', color: 'rgba(0,0,0,0.65)'}}>
          @{props.currentUser.username}
        </div>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="profile" style={{ padding: '10px 12px' }}>
        <Link to={`/users/${props.currentUser.username}`}>Profile</Link>
      </Menu.Item>
      <Menu.Item key="logout" style={{ padding: '10px 12px' }}>
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown 
      overlay={dropdownMenu} 
      trigger={['click']}
      getPopupContainer = { () => document.getElementsByClassName('profile-menu')[0]}>
      <a className="ant-dropdown-link">
        <Icon type="user" style={{ marginRight: 0, fontSize: '20px' }} /> <Icon type="down" />
      </a>
    </Dropdown>
  );
}


export default withRouter(AppHeader);