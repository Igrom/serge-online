import React from 'react';
import { Route } from 'react-router-dom';
import { Button } from 'react-bootstrap';

import appInformation from '../appInformation';

class AppHeader extends React.Component {

  buildTitle (props) {
    let key = Object.keys(appInformation.routes).find(r => props.location.pathname.startsWith(r));
    let title = (appInformation.routes[key]);

    return (
      <span>{title}</span>
    );
  }

  buildBackButton (props) {
    return (
      <Button onClick={props.history.goBack}>
        Back
      </Button>
    );
  }

  render() {
    return (
      <header className="AppHeader card card-1">
      <Route path={/\/./} component={this.buildBackButton.bind(this)}/>
      <span><strong>Serge - </strong></span>
      <Route path="/" component={this.buildTitle.bind(this)}/>
      </header>
    );
  }
}

export default AppHeader;
