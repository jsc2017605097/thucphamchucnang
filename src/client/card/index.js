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
import { Link, useHistory } from 'react-router-dom'

import { useDispatch } from 'react-redux'

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
    const dispatch = useDispatch()
    const history = useHistory()

    function xemGioHang() {
        if (window.confirm("Đã thêm vào giỏ hàng. Chọn OK để xem giỏ hàng.")) {
            history.push('/cart')
        }
    }
    return (
        <Card className={classes.root + ' myCard'}>
            <CardActionArea className='cardChildren'>
                <CardMedia
                    className={classes.media}
                    image={product.img[0]}
                    title="Contemplative Reptile"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {product.name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {product.description}
                    </Typography>

                </CardContent>
            </CardActionArea>
            <div style={{ paddingLeft: "10px", color: "red" }}>
                {product.price} <sup>đ</sup>
            </div>
            <CardActions>

                <Link to={'/product/' + product._id}>
                    <Button size="small" color="primary" variant="outlined">
                        Chi tiết
                    </Button>
                </Link>
                <Button onClick={() => { dispatch({ type: "ADD_TO_CART", data: product }); xemGioHang() }} size="small" color="primary" variant="contained">
                    Mua hàng
                </Button>

            </CardActions>
            { product.price < product.price_old && <Sale value={Math.ceil(((product.price - product.price_old) / product.price_old) * 100) + '%'} />}
        </Card>
    );
}