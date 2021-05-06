import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import './../../App.css';
import { Button } from '@material-ui/core';
import { useDispatch} from 'react-redux';
import { resetAll } from '../../actions/resetActions';

const useStyles = makeStyles((theme) => ({
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    },
    root: {
        marginLeft: 80,
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

function ResetAllFiles() {
    const classes = useStyles();
    const dispatch = useDispatch();

    const handleSubmitClick = () => {
        dispatch(resetAll())
    }

    return (
        <div>
            <label htmlFor="contained-button-file">
                <Button
                    onClick={() => handleSubmitClick()}
                    variant="outlined"
                    className={classes.submitButton}
                    color="primary" >
                    Reset All
                </Button>
            </label>
        </div>
    )
}

export default ResetAllFiles;
