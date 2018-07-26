import React from 'react';
import { Route, Switch } from 'react-router-dom';

import '../styles/App.css';

import AppHeader from './AppHeader';
import AppFooter from './AppFooter';
import Home from './Home';
import ServiceView from './ServiceView';
import ManagerView from './ManagerView';

import dataFunction from '../data';
import appInformation from '../appInformation';

import {
  sergeCustomersClient,
  sergeLocationsClient,
  sergeOrdersClient,
  sergeProductsClient,
  sergeShipmentsClient,
  sergeSourcesClient,
  sergeStockClient
} from '../clients';

const clients = {
  '/customers': sergeCustomersClient,
  '/locations': sergeLocationsClient,
  '/orders': sergeOrdersClient,
  '/products': sergeProductsClient,
  '/shipments': sergeShipmentsClient,
  '/sources': sergeSourcesClient,
  '/stock': sergeStockClient
};


class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {
        customers: [],
        locations: [],
        orders: [],
        products: [],
        shipments: [],
        sources: [],
        stock: [],
        employees: []
      }
    };

    this.makeServiceView = this.makeServiceView.bind(this);
    this.makeManagerView = this.makeManagerView.bind(this);
  }

  componentDidMount() {
    this.pollData();
  }

  async pollData() {
    let data = await dataFunction();

    this.setState({
      data
    }, () => {
      setTimeout(() => this.pollData(), 1000);
    });
  }

  makeServiceView(props) {
    return (
      <ServiceView
        data={this.state.data}
        noun={appInformation.terms[props.location.pathname.replace("/", "")]}
        client={clients[props.location.pathname]}/>
    );
  }

  makeManagerView(props) {
    return (
      <ManagerView
        data={this.state.data}/>
    );
  }

  render() {
    return (
      <div className="App">
        <div className="AppContainer">
          <AppHeader/>
          <div className="AppContent card card-2">
            <Switch>
              <Route exact path="/manager" component={this.makeManagerView}/>
              <Route exact path="/:foo" component={this.makeServiceView}/>
              <Route exact path="/" component={Home}/>
            </Switch>
          </div>
          <AppFooter/>
        </div>
      </div>
    );
  }
}

export default App;
