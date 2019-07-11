import React from "react";
import PropTypes from "prop-types";

// react plugin for creating vector maps
//import { VectorMap } from "react-jvectormap";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
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
// import CustomInput from "../components/CustomInput/CustomInput.jsx";
// import Button from "../components/CustomButtons/Button.jsx";
// import GridContainer from "../components/Grid/GridContainer.jsx";
// import GridItem from "../components/Grid/GridItem.jsx";
// import Button from "../components/CustomButtons/Button.jsx";
// import Danger from "../components/Typography/Danger.jsx";
// import Card from "../components/Card/Card.jsx";
// import CardHeader from "../components/Card/CardHeader.jsx";
// import CardIcon from "../components/Card/CardIcon.jsx";
// import CardBody from "../components/Card/CardBody.jsx";
// import CardFooter from "../components/Card/CardFooter.jsx";

//import PictureUpload from "../components/CustomUpload/PictureUpload.jsx";
import dashboardStyle from "../assets/jss/material-dashboard-pro-react/views/dashboardStyle";
// import { getAllUsers } from '../util/APIUtils'
// import defaultImage from "../assets/img/default-avatar.png";
// import ucu from '../assets/img/ucu_badge.png';
import ChatHeads from "./ChatHeads.jsx";
import ChatRoom from "./ChatRoom.jsx";

class Dashboard extends React.Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      isOpen: false,
      cardAnimation: 'cardHidden',
    }; 
    this.openChatRoom = this.openChatRoom.bind(this);
  }

  componentDidMount(){
    this._isMounted = true;
    this.timeOutFunction = setTimeout(
      function() {
        if (this._isMounted) {
         this.setState({ cardAnimation: "" });
        }
      }.bind(this),
      700
    );
  }

  componentWillMount(){
    this._isMounted = false;
    clearTimeout(this.timeOutFunction);
    this.timeOutFunction = null;
  }

  openChatRoom() {
    console.log('i work in chats');
    this.setState(
      oldState => ({ isOpen: !oldState.isOpen })
    )
  }

  render() {
    const isOpen = this.state.isOpen;
    return (
      <div style={{ boxSizing: 'border-box', background: 'rgba(0,0,0,0.6)', width: '100%', height: '100vh'}} >
        <div  >
          <ChatHeads openChatRoom={this.openChatRoom} style={{ minHeight: '100%', position: 'absolute' }} />
          
        </div>
        <div style={{ bottom: 0, right: 0 }}>
          {isOpen && <ChatRoom  />}
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(Dashboard);
