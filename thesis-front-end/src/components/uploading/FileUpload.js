import React from 'react';
import { makeStyles, } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';
import { getInitialStats } from "../../actions/statsActions";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import './../../App.css';
import Header from '../Header';
import { showProgressBar } from '../progressBar/showProgressBar';
import Navigation from '../navigation/Navigation';
import { GET_FILES } from '../../actions/types';
import InitialStats from './InitialStats';
import { fetchAllFiles } from '../../actions/filesActions';
import { currentFileDispatcher } from '../../helpers/currentFileDispatcher'
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
    submitButton: {
        marginLeft: 16
    },
    proggressBar: {
        display: 'none',
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
    root: {
        marginLeft: 80,
    }
}));

function FileUpload() {
    const dispatch = useDispatch();
    const initialStats = useSelector(state => state.stats.initialStats)
    const errors = useSelector(state => state.errors)
    const request = useSelector(state => state.request)
    const currentFile = useSelector(state => state.currentFile)
    const [visible, setVisibility] = useState(false);

    useEffect(() => {
        dispatch(fetchAllFiles())
    }, []);

    useEffect(() => {
        
    }, [currentFile]);

    useEffect(() => {
        if (request.status === 'LOADING' && request.service === 'UPLOADING') {
            setVisibility(true);
        }

        if (request.status === 'COMPLETED') {
            setVisibility(false);
        }

    }, [request]);

    const classes = useStyles();
    const handleUploadClick = (event) => {
        showProgressBar(dispatch, 'UPLOADING')
        const fileName = event.target.files[0];
        dispatch({
            type: GET_FILES,
            payload: { [fileName.name]: "" }
        })

        dispatch(getInitialStats(fileName))
        currentFileDispatcher(dispatch, fileName.name)
    }

    const handleCurrentFileChange = (event) => {
        currentFileDispatcher(dispatch, event.target.value)
    };

    return (
        <div className={classes.root}>
            <Navigation />
            <main className={classes.content}>
                <div className={classes.toolbar} />
                <Header
                    handleLogChange={handleCurrentFileChange}
                    currFile={currentFile}
                    title={"Upload a log file"}
                >
                </Header>
                <br></br>
                {errors.error &&
                    <Alert
                        severity="error">{errors.error}
                    </Alert>
                }
                <br></br>
                <Typography paragraph>
                    Only .xes files are supported at the moment
                </Typography>
                <br></br>
                <input
                    id="contained-button-file"
                    type="file"
                    name="filee"
                    className={classes.input}
                    onChange={handleUploadClick}
                />
                <Button
                    variant="outlined"
                    color="primary"
                    className={classes.submitButton}>
                    Submit
                </Button>

                <Button
                    variant="outlined"
                    color="default"
                    className={classes.submitButton}>
                    Reset
                </Button>

                {visible ? <LinearProgress /> : null}
                <br></br>
                <br></br>
                <InitialStats initialStats={initialStats} />
            </main>
        </div>
    )
}

export default FileUpload;
