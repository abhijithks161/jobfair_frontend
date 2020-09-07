import React, { useState, useEffect } from "react";

import { makeStyles } from "@material-ui/core/styles";

import JobsDisplay from "./jobsDisplay";
import API from "./APIHelper";
import Geocode from "react-geocode";


Geocode.setApiKey("AIzaSyCkTUfrk9wHAlKEzQde-hplipI5XIlebbs");
const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing(3),
    overflowX: "auto"
  },
  table: {
    minWidth: 650
  },
  button: {
    margin: theme.spacing(1)
  },
  error: {
    backgroundColor: theme.palette.error.dark
  },
  icon: {
    fontSize: 20
    // htmlColor: green
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing(1)
  },
  message: {
    display: "flex",
    alignItems: "center"
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

export default function ApplyJobs(props) {
  const [jobFairId, setId] = useState(props.jobFairId);
  // const [email, setEmail] = useState(props.email);
  const classes = useStyles();
  const [jobId, setJobId] = useState();
  const [jobs, setJobs] = useState([]);

  
  async function fetchDetails() {
    API.fetchJobs(jobFairId)
      .then(function(response) {
        console.log(response.data.data);
        return response.data.data;
      })
      .then(function(jobs) {
        const promiseJobs = jobs.map(job=>(
          Geocode.fromLatLng(job.location.latitude.toString(),job.location.longitude.toString()).then(
          response => {
            job.address = response.results[0].formatted_address.toString();
            return job;
          },
          error => {
            console.error(error);
          })));
        Promise.all(promiseJobs)
          .then((response) => {
            setJobs(response);
          });
        
      })
      
  }
  useEffect(() => {
    fetchDetails();
  }, []);

  return (
    <div className="body-container">
      {jobs != null > 0 ? <JobsDisplay job={jobs} />
      :<h1>No Openings Found</h1>}
    </div>
  );
}
