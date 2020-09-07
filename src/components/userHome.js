import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import image from "./ImagesandIcons/jobfair.png";
import { Link } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import Pagination from "material-ui-flat-pagination";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import locationIcon from "../components/ImagesandIcons/location.png";
import IconButton from "@material-ui/core/IconButton";

import API from "./APIHelper";
const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 345
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  }
}));

export default function UserHome() {
  const classes = useStyles();
  const theme = createMuiTheme();
  const [jobFairs, setJobFairs] = useState([]);
  const [offSet, setOffSet] = useState(0);
  const [limit, setLimit] = useState();
  const [total, setTotal] = useState();

  function handleClick(offset) {
    setOffSet(offset);
    console.log(offset);
  }
  function fetchDetails() {
    API.fetchJobFairs(offSet)
      .then(function(response) {
        console.log(response.data.data);
        return response.data.data;
      })
      .then(function(jobFairs) {
        setJobFairs(jobFairs || []);
        console.log(jobFairs);
      });

    API.fetchJobFairCount()
      .then(function(response) {
        console.log(response.data.data);
        return response.data.data;
      })
      .then(function(total) {
        setTotal(Math.ceil(total / 9));
        console.log(Math.ceil(total / 9));
      });
  }

  useEffect(() => {
    fetchDetails();
  }, [offSet]);
  return (
    <div>
      <div style={{ display: "flex",flexWrap: "wrap" }}>
        {jobFairs ? (
          jobFairs.map(jobFair => {
            return (
              <div style={{ margin: "8px", width: "30%" }} key={jobFair.id}>
                <Card className={classes.card}>
                  <div className="locationDiv">
                    <img className="locationIcon" src={locationIcon} />
                    <CardHeader
                      style={{ paddingLeft: "1px" }}
                      title={jobFair.location}
                      subheader={new Date(jobFair.date).toDateString()}
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
                      {jobFair.participatingCompanies[0].name} is organising a
                      job fair at {jobFair.venue}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      on {new Date(jobFair.date).toDateString()}.
                    </Typography>
                  </CardContent>
                  <CardActions disableSpacing>
                    <Link to={"/jobseeker/jobfair/" + jobFair.id}>
                      <Button size="small" color="primary">
                        Learn More
                      </Button>
                    </Link>
                  </CardActions>
                </Card>
              </div>
            );
          })
        ) : (
          <div>
            <p>No Jobfairs</p>
          </div>
        )}
      </div>
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
