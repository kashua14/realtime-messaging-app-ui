import React from "react";
import PropTypes from "prop-types";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// core components
import GridContainer from "../../components/Grid/GridContainer.jsx";
import GridItem from "../../components/Grid/GridItem.jsx";
import CustomInput from "../../components/CustomInput/CustomInput.jsx";
import Button from "../../components/CustomButtons/Button.jsx";
import Card from "../../components/Card/Card.jsx";
import CardBody from "../../components/Card/CardBody.jsx";
import CardHeader from "../../components/Card/CardHeader.jsx";
import CardFooter from "../../components/Card/CardFooter.jsx";

import loginPageStyle from "../../assets/jss/material-dashboard-pro-react/views/loginPageStyle.jsx";

import badge from "../../assets/img/ucu_badge.png"
import bgImage from "../../assets/img/bg-pricing.jpeg";

import { login } from '../../util/APIUtils';
import { ACCESS_TOKEN } from '../../constants';
// import Footer from "../../components/Footer/Footer.jsx";
import PagesHeader from "../../components/Header/PagesHeader.jsx";

class Login extends React.Component {
  constructor(props) {
    super(props);
    // we use this to make the card to appear after the page has been rendered
    this.state = {
      cardAnimaton: "cardHidden",
      loginEmail:"",
      loginEmailState:"",
      loginPassword:"",
      loginPasswordState:""
    };
    this.handleLogin = this.handleLogin.bind(this);
  }
  verifyEmail(value) {
    var emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (emailRex.test(value)) {
      return true;
    }
    return false;
  }
  // function that verifies if a string has a given length or not
  verifyLength(value, length) {
    if (value.length >= length) {
      return true;
    }
    return false;
  }
  change(event, stateName, type, stateNameEqualTo, maxValue) {
    switch (type) {
      case "email":
        if (this.verifyEmail(event.target.value)) {
          this.setState({ [stateName + "State"]: "success" });
        } else {
          this.setState({ [stateName + "State"]: "error" });
        }
        break;
      case "password":
        if (this.verifyLength(event.target.value, 6)) {
          this.setState({ [stateName + "State"]: "success" });
        } else {
          this.setState({ [stateName + "State"]: "error" });
        }
        break;
      case "checkbox":
        if (event.target.checked) {
          this.setState({ [stateName + "State"]: "success" });
        } else {
          this.setState({ [stateName + "State"]: "error" });
        }
        break;
      case "length":
        if (this.verifyLength(event.target.value, stateNameEqualTo)) {
          this.setState({ [stateName + "State"]: "success" });
        } else {
          this.setState({ [stateName + "State"]: "error" });
        }
        break;
      case "max-length":
        if (!this.verifyLength(event.target.value, stateNameEqualTo + 1)) {
          this.setState({ [stateName + "State"]: "success" });
        } else {
          this.setState({ [stateName + "State"]: "error" });
        }
        break;
      case "min-value":
        if (
          this.verifyNumber(event.target.value) &&
          event.target.value >= stateNameEqualTo
        ) {
          this.setState({ [stateName + "State"]: "success" });
        } else {
          this.setState({ [stateName + "State"]: "error" });
        }
        break;
      case "max-value":
        if (
          this.verifyNumber(event.target.value) &&
          event.target.value <= stateNameEqualTo
        ) {
          this.setState({ [stateName + "State"]: "success" });
        } else {
          this.setState({ [stateName + "State"]: "error" });
        }
        break;
      case "range":
        if (
          this.verifyNumber(event.target.value) &&
          event.target.value >= stateNameEqualTo &&
          event.target.value <= maxValue
        ) {
          this.setState({ [stateName + "State"]: "success" });
        } else {
          this.setState({ [stateName + "State"]: "error" });
        }
        break;
      default:
        break;
    }
    switch (type) {
      case "checkbox":
        this.setState({ [stateName]: event.target.checked });
        break;
      default:
        this.setState({ [stateName]: event.target.value });
        break;
    }
  }
  loginClick() {
    if (this.state.loginEmailState === "") {
      this.setState({ loginEmailState: "error" });
    }
    if (this.state.loginPasswordState === "") {
      this.setState({ loginPasswordState: "error" });
    }
  }
  typeClick() {
    if (this.state.requiredState === "") {
      this.setState({ requiredState: "error" });
    }
    if (this.state.typeEmailState === "") {
      this.setState({ typeEmailState: "error" });
    }
    if (this.state.numberState === "") {
      this.setState({ numberState: "error" });
    }
    
  }

  handleLogin(event) {
    event.preventDefault();

    const loginRequest = {
      usernameOrEmail: this.state.loginEmail,
      password: this.state.loginPassword
    };
    //console.log(loginRequest)
    login(loginRequest)
      .then(response => {
        localStorage.setItem(ACCESS_TOKEN, response.accessToken);
        this.props.onLogin();
      }).catch(error => {
        if (error.status === 401) {
          alert('Your Username or Password is incorrect. Please try again!');
        } else {
          alert(error.message || 'Sorry! Something went wrong. Please try again!');
        }
      });
  }

  componentDidMount() {
    // we add a hidden class to the card and after 700 ms we delete it and the transition appears
    this.timeOutFunction = setTimeout(
      function() {
        this.setState({ cardAnimaton: "" });
      }.bind(this),
      700
    );
  }
  componentWillUnmount() {
    clearTimeout(this.timeOutFunction);
    this.timeOutFunction = null;
  }
  render() {
    const { classes } = this.props;
    return (
      <div
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundPosition: "center",
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          width: '100 %',
          height: 'auto',
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0
        }}>
          
      <div className={classes.container}>
        <div>
          <PagesHeader />
        </div>
          <br /><br /><br /><br />
        <GridContainer justify="center">
           
          <GridItem xs={12} sm={6} md={4}>
            <form onSubmit={this.handleLogin}>
              <Card login className={classes[this.state.cardAnimaton]}>
                <CardHeader
                  className={`${classes.cardHeader} ${classes.textCenter}`}
                  color="rose"
                >
                  <h2 className={classes.cardTitle}>MIS Messenger</h2>
                  <img src={badge} alt='ucu badge' style={{ width: '100px' }} className={classes.loginlogo} />
          
                </CardHeader>
                <CardBody>
                  
                  <CustomInput
                    success={this.state.loginEmailState === "success"}
                    error={this.state.loginEmailState === "error"}
                    labelText="Email"
                    id="email"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      onChange: event =>
                        this.change(event, "loginEmail", "email"),
                      type: "text"
                    }}
                  />
                  <CustomInput
                    success={this.state.loginPasswordState === "success"}
                    error={this.state.loginPasswordState === "error"}
                    labelText="Password"
                    id="password"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      onChange: event =>
                        this.change(event, "loginPassword", "password"),
                      type: "password"
                    }}
                  />
                </CardBody>
                <CardFooter className={classes.justifyContentCenter}>
                  <Button type="submit" color="rose" simple size="lg" block>
                    Log in
                  </Button>
                </CardFooter>
              </Card>
            </form>
          </GridItem>
        </GridContainer>
      </div>
      </div>
    );
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(loginPageStyle)(Login);
