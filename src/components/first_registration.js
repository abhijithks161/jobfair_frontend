import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

import clsx from "clsx";
import ErrorIcon from "@material-ui/icons/Error";

import Snackbar from "@material-ui/core/Snackbar";

import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

import { ToggleButton } from "@material-ui/lab";
import GroupIcon from "@material-ui/icons/Group";
import PersonIcon from "@material-ui/icons/Person";
import API from "./APIHelper";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";

import DialogTitle from "@material-ui/core/DialogTitle";

const useStyles = makeStyles(theme => ({
  "@global": {
    body: {
      backgroundColor: theme.palette.common.white
    }
  },
  paper: {
    marginTop: theme.spacing(5),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(0),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(2)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  error: {
    backgroundColor: theme.palette.error.dark
  },
  icon: {
    fontSize: 20
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing(1)
  },
  message: {
    display: "flex",
    alignItems: "center"
  },
  button: {
    margin: theme.spacing(1)
  },
  leftIcon: {
    marginRight: theme.spacing(1)
  },
  rightIcon: {
    marginLeft: theme.spacing(2)
  },
  iconSmall: {
    fontSize: 20
  }
}));

export default function FirstRegistraion() {
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [mobileNumber, setMobileNumber] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState();
  const [userType, setUserType] = React.useState("jobseeker");
  const [selected, setSelected] = React.useState(false);
  const [openDialog, setOpenDialog] = React.useState(false);
  const handleSubmit = event => {
    event.preventDefault();

    var apiBaseUrl = "http://10.10.1.203:8080/user";
    const model = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      phoneNumber: mobileNumber,
      userType: userType,
      verified: "no"
    };
    if (password === confirmPassword) {
      console.log(model);

      API.signUp(model)
        .then(function(response) {
          console.log(response.data);
          if (response.data.status === 1) {
            console.log("registration successfull");
            setOpenDialog(true);
          } else {
            setOpen(true);
            setMessage("User Exists!");
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    } else {
      setMessage("Passwords Doesn't match!");
      setOpen(true);
      console.log("here!");
    }

    // console.log(event.target.value)
    console.log(model);
  };
  const classes = useStyles();
  const Icon = ErrorIcon;
  const handleClose = () => {
    setOpenDialog(false);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>

        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                onChange={event => {
                  setFirstName(event.target.value);
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                onChange={event => {
                  setLastName(event.target.value);
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                type="email"
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={event => {
                  setEmail(event.target.value);
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={event => {
                  setPassword(event.target.value);
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                id="confirmPassword"
                autoComplete="onfirmPassword"
                onChange={event => {
                  setConfirmPassword(event.target.value);
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="mobileNumber"
                label="Mobile Number"
                name="mobileNumber"
                autoComplete="mobileNumber"
                onChange={event => {
                  setMobileNumber(event.target.value);
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <ToggleButton
                id="jobseekerButton"
                variant="contained"
                color="default"
                selected={!selected}
                onChange={() => {
                  setSelected(!selected);
                  setUserType("jobseeker");
                }}
              >
                Job Seeker
                <PersonIcon className={classes.rightIcon} />
              </ToggleButton>
            </Grid>
            <Grid item xs={12} sm={6}>
              <ToggleButton
                fullwidth="true"
                id="employerButton"
                variant="contained"
                color="default"
                selected={selected}
                onChange={() => {
                  setSelected(!selected);
                  setUserType("employer");
                }}
              >
                Employer
                <GroupIcon className={classes.rightIcon} />
              </ToggleButton>
            </Grid>
          </Grid>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>

          <Snackbar
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left"
            }}
            open={open}
            autoHideDuration={6000}
            onClose={(event, reason) => {
              if (reason === "clickaway") {
                return;
              }
              setOpen(false);
            }}
            ContentProps={{
              "aria-describedby": "message-id",
              classes: {
                root: classes.error
              }
            }}
            message={
              <span id="message-id" className={classes.message}>
                <Icon className={clsx(classes.icon, classes.iconVariant)} />
                {message}
              </span>
            }
            action={[
              <IconButton
                key="close"
                aria-label="close"
                color="inherit"
                className={classes.close}
                onClick={(event, reason) => {
                  if (reason === "clickaway") {
                    return;
                  }
                  setOpen(false);
                }}
              >
                <CloseIcon />
              </IconButton>
            ]}
          />

          <Grid container justify="flex-end">
            <Grid item>
              <Link href="login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
        <Dialog
          open={openDialog}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Please Login to Continue."}
          </DialogTitle>

          <DialogActions>
            <Link to="/login">
              <Button onClick={handleClose} color="primary">
                Login
              </Button>
            </Link>
          </DialogActions>
        </Dialog>
      </div>
    </Container>
  );
}
