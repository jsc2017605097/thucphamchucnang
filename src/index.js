import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';

import { composeWithDevTools } from 'redux-devtools-extension'
import { createStore,combineReducers} from 'redux'
import {Provider} from 'react-redux'

import productReducer from './reducer/product'
import cartReducer from './reducer/cart'
import danhmucReducer from './reducer/danhmuc'

const reducer = combineReducers({
  product:productReducer,
  category:danhmucReducer,
  cart:cartReducer
})
const store = createStore(reducer,composeWithDevTools())

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root'),
);
