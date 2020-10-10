import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
    root: {
        "& > *": {
            margin: theme.spacing(1)
        }
    }
}));
export default function ContainedButtons({ size, color, text, onClick }) {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Button size={size} color={color} variant="contained">
                {text}
            </Button>
        </div>
    );
}
