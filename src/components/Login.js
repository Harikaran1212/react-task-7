import React, { useState } from "react";
import {  useNavigate } from "react-router-dom";
import "./css/login.css";

export default function Login() {
  const navigate = useNavigate();

  const adminCredentials = {
    username: "admin",
    password: "admin123",
  };

  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  const [Error, setError] = useState({
    username: "",
    password: "",
  });

  const [submitDisable, setSubmitDisable] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  const validateForm = () => {
    let isValid = true;
    const updatedError = {};

    if (!loginData.username.trim()) {
      updatedError.username = "Username is Required";
      isValid = false;
    }

    if (!loginData.password.trim()) {
      updatedError.password = "Password is required";
      isValid = false;
    }
    setError({ ...Error, ...updatedError });
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setSubmitDisable(true);
      // Check if the entered credentials match the admin credentials
      if (
        loginData.username === adminCredentials.username &&
        loginData.password === adminCredentials.password
      ) {
        // Simulate successful login for admin
        setSubmitDisable(false);
        navigate("/admindashboard");
      } else {
        // Invalid credentials
        setSubmitDisable(false);
        setError({
          username: "Invalid username or password",
          password: "Invalid username or password",
        });
      }
    }
  };

  return (
    <div className="login-container ">
      <h2>Admin Login</h2>
      <form onSubmit={handleSubmit} method="POST">
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={loginData.username}
          onChange={handleChange}
          required
        />
        {Error.username && <p className="error">{Error.username}</p>}
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={loginData.password}
          onChange={handleChange}
          required
        />
        {Error.password && <p className="error">{Error.password}</p>}

        <button type="submit" disabled={submitDisable}>
          Login
        </button>
      </form>
    </div>
  );
}