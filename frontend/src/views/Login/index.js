import image from "../../assets/tomazo-1.png";
import React, { useState } from "react";
import { auth, googleProvider } from "../../firebase";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, username, password);

      navigate("/home");
    } catch (error) {
      console.error("Error logging in with email/password:", error);
      alert("Enter Valid Credentials.");
    }
  };

  const googleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);

      navigate("/home");
    } catch (error) {
      console.error("Error logging in with Google:", error);
      alert("Login Failed.");
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
          style={{ width: "100%", maxwidth: "100%", height: "auto" }}
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
          <form onSubmit={handleSubmit}>
            <h1
              style={{
                color: "#ca3433",
                fontSize: "24px",
                marginBottom: "20px",
                marginLeft: "20px",
              }}
            >
              LOGIN
            </h1>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={{
                padding: "10px",
                border: `2px solid ${username ? "#ca3433" : "#ca3433"}`,
                borderRadius: "5px",
                outline: "none",
                width: "100%",
                marginBottom: "10px",
              }}
            />
            <br />
            <div style={{ position: "relative" }}>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  padding: "10px",
                  border: `2px solid ${password ? "#ca3433" : "#ca3433"}`,
                  borderRadius: "5px",
                  outline: "none",
                  width: "100%",
                  marginBottom: "10px",
                }}
              />
              <span
                style={{
                  position: "absolute",
                  right: "-10px",
                  top: "35%",
                  transform: "translateY(-50%)",
                  cursor: "pointer",
                  fontSize: "20px",
                  color: "#ca3433",
                }}
                onClick={handleTogglePassword}
              >
                {showPassword ? "👁️" : "👁️‍"}
              </span>
            </div>

            <button
              type="submit"
              style={{
                padding: "10px 200px",
                width: "104%",
                background: "#ca3433",
                color: "#ffffff",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Submit
            </button>
            <button
              type="googleSignIn"
              style={{
                padding: "10px 20px",
                width: "104%",
                background: "#ca3433",
                color: "#ffffff",
                border: "none",

                borderRadius: "5px",
                marginTop: "10px",
                cursor: "pointer",
              }}
              onClick={googleSignIn}
            >
              Continue with Google
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
