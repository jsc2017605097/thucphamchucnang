import React from 'react';
import { useIntl } from 'react-intl';
import Switch from 'react-switch';
import { FaBars, FaFacebookF } from 'react-icons/fa';
import { Switch as SwitchRoute, Route } from 'react-router-dom'
import Carousel from './client/carousel'
import { MdNewReleases } from 'react-icons/md'
import { BsFillPeopleFill } from 'react-icons/bs'
import { FiPhoneCall } from 'react-icons/fi'
import FloadButton from './components/button_float'
import Feedback from './client/feedback'
import './index.css'
import Detail from './client/detail'
import Cart from './client/cart'
import Footer from './client/footer'
import Slide from './client/slide'
import ListCard from './client/list_card'

import { useRouteMatch, Link } from 'react-router-dom'

import { useSelector } from 'react-redux'

const Main = ({
  collapsed,
  handleToggleSidebar,
  handleCollapsedChange,
}) => {
  const intl = useIntl();


  const matchDetail = useRouteMatch('/product/:id')
  const matchCategory = useRouteMatch('/category/:id')


  const products = useSelector(state => state.product)
  const category = useSelector(state => state.category)
  const data = useSelector(state => state.data)

  let productDetail
  let product_for_category
  let name_category
  let product_new = [...products]
  let product_all = shuffle(products)

  product_new.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))

  if (matchDetail) {
    productDetail = products.find(product => product._id === (matchDetail.params.id))
  }
  if (matchCategory) {
    product_for_category = products.filter(product => product.category === (matchCategory.params.id))
    name_category = category.length > 0 ? (category.find(c => c._id === matchCategory.params.id)).name : ''
  }

  function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }


  return (
    <main>
      <div className="btn-toggle" onClick={() => handleToggleSidebar(true)}>
        <FaBars />
      </div>
      <header>
        <h1 style={{ fontWeight: "bold" }}>
          <Link style={{ textDecoration: "none" }} to='/'><img style={{ borderRadius: "50%" }} width={120} src={data.logo} alt={data.logo} /> {data.title}</Link>
        </h1>
        <p>{data.description}</p>
        <div className="social-bagdes flex-start">
          <a href={data.phone} ><FloadButton size="small" color="secondary" icon={<FiPhoneCall />} /></a>
          <a target="_blank" rel="noopener noreferrer" href={data.hasOwnProperty("social") ? data.social.facebook : '/'} ><FloadButton size="small" color="primary" icon={<FaFacebookF />} /></a>
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
        <Route path='/cart'>
          <Cart />
        </Route>

        <Route path='/product/:id'>
          <Detail product={productDetail} />
        </Route>

        <Route path='/category/:id'>
          <ListCard products={product_for_category} name_category={name_category} />
        </Route>

        <Route path='/new'>
          <ListCard products={product_new} name_category={"Sản phẩm mới"} />
        </Route>

        <Route path="/all">
          <ListCard products={product_all} name_category={"Tất cả sản phẩm"} />
        </Route>
        <Route path="/">
          <Slide />
          <br />

          <div className=" margin-bottom-50 border">
            <div className="chude margin-bottom-10 flex-around">
              <div className="flex-start">
                <MdNewReleases />&nbsp;Hàng mới về
              </div>
              <div>
                <Link style={{ color: "#FFFFFF" }} to="/new">Xem tất cả</Link>
              </div>
            </div>
            <div style={{ padding: "20px" }}>
              <Carousel products={product_new} />
            </div>
          </div>


          <div className="border">
            <div className="chude margin-bottom-10 flex-around ">
              <div className="flex-start">
                <BsFillPeopleFill />&nbsp;Sản phẩm phổ biến
              </div>
              <div>
                <Link style={{ color: "#FFFFFF" }} to="/all">Xem tất cả</Link>
              </div>
            </div>
            <div style={{ padding: "20px" }}>
              <Carousel products={products} />
            </div>
          </div>
        </Route>
      </SwitchRoute>
      <br />
      <br />
      <Feedback feedback={data.feedback} />
      <Footer data={data} />
    </main>
  );
};

export default Main;
