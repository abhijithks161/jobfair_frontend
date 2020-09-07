import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import Openings from "./openings";

import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from "react-places-autocomplete";

const useStyles = makeStyles(theme => ({
  fab: {
    margin: "1% 50% 1%"
  }
}));

export default function AddOpen({ match }) {
  const classes = useStyles();
  const [id, setId] = useState(match.params.id);
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState(localStorage.getItem("email"));
  const [name, setName] = useState(localStorage.getItem("companyName"));
  const [open, setOpen] = useState(false);
  const [stateValue, setStateValue] = useState(true);
  const [jobRole, setJobRole] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [eligibleCourse, setEligibleCourse] = useState("");
  const [eligibleBranch, setEligibleBranch] = useState("");
  const [cutOff, setCutOff] = useState(0);
  const [vaccancy, setVaccancy] = useState(0);
  const [salaryMin, setSalaryMin] = useState(0);
  const [salaryMax, setSalaryMax] = useState(0);
  const [experiance, setExperiance] = useState(0);
  const [lat, setLat] = useState(0);
  const [lon, setLon] = useState(0);
  const [latLon, setLatLon] = useState({});
  const [city, setCity] = useState("");

  const handleChange = address => {
    setAddress(address);
  };

  const handleSelect = address => {
    geocodeByAddress(address)
      .then(results => {
        console.log(results[0]);
        setAddress(results[0].formatted_address);
        return getLatLng(results[0]);
      })
      .then(latLng => setLatLon(latLng))
      .catch(error => console.error("Error", error));
  };

  const handleSubmit = event => {
    event.preventDefault();

    var addOpeningsUrl = "http://10.10.1.203:8080/employer/add-openings";
    const openingModel = {
      jobFairId: id,
      email: email,
      name: name,
      opening: jobRole,
      salaryMin: salaryMin,
      salaryMax: salaryMax,
      city: city,
      jobDescription: jobDescription,
      eligibility: {
        course: eligibleCourse,
        branch: eligibleBranch,
        cutOff: cutOff
      },
      vacancy: vaccancy,
      experience: experiance,
      location: {
        latitude: latLon.lat,
        longitude: latLon.lng
      }
    };

    console.log(openingModel);
    axios.post(addOpeningsUrl, openingModel).then(function(response) {
      console.log(response.data);
    });
    setStateValue(true);
    setOpen(false);
  };

  function handleClickOpen() {
    setOpen(true);
    setStateValue(false);
  }

  function handleClose() {
    setOpen(false);
    // setStateValue(false);
  }

  return (
    <div className="body-container">
      
        <div>
          <Openings jobFairId={id} />
        </div>
      

      <Fab
        color="primary"
        aria-label="add"
        className={classes.fab}
        onClick={handleClickOpen}
      >
        <AddIcon />
      </Fab>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Add Your Openings</DialogTitle>
        <DialogContent>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            value={jobRole}
            onChange={event => {
              setJobRole(event.target.value);
            }}
            id="job-role"
            label="Job Role"
            name="gob-role"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            value={jobDescription}
            onChange={event => {
              setJobDescription(event.target.value);
            }}
            name="Job-description"
            label="job Description"
            type="text"
            id="Job-description"
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            value={experiance}
            onChange={event => {
              setExperiance(event.target.value);
            }}
            name="experiance"
            label="Experience"
            type="number"
            id="experiance"
          />

          <Grid>
            <div>
              <PlacesAutocomplete
                onChange={handleChange}
                value={address}
                onSelect={handleSelect}
              >
                {({
                  getInputProps,
                  suggestions,
                  getSuggestionItemProps,
                  loading
                }) => (
                  <div>
                    <TextField
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      name="JobCity"
                      label="Location"
                      type="text"
                      id="JobCity"
                      autoFocus
                      {...getInputProps({
                        placeholder: "Office Location",
                        className: "location-search-input"
                      })}
                    />
                    <div
                      className="autocomplete-dropdown-container"
                      style={{ width: "inherit" }}
                    >
                      {loading && <div>Loading...</div>}
                      {suggestions.map(suggestion => {
                        const className = suggestion.active
                          ? "suggestion-item--active"
                          : "suggestion-item";
                        // inline style for demonstration purpose
                        const style = suggestion.active
                          ? {
                              backgroundColor: "#ffffff",
                              cursor: "pointer"
                            }
                          : {
                              backgroundColor: "#fafafa",
                              cursor: "pointer"
                            };
                        return (
                          <div
                            {...getSuggestionItemProps(suggestion, {
                              className,
                              style
                            })}
                          >
                            <span>{suggestion.description}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </PlacesAutocomplete>
            </div>
          </Grid>

          <TextField
            name="city"
            margin="normal"
            variant="outlined"
            required
            fullWidth
            value={city}
            onChange={event => {
              setCity(event.target.value);
            }}
            id="city"
            label="City"
          />
          <TextField
            name="course"
            margin="normal"
            variant="outlined"
            required
            fullWidth
            value={eligibleCourse}
            onChange={event => {
              setEligibleCourse(event.target.value);
            }}
            id="course"
            label="Eligible Course"
          />

          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="branch"
            value={eligibleBranch}
            onChange={event => {
              setEligibleBranch(event.target.value);
            }}
            label="Eligible Branch"
            name="branch"
          />
          <TextField
            name="cutOff"
            margin="normal"
            variant="outlined"
            required
            fullWidth
            id="cutOff"
            value={cutOff}
            onChange={event => {
              setCutOff(event.target.value);
            }}
            label="Cut Off Mark"
            type="number"
          />

          <TextField
            name="Min-salary"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            value={salaryMin}
            onChange={event => {
              setSalaryMin(event.target.value);
            }}
            id="MinimumSalary"
            label="Minimum Salary"
            type="number"
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="branch"
            value={salaryMax}
            onChange={event => {
              setSalaryMax(event.target.value);
            }}
            label="Maximum Salary"
            name="Max-salary"
            type="number"
          />

          <TextField
            name="vaccancy"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="vaccancy"
            value={vaccancy}
            onChange={event => {
              setVaccancy(event.target.value);
            }}
            label="Vaccancies"
            type="number"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
