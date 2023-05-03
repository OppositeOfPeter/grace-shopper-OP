import React, { useState } from "react";
import { attemptLogin } from "../store";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import CreateAccount from "./CreateAccount";

const Login = () => {
  const dispatch = useDispatch();
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const onChange = (ev) => {
    setCredentials({ ...credentials, [ev.target.name]: ev.target.value });
  };

  const login = (ev) => {
    ev.preventDefault();
    dispatch(attemptLogin(credentials));
  };
  
  return (
    <div>
      <div>
      <h2>L<span class="orange-text">o</span>gin</h2>
      <form onSubmit={login}>
        <input
          placeholder="username"
          value={credentials.username}
          name="username"
          onChange={onChange}
        />
        <input
          type="password"
          placeholder="password"
          name="password"
          value={credentials.password}
          onChange={onChange}
        />
        <button>Login</button>
      </form>
      </div>
      <div>
        <CreateAccount />
      </div>
    </div>
  );
};

export default Login;
