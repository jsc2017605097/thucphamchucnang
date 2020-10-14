import React, { useState } from 'react';
import { IntlProvider } from 'react-intl';
import Layout from './Layout';
import messages from './messages';
import './styles/App.scss';
import './index.css'
import Dashboard from './dashboard'
import { Switch, Route } from 'react-router-dom'
import axios from 'axios'
import URL_SERVER from './url_server'
import { useDispatch } from 'react-redux'
import Login from './login'

import Authentication from './Authentication'
const ProtectToDashboard = Authentication(Dashboard)

function App() {
  const [locale, setLocale] = useState('en');
  const dispatch = useDispatch()

  React.useEffect(() => {
    axios({
      method: "GET",
      url: URL_SERVER + '/api/category'
    }).then(res => {
      dispatch({ type: "INIT_CATEGORY", data: res.data })
    })

    axios({
      method: "get",
      url: "/api/product"
    }).then(res => {
      dispatch({ type: "INIT_PRODUCT", data: res.data })
      dispatch({ type: "GET_PRODUCT_TRUE" })

    })

    axios({
      method: "get",
      url: "/data.json"
    }).then(res => dispatch({ type: "INIT_DATA", data: res.data }))
  
  }, [dispatch])

  
  return (
    <Switch>
      <Route path='/dashboard'>
        <ProtectToDashboard />
      </Route>
      <Route path='/login'>
        <Login />
      </Route>
      <Route path='/'>
        <IntlProvider locale={locale} messages={messages[locale]}>
          <Layout setLocale={setLocale} />
        </IntlProvider>
      </Route>
    </Switch>

  );
}

export default App;
