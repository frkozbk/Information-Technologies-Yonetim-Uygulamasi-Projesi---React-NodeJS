const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const cors = require("cors");

const user = require("./routes/api/user");
const customer = require("./routes/api/customer");
const admin = require("./routes/api/admin");
const app = express();
console.clear();
app.use(passport.initialize());
require("./config/passport")(passport);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors({ credentials: true, origin: ["http://localhost:3000"] }));
const db = require("./config/keys").mongoURI;
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

app.use("/api/user", user);
app.use("/api/customer", customer);
app.use("/api/admin", admin);

const port = 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
