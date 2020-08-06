const express = require("express");
const app = express();

app.use(express.json());

const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost/poc/poc")
  .then(() => console.log("connected..."))
  .catch(err => console.error("not connected"));

const loginSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  password: { type: String }
});
const Login = mongoose.model("login", loginSchema);
app.post("/api/login", (req, res) => {
  const login = new Login({
    username: req.body.username,
    password: req.body.password
  });

  Login.findOne(login, function(err, log) {
    if (err) {
      console.log(err);
      return res.status(500).send();
    }

    if (!log) {
      return res.status(404).send();
    }

    return res.status(200).send();
  });

  res.send(login);
});
app.get("/test", (req, res) => {
  res.send("Hello");
});
app.listen(3090, () => console.log("listening on port 3000..."));
