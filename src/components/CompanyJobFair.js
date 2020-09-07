import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import image from "./ImagesandIcons/jobfair.png";
import { Link } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import Pagination from "material-ui-flat-pagination";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import axios from "axios";
import API from "./APIHelper";
import "./employer.css";
import { Button } from "@material-ui/core";
import locationIcon from "../components/ImagesandIcons/location.png";


const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 345
  },
  button: {
    margin: theme.spacing(1)
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  }
}));

export default function CompanyJobFair(props) {
  const employerId = localStorage.getItem("userID");
  const classes = useStyles();
  const theme = createMuiTheme();
  const [myJobFairs, setMyJobFairs] = useState([]);
  const [offSet, setOffSet] = useState(0);
  const [total, setTotal] = useState();

  function handleClick(offset) {
    setOffSet(offset);
    console.log(offset);
  }

  function fetchDetails() {
    var jobFairFetchUrl = "http://10.10.1.203:8080/jobFair/all?page=1&count=9";
    axios
      .get(jobFairFetchUrl)
      .then(function(response) {
        return response.data.data;
      })
      .then(function(jobFairs) {
        setMyJobFairs(jobFairs);
        console.log(jobFairs);
      });

    API.fetchJobFairCount()
      .then(function(response) {
        console.log(response.data.data);
        return response.data.data;
      })
      .then(function(total) {
        setTotal(Math.ceil(total / 9));
        console.log(total);
      });
  }

  useEffect(() => {
    console.log("useEffect");
    fetchDetails();
  }, [offSet]);

  return (
    <div className="body-container">
      {myJobFairs ? (
        <div className="inner" style={{ display: "flex", flexWrap: "wrap" }}>
          {myJobFairs.map(myJobFair => {
            if (
              localStorage.getItem('jobFairEmail') ==
              myJobFair.participatingCompanies[0].email
            ) {
              return (
                <div style={{ margin: "5px", width: "30%" }}>
                  <Card className={classes.card}>
                    <div className="locationDiv">
                      <img className="locationIcon" src={locationIcon} />
                      <CardHeader
                        style={{ paddingLeft: "1px" }}
                        title={myJobFair.location}
                        subheader={new Date(myJobFair.date).toDateString()}
                      />
                    </div>
                    <CardMedia
                      className={classes.media}
                      image={image}
                      title="Job Fair"
                    />
                    <CardContent>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                      >
                        {myJobFair.participatingCompanies[0].name} is organising
                        a job fair at {myJobFair.venue}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                      >
                        on {new Date(myJobFair.date).toDateString()}.
                      </Typography>
                      <Link
                        to={"/employer/add-openings/" + myJobFair.id}
                        style={{ textDecoration: "none" }}
                      >
                        <Button
                          variant="contained"
                          fullWidth
                          color="secondary"
                          className={classes.button}
                        >
                          View
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                </div>
              );
            }
          })}
        </div>
      ) : (
        <p className="jobFairNotFound">You havent created any Jobfairs.</p>
      )}
      <div style={{ textAlign: "center" }}>
        <MuiThemeProvider theme={theme}>
          <CssBaseline />
          <Pagination
            limit={1}
            offset={offSet}
            total={total}
            onClick={(e, offset) => handleClick(offset)}
          />
        </MuiThemeProvider>
      </div>
    </div>
  );
}
