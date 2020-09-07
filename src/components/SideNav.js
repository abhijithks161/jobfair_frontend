import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { fade, makeStyles, useTheme } from "@material-ui/core/styles";
import { BrowserRouter as Router } from "react-router-dom";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import "./profile.css";
import { Route, Link } from "react-router-dom";
import Profile from "./userProfile";
import userHome from "./userHome";
import Qualifications from "./userQualifications";
import applyJobs from "./applyJobs";
import userPerformance from "./userPerfomance";

import Button from "@material-ui/core/Button";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import SearchJobs from "./searchJobs";
import JobFairDetails from "./jobFairDetails";
import API from "./APIHelper";
import CompanyJobs from "./companyJobs";
import JobsTab from "./jobsTab";
import UserHome from "./userHome";


import JoinJobFair from "./JoinJobfair";
import CompanyJobFair from "./CompanyJobFair";
import EmployerProfile from "./EmployerProfile";
import CreateJobfair from "./CreateJobFair";


import fetchCandidate from "./fetchCandidate";
import Footer from "./footer";

import Home from "./home";
import LogIn from "./login";
import FirstRegistration from "./first_registration";
import AddOpenings from "./AddOpenings";
import AddOpen from "./addopen";
import Candidate from "./Candidate";
import EmployerPerfomance from "./EmployerPerformance";
import defaultImage from "./ImagesandIcons/defaultpic.jpg"

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    justifyContent:"space-around"
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  hide: {
    display: "none"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    minHeight:0,
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: "flex-end"
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    height: "100%",
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginLeft: -drawerWidth,
    marginTop: "70px",
    padding: "0px"
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: 0
  },
  title: {
    flexGrow: 1
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto"
    }
  },
  searchIcon: {
    width: theme.spacing(7),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  inputRoot: {
    color: "inherit"
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: 200
    }
  }
}));

