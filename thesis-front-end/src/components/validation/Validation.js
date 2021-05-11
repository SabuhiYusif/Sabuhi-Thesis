import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import './../../App.css';
import { Box, Divider, TextField } from '@material-ui/core';
import Navigation from '../navigation/Navigation';
import { getFullStats } from "../../actions/validatingActions";
import { getResults } from "../../actions/validatingActions";
import { downloadLog } from "../../actions/downloadActions";
import { useDispatch, useSelector } from "react-redux";
import Header from '../Header';
import { fetchEventAttrNames } from '../../actions/attributeActions';
import PureDataFeatures from './PureDataFeatures';
import { fetchAllFiles } from '../../actions/filesActions';
import ValidationResults from './ValidationResults';
import ValidationFooter from './ValidationFooter'
import Alert from '@material-ui/lab/Alert';
import ClassifierSelection from './ClassifierSelection';
import FeatureSelection from './FeatureSelection';
import ResetAllFiles from '../reset/ResetAllFiles';
import { currentFileDispatcher } from '../../helpers/currentFileDispatcher'
import { GET_ERRORS } from '../../actions/types';
import { closeErrors } from '../../helpers/closeErrors';


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

function Validation() {
    const dispatch = useDispatch();
    const classes = useStyles();
    const stats = useSelector(state => state.stats)
    const events = useSelector(state => state.events.attributeNames)
    const request = useSelector(state => state.request)
    const errors = useSelector(state => state.errors)
    const currentFile = useSelector(state => state.currentFile)
    const files = useSelector(state => state.files)
    const [payload, setPayload] = useState("")
    const [features, setFeatures] = useState([])
    const [_, setVisibility] = useState(false);
    const [classifier, setClassifier] = useState("DECISION_TREE");
    const [maxDepth, setMaxDepth] = useState(10);
    const [minSamples, setMinSamples] = useState(5);
    const [coverageThreshold, setCoverage] = useState(5)

    const basicFeatures = ['IA', 'Declare', 'IA + MR', 'IA + MRA', 'IA + TR', 'IA + TRA', 'Hybrid']
    const pureDataFeatures = ['IA + data', 'Declare + data', 'IA + MR + data', 'IA + MRA + data', 'IA + TR + data', 'IA + TRA + data', 'Hybrid + data']
    const dwdFeatures = ['IA', 'Declare', 'Declare + data', 'Declare + dwd', 'Declare + dwd + data', 'Hybrid', 'Hybrid + data', 'Hybrid + dwd', 'Hybrid + dwd + data']


    useEffect(() => {
        dispatch(fetchAllFiles("VALIDATION"))
        if (currentFile !== "") {
            currentFileDispatcher(dispatch, currentFile);
        }
    }, []);

    useEffect(() => {
        if (request.status === 'LOADING' && request.service === 'VALIDATING') {
            setVisibility(true);
        }

        if (request.status === 'COMPLETED') {
            setVisibility(false);
        }

    }, [request]);


    const handleSubmitClick = () => {
        var resultFile = files.find(obj => Object.keys(obj)[0] == currentFile);
        dispatch(getFullStats(currentFile, payload, classifier, maxDepth, minSamples, coverageThreshold, resultFile))
    }

    const handleDownloadClick = (event) => {
        dispatch(downloadLog())
    }

    const handleCurrentFileChange = (event) => {
        var resultFile = files.find(obj => Object.keys(obj)[0] === event.target.value);
        console.log(resultFile)
        dispatch(getResults(resultFile))
        currentFileDispatcher(dispatch, event.target.value);
    };

    const handleFeatureChange = (event) => {
        let value = event.target.value
        if (value === "basic") {
            setFeatures(basicFeatures)
            setPayload("DEFAULT")
        } else if (value === "data") {
            setFeatures(pureDataFeatures)
            setPayload("NORMAL")
            dispatch(fetchEventAttrNames(currentFile))
        } else if (value === "dwd") {
            setFeatures(dwdFeatures)
            setPayload("BOTH")
        }
    }

    const handleClassifierChange = (event) => {
        setClassifier(event.target.value)
    }

    const handleMaxDepthChange = (event) => {
        setMaxDepth(event.target.value)
    }

    const handleMinSamplesChange = (event) => {
        setMinSamples(event.target.value)
    }

    const handleCoverageChange = (event) => {
        setCoverage(event.target.value)
    }

    const handleFeatureChecks = (event) => {
        console.log(event.target.name)
    }

    const handleAlertClose = (event) => {
        closeErrors(dispatch)
    }
    return (
        <div className={classes.root}>
            <Navigation />
            <main className={classes.content}>
                <div className={classes.toolbar} />
                {/* <Box> */}
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <Box pr={1}>
                        <Header
                            handleLogChange={handleCurrentFileChange}
                            currFile={currentFile}
                            title={"Validation"}
                        />
                    </Box>
                    <Box pr={1}>

                        <ResetAllFiles />
                    </Box>
                </div>
                {errors.error &&
                    <Alert
                        onClose={handleAlertClose}
                        severity="error">{errors.error}
                    </Alert>
                }
                <br></br>
                <FeatureSelection
                    handleFeatureChecks={handleFeatureChecks}
                    handleFeatureChange={handleFeatureChange}
                    features={features}
                />
                <br></br>
                <br></br>
                <PureDataFeatures
                    payload={payload}
                    events={events}
                />

                <ClassifierSelection
                    handleClassifierChange={handleClassifierChange}
                    handleMaxDepthChange={handleMaxDepthChange}
                    handleMinSamplesChange={handleMinSamplesChange}
                    maxDepth={maxDepth}
                    minSamples={minSamples}
                    classifier={classifier}
                />
                <br></br>
                <Divider />
                <br></br>
                <TextField
                    required
                    id="outlined-number"
                    label="Coverage Threshold"
                    defaultValue={coverageThreshold}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    onChange={handleCoverageChange}
                    variant="outlined"
                />

                <br></br>
                <br></br>
                <ValidationFooter
                    handleSubmitClick={handleSubmitClick}
                    handleDownloadClick={handleDownloadClick}
                />
                <ValidationResults stats={stats.results} />
            </main>
        </div >
    )
}


export default Validation;
