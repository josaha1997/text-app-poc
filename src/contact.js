import React from "react";
import AppBar from "material-ui/AppBar";
import { MuiThemeProvider } from "material-ui/styles";
import axios from "axios";
//import { connect } from 'react-redux';
//import axios from "axios"

/*const styles = {
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginLeft: -18,
        marginRight: 10,
    },
}*/

class Contact extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: []
    };
  }

  componentDidMount() {
    var self = this;
    var apiBaseUrl =
      "https://canopus-poc2.herokuapp.com/api/get-contact/9876543210";
    const contacts = this.state.data.slice();
    var i = 0;
    axios.get(apiBaseUrl).then(function(response) {
      response.data.contact_list.forEach(element => {
        contacts[i++] = element;
        // alert(element);
      });
      //alert(contacts[0]);
      contacts.forEach(element => {
        // alert(element);
        self.state.data.push(element);
        // self.forceUpdate();
        // alert(self.state.data);
      });
      self.forceUpdate();
    });
    //this.forceUpdate();
    //this.state.data.push(contacts[0]);

    //this.setState((this.state.data = contacts));
  }

  render() {
    if (this.state.data) {
      var i = 0;
      var item = this.state.data.map(function(dynamicData, id) {
        return (
          <ul key={dynamicData.id}>
            <a href={"http://facebook.github.io/react-native/movies.json"}>
              {item}
            </a>
          </ul>
        );
      });
    }
    return (
      <div align="center">
        <MuiThemeProvider>
          <AppBar position="static" title="Contacts" />
          <li>{this.state.data}</li>
          {this.state.data.forEach(element => {
            // console.log("elment : ", element);
            // console.log(this.state.data.length);
            <li>{element}</li>;
          })}
        </MuiThemeProvider>
      </div>
    );
  }
}

export default Contact;
