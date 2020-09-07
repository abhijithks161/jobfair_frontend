import React, { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import ApplyJobs from "./applyJobs";
import MatchingJobs from "./matchingJobs";
import JobFairDetails from "./jobFairDetails";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      <Box p={3}>{children}</Box>
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper
  }
}));

export default function JobsTab({ match }) {
  const [jobFairId, setId] = useState(match.params.id);
  const [email, setEmail] = useState(match.params.email);
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [state, setState] = useState(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleListJobs = event => {
    console.log(event.target.value);
    setState(!state);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="simple tabs example"
        >
          <Tab label="Companies" {...a11yProps(0)} />
          <Tab label="Jobs" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <JobFairDetails jobFairId={jobFairId} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <FormControlLabel
          control={
            <Switch onChange={handleListJobs} value={!state} color="primary" />
          }
          label="Show Matching Jobs Only"
          labelPlacement="start"
        />

        {!state ? (
          <ApplyJobs jobFairId={jobFairId}/>
        ) : (
          <MatchingJobs jobFairId={jobFairId} />
        )}
      </TabPanel>
    </div>
  );
}
