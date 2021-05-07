import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, FormControl, FormControlLabel, FormLabel, LinearProgress, Radio, RadioGroup, TextField } from '@material-ui/core';
import Navigation from '../navigation/Navigation';
import { useState, useEffect } from "react";
import { getAttrNamesOfLog, getAttrValuesOfLog } from "../../actions/attributeActions";
import { downloadLog } from "../../actions/downloadActions";
import { labelLog, setLabelingMethod } from "../../actions/labelingAction";
import Box from '@material-ui/core/Box';
import { useDispatch, useSelector } from "react-redux";
import Header from '../Header';
import LabelingMethodSelector from './LabelingMethodSelector';
import AttributeNameSelector from './AttributeNameSelector';
import AttributeValueSelector from './AttributeValueSelector';
import Alert from '@material-ui/lab/Alert';
import { currentFileDispatcher } from '../../helpers/currentFileDispatcher'
import AlertSuccess from '../alerts/AlertSuccess';
import { GET_ATTR_NAMES, GET_ATTR_VALUES } from '../../actions/types';
import { fetchAllFiles } from '../../actions/filesActions';


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
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    slider: {
        marginTop: 16,
        width: 300
    }
}));

function Labeling() {
    const dispatch = useDispatch();
    const classes = useStyles();
    const attrNames = useSelector(state => state.traceAttributes.attrNames)
    const attrValues = useSelector(state => state.traceAttributes.attrValues)
    const [greater, setGreater] = useState(false)
    const [smaller, setSmaller] = useState(false)
    const request = useSelector(state => state.request)
    const labelingMethod = useSelector(state => state.stats.labelingMethod)
    const alert = useSelector(state => state.alerts.alert);
    const currentFile = useSelector(state => state.currentFile)
    const [attrMethod, setAttrMethod] = useState('default');
    const [attrValue, setAttrValue] = useState('default');
    const [meanValue, setMeanValue] = useState(0);
    const [operator, setOperator] = useState("equals");
    const [visible, setVisibility] = useState(false);

    useEffect(() => {
        if (attrValues.length !== 0 && labelingMethod === 'numerical') {
            let ints = attrValues.map(function (item) {
                return parseInt(item, 10);
            })
            let sum = ints.reduce((a, b) => a + b, 0)
            setMeanValue(sum / attrValues.length)
        }

    }, [attrValues]);

    useEffect(() => {
        if (attrValues.length === 0 && attrNames.length === 0) {
            dispatch(setLabelingMethod('default'))
        }
    }, []);

    useEffect(() => {
        dispatch(fetchAllFiles())
        if (currentFile !== "") {
            currentFileDispatcher(dispatch, currentFile);
        }
    }, []);

    useEffect(() => {
        if (request.status === 'LOADING' && request.service === 'LABELING') {
            setVisibility(true);
        }

        if (request.status === 'COMPLETED') {
            setVisibility(false);
        }

    }, [request]);

    const handleLabelingMethodChange = (event) => {
        dispatch(setLabelingMethod(event.target.value));
        if (currentFile !== '') {
            dispatch({
                type: GET_ATTR_VALUES,
                payload: []
            })
            dispatch({
                type: GET_ATTR_NAMES,
                payload: []
            })
            dispatch(getAttrNamesOfLog(currentFile, event.target.value));
        }
        setOperator("equals")
        setAttrMethod("default")
        setAttrValue("default")
    };

    const handleAttrChange = (event) => {
        setAttrMethod(event.target.value);
        dispatch(getAttrValuesOfLog(currentFile, event.target.value))
    };

    const handleAttrValueChange = (event) => {
        setAttrValue(event.target.value);
    };

    const handleSubmitClick = () => {
        dispatch(labelLog(currentFile, labelingMethod, attrMethod, attrValue, greater, smaller))
    }

    const handleDownloadClick = () => {
        dispatch(downloadLog(currentFile))
    }

    const handleCurrentFileChange = (event) => {
        currentFileDispatcher(dispatch, event.target.value);
    };

    const handleComparisionChange = (event) => {
        let value = event.target.value
        setOperator(value)
        if (value === 'greater than') {
            setGreater(true)
            setSmaller(false)
        } else if (value === 'smaller than') {
            setSmaller(true)
            setGreater(false)
        } else if (value === "equals") {
            setSmaller(false)
            setGreater(false)
        }
    }

    const handleCustomValueChange = (event) => {
        let value = event.target.value
        setAttrValue(value)
    }
    return (
        <div className={classes.root}>
            <Navigation />
            <main className={classes.content}>
                <div className={classes.toolbar} />
                <Header
                    handleLogChange={handleCurrentFileChange}
                    currFile={currentFile}
                    title={"Labeling Log File"}
                />
                <br></br>
                <br></br>
                <LabelingMethodSelector
                    handleChange={handleLabelingMethodChange}
                    labelingMethod={labelingMethod}
                    label={"Labeling Method"}
                ></LabelingMethodSelector>
                <br></br>
                <br></br>
                {visible ? <LinearProgress /> : null}
                {
                    (attrNames.length !== 0) &&
                    (
                        <AttributeNameSelector
                            handleChange={handleAttrChange}
                            attrNames={attrNames}
                            attrMethod={attrMethod}
                            label={"Attribute Names"}
                        ></AttributeNameSelector>
                    )
                }
                <br></br>
                <br></br>
                {
                    (attrValues.length !== 0) &&
                    (
                        <AttributeValueSelector
                            handleChange={handleAttrValueChange}
                            attrValues={attrValues}
                            attrValue={attrValue}
                            meanValue={meanValue}
                            label={"Attribute Values"}
                        ></AttributeValueSelector>
                    )
                }
                <br></br>
                <br></br>
                <Box>
                    {
                        ((labelingMethod === "numerical" || labelingMethod === "temporal") && attrValues.length > 0) &&
                        <FormControl component="fieldset" error="ERROR" className={classes.formControl}>
                            <FormLabel component="legend">Mark deviant if attribute value is...</FormLabel>
                            <RadioGroup onChange={handleComparisionChange} aria-label="quiz" name="quiz"  >
                                <FormControlLabel value="equals" control={<Radio />} label="Equals to selected/custom threshold" />
                                <FormControlLabel value="greater than" control={<Radio />} label="Greater than to selected/custom threshold" />
                                <FormControlLabel value="smaller than" control={<Radio />} label="Smaller than to selected/custom threshold" />
                            </RadioGroup>
                            {(labelingMethod === "numerical") &&
                                <TextField helperText="Mean value will be selected if not specified"
                                    id="outlined-basic" label="Custom Threshold" variant="outlined"
                                    onChange={handleCustomValueChange}>
                                </TextField>
                            }
                        </FormControl>
                    }
                </Box>
                <br></br>

                {(attrMethod !== 'default' && attrValue !== 'default' && !alert.isSuccessfull && alert.service !== 'LABELING') &&
                    <Alert severity="info">Pressing <b>Submit</b> button Traces with Attribute name: <b>{attrMethod}</b> {operator} <b>{attrValue}</b> will labeled as <b>DEVIANT</b> </Alert>
                }
                {
                    (alert.service === 'LABELING') &&
                    <AlertSuccess message={"Traces with Attribute name: " + attrMethod + " and Attribute value: " + attrValue + "successfully labeled as deviant, filename: " + currentFile} />
                }
                <br></br>
                <label htmlFor="contained-button-file">
                    <Button
                        onClick={() => handleSubmitClick()}
                        variant="outlined"
                        className={classes.submitButton}
                        color="primary" >
                        Submit
                    </Button>
                </label>
                <br></br>
                <br></br>

                <label htmlFor="contained-button-file">
                    <Button
                        onClick={() => handleDownloadClick()}
                        variant="outlined"
                        className={classes.submitButton}
                        color="primary" >
                        Download
                    </Button>
                </label>
            </main>
        </div>
    )
}

export default Labeling;
