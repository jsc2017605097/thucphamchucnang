import React from 'react';
import { useIntl } from 'react-intl';
import Switch from 'react-switch';
import { FaHeart, FaBars,FaFacebookF } from 'react-icons/fa';
import reactLogo from './assets/logo.svg';
import { Switch as SwitchRoute, Route } from 'react-router-dom'
import Carousel from './client/carousel'
import { MdNewReleases } from 'react-icons/md'
import { BsFillPeopleFill } from 'react-icons/bs'
import {FiPhoneCall} from 'react-icons/fi'
import FloadButton from './components/button_float'
import Feedback from './client/feedback'

const products = [
  {
    title: "Thuc pham chuc nang",
    price: 100,
    description: "Thuc pham chuc nang khong phai la thuoc, khong thay the thuoc chua benh."
  },
  {
    title: "Thuc pham chuc nang",
    price: 100,
    description: "Thuc pham chuc nang khong phai la thuoc, khong thay the thuoc chua benh."
  },
  {
    title: "Thuc pham chuc nang",
    price: 100,
    description: "Thuc pham chuc nang khong phai la thuoc, khong thay the thuoc chua benh."
  },
  {
    title: "Thuc pham chuc nang",
    price: 100,
    description: "Thuc pham chuc nang khong phai la thuoc, khong thay the thuoc chua benh."
  }, {
    title: "Thuc pham chuc nang",
    price: 100,
    description: "Thuc pham chuc nang khong phai la thuoc, khong thay the thuoc chua benh."
  },
  {
    title: "Thuc pham chuc nang",
    price: 100,
    description: "Thuc pham chuc nang khong phai la thuoc, khong thay the thuoc chua benh."
  },
  {
    title: "Thuc pham chuc nang",
    price: 100,
    description: "Thuc pham chuc nang khong phai la thuoc, khong thay the thuoc chua benh."
  },
  {
    title: "Thuc pham chuc nang",
    price: 100,
    description: "Thuc pham chuc nang khong phai la thuoc, khong thay the thuoc chua benh."
  }
]

const Main = ({
  collapsed,
  handleToggleSidebar,
  handleCollapsedChange,
}) => {
  const intl = useIntl();
  return (
    <main>
      <div className="btn-toggle" onClick={() => handleToggleSidebar(true)}>
        <FaBars />
      </div>
      <header>
        <h1>
          <img width={80} src={reactLogo} alt="react logo" /> {intl.formatMessage({ id: 'title' })}
        </h1>
        <p>{intl.formatMessage({ id: 'description' })}</p>
        <div className="social-bagdes flex-start">
          <a href="tel:+84982839405" ><FloadButton size="small" color="secondary" icon={<FiPhoneCall />} /></a>
          <a target="_blank" href="https://facebook.com" ><FloadButton size="small" color="primary" icon={<FaFacebookF />} /></a>
        </div>
      </header>
      <div className="block ">
        <Switch
          height={16}
          width={30}
          checkedIcon={false}
          uncheckedIcon={false}
          onChange={handleCollapsedChange}
          checked={collapsed}
          onColor="#219de9"
          offColor="#bbbbbb"
        />
        <span> {intl.formatMessage({ id: 'collapsed' })}</span>
      </div>

      <SwitchRoute>
        <Route path="/">
          <div className=" margin-bottom-50 border">
            <div className="chude margin-bottom-10 flex-around">
              <div className="flex-start">
                <MdNewReleases />&nbsp;Sản phẩm mới
              </div>
              <div>
                <a style={{color:"#FFFFFF"}} href="#">Xem tất cả</a>
              </div>
            </div>
            <div>
              <Carousel products={products} />
            </div>
          </div>
          <div className="border">
            <div className="chude margin-bottom-10 flex-around ">
              <div className="flex-start">
                <BsFillPeopleFill />&nbsp;Sản phẩm phổ biến
              </div>
              <div>
                <a style={{color:"#FFFFFF"}} href="#">Xem tất cả</a>
              </div>
            </div>
            <div>
              <Carousel products={products} />
            </div>
          </div>
        </Route>
      </SwitchRoute>

      <Feedback />
 
      <footer>
        <small>
          © 2020 made with <FaHeart style={{ color: 'red' }} /> by -{' '}
          <a target="_blank" rel="noopener noreferrer" href="https://webhiendai.net">
            Webhiendai.net
          </a>
        </small>
        <br />
        <div className="social-bagdes">
          <a href="https://facebook.com/" target="_blank" rel="noopener noreferrer">
            <img
              style={{borderRadius:"50%"}}
              width="20px"
              alt="Fanpage Facebook"
              src="https://www.facebook.com/images/fb_icon_325x325.png"
            />
          </a>
        </div>
      </footer>
    </main>
  );
};

export default Main;
