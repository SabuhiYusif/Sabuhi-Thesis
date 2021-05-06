import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import './../../App.css';
import { Button, Slider, LinearProgress } from '@material-ui/core';
import Navigation from '../navigation/Navigation';
import Box from '@material-ui/core/Box';
import { downloadLog } from "../../actions/downloadActions";
import { useDispatch, useSelector } from "react-redux";
import { splitLog } from '../../actions/splitAction';
import Header from '../Header';
import AlertSuccess from '../alerts/AlertSuccess';
import SplitOrdering from './SplitOrdering';
import DownloadingFiles from './DownloadingFiles';
import KFold from './KFold';
import { fetchAllFiles } from '../../actions/filesActions';
import { currentFileDispatcher } from '../../helpers/currentFileDispatcher'

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

const marks = [
    {
        value: 0,
        label: '0',
    },
    {
        value: 20,
        label: '20',
    },
    {
        value: 100,
        label: '100',
    },
];

function valuetext(value) {
    return `${value}°C`;
}

function SplitLog() {
    const dispatch = useDispatch();
    const classes = useStyles();
    const request = useSelector(state => state.request)
    const alert = useSelector(state => state.alerts.alert);
    const [visible, setVisibility] = useState(false);
    const [kFold, setKFold] = useState(false);
    const [kValue, setKValue] = useState(5);
    const [splitMethod, setSplitMethod] = useState('sequential');
    const currentFile = useSelector(state => state.currentFile)
    const [splitPercentage, setSplitPercentage] = useState("20");

    useEffect(() => {
        if (request.status === 'LOADING' && request.service === 'SPLITTING') {
            setVisibility(true);
        }

        if (request.status === 'COMPLETED') {
            setVisibility(false);
        }

    }, [request]);

    useEffect(() => {
        dispatch(fetchAllFiles())
    }, []);

    const handleChange = (event) => {
        setSplitMethod(event.target.value);
    };

    const handleSliderChange = (_, newValue) => {
        setSplitPercentage(newValue);
    };

    const handleSubmitClick = () => {
        let fileName = currentFile
        if (kFold) {
            dispatch(splitLog(splitPercentage / 100, fileName, splitMethod, kValue))
        } else {
            dispatch(splitLog(splitPercentage / 100, fileName, splitMethod, 1))
        }
    }

    const handleDownloadClick = (currentFile) => {
        dispatch(downloadLog(currentFile))
    }

    const handleTrainDownloadClick = (currentFile) => {
        let file = currentFile + ""
        let trainFile = file.substring(0, file.length - 4) + "_train.xes"
        dispatch(downloadLog(trainFile))
    }

    const handleTestDownloadClick = (currentFile) => {
        let file = currentFile + ""
        let testFile = file.substring(0, file.length - 4) + "_test.xes"
        dispatch(downloadLog(testFile))
    }

    const handleCurrentFileChange = (event) => {
        currentFileDispatcher(dispatch, event.target.value);
    };

    const handleKFoldCheck = (event) => {
        if (kFold) {
            setKFold(false)
        } else {
            setKFold(true)
        }
    };

    const handleKInput = (event) => {
        setKValue(event.target.value)
    };

    return (
        <div className={classes.root}>
            <Navigation />
            <main className={classes.content}>
                <div className={classes.toolbar} />
                <Header
                    handleLogChange={handleCurrentFileChange}
                    currFile={currentFile}
                    title={"Split Log File"}
                />
                <br></br>
                <Typography id="discrete-slider-custom" gutterBottom>
                    Validation log percentage. Default 20% Min = 0%, Max = 100%, Step = 10%
                </Typography>
                <Slider
                    className={classes.slider}
                    defaultValue={20}
                    getAriaValueText={valuetext}
                    onChange={handleSliderChange}
                    aria-labelledby="discrete-slider-custom"
                    step={10}
                    valueLabelDisplay="auto"
                    marks={marks}>
                </Slider>
                <br></br>
                <br></br>
                <SplitOrdering splitMethod={splitMethod} handleChange={handleChange} />
                <br></br>
                <br></br>
                <KFold handleCheckChange={handleKFoldCheck} handleKNumber={handleKInput} kFold={kFold} />
                {
                    (alert.service === 'SPLITTING') &&
                    <AlertSuccess message={"File successfully splitted, filename:" + currentFile} />
                }
                <br></br>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <Box p={1}>

                        <label htmlFor="contained-button-file">
                            <Button
                                onClick={() => handleSubmitClick()}
                                variant="outlined"
                                className={classes.submitButton}
                                color="primary" >
                                Submit
                            </Button>
                        </label>
                    </Box>
                    {
                        (alert.service === 'SPLITTING') &&
                        <DownloadingFiles
                            currentFile={currentFile}
                            handleDownloadClick={handleDownloadClick}
                            handleTrainDownloadClick={handleTrainDownloadClick}
                            handleTestDownloadClick={handleTestDownloadClick}
                        />
                    }
                </div>
                {visible ? <LinearProgress /> : null}
            </main>
        </div>
    )
}

export default SplitLog;
