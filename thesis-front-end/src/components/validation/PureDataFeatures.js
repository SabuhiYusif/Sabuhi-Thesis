import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import './../../App.css';
import { Box, Button, InputLabel, LinearProgress, MenuItem, Select, Typography } from '@material-ui/core';

import { useSelector } from "react-redux";

import SettingsTable from './SettingsTable';


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

function PureDataFeatures(props) {
    const classes = useStyles();
    const events = props.events
    const request = useSelector(state => state.request)
    const [eventAttrName, setEventAttrName] = useState("default");
    const [method, setMethod] = useState("default");
    const [defaultAttrName, setDefaultAttrName] = useState("default");
    const [defaultMethod, setDefaultMethod] = useState("first")
    const [visible, setVisibility] = useState(false);
    const methods = {
        'literal': ["first", "last", "count"],
        'number': ["first", "last", "count", "min", "max", "mean"]
    }
    const [availableMethods, setAvailableMethods] = useState([])
    const [eventRequest, setEventRequest] = useState({ events: {}, eventDefault: {} })


    useEffect(() => {
        if (request.status === 'LOADING' && request.service === 'VALIDATING') {
            setVisibility(true);
        }

        if (request.status === 'COMPLETED') {
            setVisibility(false);
        }

    }, [request]);

    const handleEventAttrChange = (event) => {
        const key = event.target.value
        setEventAttrName(key);
        setAvailableMethods(methods[events[key]])
    };

    const handleMethodChange = (event) => {
        setMethod(event.target.value)
    }

    const handleDefaultAttrName = (event) => {
        const key = event.target.value
        setDefaultAttrName(key)
        setAvailableMethods(methods[events[key]])
    }

    const handleDefaultAttrMethod = (event) => {
        setDefaultMethod(event.target.value)
    }

    const handleAddClick = (event) => {
        let settings = eventRequest

        settings.events[eventAttrName] = method
        setEventRequest(settings)
        setMethod('default')
    }

    const handleDeleteClick = (item) => {
        let settings = eventRequest

        delete settings.events[item]
        setEventRequest(settings)
        setEventAttrName('default')
        setMethod('default')
    }

    return (
        <Box>
            {
                (props.payload === "NORMAL" && Object.entries(events).length !== 0) &&
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <Box pr={1}>
                        <InputLabel id="label">Event Attributes</InputLabel>
                        <Select labelId="label" value={eventAttrName} onChange={handleEventAttrChange}>
                            <MenuItem value="default" disabled>
                                Not Selected
                                </MenuItem>
                            {Object.keys(events).map((key, value) => (
                                <MenuItem value={key}>{key}</MenuItem>
                            ))}
                        </Select>
                    </Box>
                    {
                        (eventAttrName !== "default") &&
                        <Box pl={1}>
                            <InputLabel id="label">Extraction Methods</InputLabel>
                            <Select labelId="label" value={method} onChange={handleMethodChange}>
                                <MenuItem value="default" disabled>
                                    Not Selected
                                        </MenuItem>
                                {availableMethods.map((key, value) => (
                                    <MenuItem value={key}>{key}</MenuItem>
                                ))}
                            </Select>
                        </Box>
                    }
                    {
                        (method !== "default") &&
                        <Box pl={2} pt={2}>
                            <label htmlFor="contained-button-file">
                                <Button
                                    onClick={() => handleAddClick()}
                                    variant="contained"
                                    className={classes.submitButton}
                                    color="primary" >
                                    Add Method
                                    </Button>
                            </label>
                        </Box>
                    }
                </div>
            }
            <br></br>
            {visible ? <LinearProgress /> : null}
            <br></br>
            {
                (props.payload === "NORMAL") &&
                <Box>

                    <Typography> Event Default</Typography>
                    <br></br>
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <Box pl={1}>
                            <InputLabel id="label">Method</InputLabel>
                            <Select labelId="label" value={defaultMethod} onChange={handleDefaultAttrMethod}>
                                <MenuItem value="default" disabled>
                                    Not Selected
                                    </MenuItem>
                                {methods['literal'].map((key, value) => (
                                    <MenuItem value={key}>{key}</MenuItem>
                                ))}
                            </Select>
                        </Box>
                    </div>

                    <SettingsTable settings={eventRequest} defaultEventAttr={defaultAttrName} defaultMethod={defaultMethod} handleChange={handleDeleteClick} />

                </Box>
            }
        </Box>
    )
}


export default PureDataFeatures;
