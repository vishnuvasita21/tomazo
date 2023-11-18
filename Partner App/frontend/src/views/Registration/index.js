import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth } from "../../firebase";

import image from "../../assets/dine-1.png";

const PartnerRegistration = () => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [owner, setOwner] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [nameError, setNameError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/;
    return passwordRegex.test(password);
  };

  const validatePhoneNumber = (phoneNumber) => {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phoneNumber);
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
    } else if (fieldName === "phone") {
      setPhoneError(
        validatePhoneNumber(phone) ? "" : "Phone number must be 10 digits"
      );
    } else if (fieldName === "name") {
      setNameError(name.trim() !== "" ? "" : "Name cannot be empty");
    }
  };

  const handleSignup = async () => {
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);
    const isPhoneNumberValid = validatePhoneNumber(phone);
    const isNameValid = name.trim() !== "";

    setEmailError(isEmailValid ? "" : "Invalid email address");
    setPasswordError(
      isPasswordValid ? "" : "Password does not meet requirements"
    );
    setPhoneError(isPhoneNumberValid ? "" : "Phone number must be 10 digits");
    setNameError(isNameValid ? "" : "Name cannot be empty");

    if (
      isEmailValid &&
      isPasswordValid &&
      isPhoneNumberValid &&
      isNameValid &&
      confirmPassword === password
    ) {
      try {
        await createUserWithEmailAndPassword(auth, email, password);

        window.location.href = "/partner-home";
      } catch (error) {
        console.error("Error signing up with email/password:", error);
        alert(error);
      }
    }
  };

  const handleGoogleSignup = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log("Google Sign In Successful:", user);
    } catch (error) {
      console.error("Error signing up with Google:", error);
      alert(error);
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
          alt="Restaurant Image"
          style={{ width: "80%", maxWidth: "100%", height: "auto" }}
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
        <div style={{ textAlign: "center", width: "80%" }}>
          <form>
            <h1
              style={{
                color: "#ca3433",
                fontSize: "24px",
                marginBottom: "20px",
              }}
            >
              RESTAURANT SIGNUP
            </h1>
            <input
              type="text"
              placeholder="Restaurant Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onBlur={() => handleBlur("name")}
              style={{
                padding: "10px",
                border: `2px solid ${nameError ? "red" : "#ca3433"}`,
                borderRadius: "5px",
                outline: "none",
                width: "100%",
                marginBottom: "10px",
              }}
            />
            {nameError && <p style={{ color: "red" }}>{nameError}</p>}

            <input
              type="text"
              placeholder="Restaurant Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              onBlur={() => handleBlur("address")}
              style={{
                padding: "10px",
                border: `2px solid ${nameError ? "red" : "#ca3433"}`,
                borderRadius: "5px",
                outline: "none",
                width: "100%",
                marginBottom: "10px",
              }}
            />

            <input
              type="text"
              placeholder="Restaurant Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              onBlur={() => handleBlur("phone")}
              style={{
                padding: "10px",
                border: `2px solid ${nameError ? "red" : "#ca3433"}`,
                borderRadius: "5px",
                outline: "none",
                width: "100%",
                marginBottom: "10px",
              }}
            />
            {phoneError && <p style={{ color: "red" }}>{phoneError}</p>}

            <input
              type="text"
              placeholder="Owner's Name"
              value={owner}
              onChange={(e) => setOwner(e.target.value)}
              onBlur={() => handleBlur("owner")}
              style={{
                padding: "10px",
                border: `2px solid ${nameError ? "red" : "#ca3433"}`,
                borderRadius: "5px",
                outline: "none",
                width: "100%",
                marginBottom: "10px",
              }}
            />

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
                width: "100%",
                marginBottom: "10px",
              }}
            />
            {emailError && <p style={{ color: "red" }}>{emailError}</p>}
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onBlur={() => handleBlur("password")}
              style={{
                padding: "10px",
                border: `2px solid ${passwordError ? "red" : "#ca3433"}`,
                borderRadius: "5px",
                outline: "none",
                width: "100%",
                marginBottom: "10px",
              }}
            />
            {passwordError && <p style={{ color: "red" }}>{passwordError}</p>}
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              onBlur={() => handleBlur("confirmPassword")}
              style={{
                padding: "10px",
                border: `2px solid ${passwordError ? "red" : "#ca3433"}`,
                borderRadius: "5px",
                outline: "none",
                width: "100%",
                marginBottom: "10px",
              }}
            />
            {passwordError && <p style={{ color: "red" }}>{passwordError}</p>}
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
                width: "100%",
              }}
            >
              Register
            </button>
            <button
              type="button"
              onClick={handleGoogleSignup}
              style={{
                padding: "10px 20px",
                background: "#ca3433",
                color: "#ffffff",
                border: "none",
                borderRadius: "5px",
                marginTop: "10px",
                cursor: "pointer",
                width: "100%",
              }}
            >
              Continue with Google
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

export default PartnerRegistration;
