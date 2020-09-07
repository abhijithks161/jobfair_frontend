import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import AddOpenings from "./AddOpenings";
import SetJobFair from "./SetJobfair";
import Openings from "./openings";


const useStyles = makeStyles(theme => ({
    root: {
        width: '90%',
    },
    backButton: {
        marginRight: theme.spacing(1),
    },
    instructions: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
}));

function getSteps() {
    return ['Set Date and Venue', 'Add Your Openings', 'Confirm Job Fair'];
}


export default function CreateJobfair(props) {
    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);
    const [companyName, setCompanyName] = useState("");
    const [companyEmail, setCompanyEmail] = useState("");
    const [jobFairId,setJobFairId] = useState("");


    const steps = getSteps();

   


    function getStepContent(stepIndex) {
        switch (stepIndex) {
            case 0:
                return (
                    <div>
                        {!!companyEmail && !!companyName && (<SetJobFair Cemail={companyEmail} Cname={companyName} setJobFairId={setJobFairId} />)}
                    </div>
                );
            case 1:
                return (
                    <div>
                        <Openings jobFairId={jobFairId}/>
                        <AddOpenings jobFairId={jobFairId} companyEmail ={companyEmail}/>
                    </div>
                );
            case 2:
                return (
                    <div>
                        <h3>Confirm Job Fair</h3>
                    </div>
                );
            default:
                return (
                    <div><h3>Confirm Job Fair</h3>
                    </div>
                );
        }
    }

    useEffect(() => {
        setCompanyName(props.companyName);
        setCompanyEmail(props.companyEmail);

        localStorage.setItem('companyName', props.companyName);
        localStorage.setItem('email', props.companyEmail);

    }, [props]);


    function handleNext() {
        setActiveStep(prevActiveStep => prevActiveStep + 1);
    }

    function handleBack() {
        setActiveStep(prevActiveStep => prevActiveStep - 1);
    }

    function handleReset() {
        setActiveStep(0);
    }

    return (
        <div className={classes.root}>
            <Stepper activeStep={activeStep} alternativeLabel>
                {steps.map(label => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
            <div>
                {activeStep === steps.length ? (
                    <div>
                        <Typography className={classes.instructions}>All steps completed</Typography>
                        <Button onClick={handleReset}>Reset</Button>
                    </div>
                ) : (
                        <div>
                            <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>

                            <div class>
                                <Button
                                    disabled={activeStep === 0}
                                    onClick={handleBack}
                                    className={classes.backButton}
                                >
                                    Back
                                </Button>

                                <Button variant="contained" color="primary" onClick={handleNext}>
                                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                                </Button>

                            </div>
                        </div>
                    )}
            </div>
        </div>
    );
}
