import React, { useEffect, useState } from 'react';
import cover from '../assets/home.png'
import { Fade } from 'react-slideshow-image';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    card: {
        maxWidth: 500,
        backgroundColor:"#ebf0f7",
    },
    content: {
        marginTop: -56,
        marginBottom: 54

    },
    media: {
        height: 110,
    },
});

function Home() {
    const classes = useStyles();
    const [logoUrls, setLogoUrls] = useState([]);
    const [jobFairs, setJobFairs] = useState([]);
    const fadeProperties = {
        duration: 5000,
        transitionDuration: 500,
        infinite: true,
        // indicators: true,

    }

    async function fetchDetails() {
        
        var apiBaseUrl = "http://10.10.1.203:8080/employer/employer-logo";
        var jobFairUrl = "http://10.10.1.203:8080/jobFair/all";
        axios.get(apiBaseUrl).then(function (response) {
            return response.data ;
        }).then(function (logoUrls) {
            setLogoUrls(logoUrls);
        });
        axios.get(jobFairUrl).then(function (response) {
            return response.data.data;
        }).then(function (jobFairs) {
            setJobFairs(jobFairs)
        });

        localStorage.removeItem('userID');
        localStorage.removeItem('userType');
        localStorage.removeItem('email');
        localStorage.removeItem('companyName');
        localStorage.removeItem('jobFairID');
        localStorage.removeItem('jobFairEmail');
    }
    useEffect(() => {
        fetchDetails();
    }, []);
    return (
        <div className="flex-container-parent">
            <div className="container">
                <img src={cover} className="coverphoto" />
                <div className="center"><h1 id="hclass">Identify, Improve &amp; Showcase Your Talents</h1></div>
            </div>

            <div className="flex-container">
                <div className="slide-container">
                    {console.log(logoUrls)}
                    <Fade {...fadeProperties}>
                        {
                            logoUrls.map(logo => {
                                return (
                                    <div className="image-container logo">
                                        <img src={logo} />
                                    </div>
                                )
                            })
                        }
                    </Fade>
                </div>
                <div className="slide-container">
                    <Fade {...fadeProperties}>
                        {
                            jobFairs.map(jobFair => {
                                return (
                                    <div className="image-container">
                                        <Card id="card-id" className={classes.card}>
                                            <CardActionArea>
                                                <CardMedia
                                                    className={classes.media}
                                                    image="/static/images/cards/contemplative-reptile.jpg"
                                                    title="Contemplative Reptile"
                                                />
                                                <CardContent className={classes.content}>
                                                    <Typography gutterBottom variant="h5" component="h2">
                                                        JobFest
                                                    </Typography>
                                                    <Typography variant="body2" color="textSecondary" component="p">
                                                        Jobfest @ {jobFair.location} on {new Date(jobFair.date).toDateString()}
                                                    </Typography>
                                                </CardContent>
                                            </CardActionArea>
                                        </Card>
                                    </div>
                                )
                            })
                        }
                    </Fade>
                </div>

            </div>


        </div>
    );
}
export default Home;