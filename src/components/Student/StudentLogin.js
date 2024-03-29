import React, { useState } from "react";
// imports from material UI
import { useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";

// for getting random background images
const defaultTheme = createTheme();

export default function StudentLogin() {
  const [email, setEmail] = useState("");
  const [testKey, setTestKey] = useState(""); // testKey is for store testKey taken from candidate
  const [message, setMessage] = useState(""); //message variable is used for store and show that message in login page
  const navigate = useNavigate();

  // trigger after submit button clicked
  const handleSubmit = (event) => {
    event.preventDefault();

    const key = "AIzaSyAz1z7QqYvovxmnO-lvzoORcMC1UZzXNRE"; // this key was used in apps script for authentication (don't change this key)

    // checks if email or password are empty
    if (email === "" || testKey === "") {
      setMessage("Fill the Required fields");
    } else {
      // fetches all the data from googleSheet with below url
      //this url is generated by the appScript which is provided by googleSheet extension
      // try catch is used for test handling
      try {
        fetch(
          `https://script.google.com/macros/s/AKfycbwMZQgowv_cRQcdYTCzxZ2bFuoJ1BO736bY4mBTxwYxCYfljouz6oeBWKiCQ6Q3KQ_9nw/exec?key=${key}`
        )
          .then((response) => response.json())
          .then((result) => {
            // filter the student based on test key
            const filteredData = result.data.find(
              (item) => item.uniqueId === testKey
            );

            if (filteredData === undefined) {
              setMessage("You don't have access to write this test");
            } else if (filteredData.isCompleted === "incomplete") {
              // if entered id and email and stored id and email was matched then allows to the test
              if (
                filteredData.uniqueId === testKey &&
                filteredData.email === email
              ) {
                setMessage("You can write the Test");
                const testName = filteredData.test;

                const apiKey = "AIzaSyAz1z7QqYvovxmnO-lvzoORcMC1UZzXNRE"; // this key was used in apps script for authentication (don't change this key)

                // it will direct to test path with stateValue of testName
                navigate(`/test/${testName}`, { state: testName });

                // it will update the googleSheet as test completed
                fetch(
                  `https://script.google.com/macros/s/AKfycbyZ1M9Wiq5XVZwik3Pe-HvaLaklv_USkK15l5GLzMjtHXDND9cXzbmNraolbnGlUIS9Ig/exec?key=${apiKey}&uniqueId=${testKey}`
                )
                  .then((response) => console.log(response))
                  .catch((err) => console.log(err));
              } //if test key and mail ID does't match
              else {
                setMessage("Your email end password mismatch");
              }
            }
            //InCase of test expired! which is checking from filteredData of key isCompleted
            else if (filteredData.isCompleted === "test expired") {
              setMessage("Your Test is expired");
            }
            // if email is not matched
            else if (filteredData.email !== email) {
              setMessage("You entered wrong pin or email");
            } // if else is triggered it mean test is already completed
            else {
              setMessage("You already completed the test");
            }
          });
      } catch (err) {
        setMessage("Something went wrong");
      }
    }
  };
  return (
    <div>
      <ThemeProvider theme={defaultTheme}>
        <Grid container component="main" sx={{ height: "100vh" }}>
          <CssBaseline />
          <Grid
            item
            xs={false}
            sm={4}
            md={7}
            // it will fetch random background image
            sx={{
              backgroundImage:
                "url(https://source.unsplash.com/random?wallpapers)",
              backgroundRepeat: "no-repeat",
              backgroundColor: (t) =>
                t.palette.mode === "light"
                  ? t.palette.grey[50]
                  : t.palette.grey[900],
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <Grid
            item
            xs={12}
            sm={8}
            md={5}
            component={Paper}
            elevation={6}
            square
          >
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
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit}
                sx={{ mt: 1 }}
              >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={(event) => setEmail(event.target.value)}
                  autoFocus
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Test Pin"
                  type="text"
                  id="password"
                  onChange={(event) => setTestKey(event.target.value)}
                  autoComplete="current-password"
                />

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Start Test
                </Button>
                {/* displays the error msg */}
                <p className="text-danger">* {message}</p>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </ThemeProvider>
    </div>
  );
}
