import React from "react";
import { CgDetailsMore } from "react-icons/cg";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { Row, Col } from "reactstrap";
import Button from "@material-ui/core/Button";
import { useHistory,Link } from 'react-router-dom'
import './index.css'
import { useDispatch, useSelector } from 'react-redux'

export default function Detail({ product }) {
    let images = [];
    const history = useHistory()
    // React.useEffect(() => {
    //     const y = document.getElementById("banner").scrollHeight + document.getElementById("vechungtoi").scrollHeight
    //     window.scrollTo(0, y)
    // }, [])
    const dispatch = useDispatch()
    const category = useSelector(state => state.category)

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
        <div>
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
            <br />
            <div>
                <Row>
                    <Col style={{ paddingTop: "10px" }}
                     xs={{ size: 12, order: 2}}
                      sm={{ size: 6, order: 2}} 
                      lg={{ size: 6, order: 2}} 
                      xl={{ size: 6, order: 1}}>
                        <ImageGallery items={images} />
                    </Col>
                    <Col style={{ paddingTop: "10px" }} 
                    xs={{ size: 12, order: 3}} 
                    sm={{ size: 6, order: 3}} 
                    lg={{ size: 6, order: 3}} 
                    xl={{ size: 3, order: 2}}>
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
                    <Col xs={{ size: 12, order: 1 }}
                     sm={{ size: 12, order: 1}} 
                     lg={{ size: 12, order: 1}} 
                     xl={{ size: 3, order: 3}}>
                        <h4>Danh mục sản phẩm</h4>
                        <div className="list-group">
                            {category.map((c, key) => <Link
                                key={key} to={'/category/' + c._id}
                                className={c._id === product.category ? "list-group-item active" : "list-group-item"}
                            >
                                {c.name}
                                </Link>
                            )}
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
