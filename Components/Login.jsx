import React, { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthService } from "./Auth/AuthService";

const API_URL = "http://localhost:7000/users";

// Login form functional component
const Login = ({ setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Function for preventing usage of spacebar in email field
  const preventSpacebar = () => {
    if (event.code === "Space") {
      event.preventDefault();
    }
  };

  // Handle Submit for Login form
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Email Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      toast.error("Email is required");
      return;
    }
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    // Password Validation
    if (!password) {
      toast.error("Password is required");
      return;
    }

    // Code for obtaining login credentials and verifying them for authorization and authentication
    try {
      const response = await axios.get(`${API_URL}?email=${email}`);
      if (response.data[0].role === "admin") {
        const user = response.data[0];
        if (email === user.email && password === user.password) {
          AuthService.login(user);
          setUser(user);
          toast.success("Login successful.");
          navigate("/movies");
        } else {
          setError("Invalid password.");
        }
      } else {
        setError("Invalid email address.");
      }
    } catch (error) {
      console.error(`Error logging in: ${error}`);
      setError("Error logging in. Please try again later. ");
    }
  };
  return (
    <Container className="d-flex flex-column align-items-center justify-content-center">
      <Form onSubmit={handleSubmit} style={{ width: "300px" }} className="form">
        <h2 className="mb-4">Login</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            onKeyDown={preventSpacebar}
            required
          />
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </Form.Group>
        <div className="d-flex align-items-center justify-content-center">
          <Button variant="primary" type="submit">
            Login
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default Login;
