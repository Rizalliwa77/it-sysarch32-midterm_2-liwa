import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { register_point } from "../api/api";

function RegisterForm() {
  const [formData, setFormData] = useState({
    email: "",
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
      const response = await fetch(register_point, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        console.log("Registered successful:", data);
        navigate("/login");
      } else {
        setErrorMessage(data.message);
      }
    } catch (error) {
      console.error("Registration error:", error);
    }
  };

  return (
    <div className="login-layer">
      <label className="font-primary fsize-header font-bold">Register</label>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="text"
          name="user"
          placeholder="User"
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
        <button type="submit">Register</button>
      </form>
      {errorMessage && (
        <label className="font-primary color-primary fsize-small">
          {errorMessage}
        </label>
      )}
      <label className="mt-1 font-primary fsize-small">
        Already Have An Account? <Link to="/login">Click Here!</Link>
      </label>
    </div>
  );
}

export default RegisterForm;

