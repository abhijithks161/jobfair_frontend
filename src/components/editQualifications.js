import React, { useState, useEffect } from "react";

import { TextField } from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import SaveIcon from "@material-ui/icons/Save";
import CancelIcon from "@material-ui/icons/CancelRounded";
import "./editQualifications.css";
import Button from "@material-ui/core/Button";
import API from "./APIHelper";
import { userId } from "./serverConfigs";
import { red } from "@material-ui/core/colors";
import { Route, Link } from "react-router-dom";

// import UserId from "./serverConfigs";

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1)
  },
  input: {
    display: "none"
  }
}));
export default function EditQualification() {
  const theme = useTheme();
  const classes = useStyles();
  const [course, setCourse] = useState();
  const [institution, setInstitution] = useState();
  const [yearOfPassing, setYearOfPassing] = useState();
 
  const [percentage, setPercentage] = useState();
  const [university, setUniversity] = useState();
  const [branch, setBranch] = useState();
  // const userId = UserId();
  const handleSubmit = event => {
    event.preventDefault();

    const model = {
      id: `${userId}`,
      qualification: {
        course: course,
        institution: institution,
        yearOfPassing: yearOfPassing,
        percentage: percentage,
        board: university,
        branch: branch
      }
    };
    console.log(model);
    API.editQualification(model).then(function(response) {
      console.log(response.data);
      
    });
  };
 
  return (
    <div className="body-container">
      <div>
        <p className="profileName">Add Details</p>
      </div>
      <div className="editQualificationForm">
        <form className={classes.form} onSubmit={handleSubmit}>
          <div className="halfWidthFields">
            <div style={{ flex: "1", margin: "20px" }}>
              <TextField
                id="institution"
                variant="outlined"
                required
                fullWidth
                label="Institution"
                onChange={event => {
                  setInstitution(event.target.value);
                }}
              />
            </div>
            <div style={{ flex: "1", margin: "20px" }}>
              <TextField
                id="university"
                variant="outlined"
                required
                fullWidth
                label="University/Board"
                onChange={event => {
                  setUniversity(event.target.value);
                }}
              />
            </div>
          </div>
          <div className="halfWidthFields">
            <div style={{ flex: "1", margin: "20px" }}>
              <TextField
                id="course"
                variant="outlined"
                required
                fullWidth
                label="Course"
                onChange={event => {
                  setCourse(event.target.value);
                }}
              />
            </div>
            <div style={{ flex: "1", margin: "20px" }}>
              <TextField
                id="branch"
                variant="outlined"
                required
                fullWidth
                label="Branch/Stream"
                onChange={event => {
                  setBranch(event.target.value);
                }}
              />
            </div>
            <div style={{ flex: "1", margin: "20px" }}>
              <TextField
                id="institution"
                variant="outlined"
                required
                fullWidth
                label="Year of Passing"
                onChange={event => {
                  setYearOfPassing(event.target.value);
                }}
              />
            </div>
          </div>
          <div className="halfWidthFields">
            <div style={{ flex: "1", margin: "20px" }}>
              <TextField
                id="percentage"
                variant="outlined"
                required
                fullWidth
                label="Percentage"
                onChange={event => {
                  setPercentage(event.target.value);
                }}
              />
            </div>
            <div style={{ flex: "1", margin: "20px" }}>
              <Link to="/jobseeker/qualifications">
                <Button
                  style={{ float: "right" }}
                  variant="contained"
                  color={theme.palette.error.dark}
                  className={classes.button}
                >
                  Close
                  <CancelIcon />
                </Button>
              </Link>

              <Button
                style={{ float: "right" }}
                type="submit"
                variant="contained"
                color="primary"
                className={classes.button}
              >
                Submit
                <SaveIcon />
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
