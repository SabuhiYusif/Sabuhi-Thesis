import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import './../../App.css';
import { Button, Paper, Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import { setSettingsConfiguration } from '../../actions/pureDataSettingsAction';
import { useDispatch, useSelector } from 'react-redux';
import { downloadSettingsLog } from '../../actions/downloadActions';
import AlertSuccess from '../alerts/AlertSuccess';

const useStyles = makeStyles((theme) => ({
    root: {
        marginLeft: 80,
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    },
    root: {
        width: "100%",
        marginTop: theme.spacing.unit * 3,
        overflowX: "auto"
    },
    table: {},
    featureMethods: {
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    demo: {
        backgroundColor: theme.palette.background.paper,
    },
    slider: {
        marginTop: 16,
        width: 300
    },
    featureCard: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        // padding: theme.spacing(0, 1),
        flexGrow: 1,
        padding: theme.spacing(3),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    },
}));

function SettingsTable(props) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const settings = props.settings
    const alert = useSelector(state => state.alerts.alert);

    const handleSubmitClick = () => {
        const eventDefault = {[props.defaultEventAttr]: props.defaultMethod}
        settings.eventDefault = eventDefault
        dispatch(setSettingsConfiguration(settings))
    }
    const handleDownloadClick = (event) => {
        dispatch(downloadSettingsLog())
    }
    const handleDeleteClick = (item) => {
        props.handleChange(item)
    }

    return (
        <div>
            <Paper key={props.settings} className={classes.root}>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Event Attribute Name</TableCell>
                            <TableCell>Feature Extraction Method</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {Object.keys(settings.events).map((item, i) => {
                            return (
                                <TableRow key={`row-${i}`}>
                                    <TableCell>{item}</TableCell>
                                    <TableCell>{settings.events[item]}</TableCell>
                                    <TableCell>
                                        <Button
                                            onClick={() => handleDeleteClick(item)}
                                            color="secondary"
                                        >
                                            Delete
                                    </Button>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </Paper>
            <br></br>
            <br></br>
            {
                (alert.service === 'SETTINGS') &&
                <AlertSuccess message={"Settings file created successfully"} />
            }
            { (Object.keys(settings.events).length >= 1) &&
                <label htmlFor="contained-button-file">
                    <Button
                        onClick={() => handleSubmitClick()}
                        variant="contained"
                        className={classes.submitButton}
                        color="primary" >
                        Submit Settings
                </Button>
                </label>
            }
            { (Object.keys(settings.events).length >= 1) &&
                <label htmlFor="contained-button-file">
                    <Button
                        onClick={() => handleDownloadClick()}
                        variant="outlined"
                        className={classes.submitButton}
                        color="primary" >
                        Download Settings
                </Button>
                </label>
            }
        </div>
    )
}

export default SettingsTable;
