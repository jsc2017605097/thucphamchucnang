import React from "react";
import { CgDetailsMore } from "react-icons/cg";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { Row, Col } from "reactstrap";
import Button from "@material-ui/core/Button";
import { useHistory } from 'react-router-dom'
import './index.css'
import { useDispatch } from 'react-redux'

export default function Detail({ product }) {
    let images = [];
    const history = useHistory()
    // React.useEffect(() => {
    //     const y = document.getElementById("banner").scrollHeight + document.getElementById("vechungtoi").scrollHeight
    //     window.scrollTo(0, y)
    // }, [])
    const dispatch = useDispatch()

    if (!product) {
        return (
            <div style={{ marginTop: "20px" }} className="flex">
                Loading...
            </div>
        );
    }
    if (product) {
        document.title = product.name;
        product.img.forEach((img) => {
            images.push({
                original: img,
                thumbnail: img
            });
        });
    }

    function xemGioHang() {
        if (window.confirm("Đã thêm vào giỏ hàng. Chọn OK nếu muốn xem giỏ hàng")) {
            history.push('/cart')
        }
    }

    return (
        <div style={{ marginTop: "20px" }}>
            <div
                style={{
                    padding: "10px",
                    background: "#3f51b5",
                    color: "#FFFFFF",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start"
                }}
            >
                <CgDetailsMore /> &nbsp; Chi tiết sản phẩm
            </div>
            <div>
                <Row>
                    <Col style={{ paddingTop: "10px" }} xs="12" sm="6" lg="6" xl="4">
                        <ImageGallery items={images} />
                    </Col>
                    <Col style={{ paddingTop: "10px" }} xs="12" sm="6" lg="6" xl="8">
                        <h3>{product.name}</h3>
                        <p>{product.description}</p>
                        <span style={{ color: "red", fontWeight: "bold" }}>
                            {new Intl.NumberFormat().format(product.price)} VNĐ
                        </span>
                        <div>
                            <Button variant="contained" color="primary"
                                onClick={() => {
                                    dispatch({ type: "ADD_TO_CART", data: product });
                                    xemGioHang()
                                }}>
                                Mua hàng
                            </Button>
                            &nbsp;
                            <Button variant="outlined" color="primary" onClick={() => history.goBack()}>
                                Trở về
                            </Button>
                            &nbsp;
                            <Button variant="outlined" color="secondary" onClick={() => history.push('/cart')}>
                                giỏ hàng
                            </Button>
                        </div>
                    </Col>
                </Row>
                <div
                    style={{ padding: "10px" }}
                    dangerouslySetInnerHTML={{ __html: product.detail }}
                ></div>
            </div>
        </div>
    );
}