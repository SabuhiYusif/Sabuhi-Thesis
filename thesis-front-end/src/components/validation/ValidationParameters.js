import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import './../../App.css';
import { List, Box, ListItem, ListItemText, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    demo: {
        backgroundColor: theme.palette.background.paper,
        width: 500
    },
}));

function ValidationParameters(props) {
    const classes = useStyles();
    const params = props.parameters[0]

    return (
        <Box>
            <Typography variant="h6" className={classes.title}>
                Used Parameters
            </Typography>
            <div className={classes.demo}>
                <List>
                    {Object.keys(params).map((key, index) => (
                        <ListItem>
                            <ListItemText
                                primary={`${key} : ${params[key]}`}
                            />
                        </ListItem>
                    ))}
                </List>
            </div>
        </Box >
    )
}

export default ValidationParameters;

