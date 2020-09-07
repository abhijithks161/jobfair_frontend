import React, { useState, Profiler,useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import SearchIcon from "@material-ui/icons/Search";
import Fab from "@material-ui/core/Fab";
import API from "./APIHelper";
import Avatar from "@material-ui/core/Avatar";
import Checkbox from "@material-ui/core/Checkbox";

import FormControlLabel from "@material-ui/core/FormControlLabel";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";

import DialogTitle from "@material-ui/core/DialogTitle";

const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1)
  },
  fab: {
    margin: theme.spacing(1)
  },
  extendedIcon: {
    marginRight: theme.spacing(1)
  },
  root: {
    padding: theme.spacing(3, 2)
  },
  bigAvatar: {
    margin: 10,
    width: 160,
    height: 160
  }
}));

export default function FetchCandidate({match}) {
  const [selected, setSelected] = React.useState("");
  const [appeared, setAppeared] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [jobFairId,setJobFairId]= useState(match.params.jobFairId);

  function handleChangeSelect(event) {
    setOpen(true);
    console.log(event.target.value);
  }
  function handleChangeAppeared(event) {
    setAppeared(event.target.value);
    API.appeared(profile.id,jobFairId,jobId);
    console.log(event.target.value);
  }
  const classes = useStyles();
  const [email, setEmail] = useState(match.params.email);
  const [jobId,setJobId] = useState(match.params.id);
  const [profile, setProfile] = useState({});
  const [success, setSuccess] = useState(false);
  // const [model,setModel]=useState({});

  const handleClose = () => {
    setOpen(false);
  };
  const candidateSelected = () => {
    setOpen(false);
    API.selected(profile.id,jobFairId,jobId);
    API.appeared(profile.id,jobFairId,jobId);
  };

  function fetchDetails() {
    API.fetchCandidate(email)
      .then(function(response) {
        console.log(response.data.data);

        return response.data.data;
      })
      .then(function(profile) {
        setProfile(profile);
        setSuccess(true);
      });
  } 
  useEffect(() => {
    fetchDetails();
  }, []);
  return (
    <div>
      {success && (
        <div style={{ display: "flex" }}>
          <Paper>
            <div style={{ flex: "2" }}>
              <Avatar
                alt={profile.firstName}
                src={profile.profilePicURL}
                className={classes.bigAvatar}
              />
              <Typography variant="h5" component="h3">
                {profile.firstName} {profile.lastName}
              </Typography>
              <Typography variant="body">{profile.email}</Typography>
              <Typography variant="body" component="h6">
                {profile.phoneNumber}
              </Typography>
            </div>
          </Paper>
          <div style={{ flex: "5" }}>
            {profile.qualifications ? (profile.qualifications.map(qualification => (
              <Paper className={classes.root}>
                <Typography component="p">
                  {qualification.institution}
                </Typography>
                <Typography component="p">{qualification.course}</Typography>
                <Typography component="p">{qualification.branch}</Typography>
                <Typography component="p">
                  Percentage: {qualification.percentage} ,Year of Passing:{" "}
                  {qualification.yearOfPassing}
                </Typography>
              </Paper>
             ))) : <p>No qualifications found</p>
            }
          </div>
          
              <div style={{ float: "right" }}>
                <FormControlLabel
                  value="appeared"
                  control={
                    <Checkbox
                      onChange={handleChangeAppeared}
                      color="secondary"
                    />
                  }
                  label="Appeared"
                  labelPlacement="start"
                />
                <FormControlLabel
                  value="selected"
                  control={
                    <Checkbox onChange={handleChangeSelect} color="secondary" />
                  }
                  label="Selected"
                  labelPlacement="start"
                />
              </div>
            
        </div>
      )}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Do you want to select this candidate?"}
        </DialogTitle>

        <DialogActions>
          <Button onClick={handleClose} color="primary">
            No
          </Button>
          <Button onClick={candidateSelected} color="primary" autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
