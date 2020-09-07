import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";

import { Link } from "react-router-dom";
import API from "./APIHelper";

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
  }
}));

export default function JobFairDetails(props) {
  const [id, setId] = useState(props.jobFairId);
  const [companies, setCompanies] = useState([]);
  const [companyEmail, setCompanyEmail] = useState([]);
  const [descrption, setDescription] = useState([]);
  const classes = useStyles();
  const [jobFair, setJobFair] = useState([]);

  async function fetchDetails() {
    API.fetchJobFair(id)
      .then(function(response) {
        console.log(response.data.data);

        return response.data.data;
      })
      .then(function(jobFair) {
        let emails = jobFair.participatingCompanies.map(pc => pc.email)
        let req = {"emails" : emails}
        console.log("emails", emails)
        API.fetchDescription(req).then(function(response) {
          if (response.data.status === 1){
            console.log("jobFair", jobFair)
           let newPCs =  jobFair.participatingCompanies.map( (pc,idx) =>      
            {
              pc.description=response.data.data[idx];
              return pc
            })

            jobFair.participatingCompanies = newPCs
            setJobFair(jobFair);
            setCompanies(jobFair.participatingCompanies)
            console.log("pcs", newPCs)
          }
          
        });
      })
  }

 
  useEffect(() => {
    fetchDetails();
  }, []);

  return (
    <div>
      <div>
        <p className="profileName">
          {jobFair.location} Job Fair Participating Companies{" "}
        </p>
      </div>

      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow className={classes.table}>
              <TableCell align="justify">Company</TableCell>

              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {companies.map(jobFairCompanies => {
              
              return (
                <TableRow hover key={jobFairCompanies.email}>
                  <TableCell component="th" scope="row">
                    <p style={{fontSize:"15px",fontWeight:"bold"}}>{jobFairCompanies.name}</p>

                    <p>{jobFairCompanies.description}</p>
                  </TableCell>

                  <TableCell align="right">
                    <Link
                      to={
                        "/jobseeker/apply/" + id + "/" + jobFairCompanies.email
                      }
                    >
                      <Button
                        style={{ margin: "0px" }}
                        variant="contained"
                        color="inherit"
                        className={classes.button}
                        // onClick={event => {
                        //   setJobId(job.id);
                        //   handleClick();
                        // }}
                      >
                        View Openings
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Paper>
    </div>
  );
}
