import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableFooter from "@material-ui/core/TableFooter";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import LastPageIcon from "@material-ui/icons/LastPage";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import clsx from "clsx";
import ErrorIcon from "@material-ui/icons/Error";
import CloseIcon from "@material-ui/icons/Close";
import SuccessIcon from "@material-ui/icons/CheckCircle";
import { green } from "@material-ui/core/colors";
import SalaryIcon from "@material-ui/icons/MonetizationOn";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import WorkIcon from "@material-ui/icons/Work";
import Snackbar from "@material-ui/core/Snackbar";
import API from "./APIHelper";
import Map from "./mapComponent";

const useStyles1 = makeStyles(theme => ({
  root: {
    flexShrink: 0,
    color: theme.palette.text.secondary,
    marginLeft: theme.spacing(2.5)
  }
}));

function TablePaginationActions(props) {
  const classes = useStyles1();
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;

  function handleFirstPageButtonClick(event) {
    onChangePage(event, 0);
  }

  function handleBackButtonClick(event) {
    onChangePage(event, page - 1);
  }

  function handleNextButtonClick(event) {
    onChangePage(event, page + 1);
  }

  function handleLastPageButtonClick(event) {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  }

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired
};

var rows = [];

const useStyles2 = makeStyles(theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing(3)
  },
  table: {
    minWidth: 500
  },
  tableWrapper: {
    overflowX: "auto"
  },
  card: {
    minWidth: 275,
    background: "#ffffff",
    margin: "10px 20px 10px 20px",
    borderRadius: "8px"
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  },
  button: {
    padding: "5px",
    margin: theme.spacing(1)
  },
  error: {
    backgroundColor: theme.palette.error.dark
  },
  success: {
    backgroundColor: green[600]
  },
  icon: {
    fontSize: 20
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing(1)
  },
  message: {
    display: "flex",
    alignItems: "center"
  },
  leftIcon: {
    marginRight: theme.spacing(1)
  },
  rightIcon: {
    marginLeft: theme.spacing(2)
  },
  iconSmall: {
    fontSize: 20
  }
}));

export default function JobsDisplay(props) {
  const [jobs, setJobs] = useState(props.job);
  const [jobFairId, setJobFairId] = useState();
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = React.useState("");
  var address = "";
  rows = jobs;
  // const [jobId,setJobId]=useState();
  const classes = useStyles2();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(3);
  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  function handleChangePage(event, newPage) {
    setPage(newPage);
  }

  function handleChangeRowsPerPage(event) {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  }

  function handleClick(jobId, jobFairId) {
    API.applyJob(jobId, jobFairId).then(function(response) {
      if (
        response.data.status === 0 &&
        response.data.error === "user not verified"
      ) {
        setError(true);
        setSuccess(false);
        setMessage("Verify your Email to apply.");
        setOpen(true);
        console.log(response.data);
      } else if (
        response.data.status === 0 &&
        response.data.error === "Already Applied"
      ) {
        setError(true);
        setSuccess(false);
        setMessage("Already applied.");
        setOpen(true);
        console.log(response.data);
      } else {
        setError(false);
        setSuccess(true);
        setMessage("Applied Succesfully!");
        setOpen(true);
        console.log(response.data);
      }
    });
  }

  return (
    <div>
      <Paper className={classes.root}>
        <div className={classes.tableWrapper}>
          <Table className={classes.table}>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(row => (
                  <TableRow key={row.id}>
                    <Card className={classes.card}>
                      <div style={{ display: "flex" }}>
                        <div style={{ flex: "2" }}>
                          <CardContent style={{ padding: "10px" }}>
                            <Typography
                              className={classes.title}
                              color="textSecondary"
                              gutterBottom
                            >
                              {row.companyName}
                            </Typography>
                            <Typography variant="h5" component="h2">
                              {row.opening}
                            </Typography>
                            <Typography
                              className={classes.pos}
                              style={{ display: "flex" }}
                              color="textPrimary"
                            >
                              <SalaryIcon /> {row.salaryMin}-{row.salaryMax}
                              <LocationOnIcon
                                style={{ marginLeft: "30px" }}
                              />{" "}
                              {row.city.toUpperCase()}
                              <WorkIcon style={{ marginLeft: "30px" }} />{" "}
                              {row.experience} Years
                            </Typography>
                            <Typography variant="body2" component="p">
                              {row.jobDescription}
                            </Typography>
                            <Typography variant="body2" component="p">
                              Eligibility Crieteria: {row.eligibility.course} ,{" "}
                              {row.eligibility.branch} ,{" "}
                              {row.eligibility.cutOff}
                            </Typography>

                            <Typography variant="body2" component="p">
                              Address : {row.address}
                            </Typography>
                          </CardContent>
                        </div>
                        <div style={{ flex: "2" }}>
                          <Map
                            lat={row.location.latitude}
                            lng={row.location.longitude}
                          />
                        </div>
                      </div>
                      <CardActions style={{ float: "right" }}>
                        <Button
                          className={classes.button}
                          size="small"
                          variant="contained"
                          color="primary"
                          onClick={() => {
                            const id = row.id;
                            const jobfairid = row.jobFairId;
                            handleClick(id, jobfairid);
                          }}
                        >
                          Apply
                        </Button>
                      </CardActions>
                    </Card>
                  </TableRow>
                ))}

              {emptyRows > 0 && (
                <TableRow style={{ height: 48 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>

            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[3, 6, 9]}
                  colSpan={3}
                  count={rows.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  SelectProps={{
                    inputProps: { "aria-label": "rows per page" },
                    native: true
                  }}
                  onChangePage={handleChangePage}
                  onChangeRowsPerPage={handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActions}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      </Paper>

      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "right"
        }}
        open={open}
        autoHideDuration={6000}
        onClose={(event, reason) => {
          if (reason === "clickaway") {
            return;
          }
          setOpen(false);
        }}
        ContentProps={{
          "aria-describedby": "message-id",
          classes: {
            root: error ? classes.error : classes.success
          }
        }}
        message={
          <span id="message-id" className={classes.message}>
            {error && (
              <ErrorIcon className={clsx(classes.icon, classes.iconVariant)} />
            )}
            {success && (
              <SuccessIcon
                className={clsx(classes.icon, classes.iconVariant)}
              />
            )}
            {message}
          </span>
        }
        action={[
          <IconButton
            key="close"
            aria-label="close"
            color="inherit"
            className={classes.close}
            onClick={(event, reason) => {
              if (reason === "clickaway") {
                return;
              }
              setOpen(false);
            }}
          >
            <CloseIcon />
          </IconButton>
        ]}
      />
    </div>
  );
}
