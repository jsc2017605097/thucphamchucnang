import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';

import { composeWithDevTools } from 'redux-devtools-extension'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'

import productReducer from './reducer/product'
import cartReducer from './reducer/cart'
import danhmucReducer from './reducer/danhmuc'

const check_get_product = (state = false, action)=>{
  switch(action.type){
    case 'GET_PRODUCT_TRUE':
      return true
    default:
      return state
  }
}

const reducer = combineReducers({
  product: productReducer,
  category: danhmucReducer,
  cart: cartReducer,
  check_get_product:check_get_product
})
const store = createStore(reducer, composeWithDevTools())

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root'),
);
