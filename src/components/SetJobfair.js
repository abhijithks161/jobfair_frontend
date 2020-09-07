import React, { useState, useEffect } from 'react';
import Button from "@material-ui/core/Button";
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import axios from 'axios';


const useStyles = makeStyles(theme => ({
    paper: {
        margin: theme.spacing(2),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));



export default function SetJobFair(props) {
    const classes = useStyles();
    const [email] = useState(props.Cemail);
    const [name] = useState(props.Cname);
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [venue, setVenue] = useState("");
    const [jobFairLocation, setJobFairLocation] = useState("");

    const handleSubmit = event => {
        event.preventDefault();

        var createJobfairUrl = "http://10.10.1.203:8080/employer/create-jobfair";

        const createJobfairModel = {
            "date": date,
            "venue": venue,
            "time": time,
            "location": jobFairLocation,
            "participatingCompany": [
                {
                    "name": name,
                    "email": email
                }
            ]
        }

        axios
            .post(createJobfairUrl, createJobfairModel)
            .then(function (response) {
                console.log(response.data.data);
                var jobFairId = response.data.data.id;
                var jobFairEmail = response.data.data.participatingCompanies[0].email;

                props.setJobFairId(response.data.data.id)
                // localStorage.setItem('jobFareEmail', jobFairEmail);

            })
    };


    return (
        <div>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    <form className={classes.form} onSubmit={handleSubmit}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="date"
                            value={date}
                            onChange={event => {
                                setDate(event.target.value);
                            }}
                            type="date"
                            name="date"
                            autoFocus
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="date"
                            value={time}
                            onChange={event => {
                                setTime(event.target.value.toString());
                            }}
                            label="Reporting Time"
                            type="time"
                            name="time"
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="venue"
                            value={venue}
                            onChange={event => {
                                setVenue(event.target.value);
                            }}
                            label="Set Venue"
                            type="text"
                            id="venue"
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="jobFairLocation"
                            value={jobFairLocation}
                            onChange={event => {
                                setJobFairLocation(event.target.value);
                            }}
                            label="Set Job Fair Location"
                            type="text"
                            id="jobFairLocation"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Confirm
                        </Button>
                    </form>
                </div>
            </Container>
        </div>
    );
}