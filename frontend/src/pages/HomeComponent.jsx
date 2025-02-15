import React from "react";
import withAuth from "../utils/withAuth";
import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import RestoreIcon from "@mui/icons-material/Restore";
import "../App.css";
import { Button, IconButton, TextField } from "@mui/material";
import { AuthContext } from "../contexts/AuthContext";
const HomeComponent = () => {
  let navigate = useNavigate();
  let [meetingCode, setMeetingCode] = useState("");
  const { addToUserHistory } = useContext(AuthContext);
  let handleJoinVideoCall = async () => {
    await addToUserHistory(meetingCode);
    navigate(`/${meetingCode}`);
  };

  return (
    <>
      <div className="navBar">
        <div style={{ display: "flex", alignItems: "center" }}>
          <h2>Zoom vidoe call</h2>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <IconButton
            style={{ color: "black" }}
            onClick={() => navigate("/history")}
          >
            <RestoreIcon />
            &nbsp;<p>History</p>
          </IconButton>
          <Button
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/auth");
            }}
          >
            Logout
          </Button>
        </div>
      </div>
      <div className="meetContainer">
        <div className="left-panel">
          <div>
            <h2>Providing Quality Video Call</h2>
            <br />
            <div style={{ display: "flex", gap: "1rem" }}>
              <TextField
                variant="outlined"
                label="Meeting code"
                onChange={(e) => {
                  setMeetingCode(e.target.value);
                }}
              />
              <Button onClick={handleJoinVideoCall} variant="contained">
                Join
              </Button>
            </div>
          </div>
        </div>
        <div className="right-panel">
          <img src="/videoCall.png" alt="" />
        </div>
      </div>
    </>
  );
};

export default withAuth(HomeComponent);
