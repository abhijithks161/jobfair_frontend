import React, { useState, useEffect } from "react";
import { TextField } from "@material-ui/core";
import "./profile.css";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import SaveIcon from "@material-ui/icons/Save";
import EditIcon from "@material-ui/icons/Edit";
import axios from 'axios';

const useStyles = makeStyles(theme => ({
    button: {
        margin: theme.spacing(1)
    },
    input: {
        display: "none"
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: "100%"
    },
}));

export default function EmployerProfile(props) {
    const classes = useStyles();
    const employerId = localStorage.getItem('userID');
    const [companyName, setCompanyName] = useState("");
    const [comapnyEmail, setCompanyEmail] = useState("");
    const [companyPhoneNumber, setCompanyPhoneNumber] = useState("");
    const [companyUrl, setCompanyUrl] = useState("");
    const [companyCID, setCompanyCID] = useState("");
    const [companyYoe, setCompanyYoe] = useState("");
    const [noOfEmployees, setNoOfEmployees] = useState("");
    const [line1, setLine1] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [pin, setPin] = useState("");
    const [edit, setEdit] = useState(true);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [designation, setDesignation] = useState("");
    const [description, setDescription] = useState("");

    useEffect(() => {
        setCompanyName(props.companyName);
        setCompanyEmail(props.companyEmail);
        setCompanyPhoneNumber(props.companyPhoneNumber);
        setCompanyUrl(props.companyUrl);
        setCompanyCID(props.companyCID);
        setCompanyYoe(props.yearOfEstablishment);
        setNoOfEmployees(props.noOfEmployees);
        setLine1(props.line1);
        setCity(props.city);
        setState(props.state);
        setPin(props.pin);
        setFirstName(props.firstName);
        setLastName(props.lastName);
        setEmail(props.email);
        setPhoneNumber(props.phoneNumber);
        setDesignation(props.designation);
        setDescription(props.description);
    }, [props]);

    const handleSubmit = event => {
        event.preventDefault();

        var apiBaseUrl = "http://10.10.1.203:8080/employer/edit";
        const employerModel = {
            "id": `${employerId}`,
            "companyName": companyName,
            "companyEmail": comapnyEmail,
            "companyPhoneNumber": companyPhoneNumber,
            "websiteUrl": companyUrl,
            "corporateIdentificationNumber": companyCID,
            "yearOfEstablishment": companyYoe,
            "noOfEmployees": noOfEmployees,
            "address": {
                "addressLine1": line1,
                "city": city,
                "state": state,
                "pin": pin
            },
            "designation": designation,
            "description": description
        };

        axios
            .patch(apiBaseUrl, employerModel)
            .then(function (response) {
                console.log(response.data);
            })
        setEdit(true);
    };

    return (
        <div>
            <div className="profileName">
                <h3>Company Details</h3>
            </div>

            <div className="inner">
                <form onSubmit={handleSubmit}>

                    <div className="permanantDetails">
                        <div style={{ flex: "1", margin: "20px" }}>
                            <p className="profileLabel">Company Name</p>
                            <TextField disabled={edit} id="companyName" value={companyName} onChange={event => {
                                setCompanyName(event.target.value);
                            }} />
                        </div>
                        <div style={{ flex: "1", margin: "20px" }}>
                            <p className="profileLabel">Company Email</p>
                            <TextField disabled={edit} id="companyEmail" value={comapnyEmail} onChange={event => {
                                setCompanyEmail(event.target.value);
                            }} />
                        </div>
                    </div>

                    <div className="permanantDetails">
                        <div style={{ flex: "1", margin: "20px" }}>
                            <p className="profileLabel">Company  phone  Number</p>
                            <TextField disabled={edit} id="company phoneNO" value={companyPhoneNumber} onChange={event => {
                                setCompanyPhoneNumber(event.target.value);
                            }} />
                        </div>
                        <div style={{ flex: "1", margin: "20px" }}>
                            <p className="profileLabel">Website URL</p>
                            <TextField disabled={edit} id="websiteURl" value={companyUrl} onChange={event => {
                                setCompanyUrl(event.target.value);
                            }} />
                        </div>
                    </div>

                    <div className="permanantDetails">
                        <div style={{ flex: "1", margin: "20px" }}>
                            <p className="profileLabel">Company Identification Number</p>
                            <TextField disabled={edit} id="company phoneNO" value={companyCID} onChange={event => {
                                setCompanyCID(event.target.value);
                            }} />
                        </div>
                        <div style={{ flex: "1", margin: "20px" }}>
                            <p className="profileLabel">Year of Establishment</p>
                            <TextField disabled={edit} id="websiteURl" value={companyYoe} onChange={event => {
                                setCompanyYoe(event.target.value);
                            }} />
                        </div>
                    </div>

                    <div className="permanantDetails">
                        <div style={{ flex: "1", margin: "20px" }}>
                            <p className="profileLabel">Number of Employees</p>
                            <TextField disabled={edit} id="noOfEmployees" value={noOfEmployees} onChange={event => {
                                setNoOfEmployees(event.target.value);
                            }} />
                        </div>
                    </div>

                    <div className="permanantDetails">
                        <div style={{ flex: "1", margin: "20px" }}>
                            <p className="profileLabel">Address</p>
                            <TextField disabled={edit} id="addressline1" value={line1} onChange={event => {
                                setLine1(event.target.value);
                            }} />
                        </div>
                        <div style={{ flex: "1", margin: "20px" }}>
                            <p className="profileLabel">City</p>
                            <TextField disabled={edit} id="addressCity" value={city} onChange={event => {
                                setCity(event.target.value);
                            }} />
                        </div>
                    </div>

                    <div className="permanantDetails">
                        <div style={{ flex: "1", margin: "20px" }}>
                            <p className="profileLabel">State</p>
                            <TextField disabled={edit} id="addressState" value={state} onChange={event => {
                                setState(event.target.value);
                            }} />
                        </div>
                        <div style={{ flex: "1", margin: "20px" }}>
                            <p className="profileLabel">PIN</p>
                            <TextField disabled={edit} id="PINnumber" value={pin} onChange={event => {
                                setPin(event.target.value);
                            }} />
                        </div>
                    </div>
                    <div className="permanantDetails">
                        <TextField
                            disabled={edit}
                            id="standard-multiline-static"
                            label="Company Description"
                            multiline
                            rows="4"
                            className={classes.textField}
                            margin="normal"
                            value={description}
                            onChange={event => {
                                setDescription(event.target.value);
                            }}

                        />
                    </div>

                    <div className="profileName">
                        <h3>Contact Person Details</h3>
                    </div>
                    <div className="permanantDetails">
                        <div style={{ flex: "1", margin: "20px" }}>
                            <p className="profileLabel">First Name</p>
                            <TextField disabled id="firstName" value={firstName} />
                        </div>
                        <div style={{ flex: "1", margin: "20px" }}>
                            <p className="profileLabel">Last Name</p>
                            <TextField disabled id="lastName" value={lastName} />
                        </div>
                    </div>

                    <div className="permanantDetails">
                        <div style={{ flex: "1", margin: "20px" }}>
                            <p className="profileLabel">Email ID</p>
                            <TextField disabled id="email" value={email} />
                        </div>
                        <div style={{ flex: "1", margin: "20px" }}>
                            <p className="profileLabel">Phone Number</p>
                            <TextField disabled id="lastName" value={phoneNumber} />
                        </div>
                    </div>

                    <div className="permanantDetails">
                        <div style={{ flex: "1", margin: "20px" }}>
                            <p className="profileLabel">designation</p>
                            <TextField disabled={edit} id="designation" value={designation} onChange={event => {
                                setDesignation(event.target.value);
                            }} />
                        </div>
                    </div>

                    <div className="permanantDetails">
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
                </form>
            </div>
        </div>
    );
}
