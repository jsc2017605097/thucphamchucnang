import React, { useState } from 'react';
import { IntlProvider } from 'react-intl';
import Layout from './Layout';
import messages from './messages';
import './styles/App.scss';
import './index.css'
import Dashboard from './dashboard'
import { Switch, Route } from 'react-router-dom'

function App() {
  const [locale, setLocale] = useState('en');

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
