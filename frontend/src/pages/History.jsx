import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import HomeIcon from "@mui/icons-material/Home";
import CardContent from "@mui/material/CardContent";

import Typography from "@mui/material/Typography";
import { IconButton } from "@mui/material";

export default function History() {
  const { getHistoryOfUser } = useContext(AuthContext);
  const [meetings, setMeetings] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        let history = await getHistoryOfUser();

        setMeetings(history.meetings);
      } catch (e) {
        console.log(e);
        // IMPLEMENT SNACKBAR
      }
    };
    fetchHistory();
  }, []);

  let formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = date.getMonth().toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <div>
      <IconButton onClick={() => navigate("/home")}>
        <HomeIcon></HomeIcon>
      </IconButton>
      {meetings.length !== 0 ? (
        meetings.map((meeting, index) => {
          return (
            <>
              <Box sx={{ minWidth: 275 }}>
                <Card key={index} variant="outlined">
                  <CardContent>
                    <Typography
                      gutterBottom
                      sx={{ color: "text.secondary", fontSize: 14 }}
                    >
                      Code : {meeting.meetingCode}
                    </Typography>
                    <Typography sx={{ color: "text.secondary", mb: 1.5 }}>
                      Date : {formatDate(meeting.date)}
                    </Typography>
                  </CardContent>
                </Card>
              </Box>
            </>
          );
        })
      ) : (
        <Typography variant="h6" sx={{ textAlign: "center", mt: 3 }}>
          No meetings found
        </Typography>
      )}
    </div>
  );
}
