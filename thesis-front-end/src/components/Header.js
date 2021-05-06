import React from 'react';
import { makeStyles, } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import './../App.css';
import { useSelector } from "react-redux";
import { Box, FormControl, MenuItem, Select } from '@material-ui/core';

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

function Header(props) {
    const classes = useStyles();
    const files = useSelector(state => state.files)

    const logChange = (event) => {
        props.handleLogChange(event)
    }
    const currentFile = props.currFile
    return (
        <div style={{ display: 'flex', flexDirection: 'row' }}>
            <Box p={1}>
                <Typography variant="h4">
                    {props.title}
                </Typography>
            </Box>
            <Box p={1}>
                <FormControl className={classes.formControl}>
                    <Select labelId="label" id="filesSelect" value={currentFile} onChange={logChange}>
                        {files.map((text, index) => (
                            <MenuItem value={Object.keys(text)[0]}>{Object.keys(text)[0]}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>
        </div>
    )
}

export default Header;
