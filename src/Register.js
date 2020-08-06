import React, { Component } from "react";
import ReactDOM from "react-dom";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import AppBar from "material-ui/AppBar";
import RaisedButton from "material-ui/RaisedButton";
import TextField from "material-ui/TextField";
import FormErrors from "./FormErrors";
import axios from "axios";
import Login from "./Login";
class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      username: "",
      email: "",
      password: "",
      formErrors: { username: "", password: "", email: "", name: "" },
      usernameValid: false,
      passwordValid: false,
      nameValid: false,
      emailValid: false,
      formValid: false
    };
  }
  render() {
    return (
      <div align="center">
        <MuiThemeProvider>
          <div>
            <AppBar title="Register" />
            <TextField
              name="name"
              value={this.state.name}
              hintText="Enter your  Name"
              floatingLabelText="Name"
              onChange={event => this.handleUserInput(event)}
            />
            <br />
            <TextField
              name="username"
              value={this.state.username}
              type="integer"
              hintText="Enter Your Mobile Number"
              floatingLabelText="Username"
              onChange={event => this.handleUserInput(event)}
            />
            <br />
            <TextField
              name="email"
              value={this.state.email}
              hintText="Enter your Email"
              type="email"
              floatingLabelText="Email"
              onChange={event => this.handleUserInput(event)}
            />
            <br />
            <br />
            <TextField
              name="password"
              value={this.state.password}
              type="password"
              hintText="Enter your Password"
              floatingLabelText="Password"
              onChange={event => this.handleUserInput(event)}
            />
            <div>
              <FormErrors formErrors={this.state.formErrors} />
            </div>
            <br />

            <RaisedButton
              disabled={!this.state.formValid}
              label="Register"
              primary={true}
              style={style}
              onClick={event => this.handleRegister(event)}
            />
          </div>
        </MuiThemeProvider>
      </div>
    );
  }

  handleUserInput(e) {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value }, () => {
      this.validateField(name, value);
    });
  }

  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let usernameValid = this.state.usernameValid;
    let passwordValid = this.state.passwordValid;
    let nameValid = this.state.nameValid;
    let emailValid = this.state.emailValid;

    switch (fieldName) {
      case "username":
        if (value.match(/^[789]\d{9}$/)) {
          usernameValid = true;
          fieldValidationErrors.username = "";
        } else fieldValidationErrors.username = "Invalid!";
        break;
      case "password":
        if (value.length >= 6) {
          passwordValid = true;
          fieldValidationErrors.password = "";
        } else fieldValidationErrors.password = "too short!";
        break;
      case "name":
        if (value.match(/^[A-Za-z]+ [a-zA-Z]+$/)) {
          nameValid = true;
          fieldValidationErrors.name = "";
        } else fieldValidationErrors.name = "Invalid!";
        break;
      case "email":
        if (value.match(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/)) {
          emailValid = true;
          fieldValidationErrors.email = "";
        } else fieldValidationErrors.email = "Invalid!";
        break;
      default:
        break;
    }
    this.setState(
      {
        formErrors: fieldValidationErrors,
        usernameValid: usernameValid,
        passwordValid: passwordValid,
        nameValid: nameValid,
        emailValid: emailValid
      },
      this.validateForm
    );
  }

  validateForm() {
    this.setState({
      formValid:
        this.state.usernameValid &&
        this.state.passwordValid &&
        this.state.nameValid &&
        this.state.emailValid
    });
  }

  handleRegister(event) {
    var apiBaseUrl = "https://canopus-poc2.herokuapp.com/api/registration";

    var payload = {
      username: this.state.username,
      password: this.state.password,
      name: this.state.name,
      email: this.state.email
    };

    axios
      .post(apiBaseUrl, payload)
      .then(function(response) {
        console.log(response);
        if (response.data.status === "true") {
          alert("Registeration successfull");
          ReactDOM.render(<Login />, document.getElementById("root"));
        } else if (response.data.status === "false") {
          console.log("User ALready Exists");
          alert("User Already exists");
        } else {
          console.log("Rejisteration unsuccessful");
          alert("Rejisteration unsuccessful");
        }
      })
      .catch(function(error) {
        console.log(apiBaseUrl);
      });
  }
}
const style = {
  margin: 15
};
export default Register;
