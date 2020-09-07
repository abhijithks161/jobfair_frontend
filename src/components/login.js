import React, { useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import API from "./APIHelper";
import clsx from "clsx";
import ErrorIcon from "@material-ui/icons/Error";

import Snackbar from "@material-ui/core/Snackbar";

import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

const useStyles = makeStyles(theme => ({
  "@global": {
    body: {
      backgroundColor: theme.palette.common.white
    }
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
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

export default function LogIn({ history }) {
  const classes = useStyles();
  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selected, setSelected] = React.useState(false);
  const [userType, setUserType] = useState("");
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState();

  const Icon = ErrorIcon;

  const handleSubmit = event => {
    event.preventDefault();
    const loginModel = {
      email: userEmail,
      password: password
    };

    API.userLogin(loginModel).then(function(response) {
      if (response.data.status === 0) {
        setMessage("Email or Password Incorrect.");
        setOpen(true);
      } else if (response.data.status === 1) {
        console.log(response.data);
        localStorage.setItem('userID', response.data.data.userId);
        setUserType(response.data.data.userType);
        history.push(`/${response.data.data.userType}/profile`);
        localStorage.setItem('userType', response.data.data.userType);
      }
    });
  };

  return (
    <div className="body-container">
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            onChange={event => {
              setUserEmail(event.target.value);
            }}
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
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

          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>

          <Grid container spacing={3}>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="signup" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
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
    </Container>
    </div>
  );
}
