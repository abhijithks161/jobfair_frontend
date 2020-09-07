import React, { useState, useEffect } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import API from "./APIHelper";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";


const useStyles = makeStyles(theme => ({
    paper: {
        marginTop: theme.spacing(3),
        width: '100%',
        overflowX: 'auto',
        marginBottom: theme.spacing(2),
      },
      table: {
        minWidth: 650,
      },

}));
export default function Candidate({ match }) {
    const classes = useStyles();
    const [candidates, setCandidates] = useState([]);
    const [jobId, setJobId] = useState(match.params.id);
    const [jobFairId,setJobFairId]=useState(match.params.jobFairId);


    useEffect(() => {
        API.fetchCandidates(jobId)
            .then(function (response) {
                console.log(response.data);
                setCandidates(response.data);
            })

    }, [jobId]);

    return (
        <div className="body-container">
            <Paper className={classes.paper}>
        <Table className={classes.table} size="small">
          <TableHead>
            <TableRow>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone Number</TableCell>
              <TableCell></TableCell>

            </TableRow>
          </TableHead>
          <TableBody>
            {candidates ? candidates.map(candidate => (
              <TableRow key={candidate.name}>
                <TableCell>{candidate.firstName}</TableCell>
                <TableCell>{candidate.lastName}</TableCell>
                <TableCell>{candidate.email}</TableCell>
                <TableCell>{candidate.phoneNumber}</TableCell>
                <TableCell><Link to={"/employer/candidate/"+jobFairId+"/" +jobId +"/"+ candidate.email  }>
                  <Button>
                  View</Button>
                  </Link></TableCell>

              </TableRow>
            ))
            :<p>No Candidates</p>
        }
          </TableBody>
        </Table>
      </Paper>
        </div>
    );
}