import React from 'react';
import { Route } from 'react-router-dom';

import '../styles/App.css';

import AppHeader from './AppHeader';
import AppFooter from './AppFooter';
import Home from './Home';


class App extends React.Component {
  render() {
    return (
      <div className="App">
        <div className="AppContainer">
          <AppHeader/>
          <div className="AppContent card card-2">
            <Route exact path="/" component={Home} />
          </div>
          <AppFooter/>
        </div>
      </div>
    );
  }
}

export default App;
