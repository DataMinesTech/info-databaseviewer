const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
const path = require("path");
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
  user: process.env.user, //username
  host: process.env.host, //hostname
  password: process.env.password, //password
  database: process.env.database, //database name
  port: 3306, // port if available
});

app.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  db.query(
    "SELECT * FROM users WHERE username = ? AND password = ?",
    [username, password],
    (err, result) => {
      if (err) {
        console.log("err", err);
      }

      if (result.length > 0) {
        res.status(200).json({ message: "login successful", success: true });

        console.log("all done");
      } else {
        res.status(401).json({
          message: "Wrong username or password credentials",
          success: false,
        });
      }
    }
  );
});

app.get("/orders", (req, res) => {
  db.query("SELECT * FROM orders ORDER BY orderid ASC", (err, result) => {
    if (err) {
      console.log("err", err);
    }

    if (result) {
      // res.status(200).json({ message: "login successful", success: true });

      const orderTable = result;

      console.log("result", result);
      res
        .status(200)
        .json({ message: "Query Submitted", success: true, orderTable });
    } else {
      res.status(500).json({ message: "Error in query" });
    }
  });
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join("client/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(
    `running ${process.env.NODE_ENV} build on server on port ${PORT}`
  );
});
