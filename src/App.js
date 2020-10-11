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

function App() {
  const [locale, setLocale] = useState('en');
  const dispatch = useDispatch()

  React.useEffect(() => {
    axios({
      method: "GET",
      url: URL_SERVER + '/api/category'
    }).then(res => dispatch({ type: "INIT_CATEGORY", data: res.data }))

  }, [])
  return (
    <Switch>
      <Route path='/dashboard'>
        <Dashboard />
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
