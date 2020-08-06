import React from "react";
import axios from "axios";
import ReactDOM from "react-dom";
import FormErrors from "./FormErrors";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import AppBar from "material-ui/AppBar";
import RaisedButton from "material-ui/RaisedButton";
import TextField from "material-ui/TextField";
import Register from "./Register";
import Contact from "./contact";
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      formErrors: { username: "", password: "" },
      usernameValid: false,
      passwordValid: false,
      formValid: false
    };
  }

  render() {
    return (
      <div align="center">
        <MuiThemeProvider>
          <div>
            <AppBar position="static" title="Login" align="center" />
            <TextField
              name="username"
              type="integer"
              hintText="Enter your registered mobile no."
              floatingLabelText="Username"
              value={this.state.username}
              onChange={event => this.handleUserInput(event)}
            />
            <br />
            <TextField
              name="password"
              type="password"
              hintText="Enter your Password"
              floatingLabelText="Password"
              value={this.state.password}
              onChange={event => this.handleUserInput(event)}
            />
            <br />
            <br />
            <RaisedButton
              disabled={!this.state.formValid}
              name="login"
              label="Login"
              primary={true}
              //style={style}
              onClick={event => this.handleLogin(event)}
            />
            <br />
            <div>
              <FormErrors formErrors={this.state.formErrors} />
            </div>
            <br />
            Not REGISTERED yet! Register now
            <br />
            <br />
            <RaisedButton
              disabled={this.state.formValid}
              name="register"
              label="Register"
              primary={true}
              //style={style}
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
      default:
        break;
    }
    this.setState(
      {
        formErrors: fieldValidationErrors,
        usernameValid: usernameValid,
        passwordValid: passwordValid
      },
      this.validateForm
    );
  }

  validateForm() {
    this.setState({
      formValid: this.state.usernameValid && this.state.passwordValid
    });
  }

  handleLogin(event) {
    var apiBaseUrl = "https://canopus-poc2.herokuapp.com/api/login";

    var payload = {
      username: this.state.username,
      password: this.state.password
    };

    axios
      .post(apiBaseUrl, payload)
      .then(function(response) {
        console.log(response);
        if (response.status === 200) {
          alert("Login successfull");
          ReactDOM.render(<Contact />, document.getElementById("root"));
        } else if (response.status === 204) {
          console.log("Username password do not match");
          alert("username password do not match");
        } else {
          console.log("Username does not exists");
          alert("Username does not exist");
        }
      })
      .catch(function(error) {
        console.log(apiBaseUrl);
      });
  }
  handleRegister(event) {
    ReactDOM.render(<Register />, document.getElementById("root"));
  }
}

export default Login;
