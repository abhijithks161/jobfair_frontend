import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";

const useStyles = makeStyles(theme => ({
    container: {
        display: "flex",
        flexWrap: "wrap",
        flexDirection: "column"
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1)
    },
    dense: {
        marginTop: theme.spacing(2)
    },
    menu: {
        width: 200
    }
}));

export default function EmployerOpenings() {
    const classes = useStyles();
    return (
        <div className={classes.container}>
            <TableRow>
                <TableCell style={{ width: "100%" }}  scope="row">
                    <b>Job Role</b>
                </TableCell>
                <TableCell style={{ width: "100%" }} align="left">{}</TableCell>
            </TableRow>

            <TableRow>
                <TableCell style={{ width: "100%" }} scope="row">
                    <b>Job Description</b>
                </TableCell>
                <TableCell align="left">{}</TableCell>
            </TableRow>

            <TableRow>
                <TableCell style={{ width: "100%" }}scope="row">
                    <b>Eligibility</b>
                </TableCell>
                <TableCell align="left">{}</TableCell>
            </TableRow>

            <TableRow>
                <TableCell style={{ width: "100%" }} scope="row">
                    <b>Available Vaccancies</b>
                </TableCell>
                <TableCell align="left">{}</TableCell>
            </TableRow>

            <TableRow>
                <TableCell style={{ width: "100%" }} scope="row">
                    <b>Salary Package</b>
                </TableCell>
                <TableCell align="left">
                    {}
                </TableCell>
            </TableRow>
        </div>
    );
}
