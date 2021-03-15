import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import * as Icons from '@fortawesome/free-solid-svg-icons';

import Window from './pages/Window';
import Collections from './pages/Collections/collections.view';
import UserPage from './pages/UserForm/userpage.view';

const iconList = Object.keys(Icons)
  .filter((key) => key !== 'fas' && key !== 'prefix')
  .map((icon) => Icons[icon]);

library.add(...iconList);

const App = () => (
  <div className="App">
    <Router>
      <Switch>
        <Route path="/" exact component={Window} />
        <Route path="/collections" exact component={Collections} />
        <Route path="/userpage" exact component={UserPage} />
      </Switch>
    </Router>
  </div>
);

export default App;
