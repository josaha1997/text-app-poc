import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Contact from "./contact";
import Login from "./Login";
import Chat from "./chat";
import Register from "./Register";
import registerServiceWorker from "./registerServiceWorker";

ReactDOM.render(<Contact />, document.getElementById("root"));
registerServiceWorker();
