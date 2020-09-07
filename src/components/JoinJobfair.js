import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import image from './ImagesandIcons/jobfair.png';
import { Link } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import Pagination from 'material-ui-flat-pagination';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import axios from 'axios';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';

import API from './APIHelper';
import { object } from 'prop-types';
const useStyles = makeStyles((theme) => ({
	card: {
		maxWidth: 345
	},
	button: {
		margin: theme.spacing(1)
	},
	media: {
		height: 0,
		paddingTop: '56.25%' // 16:9
	}
}));

export default function JoinJobFair(props) {
	const classes = useStyles();
	const theme = createMuiTheme();
	const [ jobFairs, setJobFairs ] = useState([]);
	const [ offSet, setOffSet ] = useState(0);
	const [ total, setTotal ] = useState();
	const [ join, setJoin ] = useState(0);
	const [ open, setOpen ] = React.useState(false);
	const [ companyName, setCompanyName ] = useState('');
	const [ companyEmail, setCompanyEmail ] = useState('');

	useEffect(() => {
		setCompanyName(props.companyName);
		setCompanyEmail(props.companyEmail);
	});

	function handleClick(offset) {
		setOffSet(offset);
	}

	function fetchDetails() {
		API.fetchJobFairs(offSet)
			.then(function(response) {
				console.log(response.data.data);
				return response.data.data;
			})
			.then(function(jobFairs) {
				setJobFairs(jobFairs);

				let storedEmail = localStorage.getItem('email');
				jobFairs.forEach(jobFair=>{
                    const companyIndex = jobFair.participatingCompanies.findIndex((company) => {
                        return company.email === localStorage.getItem('email');
                    });
                    jobFair.participating = companyIndex===-1?false:true;
				})
				

				
			});




		API.fetchJobFairCount()
			.then(function(response) {
				console.log(response.data.data);
				return response.data.data;
			})
			.then(function(total) {
				setTotal(Math.ceil(total / 9));
			});
	}

	useEffect(
		() => {
			fetchDetails();
		},
		[ offSet ]
	);

	function handleClickJoin(jobFairId) {
		const joinModel = {
			id: jobFairId,
			participatingCompany: {
				name: companyName,
				email: companyEmail
			}
		};
		console.log(joinModel);
		var joinJobFairUrl = 'http://10.10.1.203:8080/employer/join-jobfair';
		axios.post(joinJobFairUrl, joinModel).then(function(response) {
			console.log(response.data);
		});
		setOpen(true);
	}

	function handleClickOpen() {
		setOpen(true);
	}

	function handleClose() {
		setOpen(false);
	}

	const [ flag, setFlag ] = useState(false);

	return (
		<div>
			<div className="inner" style={{ display: 'flex', flexWrap: 'wrap' }}>
				{jobFairs ? (
					jobFairs.map((jobFair) => {
						if (jobFair.participatingCompanies[0].name != localStorage.getItem('companyName')) {
							return (
								<div style={{ margin: '10px', width: '30%' }}>
									<Card className={classes.card}>
										<CardHeader
											title={'@ ' + jobFair.location}
											subheader={new Date(jobFair.date).toDateString()}
										/>

										<CardMedia className={classes.media} image={image} title="Job Fair" />
										<CardContent>
											<Typography variant="body2" color="textSecondary" component="p">
												{jobFair.participatingCompanies[0].name} is organising a job fair at{' '}
												{jobFair.venue}
											</Typography>
											<Typography variant="body2" color="textSecondary" component="p">
												on {new Date(jobFair.date).toDateString()}.
											</Typography>
										</CardContent>

										<CardActions disableSpacing>
											<Link
												to={ (jobFair.participating===true) ? null : '/employer/add-openings/' + jobFair.id }
												style={{ cursor: jobFair.participating===true ? "not-allowed" : "pointer" ,textDecoration: 'none' }}
											>
												<Button
													disabled={jobFair.participating}
													fullWidth
													variant="contained"
													color="secondary"
													className={classes.button}
													onClick={() => {
														handleClickJoin(jobFair.id);
													}}
												>
													Join
												</Button>
											</Link> 
											<Link
												to={ (jobFair.participating===false) ? null : '/employer/add-openings/' + jobFair.id }
												style={{ cursor: jobFair.participating===false ? "not-allowed" : "pointer" ,textDecoration: 'none' }}
											>
												<Button
													fullWidth
													variant="contained"
													color="secondary"
													className={classes.button}
													style={{marginLeft:"20px"}}
												>
													view
												</Button>
											</Link>
										</CardActions>
									</Card>
								</div>
							);
						}
					})
				) : (
					<div>
						<p>no jobfairs</p>
					</div>
				)}
			</div>

			<div style={{ textAlign: 'center' }}>
				<MuiThemeProvider theme={theme}>
					<CssBaseline />
					<Pagination limit={1} offset={offSet} total={total} onClick={(e, offset) => handleClick(offset)} />
				</MuiThemeProvider>
			</div>
		</div>
	);
}
