import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import './../../App.css';
import Navigation from '../navigation/Navigation';
import { Box, List, ListItem, ListItemText, Typography } from '@material-ui/core';
import NavigationMenu from '../navigation/NavigationMenu';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        backgroundColor: theme.palette.background.paper,
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
    demo: {
        backgroundColor: theme.palette.background.paper,
    },
}));

function Home() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Navigation />
            <main className={classes.content}>
                <div className={classes.toolbar} />
                <br></br>

                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <Box p={1} width={600} justifyContent="center">
                        <Typography variant="h4">
                            Business process deviance mining
                        </Typography>
                        <br></br>
                        <Typography variant="subtitle1">
                            The steps from uploading to evaluating the log files are shown below:
                            
                        </Typography>
                        <div className={classes.demo}>
                            <List>
                                <ListItem>
                                    <ListItemText primary="Upload the log file"/>
                                </ListItem>

                                <ListItem>
                                    <ListItemText primary="Split or use kFold cross-validation"/>
                                </ListItem>

                                <ListItem>
                                    <ListItemText primary="Label log files"/>
                                </ListItem>

                                <ListItem>
                                    <ListItemText primary="Train and evaluate using feature groups"/>
                                </ListItem>
                            </List>
                        </div>
                    </Box>
                </div>
                <Box color="primary.main" >
                    <NavigationMenu />
                </Box>
            </main>

        </div>
    )
}

export default Home;
