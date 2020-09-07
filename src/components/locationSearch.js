import React from "react";
import { TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import SearchIcon from "@material-ui/icons/Search";
import API from "./APIHelper";

import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from "react-places-autocomplete";
import JobsDisplay from "./jobsDisplay";
import JobNotFound from "./jobNotFound";

const useStyles = makeStyles(theme => ({
  fab: {
    margin: theme.spacing(1)
  },
  extendedIcon: {
    marginRight: theme.spacing(1)
  }
}));
export default class LocationSearchInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      address: "",
      Kilometers: 0,
      latLong: {},
      radius: 0,
      jobs: {},
      error:false,
      salaryMin: 0,
      salaryMax:0,
      experience: 0,
      // percentage: 0,
      // course:"",
      model:{}
    };
  }

  handleChange = address => {
    this.setState({ address });
  };

  handleSelect = address => {
    
    geocodeByAddress(address)
      .then(results => {
        this.setState({address :results[0].formatted_address })
        console.log(results[0])
        return getLatLng(results[0])
      })
      .then(latLng => this.setState({ latLong: latLng }))
      .catch(error => console.error("Error", error));
  };
  handleClick = () => {
    this.setState({ model : {location:{
      latitude:this.state.latLong.lat,
      longitude:this.state.latLong.lng,
      radius:this.state.Kilometers*1000},
      salaryMin: this.state.salaryMin,
      salaryMax:this.state.salaryMax,
      experience :this.state.experience
    }

    },()=>{
      console.log(this.state.model)
      API.searchLocation(this.state.model).then(response => {
        if (response.data.data == null) {
          this.setState({error:true});
          console.log(response);
        } else {
          this.setState({ jobs: response.data.data });
          console.log(this.state.jobs);
        }
      });
    });
    // this.setState({radius : this.state.Kilometers}),
    
 
  };
  render() {
    return (
      <PlacesAutocomplete
        onChange={this.handleChange}
        value={this.state.address}
        onSelect={this.handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              <div style={{ flex: "min-content" }}>
                <p>Find Jobs at </p>
              </div>
              <div style={{ flex: "3" }}>
                <TextField
                  style={{padding:"5px"}}
                  autoComplete="location"
                  name="locationSearch"
                  variant="outlined"
                  label="Location"
                  fullWidth
                  id="locationSearch"
                  autoFocus
                  {...getInputProps({
                    placeholder: "Search Places ...",
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
                      ? { backgroundColor: "#ffffff", cursor: "pointer" }
                      : { backgroundColor: "#fafafa", cursor: "pointer" };
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
              <div style={{ flex: "min-content" }}>
                <p style={{ textAlign: "center" }}>Within </p>
              </div>
              <div style={{ flex: "3", marginRight: "15px" }}>
                <TextField
                  id="distance"
                  variant="outlined"
                  style={{padding:"5px"}}
                  fullWidth
                  label="Kilometer"
                  placeholder="Enter radius in Kilometer"
                  onChange={event => {
                    var value = event.target.value;
                    this.setState({ Kilometers: value });
                    console.log(this.state.Kilometers);
                  }}
                />
              </div>
              
            </div>
            <div style={{ display: "flex", flexWrap: "wrap" , marginTop:"20px"}}>
            <div style={{ flex: "2", marginRight: "15px" }}>
                <TextField
                  id="salary"
                  variant="outlined"
                  
                  fullWidth
                  label="Minimum Salary"
                  placeholder="Enter minimum salary"
                  onChange={event => {
                    var value = event.target.value;
                    this.setState({ salaryMin: value });
                    console.log(this.state.salaryMin);
                  }}
                />
              </div>
              <div style={{ flex: "2", marginRight: "15px" }}>
                <TextField
                  id="salary"
                  variant="outlined"
                  
                  fullWidth
                  label="Maximum Salary"
                  placeholder="Enter maximum salary"
                  onChange={event => {
                    var value = event.target.value;
                    this.setState({ salaryMax: value });
                    console.log(this.state.salaryMax);
                  }}
                />
              </div>
              <div style={{ flex: "2", marginRight: "15px" }}>
                <TextField
                  id="experience"
                  variant="outlined"
                  
                  fullWidth
                  label="Experience"
                  placeholder="Minimum Experience."
                  onChange={event => {
                    var value = event.target.value;
                    this.setState({ experience: value });
                    console.log(this.state.experience);
                  }}
                />
              </div>
              {/* <div style={{ flex: "2", marginRight: "15px" }}>
                <TextField
                  id="Course"
                  variant="outlined"
                  
                  fullWidth
                  label="Course"
                  placeholder="Enter course."
                  onChange={event => {
                    var value = event.target.value;
                    this.setState({ course: value });
                    console.log(this.state.course);
                  }}
                />
              </div>
              <div style={{ flex: "2", marginRight: "15px" }}>
                <TextField
                  id="percentage"
                  variant="outlined"
                  required
                  fullWidth
                  label="Percentage"
                  placeholder="Enter Percentage."
                  onChange={event => {
                    var value = event.target.value;
                    this.setState({ percentage: value });
                    console.log(this.state.percentage);
                  }}
                />
              </div> */}

              </div>
            <Fab
                variant="extended"
                aria-label="delete"
                className="fab"
                onClick={this.handleClick}
                style={{margin:"auto" ,marginTop:"20px",display:"block"}}
              >
                <SearchIcon className="extendedIcon" />
                Find jobs
              </Fab>
            {this.state.jobs.length ? (
              <JobsDisplay job={this.state.jobs} />
            ) : (!!this.state.error &&
              <JobNotFound />
            )}
          </div>
        )}
      </PlacesAutocomplete>
    );
  }
}
