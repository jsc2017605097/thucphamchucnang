
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Sale from '../sale'
import './index.css'
const useStyles = makeStyles({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 140,
    },
});

export default function MediaCard({ product }) {
    const classes = useStyles();

    return (
        <Card className={classes.root +' myCard'}>
            <CardActionArea>
                <CardMedia
                    className={classes.media}
                    image="https://ecogreen.com.vn/image/cache/catalog/product/eco-otiv-500x500.jpg"
                    title="Contemplative Reptile"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {product.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {product.description}
                    </Typography>
                    <Typography>
                        {product.price}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size="small" color="primary">
                    Chi tiết
                </Button>
                <Button size="small" color="primary">
                    Mua hàng
                </Button>
            </CardActions>
            <Sale value="-20%" />
        </Card>
    );
}