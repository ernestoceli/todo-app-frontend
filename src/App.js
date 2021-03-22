import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import * as Icons from '@fortawesome/free-solid-svg-icons';

import Window from './pages/Window';
import Collections from './pages/Collections/collections.view';
import UserPage from './pages/UserPage/userpage.view';

const iconList = Object.keys(Icons)
  .filter((key) => key !== 'fas' && key !== 'prefix')
  .map((icon) => Icons[icon]);

library.add(...iconList);

const App = () => {
  // eslint-disable-next-line
  const [userName, setUserName] = useState('No User');
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact>
            <Window userName={userName} />
          </Route>
          <Route path="/collections">
            <Collections userName={userName} />
          </Route>
          <Route path="/userpage">
            <UserPage userNameFunc={(user) => setUserName(user)} />
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
