import React from "react";
import PropTypes from "prop-types";

// // @material-ui/icons
import withStyles from "@material-ui/core/styles/withStyles"; 

import { signup, checkUsernameAvailability, checkEmailAvailability } from '../util/APIUtils';

// core components
import GridContainer from "../components/Grid/GridContainer.jsx";
import GridItem from "../components/Grid/GridItem.jsx";
import Button from "../components/CustomButtons/Button.jsx";
import CustomInput from "../components/CustomInput/CustomInput.jsx";
import Card from "../components/Card/Card.jsx";
import CardHeader from "../components/Card/CardHeader.jsx";
import CardBody from "../components/Card/CardBody.jsx";

import CardFooter from "../components/Card/CardFooter.jsx";
import badge from "../assets/img/ucu_badge.png";
import bgImage from "../assets/img/bg-pricing.jpeg";

import loginPageStyle from "../assets/jss/material-dashboard-pro-react/views/loginPageStyle";

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      registerName:"",
      registerNameState: "",
      registerUsername: "",
      registerUsernameState: "",
      registerEmail: "",
      registerEmailState: "",
      registerPassword: "",
      registerPasswordState: "",
      registerConfirmPassword: "",
      registerConfirmPasswordState: "",
      registerCheckbox: false,
      registerCheckboxState: "",
      // type validation
      required: "",
      requiredState: "",
      typeEmail: "",
      typeEmailState: "",
      number: "",
      numberState: "",
      equalTo: "",
      whichEqualTo: "",
      equalToState: ""
    }
    this.registerClick = this.registerClick.bind(this);
    this.loginClick = this.loginClick.bind(this);
    this.typeClick = this.typeClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.validateUsernameAvailability = this.validateUsernameAvailability.bind(this);
    this.validateEmailAvailability = this.validateEmailAvailability.bind(this);
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
  // function that verifies if two strings are equal
  compare(string1, string2) {
    if (string1 === string2) {
      return true;
    }
    return false;
  }
  change(event, stateName, type, stateNameEqualTo, maxValue) {
    switch (type) {
      case "name":
        if (this.verifyLength(event.target.value, 4)) {
          this.setState({ [stateName + "State"]: "success" });
        } else {
          this.setState({ [stateName + "State"]: "error" });
        }
        break;
      case "username":
        if (this.verifyLength(event.target.value, 3)) {
          this.setState({ [stateName + "State"]: "success" });
        } else {
          this.setState({ [stateName + "State"]: "error" });
        }
        break;

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
      case "equalTo":
        if (this.compare(event.target.value, this.state[stateNameEqualTo])) {
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
      case "number":
        if (this.verifyNumber(event.target.value)) {
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
      case "url":
        if (this.verifyUrl(event.target.value)) {
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
  registerClick() {
    if (this.state.registerEmailState === "") {
      this.setState({ registerEmailState: "error" });
    }
    if (this.state.registerPasswordState === "") {
      this.setState({ registerPasswordState: "error" });
    }
    if (this.state.registerConfirmPasswordState === "") {
      this.setState({ registerConfirmPasswordState: "error" });
    }
    if (this.state.registerCheckboxState === "") {
      this.setState({ registerCheckboxState: "error" });
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
    if (this.state.urlState === "") {
      this.setState({ urlState: "error" });
    }
    if (this.state.equalToState === "") {
      this.setState({ equalToState: "error" });
    }
  }
  rangeClick() {
    if (this.state.minLengthState === "") {
      this.setState({ minLengthState: "error" });
    }
    if (this.state.maxLengthState === "") {
      this.setState({ maxLengthState: "error" });
    }
    if (this.state.rangeState === "") {
      this.setState({ rangeState: "error" });
    }
    if (this.state.minValueState === "") {
      this.setState({ minValueState: "error" });
    }
    if (this.state.maxValueState === "") {
      this.setState({ maxValueState: "error" });
    }
  }

  handleSubmit(event) {
    event.preventDefault();

    const signupRequest = {
      name: this.state.registerName,
      username: this.state.registerUsername,
      email: this.state.registerEmail,
      password: this.state.registerPassword
    };
    console.log(signupRequest);
    signup(signupRequest)
      .then(response => {
        this.props.history.push("/login");
        alert("Thank you! You're successfully registered. Please Login to continue!");
      }).catch(error => {
        alert(error.message || 'Sorry! Something went wrong. Please try again!');
      });
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
          bottom:0
        }}>
      <div className={classes.container}>
        <GridContainer justify="center">
          <GridItem xs={12} sm={6} md={4}>
            <form onSubmit={this.handleSubmit}>
              <Card login className={classes[this.state.cardAnimaton]}>
                <CardHeader className={`${classes.cardHeader} ${classes.textCenter}`}
                  color="rose"
                >
                  <h2 className={classes.cardTitle} style={{ marginBottom: '5px' }} >MIS Messenger</h2>
                  <img src={badge} alt='ucu badge' style={{ width: '100px' }} className={classes.loginlogo} />
                </CardHeader>
              <CardBody>
                    <CustomInput
                      success={this.state.registerNameState === "success"}
                      error={this.state.registerNameState === "error"}
                      labelText="Full Name *"
                      id="registername"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        onChange: event =>
                          this.change(event, "registerName", "name"),
                        type: "text"
                      }}
                    />
                    <CustomInput
                      success={this.state.registerUsernameState === "success"}
                      error={this.state.registerUsernameState === "error"}
                      labelText="Username *"
                      id="registerusername"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        onChange: event =>
                          this.change(event, "registerUsername", "username"),
                        onBlur: event => this.validateUsernameAvailability(),
                        type: "text"
                      }}
                    />
                    <CustomInput
                    success={this.state.registerEmailState === "success"}
                    error={this.state.registerEmailState === "error"}
                    labelText="Email Address *"
                        formControlProps={{
                          fullWidth: true,
                          className: classes.customFormControlClasses
                        }}
                    inputProps={{
                      onChange: event =>
                        this.change(event, "registerEmail", "email"),
                      onBlur: event => this.validateEmailAvailability(),
                      type: "email"
                    }}
                    />
                    <CustomInput
                      success={this.state.registerPasswordState === "success"}
                      error={this.state.registerPasswordState === "error"}
                      labelText="Password *"
                      id="registerpassword"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        onChange: event =>
                          this.change(event, "registerPassword", "password"),
                        type: "password"
                      }}
                    />
                    <CustomInput
                      success={
                        this.state.registerConfirmPasswordState === "success"
                      }
                      error={this.state.registerConfirmPasswordState === "error"}
                      labelText="Confirm Password *"
                      id="registerconfirmpassword"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        onChange: event =>
                          this.change(
                            event,
                            "registerConfirmPassword",
                            "equalTo",
                            "registerPassword"
                          ),
                        type: "password"
                      }}
                    />
                  <div className={classes.formCategory}>
                    <small>*</small> Required fields
                </div>
                    <CardFooter className={classes.justifyContentCenter}>
                      <Button 
                      type='submit' 
                      color="rose" 
                      simple size="lg" 
                      block
                      onClick={this.registerClick}
                      >
                        Register
                  </Button>
                    </CardFooter>
              </CardBody>
              </Card>
            </form>
          </GridItem>
        </GridContainer>
      </div>
     </div>
    );
  }

  validateUsernameAvailability() {
    // First check for client side errors in username
    const usernameValue = this.state.registerUsername;
    const usernameValidation = this.verifyLength(usernameValue);

    if (usernameValidation.registerUsernameState === 'error') {
      this.setState({
        username: {
          registerUsername: usernameValue,
          ...usernameValidation
        }
      });
      return;
    }

    this.setState({
      username: {
        registerUsername: usernameValue,
        registerUsernameState: 'validating',
        errorMsg: null
      }
    });

    checkUsernameAvailability(usernameValue)
      .then(response => {
        if (response.available) {
          this.setState({
            username: {
              registerUsername: usernameValue,
              registerUsernameState: 'success',
              errorMsg: null
            }
          });
        } else {
          this.setState({
              registerUsername: usernameValue,
              registerUsernameState: 'error',
              errorMsg: 'This username is already taken'
          });
          alert("This Username is already taken!");
        }
      }).catch(error => {
        // Marking validateStatus as success, Form will be recchecked at server
        this.setState({
            registerUsername: usernameValue,
            registerUsernameState: 'success',
            errorMsg: null
        });
      });
  }

  validateEmailAvailability() {
    // First check for client side errors in email
    const emailValue = this.state.registerEmail;
    const emailValidation = this.verifyEmail(emailValue);

    if (emailValidation.registerEmailState === 'error') {
      this.setState({
        email: {
          registerEmail: emailValue,
          ...emailValidation
        }
      });
      return;
    }

    this.setState({
      email: {
        registerEmail: emailValue,
        registerEmailState: 'validating',
        errorMsg: null
      }
    });

    checkEmailAvailability(emailValue)
      .then(response => {
        if (response.available) {
          this.setState({
              registerEmail: emailValue,
              registerEmailState: 'success',
              errorMsg: null
          });
        } else {
          this.setState({
              registerEmail: emailValue,
              registerEmailState: 'error',
              errorMsg: 'This Email is already registered'
          });
          alert("This Email is already registered");
        }
      }).catch(error => {
        // Marking validateStatus as success, Form will be recchecked at server
        this.setState({
          email: {
            registerEmail: emailValue,
            registerEmailState: 'success',
            errorMsg: null
          }
        });
      });
  }

}

Signup.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(loginPageStyle)(Signup);
