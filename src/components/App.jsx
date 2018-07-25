import React from 'react';
import { Route } from 'react-router-dom';

import '../styles/App.css';

import AppHeader from './AppHeader';
import AppFooter from './AppFooter';
import Home from './Home';
import ServiceView from './ServiceView';

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
        stock: []
      }
    };

    this.makeServiceView = this.makeServiceView.bind(this);
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

  render() {
    return (
      <div className="App">
        <div className="AppContainer">
          <AppHeader/>
          <div className="AppContent card card-2">
            <Route exact path="/" component={Home} />
            <Route exact path="/manager" component={Home} />
            <Route exact path="/:foo" component={this.makeServiceView}/>
          </div>
          <AppFooter/>
        </div>
      </div>
    );
  }
}

export default App;
