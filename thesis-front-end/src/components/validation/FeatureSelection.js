import React from 'react';
import './../../App.css';
import { Box, RadioGroup, makeStyles, FormControlLabel, Radio, Typography, FormGroup, Checkbox } from '@material-ui/core';


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

function FeatureSelection(props) {
    const classes = useStyles();

    return (
        <Box display="flex">
            <Box mt={5} mr={5}>
                <RadioGroup onChange={props.handleFeatureChange} aria-label="quiz" name="quiz"  >
                    <FormControlLabel value="basic" control={<Radio />} label="Basic Features" />
                    <FormControlLabel value="data" control={<Radio />} label="Basic Features with Pure data feature" />
                    <FormControlLabel value="dwd" control={<Radio />} label="Data Aware Declare Constraints" />
                </RadioGroup>
            </Box>
            <Box p={1}>
                <Typography variant="h6" className={classes.title}>
                    Features to be used
                </Typography>
                <div className={classes.demo}>
                    <FormGroup >
                        {props.features.map((text, index) => (
                            <FormControlLabel
                                onChange={props.handleFeatureChecks}
                                control={<Checkbox name={text} />}
                                label={text}
                            />
                        ))}
                    </FormGroup>
                </div>
            </Box>
        </Box>
    )
}

export default FeatureSelection;
