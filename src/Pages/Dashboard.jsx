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
import  './myStyles.css'
import Chats from "./Chats.jsx";
import App from "./App";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      isOpen: true,
      cardAnimation: 'cardHidden',
    }; 
    this.openChatRoom = this.openChatRoom.bind(this);
  }

  openChatRoom() {
    console.log('i work in dashboard');
    this.setState(
      oldState => ({isOpen: !oldState.isOpen})
    )
  }

  componentDidMount(){
    this.timeOutFunction = setTimeout(
      function() {
        this.setState({ cardAnimation: "" });
      }.bind(this),
      700
    );
  }

  componentWillMount(){
    clearTimeout(this.timeOutFunction);
    this.timeOutFunction = null;
  }

  render() {
    const {isOpen} = this.state;
    return (
      <div style={{  boxSizing: 'border-box', background: 'rgba(0,0,0,0.6)', width: '100%', height: '100vh'}} >
        <Chats />
        <div>
          { isOpen && <App /> }
        </div>
        <div >

        </div>
        {/* <div style={{ boxSizing: 'border-box', backgroundColor:'#aa2',  width:'auto', height: '100%', padding : '0px 15px'}} >
           <div>
            <h2 style={{ textAlign: 'center', backgroundColor:'rose' }} >CHAT-ROOM</h2>
          </div>
          <div style={{ height: '500px', overflowY: 'auto' }}>
            <p>body</p>
          </div> */}
          {/* <div style={{ bottom: 0, right:0, position: 'absolute', backgroundColor: '#bbb' }}>
              <CustomInput
                  labelText="Type your Message here..."
                  id="message"
                  formControlProps={{
                    fullWidth: false
                  }}
                  inputProps={{
                    onChange: event =>
                      this.change(event, "loginEmail", "email"),
                      type: "text"
                    }}
                />
              <Button type="submit" color="rose"  size="sm" inline>
                Send
              </Button>
          </div> 
        </div>*/}
      </div>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(Dashboard);
