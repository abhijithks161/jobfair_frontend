import React, { useState, useEffect } from "react";
import "./userQualifications.css";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import { makeStyles } from "@material-ui/core/styles";
import { Route, Link } from "react-router-dom";
import editQualification from "./editQualifications";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import API from "./APIHelper";

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1)
  },
  root: {
    width: "100%",
    marginTop: theme.spacing(3),
    overflowX: "auto"
  },
  table: {
    minWidth: 650
  }
}));

export default function Qualifications() {
  const classes = useStyles();
  const [qualificationList, setQualificationList] = useState([]);

  async function fetchDetails() {
    API.fetchQualification()
      .then(function(response) {
        console.log(response.data.data);
        return response.data.data;
      })
      .then(function(qualificationList) {
        setQualificationList(qualificationList);
        console.log(qualificationList);
      });
  }

  useEffect(() => {
    fetchDetails();
  }, []);

  return (
    <div>
      <div className="profileName" style={{ display: "flex" }}>
        <p
          className="qualificationHeading"
          style={{ flex: "9", marginTop: "0px" }}
        >
          My Qualifications
        </p>
        <Link to="/jobseeker/qualifications/edit">
          <Button
            id="addButton"
            type="submit"
            variant="contained"
            disabled={false}
            color="primary"
            className={classes.button}
            onClick={event => {
              window.scrollTo(0, 1300);
            }}
          >
            Add
            <AddIcon />
          </Button>
        </Link>
      </div>
      <div className="inner">
        
        { qualificationList == null ?  
       <h1>Add Qualifications</h1>
      : qualificationList.map(qualification => {
        return (
          <div className="qualification">
            <TableRow>
              <TableCell style={{ width: "20%" }} component="th" scope="row">
                <b>Institute</b>
              </TableCell>
              <TableCell style={{ width: "100%" }} align="left">
                {qualification.institution}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">
                <b>University</b>
              </TableCell>
              <TableCell align="left">{qualification.board}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">
                <b>Course</b>
              </TableCell>
              <TableCell align="left">{qualification.course}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">
                <b>Branch</b>
              </TableCell>
              <TableCell align="left">{qualification.branch}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">
                <b>Percentage</b>
              </TableCell>
              <TableCell align="left">{qualification.percentage}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">
                <b>Year of Passing</b>
              </TableCell>
              <TableCell align="left">
                {qualification.yearOfPassing}
              </TableCell>
            </TableRow>
          </div>
        );
      })  }
        
      </div>
      <div style={{ flex: "5" }}>
        <Route path="/jobseeker/qualifications/edit" component={editQualification} />
      </div>
    </div>
  );
}
