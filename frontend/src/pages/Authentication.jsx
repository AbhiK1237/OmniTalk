import * as React from "react";
import { useState, useContext } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { AuthContext } from "../contexts/AuthContext";
import { Snackbar } from "@mui/material";

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function Authentication() {
  const [Username, setUsername] = useState();
  const [Password, setPassword] = useState();
  const [Name, setName] = useState();
  const [Error, setError] = useState("");
  const [Message, setMessage] = useState();
  const [formState, setFormState] = useState(0);
  const [Open, setOpen] = useState();
  const { handleLogin, handleSignUp } = useContext(AuthContext);
  let handleAuth = async () => {
    try {
      if (formState == 0) {
        let res = await handleLogin(Username, Password);
        console.log(res);
        setMessage(res);
        setName("");
        setUsername("");
        setOpen(true);
        setError("");
        setFormState(0);
        setPassword("");
      }
      if (formState == 1) {
        let res = await handleSignUp(Name, Username, Password);
        console.log(res);
        setMessage(res);
        setName("");
        setUsername("");
        setOpen(true);
        setError("");
        setFormState(0);
        setPassword("");
      }
    } catch (err) {
      console.log(err);
      const msg = err.response?.data?.message || "Something went wrong.";
      setError(msg);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url("/landingPage.jpg")',
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "cover",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <div>
              <Button
                variant={formState == 0 ? "contained" : ""}
                onClick={() => setFormState(0)}
              >
                Sign In
              </Button>
              <Button
                variant={formState == 1 ? "contained" : ""}
                onClick={() => setFormState(1)}
              >
                Sign Up
              </Button>
            </div>
            <Box component="form" noValidate sx={{ mt: 1 }}>
              {formState == 1 ? (
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="username"
                  label="Full Name"
                  name="username"
                  value={Name}
                  autoComplete="username"
                  autoFocus
                  onChange={(e) => setName(e.target.value)}
                />
              ) : (
                <></>
              )}

              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="username"
                name="username"
                value={Username}
                autoComplete="username"
                autoFocus
                onChange={(e) => setUsername(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                value={Password}
                label="Password"
                type="password"
                id="password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <p style={{ color: "red" }}>{Error}</p>
              <Button
                type="button"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={handleAuth}
              >
                {formState == 0 ? "Login" : "Register"}
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
      <Snackbar
        open={Open}
        autoHideDuration={4000}
        message={Message}
        onClose={() => setOpen(false)}
      />
    </ThemeProvider>
  );
}
