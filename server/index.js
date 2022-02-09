const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
  user: "sql6471182", //username
  host: "sql6.freesqldatabase.com", //hostname
  password: "aP7T8TVMlK", //password
  database: "sql6471182", //database name
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

app.listen(4000, () => {
  console.log("running server");
});
