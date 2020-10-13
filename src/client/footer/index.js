import React from "react";
import "./index.css";
import FacebookIcon from "@material-ui/icons/Facebook";
import TwitterIcon from "@material-ui/icons/Twitter";
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

export default function Footer() {
    const category = useSelector(state => state.category)

    return (
        <footer id='contact' className="site-footer">
            <div className="container">
                <div className="row">
                    <div className="col-sm-12 col-md-6">
                        <h6>Về chúng tôi</h6>
                        <p className="text-justify"></p>
                        <div>
                            Địa chỉ: xã Hợp Tiến, huyện Mỹ Đức,
                            thành phố Hà Nội.
            </div>
                        <div style={{ color: "red" }}>
                            Số điện thoại: 0333.02.5556 hoặc 0334985555
            </div>
                        <div>
                            Facebook:{" "}
                            <a
                                rel="noopener noreferrer"
                                target="_blank"
                                href="https://www.facebook.com/CuahangVuadogo"
                            >
                                https://www.facebook.com/
              </a>
                        </div>
                    </div>
                    <div className="col-xs-6 col-md-3">
                        <h6>Danh mục</h6>
                        <ul className="footer-links">
                            {
                                category.map((c,key) => <li key={key}><Link to={'/category/' + c._id}>{c.name}</Link></li>)
                            }
                        </ul>
                    </div>
                    <div className="col-xs-6 col-md-3">
                        <h6>Tài khoản ngân hàng</h6>
                        <ul className="footer-links">
                            <li>Chủ tài khoản: Đặng Văn Phương</li>
                            <li>Agribank: 2205205283289</li>
                            <li>Ngân hàng ACB: 916288888</li>
                        </ul>
                    </div>
                </div>
                <hr />
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-md-8 col-sm-6 col-xs-12">
                        <p className="copyright-text">
                            Copyright © 2020 All Rights Reserved by
              <a
                                rel="noopener noreferrer"
                                target="_blank"
                                href="https://webhiendai.net"
                            >
                                {" "}
                Webhiendai.net
              </a>
              .
            </p>
                    </div>
                    <div className="col-md-4 col-sm-6 col-xs-12">
                        <ul className="social-icons">
                            <li>
                                <a
                                    rel="noopener noreferrer"
                                    target="_blank"
                                    className="https://react-icons.github.io/search"
                                    href="https://www.facebook.com/CuahangVuadogo"
                                >
                                    <FacebookIcon />
                                </a>
                            </li>
                            <li>
                                <a
                                    rel="noopener noreferrer"
                                    target="_blank"
                                    className="https://react-icons.github.io/search"
                                    href="twitter.com"
                                >
                                    <TwitterIcon />
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    );
}
