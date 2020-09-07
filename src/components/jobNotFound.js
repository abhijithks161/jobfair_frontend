import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import image from "../assets/error.svg"

const useStyles = makeStyles({
  card: {
    maxWidth: "90%",
    margin:"auto",
    marginTop:"20px"
  },
  media: {
    height: 210,
    width: 290,
    margin:"auto",
    marginTop:"20px"
  }
}); 

export default function JobNotFound() {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={image}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="h2"
            style={{ textAlign: "center",color:"rgb(23, 105, 170)" }}
          >
            No Result
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            component="p"
            style={{ textAlign: "center" }}
          >
            Sorry, there are no results for this search, Please try another
            location
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
