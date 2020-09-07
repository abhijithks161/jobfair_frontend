// import React, { useEffect, useState } from "react";
// import { makeStyles } from "@material-ui/core/styles";
// import "./profile.css";
// import { Route, Link } from "react-router-dom";
// import Profile from "./userProfile";
// import userHome from "./userHome";
// import Qualifications from "./userQualifications";
// import applyJobs from "./applyJobs";
// import userPerformance from "./userPerfomance";

// import IconButton from "@material-ui/core/IconButton";
// import PhotoCamera from "@material-ui/icons/PhotoCamera";
// import CreateOutlinedIcon from "@material-ui/icons/CreateOutlined";
// import SearchJobs from "./searchJobs";
// import JobFairDetails from "./jobFairDetails";
// import API from "./APIHelper";

// const useStyles = makeStyles(theme => ({
//   container: {
//     display: "flex",
//     flexWrap: "wrap",
//     flexDirection: "column"
//   },
//   textField: {
//     marginLeft: theme.spacing(1),
//     marginRight: theme.spacing(1)
//   },
//   dense: {
//     marginTop: theme.spacing(2)
//   },
//   menu: {
//     width: 200
//   }
// }));

// export default function OutlinedTextFields() {
//   const classes = useStyles();
//   const [firstName, setFirstName] = useState();
//   const [lastName, setLastName] = useState();
//   const [email, setEmail] = useState();
//   const [phoneNumber, setPhoneNumber] = useState();
//   const [line1, setLine1] = useState();
//   const [city, setCity] = useState();
//   const [state, setState] = useState();
//   const [pin, setPin] = useState();
//   const [dob, setDob] = useState();
//   const [imageUrl, setImageUrl] = useState();

//   async function fetchDetails() {

//     API.fetchProfile().then(function(response) {
//       console.log(response);
//       setFirstName(response.data.data.firstName.toUpperCase());
//       setLastName(response.data.data.lastName.toUpperCase());
//       setEmail(response.data.data.email);
//       setImageUrl(response.data.data.profilePicURL);
//       setPhoneNumber(response.data.data.phoneNumber);
//       setLine1(response.data.data.address.addressLine1);
//       setCity(response.data.data.address.city);
//       setState(response.data.data.address.state);
//       setPin(response.data.data.address.pin);
//       setDob(response.data.data.dob);
//       console.log(imageUrl);
//     });
//   }
//   useEffect(() => {
//     fetchDetails();
//   }, []);
//   const [selectedFile, setSelectedFile] = useState();

//   function fileChangedHandler(event) {
//     setSelectedFile(event.target.files[0]);
//   }

//   function uploadHandler() {
//     console.log(selectedFile);
//     const formData = new FormData();
//     formData.append("file", selectedFile);
//     API.uploadImage(formData)
//       .then(window.location.reload.bind(window.location));
//   }
//   return (
//     <div className="flex-container">
//       <div className="sideBar">
//         <div style={{ flex: "1" }}>
//           <p className="profileName">
//             {firstName} {lastName}
//           </p>

//           <img src={imageUrl} className="profilePhoto" alt="profile" />

//           <div className="image-upload">
//             <label htmlFor="file-input">
//               <CreateOutlinedIcon />
//             </label>

//             <input id="file-input" type="file" onChange={fileChangedHandler} />
//           </div>
//           <IconButton
//             id="imageUpload"
//             color="primary"
//             className={classes.button}
//             aria-label="add to shopping cart"
//             onClick={uploadHandler}
//           >
//             <PhotoCamera />
//           </IconButton>
//         </div>
//         <div style={{ flex: "1" }}>
//           <ul className="sideNav">
//             <li>
//               <Link
//                 to="/user"
//                 className="sideNavLink"
//                 style={{ color: "white" }}
//               >
//                 Home
//               </Link>
//             </li>
//             <li>
//               <Link
//                 to="/user/profile"
//                 className="sideNavLink"
//                 style={{ color: "white" }}
//               >
//                 Personal Info
//               </Link>
//             </li>
//             <li>
//               <Link
//                 to="/user/qualifications"
//                 className="sideNavLink"
//                 style={{ color: "white" }}
//               >
//                 Qualifications
//               </Link>
//             </li>
//             <li>
//               <Link
//                 to="/user/apply"
//                 className="sideNavLink"
//                 style={{ color: "white" }}
//               >
//                 Apply for jobs
//               </Link>
//             </li>
//             <li>
//               <Link
//                 to="/user/search"
//                 className="sideNavLink"
//                 style={{ color: "white" }}
//               >
//                 Search Jobs
//               </Link>
//             </li>
//             <li>
//               <Link
//                 to="/user/performance"
//                 className="sideNavLink"
//                 style={{ color: "white" }}
//               >
//                 My Perfomance
//               </Link>
//             </li>
//           </ul>
//         </div>
//       </div>

//       <div style={{ flex: "5" }}>
//         <Route exact path="/user" component={userHome} />
//         <Route
//           path="/user/profile"
//           render={props => (
//             <Profile
//               {...props}
//               firstName={firstName}
//               lastName={lastName}
//               email={email}
//               phoneNumber={phoneNumber}
//               line1={line1}
//               city={city}
//               state={state}
//               pin={pin}
//               dob={dob}
//             />
//           )}
//         />
//         <Route path="/user/qualifications" component={Qualifications} />
//         <Route path="/user/apply/:id/:email" component={applyJobs} />
//         <Route path="/user/search" component={SearchJobs} />
//         <Route path="/user/performance" component={userPerformance} />
//         <Route path="/user/jobfair/:id" component={JobFairDetails} />
//       </div>
//     </div>
//   );
// }
