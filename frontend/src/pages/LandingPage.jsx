import React from "react";
import "../App.css";
import { Link, useNavigate } from "react-router-dom";
const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <div className="landingPageContainer">
      <nav>
        <div className="navHeader">
          <h2>Zoom video call</h2>
        </div>
        <div className="navlist">
          <p onClick={() => navigate("/guest")}>Join as guest</p>
          <p onClick={() => navigate("/auth")}>Register</p>
          <div role="button" onClick={() => navigate("/auth")}>
            <p>Login</p>
          </div>
        </div>
      </nav>

      <div className="landingMainContainer">
        <div>
          <h1>
            <span style={{ color: "#FF9839" }}>Connect</span> with your loved
            ones
          </h1>
          <p style={{ marginTop: "0.5rem" }}>
            Cover a distance by Apna Video Call
          </p>
          <div role="button">
            <Link to={"/auth"}>Get Started</Link>
          </div>
        </div>
        <div>
          <img src="/mobile.png" alt="" />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
