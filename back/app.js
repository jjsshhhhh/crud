const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const session = require("express-session");
const port = 5000;

const sessionOption = require("./config/sessionOption");
const mysqlStore = require("express-mysql-session")(session);
const sessionStore = new mysqlStore(sessionOption);

const authRoutes = require("./routes/auth");
const postRoutes = require("./routes/post");

const app = express();
const corsOptions = {
  origin: true,
  credentials: true,
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(
  session({
    secret: "nodeCRUD2023",
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    cookie: {
      maxAge: 86400000,
    },
  })
);

app.use("/auth", authRoutes);
app.use("/post", postRoutes);

app.listen(port, () => {
  console.log("listening...", port);
});
