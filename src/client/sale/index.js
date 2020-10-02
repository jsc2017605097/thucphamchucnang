import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import './index.css'

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

export default function FloatingActionButtons({value}) {
    const classes = useStyles();

    return (
        <div className={classes.root +' sale'}>
            <Fab size="small" color="secondary" aria-label="edit">
                {value}
            </Fab>
        </div>
    );
}