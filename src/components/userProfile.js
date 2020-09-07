import React, { useState, useEffect } from "react";
import { TextField } from "@material-ui/core";
import "./profile.css";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import SaveIcon from "@material-ui/icons/Save";
import EditIcon from "@material-ui/icons/Edit";
import { userId } from "./serverConfigs";
// import UserId from "./serverConfigs";
import API from "./APIHelper";


const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1)
  },
  input: {
    display: "none"
  }
}));

function Profile(props) {
  const classes = useStyles();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [line1, setLine1] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pin, setPin] = useState("");
  const [dob, setDob] = useState();
  const [edit, setEdit] = useState(true);
  // const userId = UserId();
  useEffect(() => {
    setFirstName(props.firstName);
    console.log(firstName);
    setLastName(props.lastName);
    setEmail(props.email);
    setPhoneNumber(props.phoneNumber);
    setLine1(props.line1);
    setCity(props.city);
    setState(props.state);
    setPin(props.pin);
    setDob(props.dob);
  }, [props]);
  const handleSubmit = event => {
    event.preventDefault();


    const model = {
      id: `${userId}`,
      address: {
        addressLine1: line1,
        city: city,
        state: state,
        pin: pin
      },
      dob: dob
    };
    console.log(model);
  
    API.editProfile(model)
    .then(function(response) {
      console.log(response.data);
    });
  };

  return (
    <div>
      <div>
        <p className="profileName">Personal Details</p>
        
      </div>
      <div className="inner">
        <div className="userDetails">
          <div className="permanantDetails">
            <div style={{ flex: "1", margin: "20px" }}>
              <p className="profileLabel">First Name</p>
              <TextField disabled id="firstName" value={firstName} o />
            </div>
            <div style={{ flex: "1", margin: "20px" }}>
              <p className="profileLabel">Last Name</p>
              <TextField disabled id="firstName" value={lastName} />
            </div>
          </div>
          <div className="permanantDetails">
            <div style={{ flex: "1", margin: "20px" }}>
              <p className="profileLabel">Email</p>
              <TextField disabled id="firstName" value={email} />
            </div>
            <div style={{ flex: "1", margin: "20px" }}>
              <p className="profileLabel">Phone Number</p>
              <TextField disabled id="firstName" value={phoneNumber} />
            </div>
          </div>
        </div>
        <form className={classes.form} onSubmit={handleSubmit}>
          <div className="editableDetails">
            <div className="permanantDetails">
              <div style={{ flex: "1", margin: "20px" }}>
                <p className="profileLabel">Address</p>
                <TextField
                  disabled={edit}
                  id="fire"
                  value={line1}
                  onChange={event => {
                    setLine1(event.target.value);
                  }}
                />
              </div>
              <div style={{ flex: "1", margin: "20px" }}>
                <p className="profileLabel">City</p>
                <TextField
                  disabled={edit}
                  id="firstName"
                  value={city}
                  onChange={event => {
                    setCity(event.target.value);
                  }}
                />
              </div>
            </div>
            <div className="permanantDetails">
              <div style={{ flex: "1", margin: "20px" }}>
                <p className="profileLabel">State</p>
                <TextField
                  disabled={edit}
                  id="firstName"
                  value={state}
                  onChange={event => {
                    setState(event.target.value);
                  }}
                />
              </div>
              <div style={{ flex: "1", margin: "20px" }}>
                <p className="profileLabel">PIN</p>
                <TextField
                  disabled={edit}
                  id="firstName"
                  value={pin}
                  onChange={event => {
                    setPin(event.target.value);
                  }}
                />
              </div>
            </div>
            <div className="permanantDetails">
              <div style={{ flex: "1", margin: "20px" }}>
                <p className="profileLabel">Date of Birth</p>
                <TextField
                  disabled={edit}
                  id="date"
                  // label="Birthday"
                  // type="date"
                 value={dob}
                  className={classes.textField}
                  InputLabelProps={{
                    shrink: true
                  }}
                  onChange={event => {
                    setDob(event.target.value);
                  }}
                />
              </div>
              <div className="buttons" style={{ flex: "1", margin: "20px" }}>
                <Button
                  disabled={!edit}
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  onClick={(event, reason) => {
                    if (reason === "clickaway") {
                      return;
                    }
                    setEdit(false);
                  }}
                >
                  Edit
                  <EditIcon />
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  disabled={edit}
                  color="primary"
                  className={classes.button}
                >
                  Submit
                  <SaveIcon />
                </Button>
                
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
export default Profile;
