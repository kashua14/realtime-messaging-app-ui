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
import CustomInput from "../components/CustomInput/CustomInput.jsx";
import Button from "../components/CustomButtons/Button.jsx";
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
import { getAllUsers } from '../util/APIUtils'
import defaultImage from "../assets/img/default-avatar.png";
import  './myStyles.css'

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      cardAnimation: 'cardHidden',
      users: [],
      imagePreviewUrl: defaultImage
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
    <a href='/'>
      <li key={user.id} style={{ borderTop: '1px solid #aaa' }} >
          <div style={{ boxSizing: 'border-box' , display:'inline-block', textAlign: 'center', }}>
              <img 
                style={{ margin:'5px 0px', width: '40px', height: 'auto', align: 'middle', border:' 4px solid #CCCCCC', borderRadius: '50%'}}
                src={this.state.imagePreviewUrl}
                alt="..."
              />
              <div style={{ textAlign:'center', float: 'right' }}>
                <h3 style={{ margin: '20px' }} >{user.username}</h3>
              </div>
          </div>
      </li>
    </a>
    )
    return (
      <div style={{ boxSizing: 'border-box'}} >
        <div style={{ backgroundColor:'#bbb', margin: 0, width:'20%', height: '100%', float: 'left', padding : '0px 15px', borderRight: '2px solid black' }} >
          <h4 style={{ textAlign: 'center', padding: 0 }} >CONNECTED USERS</h4>
          <div>
            <ul style={{ listStyleType: 'none', padding: 0 }}>
              { items }
            </ul>
          </div>
        </div>
        <div style={{ boxSizing: 'border-box', backgroundColor:'#aa2',  width:'auto', height: '100%', padding : '0px 15px'}} >
          <div>
            <h2 style={{ textAlign: 'center', backgroundColor:'rose' }} >CHAT-ROOM</h2>
          </div>
          <div style={{ height: '500px', overflowY: 'auto' }}>
            <p>body</p>
          </div>
          <div style={{ bottom: 0, right:0, position: 'absolute', backgroundColor: '#bbb' }}>
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
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(Dashboard);
