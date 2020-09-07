import React, { useState, useEffect } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import SalaryIcon from "@material-ui/icons/MonetizationOn";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import WorkIcon from "@material-ui/icons/Work";
import API from "./APIHelper";
import Button from '@material-ui/core/Button';
import { Link } from "react-router-dom";
import { func } from "prop-types";


const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing(3)
  },
  table: {
    minWidth: 500
  },
  tableWrapper: {
    overflowX: "auto"
  },
  card: {
    minWidth: 275,
    background: "#ffffff",
    margin: "10px 20px 10px 20px",
    borderRadius: "8px"
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  },
  button: {
    padding: "5px",
    margin: theme.spacing(1),
    color: "#5E0E14"
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
export default function Openings(props) {
  const classes = useStyles();
  const [openings, setOpenings] = useState([]);
  const [jobFairId, setJobFairId] = useState(props.jobFairId);
  const [jobId, setJobId] = useState("");

  function fetchDetails() {
    console.log("jobFairId",jobFairId);
    if (jobFairId != null) {
      API.fetchJoinOpenings(jobFairId).then(function (response) {
        console.log(response.data);
        if(response.data.status === 1){
          setOpenings(response.data.data);
        
        }
      });
    }
  }


  useEffect(() => {
    fetchDetails();
  }, []);

  const deleteJob = (jobId) => {
    console.log(jobFairId);
    console.log(jobId);
    API.deleteOpening(jobFairId, jobId)
      .then(function (response) {
        console.log(response);
      })
  }


  return (
    <div>
      {(openings !== null && openings.length > 0 )? openings.map(opening => {
        return (
          <Card className={classes.card}>
            <CardContent style={{ padding: "10px" }}>
              <Typography variant="h5" component="h2">
                {opening.opening}<br></br>
              </Typography>
              <Typography
                className={classes.pos}
                style={{ display: "flex" }}
                color="textPrimary"
              >
                <SalaryIcon /> {opening.salaryMin}-{opening.salaryMax}
                <LocationOnIcon style={{ marginLeft: "30px" }} /> {opening.city}
                <WorkIcon style={{ marginLeft: "30px" }} /> {opening.experience}
              </Typography>
              <Typography variant="body2" component="p">
                {opening.jobDescription}
              </Typography>
              <Typography variant="body2" component="p">
                Eligibility: Course:{opening.eligibility.course} Branch:{opening.eligibility.branch} CutOff Mark:{opening.eligibility.cutOff}
              </Typography>

              <Link to={"/fetchCandidates/"+ jobFairId +"/"+ opening.id} style={{ textDecoration: 'none' }}>
                <Button variant="contained" className={classes.button} >
                  Applied Candidates
              </Button>
              </Link>

              <Button
                onClick={() => {
                  deleteJob(opening.id);
                }
                }
                variant="contained" className={classes.button}>
                DELETE
              </Button>
            </CardContent>
          </Card>
        );
      })
        :
        <div>
          <h1 style={{margin:"auto"}}>No Openings</h1>
        </div>
      }
    </div>
  );

}
