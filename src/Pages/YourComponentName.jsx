import React from "react";
import PropTypes from "prop-types"; 

// core components

import Sidebar from "../components/Sidebar/Sidebar.jsx";
import withStyles from "@material-ui/core/styles/withStyles";

import routes from "../routes/dashboard";

import sidebarStyle from "../assets/jss/material-dashboard-pro-react/components/sidebarStyle.jsx";

import image from "../assets/img/sidebar-2.jpg";
import logo from "../assets/img/logo-white.svg";



class YourComponentName extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mobileOpen: false,
            miniActive: false,
            image: image,
            color: "blue",
            bgColor: "black"
        };
    }
  
    handleDrawerToggle = () => {
        this.setState({ mobileOpen: !this.state.mobileOpen });
    };
  
    render() {
        const { ...rest} = this.props;
        return (
            
        <Sidebar
          routes = { routes }
          logoText = { "Creative Tim"}
          logo = { logo }
          image = { this.state.image }
          handleDrawerToggle = { this.handleDrawerToggle }
          open = { this.state.mobileOpen }
          color = { this.state.color }
          bgColor = { this.state.bgColor }
          miniActive = { this.state.miniActive }
          { ... rest }
        />
      
    );
    }
}

YourComponentName.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(sidebarStyle)(YourComponentName);
