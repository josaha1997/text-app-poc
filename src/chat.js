import { ChatFeed, Message } from "react-chat-ui";
import React from "react";
import Paper from "material-ui/Paper";
import { MuiThemeProvider } from "material-ui/styles";
import TextBox from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";
import axios from "axios";
//import { connect } from "react-redux";
//import ReactDOM from "react-dom";
class Chat extends React.Component {
  componentDidMount() {
    this.requestHistory();
  }
  constructor(props) {
    super(props);

    this.state = {
      messages: [
        new Message({
          id: "",
          message: ""
        })
      ],
      senderUsername: "8765432190",
      receiverUsername: "9087654321",
      sentMessage: ""
    };
  }
  render() {
    return (
      <div align="center">
        <MuiThemeProvider>
          <Paper elevation={1} style={{ width: 500, height: 600 }}>
            <ChatFeed
              messages={this.state.messages} // Boolean: list of message objects
              isTyping={this.state.is_typing} // Boolean: is the recipient typing
              hasInputField={false} // Boolean: use our input, or use your own
              showSenderName={true} // show the name of the user who sent the message
              bubblesCentered={false} //Boolean should the bubbles be centered in the feed?
              // JSON: Custom bubble styles
              bubbleStyles={{
                text: {
                  color: "black",
                  fontSize: 15,
                  textAlign: "left"
                },

                chatbubble: {
                  borderRadius: 30,
                  padding: 20,
                  maxWidth: 300
                }
              }}
            />
          </Paper>
          <Paper elevation={1} style={{ width: 500, height: 100 }}>
            <TextBox
              align="left"
              style={{ width: 300 }}
              floatingLabelText="Start Typing"
              name="sentMessage"
              value={this.sentMessage}
              onChange={event => this.handleUserInput(event)}
            />
            <RaisedButton
              label="Send"
              primary={true}
              onClick={event => this.handleSendMessage(event)}
            />
          </Paper>
        </MuiThemeProvider>
      </div>
    );
  }

  requestHistory() {
    var apiBaseUrl = "https://canopus-poc2.herokuapp.com/api/loadMessage";
    const messages = this.state.messages.slice();
    var i = 0;
    var payload = {
      senderUsername: this.state.senderUsername,
      receiverUsername: this.state.receiverUsername
    };
    axios.post(apiBaseUrl, payload).then(function(response) {
      response.data.sentMsg.forEach(element => {
        messages[i++] = element.message;
      });
      for (i = 0; i < 5; i++) {
        alert(messages[i]);
      }
    });

    this.setState({ messages: messages[0] });
    alert(this.messages);
  }

  handleUserInput(e) {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value });
  }

  handleSendMessage(event) {
    var apiBaseUrl = "https://canopus-poc2.herokuapp.com/api/";

    var payload = {
      senderUsername: this.state.senderUsername,
      receiverUsername: this.state.receiverUsername,
      message: this.state.sentMessage
    };
    axios.post(apiBaseUrl + "sendMessage", payload).then(function(response) {
      console.log(response);
      if (response.data.status === "true") {
        alert(
          "Message sent" +
            payload.senderUsername +
            payload.message +
            payload.receiverUsername
        );
        //ReactDOM.render(<Chat />, document.getElementById("root"));
      } else {
        alert("Message Not sent");
      }
    });
    this.requestHistory();
    //  axios.post(apiBaseUrl + "loadMessage", payload).then(function(response) {
    //  alert(response.data.status);
    // });
  }
}
export default Chat;
