import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    extendedIcon: {
        marginRight: theme.spacing(1),
    },
}));

export default function FloatingActionButtons({color,icon,size}) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Fab color={color} aria-label="add" size={size}>
                {icon}
            </Fab>
        </div>
    );
}