export default function PersistentDrawerLeft() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [line1, setLine1] = useState();
  const [city, setCity] = useState();
  const [state, setState] = useState();
  const [pin, setPin] = useState();
  const [dob, setDob] = useState();
  const [imageUrl, setImageUrl] = useState();
  const [userType, setUserType] = useState(localStorage.getItem("userType"));
  var [links, setLinks] = useState([]);

  const [companyName, setCompanyName] = useState("");
  const [companyEmail, setCompanyEmail] = useState("");
  const [companyPhoneNumber, setCompanyPhoneNumber] = useState("");
  const [companyUrl, setCompanyUrl] = useState("");
  const [companyCID, setCompanyCID] = useState("");
  const [yearOfEstablishment, setYearOfEstablishment] = useState("");
  const [noOfEmployees, setNoOfEmployees] = useState("");
  const [designation, setDesignation] = useState("");
  const [description,setDescription] = useState("");

  if (userType === "jobseeker") {
    links = [
      { name: "Dashboard", target: "/jobseeker", icon: "WorkIcon" },
      { name: "Personal Info", target: "/jobseeker/profile", icon: "WorkIcon" },
      {
        name: "Qualifications",
        target: "/jobseeker/qualifications",
        icon: "WorkIcon"
      },
      {
        name: "My Perfomance",
        target: "/jobseeker/performance",
        icon: "WorkIcon"
      },
      { name: "Search Jobs", target: "/jobseeker/search", icon: "WorkIcon" }
    ];
  } else if (userType === "employer") {
    links = [
      { name: "Dashboard", target: "/employer", icon: "WorkIcon" },
      { name: "Company Info", target: "/employer/profile", icon: "WorkIcon" },
      {
        name: "Current Job Fairs",
        target: "/employer/current-jobfairs",
        icon: "WorkIcon"
      },
      {
        name: "Create Job Fair",
        target: "/employer/create-jobfair",
        icon: "WorkIcon"
      },
      {
        name: "Created Job Fairs",
        target: "/employer/my-jobfair",
        icon: "WorkIcon"
      },
      {
        name: "Outcome",
        target: "/employer/performance",
        icon: "WorkIcon"
      }

    ];
  }
  function fetchDetails() {
    if (userType === "jobseeker") {
      API.fetchProfile().then(function(response) {
        console.log(response);
        setFirstName(response.data.data.firstName.toUpperCase());
        setLastName(response.data.data.lastName.toUpperCase());
        setEmail(response.data.data.email);
        setImageUrl(response.data.data.profilePicURL);
        setPhoneNumber(response.data.data.phoneNumber);

       if (response.data.data.address != null) {
          setLine1(response.data.data.address.addressLine1);
          setCity(response.data.data.address.city);
          setState(response.data.data.address.state);
          setPin(response.data.data.address.pin);
        }
        setDob(response.data.data.dob);
        console.log(imageUrl);
      });
    } else if (userType === "employer") {
      API.fetchEmployer().then(function(response) {
        console.log(response);
        setCompanyName(response.data.data.companyName);
        setCompanyEmail(response.data.data.companyEmail);
        localStorage.setItem('email', response.data.data.companyEmail);
        setCompanyPhoneNumber(response.data.data.companyPhoneNumber);
        setImageUrl(response.data.data.logoUrl);
        setCompanyUrl(response.data.data.websiteUrl);
        setCompanyCID(response.data.data.corporateIdentificationNumber);
        setYearOfEstablishment(response.data.data.yearOfEstablishment);
        setNoOfEmployees(response.data.data.noOfEmployees);
        if (response.data.data.address != null) {
          setLine1(response.data.data.address.addressLine1);
          setCity(response.data.data.address.city);
          setState(response.data.data.address.state);
          setPin(response.data.data.address.pin);
        }
        setFirstName(response.data.data.firstName);
        setLastName(response.data.data.lastName);
        setEmail(response.data.data.email);
        setPhoneNumber(response.data.data.phoneNumber);
        setDesignation(response.data.data.designation);
        setDescription(response.data.data.description)
      });
    }
  }
  useEffect(() => {
    fetchDetails();
  }, []);
  const [selectedFile, setSelectedFile] = useState();

  function fileChangedHandler(event) {
    setSelectedFile(event.target.files[0]);
  }

  function uploadHandler() {
    console.log(selectedFile);
    const formData = new FormData();
    formData.append("file", selectedFile);
    API.uploadImage(formData).then(
      window.location.reload.bind(window.location)
    );
  }

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Router>
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="fixed"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open
          })}
        >
          <Toolbar className="toolbar">
            <div style={{display:"flex"}}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, open && classes.hide)}
              disabled={localStorage.getItem("userID") ? false : true}
              display= {localStorage.getItem("userID") ? 'block' : 'none'}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap style={{margin:"auto"}}>
              Job Fair App
            </Typography>
            </div>
            <div style={{ display: "flex"}}>
              
              {localStorage.getItem("userID") ? (
               
                  <Link
                    to="/logout"
                    style={{ color: "white", textDecoration: "none" }}
                  >
                    <Button color="inherit" className="buttonTest">
                      Log Out
                    </Button>
                  </Link>
         
              ) : (
                <div>
                  <Link
                    to="/login"
                    style={{ color: "white", textDecoration: "none" }}
                  >
                    <Button color="inherit">Login</Button>
                  </Link>
                  <Link
                    to="/signup"
                    style={{ color: "white", textDecoration: "none" }}
                  >
                    <Button color="inherit" className="buttonTest">
                      Register
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </Toolbar>
        </AppBar>
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={open}
          classes={{
            paper: classes.drawerPaper
          }}
        >
          <div className={classes.drawerHeader}>
            {userType === "jobseeker" ? (
              <Typography
                variant="subtitle1"
                style={{ textAlign: "center" }}
                noWrap
              >
                {firstName} {lastName}
              </Typography>
            ) : (
              <Typography
                variant="subtitle1"
                style={{ textAlign: "center" }}
                noWrap
              >
                {companyName}
              </Typography>
            )}
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "ltr" ? <MenuIcon /> : <ChevronRightIcon />}
            </IconButton>
          </div>
          <Divider />
          <div>
            <div classNAme="profile-img-container">
              <div className="avatar-upload">
                <div className="avatar-edit">
                  <input
                    type="file"
                    id="imageUpload"
                    accept=".png, .jpg, .jpeg"
                    onChange={fileChangedHandler}
                  />
                  <label for="imageUpload"></label>
                </div>
                <div className="avatar-preview">
                  {imageUrl ? <img
                    id="imagePreview"
                    src={imageUrl}
                    className="profilePhoto avatar-preview"
                    alt="Upload Profile image"
                  /> : <img
                  id="imagePreview"
                  src={defaultImage}
                  className="profilePhoto avatar-preview"
                  alt="Upload Profile image"
                /> }
                  
                </div>
              </div>
            </div>
            <IconButton
              id="imageUpload"
              color="primary"
              className={classes.button}
              aria-label="add to shopping cart"
              onClick={uploadHandler}
            >
              <PhotoCamera />
            </IconButton>
          </div>

          <List>
            {links.map(text => (
              <ListItem button key={text}>
                <Link to={`${text.target}`} className="link">
                  <ListItemText
                    primary={text.name}
                    className="drawer-list-tem"
                  />
                </Link>
              </ListItem>
            ))}
          </List>
        </Drawer>
        <main
          className={clsx(classes.content, {
            [classes.contentShift]: open
          })}
        >
          <Route exact path="/jobseeker" component={userHome} />
          <Route
            path="/jobseeker/profile"
            render={props => (
              <Profile
                {...props}
                firstName={firstName}
                lastName={lastName}
                email={email}
                phoneNumber={phoneNumber}
                line1={line1}
                city={city}
                state={state}
                pin={pin}
                dob={dob}
              />
            )}
          />
          <Route path="/jobseeker/qualifications" component={Qualifications} />
          <Route path="/jobseeker/apply/:id/:email" component={CompanyJobs} />
          <Route path="/jobseeker/search" component={SearchJobs} />
          <Route path="/jobseeker/performance" component={userPerformance} />
          <Route path="/jobseeker/jobfair/:id" component={JobsTab} />
          <Route exact path="/" component={Home} />
          <Route path="/logout" component={Home} />
          <Route path="/home" component={Home} />
          <Route path="/login" component={LogIn} />
          <Route path="/signup" component={FirstRegistration} />
  

          <Route
            exact
            path="/employer"
            render={props => (
              <JoinJobFair
                {...props}
                companyName={companyName}
                companyEmail={companyEmail}
              />
            )}
          />

          <Route
            path="/employer/profile"
            render={props => (
              <EmployerProfile
                {...props}
                companyName={companyName}
                companyEmail={companyEmail}
                companyPhoneNumber={companyPhoneNumber}
                companyUrl={companyUrl}
                companyCID={companyCID}
                yearOfEstablishment={yearOfEstablishment}
                noOfEmployees={noOfEmployees}
                line1={line1}
                city={city}
                state={state}
                pin={pin}
                firstName={firstName}
                lastName={lastName}
                email={email}
                phoneNumber={phoneNumber}
                designation={designation}
                description={description}
              />
            )}
          />
          <Route
            exact
            path="/employer/create-jobfair"
            render={props => (
              <CreateJobfair
                {...props}
                companyName={companyName}
                companyEmail={companyEmail}
              />
            )}
          />

          <Route
            exact
            path="/employer/current-jobfairs"
            render={props => (
              <JoinJobFair
                {...props}
                companyName={companyName}
                companyEmail={companyEmail}
              />
            )}
          />

          <Route exact path="/employer/my-jobfair" component={CompanyJobFair} />
          <Route exact path="/employer/add-openings/:id" component={AddOpen} />
          <Route path="/employer/candidate/:jobFairId/:id/:email" component={fetchCandidate} />
          <Route path="/fetchCandidates/:jobFairId/:id" component={Candidate} />
          <Route path="/employer/performance" component={EmployerPerfomance} />

          <Footer />
          <div className={classes.drawerHeader} />
        </main>
      </div>
    </Router>
  );
}
