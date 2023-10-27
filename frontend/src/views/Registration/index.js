import React, { useState } from "react";
import { Link } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";

import image from "../../assets/tomazo-1.png";

const Registration = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [cellPhoneNumber, setCellPhoneNumber] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [cellPhoneNumberError, setCellPhoneNumberError] = useState("");

  const validateEmail = (email) => {
    return email.includes("@");
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/;
    return passwordRegex.test(password);
  };

  const validateCellPhoneNumber = (phoneNumber) => {
    return /^\d{10}$/.test(phoneNumber);
  };

  const handleBlur = (fieldName) => {
    if (fieldName === "email") {
      setEmailError(validateEmail(email) ? "" : "Invalid email address");
    } else if (fieldName === "password") {
      setPasswordError(
        validatePassword(password) ? "" : "Password does not meet requirements"
      );
    } else if (fieldName === "confirmPassword") {
      if (confirmPassword !== password) {
        setPasswordError("Passwords do not match");
      } else {
        setPasswordError("");
      }
    } else if (fieldName === "cellPhoneNumber") {
      setCellPhoneNumberError(
        validateCellPhoneNumber(cellPhoneNumber) ? "" : "Invalid phone number"
      );
    }
  };

  const handleSignup = async () => {
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);
    const isCellPhoneNumberValid = validateCellPhoneNumber(cellPhoneNumber);

    setEmailError(isEmailValid ? "" : "Invalid email address");
    setPasswordError(
      isPasswordValid ? "" : "Password does not meet requirements"
    );
    setCellPhoneNumberError(
      isCellPhoneNumberValid ? "" : "Invalid phone number"
    );

    if (confirmPassword !== password) {
      setPasswordError("Passwords do not match");
    } else {
      setPasswordError("");
    }

    if (
      isEmailValid &&
      isPasswordValid &&
      isCellPhoneNumberValid &&
      confirmPassword === password
    ) {
      try {
        await createUserWithEmailAndPassword(auth, email, password);
        window.location.href = "/home";
      } catch (error) {
        console.error("Error signing up with email/password:", error);
        alert(error);
      }
    }
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <div
        style={{
          flex: 1,
          backgroundColor: "#ca3433",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img
          src={image}
          alt="Loading..."
          style={{ width: "100%", maxWidth: "100%", height: "auto" }}
        />
      </div>
      <div
        style={{
          flex: 1,
          backgroundColor: "#ffffff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <form>
            <h1
              style={{
                color: "#ca3433",
                fontSize: "24px",
                marginBottom: "20px",
              }}
            >
              SIGNUP
            </h1>
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={() => handleBlur("email")}
              style={{
                padding: "10px",
                border: `2px solid ${emailError ? "red" : "#ca3433"}`,
                borderRadius: "5px",
                outline: "none",
                width: "50%",
                marginBottom: "10px",
              }}
            />
            {emailError && <p style={{ color: "red" }}>{emailError}</p>}
            <input
              type={passwordError ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onBlur={() => handleBlur("password")}
              style={{
                padding: "10px",
                border: `2px solid ${passwordError ? "red" : "#ca3433"}`,
                borderRadius: "5px",
                outline: "none",
                width: "50%",
                marginBottom: "10px",
              }}
            />
            {passwordError && <p style={{ color: "red" }}>{passwordError}</p>}
            <input
              type={passwordError ? "text" : "password"}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              onBlur={() => handleBlur("confirmPassword")}
              style={{
                padding: "10px",
                border: `2px solid ${passwordError ? "red" : "#ca3433"}`,
                borderRadius: "5px",
                outline: "none",
                width: "50%",
                marginBottom: "10px",
              }}
            />
            {passwordError && <p style={{ color: "red" }}>{passwordError}</p>}
            <input
              type="text"
              placeholder="Cell Phone Number"
              value={cellPhoneNumber}
              onChange={(e) => setCellPhoneNumber(e.target.value)}
              onBlur={() => handleBlur("cellPhoneNumber")}
              style={{
                padding: "10px",
                border: `2px solid ${cellPhoneNumberError ? "red" : "#ca3433"}`,
                borderRadius: "5px",
                outline: "none",
                width: "50%",
                marginBottom: "10px",
              }}
            />
            {cellPhoneNumberError && (
              <p style={{ color: "red" }}>{cellPhoneNumberError}</p>
            )}
            <button
              type="button"
              onClick={handleSignup}
              style={{
                padding: "10px 20px",
                background: "#ca3433",
                color: "#ffffff",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                marginTop: "10px",
                width: "50%",
              }}
            >
              Register
            </button>
            <p
              style={{ color: "#ca3433", fontSize: "14px", marginTop: "10px" }}
            >
              Already have an account? <Link to="/login">Login</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Registration;
