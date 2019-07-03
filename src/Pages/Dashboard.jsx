import React from "react";
import PropTypes from "prop-types"; 

// react plugin for creating vector maps
//import { VectorMap } from "react-jvectormap";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// import Tooltip from "@material-ui/core/Tooltip";
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
// import GridContainer from "../components/Grid/GridContainer.jsx";
// import GridItem from "../components/Grid/GridItem.jsx";
// import Button from "../components/CustomButtons/Button.jsx";
// import Danger from "../components/Typography/Danger.jsx";
// import Card from "../components/Card/Card.jsx";
// import CardHeader from "../components/Card/CardHeader.jsx";
// import CardIcon from "../components/Card/CardIcon.jsx";
// import CardBody from "../components/Card/CardBody.jsx";
// import CardFooter from "../components/Card/CardFooter.jsx";


import dashboardStyle from "../assets/jss/material-dashboard-pro-react/views/dashboardStyle";
import { getAllUsers } from '../util/APIUtils'


class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      cardAnimation: 'cardHidden',
      users: []
    }; 
    this.displayUsers = this.displayUsers.bind(this);
  }

  displayUsers() {
    getAllUsers()
    .then(response => {
      this.setState({users: response })
    }).catch(error => {
      alert(error.message || 'sorry! Something went wrong. Please try again!');
    });
    console.log(this.state.users);
  }

  componentDidMount(){
    this.timeOutFunction = setTimeout(
      function() {
        this.setState({ cardAnimation: "" });
        this.displayUsers();
      }.bind(this),
      700
    );
  }

  componentWillMount(){
    clearTimeout(this.timeOutFunction);
    this.timeOutFunction = null;
  }

  // handleChange = (event, value) => {
  //   this.setState({ value });
  // };
  // handleChangeIndex = index => {
  //   this.setState({ value: index });
  // };
  render() {

    const items = this.state.users.map((user, key) => 
    <li key={user.id} 
    style={{
      padding: 7, 
      borderBottom: '2px solid grey',
      margin: '2px',
      borderLeft: '5px solid grey',
      fontWeight: 'bold',
      fontSize: 20
    }}
    >
      {user.username}
    </li>
    )
    return (
      <div 
        // style={{
        //   backgroundImage: `url(${bgImage})`,
        //   backgroundPosition: "center",
        //   backgroundSize: 'cover',
        //   backgroundRepeat: 'no-repeat',
        //   width: '100%',
        //   height: 'auto',
        //   position: 'fixed',
        //   top: 0,
        //   left: 0,
        //   right: 0,
        //   bottom: 0,
        // }}
      >
        <div style={{ float: 'left' }} >
          <h2 style={{ textAlign: 'center'}} >CONNECTED USERS</h2>
          <ul style={{ listStyleType: 'none' }}>
            { items }
          </ul>
        </div>
        <div>
          <h2 style={{ textAlign: 'center' }} >CHAT-ROOM</h2>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(Dashboard);
