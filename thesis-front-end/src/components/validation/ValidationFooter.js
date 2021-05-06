import React from 'react';
import './../../App.css';
import { Box, Button, makeStyles} from '@material-ui/core';

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

function ValidationFooter(props) {
    const classes = useStyles();

    return (
        <div>
            <Box display="flex">
                <Box pr={1}>
                    <label htmlFor="contained-button-file">
                        <Button
                            onClick={props.handleSubmitClick}
                            variant="outlined"
                            className={classes.submitButton}
                            color="primary" >
                            Submit
                        </Button>
                    </label>
                </Box>
                <br></br>
                <br></br>
                <Box pl={1}>
                    <label htmlFor="contained-button-file">
                        <Button
                            onClick={props.handleDownloadClick}
                            variant="outlined"
                            className={classes.submitButton}
                            color="primary" >
                            Download
                    </Button>
                    </label>
                    <br></br>
                    <br></br>
                </Box>
            </Box>
        </div>
    )
}

export default ValidationFooter;
