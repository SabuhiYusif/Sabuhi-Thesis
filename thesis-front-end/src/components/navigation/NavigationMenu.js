import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PublishIcon from '@material-ui/icons/Publish';
import LabelIcon from '@material-ui/icons/Label';
import CallSplitIcon from '@material-ui/icons/CallSplit';
import InsertChartIcon from '@material-ui/icons/InsertChart';
import HomeIcon from '@material-ui/icons/Home';
import './../../App.css';
import { MenuItem } from '@material-ui/core';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    menuButton: {
      marginRight: 36,
    },
    hide: {
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
  }));
  
function NavigationMenu() {
    const classes = useStyles();
    return (
        <div className={classes.root}>
        <List>
            <MenuItem component={Link} to={""} button key={""}>
                <ListItemIcon><HomeIcon /></ListItemIcon>
                <ListItemText primary={"Home"} />
            </MenuItem>
            <MenuItem component={Link} to={"uploading"} button key={"Upload"}>
                <ListItemIcon><PublishIcon /></ListItemIcon>
                <ListItemText primary={"Upload Log"} />
            </MenuItem>
            <MenuItem component={Link} to={"splitting"} button key={"Split"}>
                <ListItemIcon><CallSplitIcon /></ListItemIcon>
                <ListItemText primary={"Split Log"} />
            </MenuItem>
            <MenuItem component={Link} to={"labelling"} button key={"Label"}>
                <ListItemIcon><LabelIcon /></ListItemIcon>
                <ListItemText primary={"Label Log"} />
            </MenuItem>
            <MenuItem component={Link} to={"validating"} button key={"Validate"}>
                <ListItemIcon><InsertChartIcon /></ListItemIcon>
                <ListItemText primary={"Validate Log"} />
            </MenuItem>
        </List>
        </div>
    );
}

export default NavigationMenu;
