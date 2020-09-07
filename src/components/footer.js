import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Link } from "react-router-dom";
import Button from '@material-ui/core/Button';
import LocalPostOfficeIcon from '@material-ui/icons/LocalPostOffice';
import CallIcon from '@material-ui/icons/Call';
import facebook from '../assets/facebook.png';
import linkedin from '../assets/linkedin.png';
import instagram from '../assets/instagram.png';


const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        marginTop:50,
        marginBottom:"-64px"
        
    },
    paper: {
        height: "180px",
        padding: theme.spacing(1),
        color: theme.palette.text.primary,
    },
    footer_heading: {
        color: '#FFFFFF',
    },
    fb_icon: {
        width: "20px",
        height: "20px",
        marginLeft: "50px",
    },
}));

export default function Footer() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Grid container spacing={0} >
                <Grid item xs={4} >
                    <Paper className={classes.paper} style={{ backgroundColor: '#3BAFDA', borderRadius: '0' }}>
                        <p className={classes.footer_heading}> About US </p>
                        <p>We offer a bunch of cloud-based solutions for small, medium & large enterprises.
                            A majority of our projects follow a SaaS model whereas we have also executed a few PaaS.</p>
                    </Paper>
                </Grid>
                <Grid item xs={4}>
                    <Paper className={classes.paper} style={{backgroundColor: '#3BAFDA', borderRadius: '0' }}>
                        <ul style={{ textAlign: "center" }}>
                            <li style={{ listStyleType: "none" }}>
                                <Link to="/login" style={{ color: "white", textDecoration: 'none' }}>
                                    <Button color="inherit">Home</Button>
                                </Link>
                            </li>
                            <li style={{ listStyleType: "none" }}>
                                <Link to="/login" style={{ color: "white", textDecoration: 'none' }}>
                                    <Button color="inherit">About</Button>
                                </Link>
                            </li>
                            <li style={{ listStyleType: "none" }}>
                                <Link to="/login" style={{ color: "white", textDecoration: 'none' }}>
                                    <Button color="inherit">Location</Button>
                                </Link>
                            </li>
                            <li style={{ listStyleType: "none" }}>
                                <Link to="/login" style={{ color: "white", textDecoration: 'none' }}>
                                    <Button color="inherit">job Fairs</Button>
                                </Link>
                            </li>
                        </ul>
                    </Paper>
                </Grid>
                <Grid item xs={4}>
                    <Paper className={classes.paper} style={{ backgroundColor: '#3BAFDA', borderRadius: '0' }}>
                        <p className={classes.footer_heading}> Contact Us </p>

                        <ul style={{ alignContent: "center" }}>
                            <li style={{ listStyleType: "none" , margin:'5px'}}>
                                <LocalPostOfficeIcon style={{float:'left'}}/>
                                <Link to="/login" style={{ color: "white", textDecoration: 'none',marginLeft:'5px'}}>
                                    jobfairapp@jobfair.com
                                </Link>
                            </li>
                            <li style={{ listStyleType: "none" , margin:'5px'}}>
                                <CallIcon style={{float:'left'}}/>
                                <Link to="/login" style={{ color: "white", textDecoration: 'none' ,marginLeft:'5px'}}>
                                    1234567890
                                </Link>
                            </li>
                        </ul>

                        <img className={classes.fb_icon} src={facebook} alt="fb" />
                        <img className={classes.fb_icon} src={linkedin} alt="linkedin" />
                        <img className={classes.fb_icon} src={instagram} alt="instagram" />
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
}