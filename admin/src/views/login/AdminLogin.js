import React, { useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./AdminLogin.css";

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isValidPassword, setIsValidPassword] = useState(true);
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 6; // Basic password length validation
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validEmail = validateEmail(email);
    setIsValidEmail(validEmail);
    const validPassword = validatePassword(password);
    setIsValidPassword(validPassword);

    if (validEmail && validPassword) {
      if (email !== "admin@gmail.com") {
        console.log("Unauthorized access");
        window.alert("Unauthorized access");
        setEmail("");
        setPassword("");
      } else {
        console.log("Email:", email);
        console.log("Password:", password);
        // Redirect to dashboard
        navigate("/dashboard");
      }
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <Box className="login-box" component="form" onSubmit={handleSubmit}>
        <Typography variant="h5" align="center" gutterBottom>
          Login
        </Typography>
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={!isValidEmail}
          helperText={!isValidEmail && "Enter a valid email"}
        />
        <TextField
          label="Password"
          variant="outlined"
          type="password"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={!isValidPassword}
          helperText={
            !isValidPassword &&
            "Password should be at least 6 characters long"
          }
        />
        <Button variant="contained" color="primary" fullWidth type="submit">
          Login
        </Button>
      </Box>
    </Box>
  );
}

export default AdminLogin;
