import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

const Login = () => {
  const history = useHistory();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();

    debugger;
    await axios
      .post("http://localhost:4000/login", {
        username: username,
        password: password,
      })
      .then((req, res) => {
        console.log("res", res);
        history.push("/table");
      })
      .catch((err) => {
        console.log(err, "err");
        setLoginError(err);
      });
  };

  return (
    <div>
      <div class="container">
        <div class="row">
          <div class="span4 offset4 well">
            <legend>Please Sign In</legend>
            {loginError ? (
              <div>
                <span className="alert">
                  <p>Incorrect Username or Password</p>
                </span>
              </div>
            ) : (
              <></>
            )}
            <form method="POST" onSubmit={submitHandler}>
              <input
                type="text"
                onChange={(e) => {
                  e.preventDefault();
                  setUsername(e.target.value);
                }}
                id="username"
                class="span4"
                name="username"
                placeholder="Username"
              />
              <input
                type="password"
                id="password"
                class="span4"
                name="password"
                onChange={(e) => {
                  e.preventDefault();
                  setPassword(e.target.value);
                }}
                placeholder="Password"
              />

              <button
                type="submit"
                name="submit"
                class="btn btn-info btn-block"
              >
                Sign in
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
