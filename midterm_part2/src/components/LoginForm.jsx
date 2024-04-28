import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import { login_point } from "src/api/api.js";
import { useState } from "react";

function LoginForm() {
  const [formData, setFormData] = useState({
    user: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(login_point, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        console.log("Authentication successful:", data);
        console.log(formData.user);
        localStorage.setItem("token", data.token);
        localStorage.setItem("username", formData.user);
        window.location.href = "/products";
      } else {
        setErrorMessage(data.message);
      }
    } catch (error) {
      console.error("Login error:", error);
      setErrorMessage("An error occurred during login.");
    }
  };

  return (
    <div className="login-layer">
      <label className="font-primary fsize-header font-bold">Login</label>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="user"
          placeholder="Username"
          value={formData.user}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />
        <button type="submit">Login</button>
      </form>
      {errorMessage && (
        <label className="font-primary color-primary fsize-small">
          {errorMessage}
        </label>
      )}
      <label className="mt-1 font-primary fsize-small">
        No Account? <Link to="/register">Click Here!</Link>
      </label>
    </div>
  );
}

export default LoginForm;
