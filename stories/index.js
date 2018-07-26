import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import data from './data/index';

import '../src/styles/App.css';

import OrdersItemDetails from '../src/components/OrdersItemDetails.jsx'
import ItemDialog from '../src/components/ItemDialog.jsx'
import ServiceTable from '../src/components/ServiceTable.jsx'
import ServiceTableNavigator from '../src/components/ServiceTableNavigator.jsx'
import ServiceTableAssembly from '../src/components/ServiceTableAssembly.jsx'
import DropdownSelect from '../src/components/DropdownSelect.jsx';
import DropdownSelectArray from '../src/components/DropdownSelectArray.jsx';
import EmployeeDetails from '../src/components/EmployeeDetails.jsx';
import LocationDetails from '../src/components/LocationDetails.jsx';
import ManagerView from '../src/components/ManagerView.jsx';

let serviceTableData = [
  {
    id: 1,
    name: "Object 1",
    email: "object1@example.com",
    _links: {
      self: {
        href: "abc"
      }
    }
  },
  {
    id: 2,
    name: "Object 2",
    email: "object2@example.com"
  },
  {
    id: 3,
    name: "Object 3",
    email: "object3@example.com"
  }
];

let serviceInformation = {
  noun: {
    singular: "participant",
    plural: "participants"
  }
};

storiesOf('DropdownSelect', module)
  .add('with options', () => (
    <DropdownSelect
      options={data.customers.map(v => ({
        value: v._links.self.href,
        label: v.name
      }))}
      onChange={action('onChange')}/>
  ))
  .add('with options and values', () => (
    <DropdownSelect
      value={data.customers[1]._links.self.href}
      count={5}
      options={data.customers.map(v => ({
        value: v._links.self.href,
        label: v.name
      }))}
      onChange={action('onChange')}/>
  ));

storiesOf('DropdownSelectArray', module)
  .add('with options', () => (
    <DropdownSelectArray
      label="DropdownSelectArray"
      options={data.customers.map(v => ({
        value: v._links.self.href,
        label: v.name
      }))}
      onChange={action('onChange')}/>
  ))
  .add('with options and data', () => (
    <DropdownSelectArray
      label="DropdownSelectArray"
      data={data.orders[1].products.map(v => ({
        value: v.product,
        count: v.quantity
      }))}
      options={data.products.map(v => ({
        value: v._links.self.href,
        label: v.name
      }))}
      onChange={action('onChange')}/>
  ));

storiesOf('OrdersItemDetails', module)
  .add('with data', () => (
    <OrdersItemDetails
      data={data}
      item={data.orders[1]}/>
  ));

storiesOf('ItemDialog', module)
  .add('with data and no item', () => (
    <ItemDialog
      onAccept={action('onChange')}
      show={true}
      noun={{
        plural: 'orders'
      }}
      data={data}/>
  ))
  .add('with data and item', () => (
    <ItemDialog
      onAccept={action('onChange')}
      show={true}
      noun={{
        plural: 'orders'
      }}
      data={data}
      item={data.orders[1]}/>
  ));


storiesOf('ServiceTable', module)
  .add('with nothing', () => (
    <ServiceTable/>
  ))
  .add('with data', () => (
    <ServiceTable
      data={serviceTableData}
      onChange={action('onChange')}/>
  ));

storiesOf('ServiceTableNavigator', module)
  .add('with all', () => (
    <ServiceTableNavigator
      handleAdd={action('handleAdd')}
      handleModify={action('handleModify')}
      handleDelete={action('handleDelete')}
      noun={serviceInformation.noun}/>
  ))
  .add('without delete', () => (
    <ServiceTableNavigator
      handleAdd={action('handleAdd')}
      handleModify={action('handleModify')}
      noun={serviceInformation.noun}
      supportDelete={false}/>
  ))
  .add('without modify and delete', () => (
    <ServiceTableNavigator
      handleAdd={action('handleAdd')}
      noun={serviceInformation.noun}
      supportModify={false}
      supportDelete={false}/>
   ))
   .add('without anything', () => (
     <ServiceTableNavigator
       noun={serviceInformation.noun}
       supportAdd={false}
       supportModify={false}
       supportDelete={false}/>
   ));

storiesOf('ServiceTableAssembly', module)
  .add('with all', () => (
    <ServiceTableAssembly
      data={data}
      client={{add: () => Promise.resolve(), put: () => Promise.reject(new Error('Doesn\'t work man'))}}
      noun={{
        singular: 'order',
        plural: 'orders'
      }}/>
  ));

storiesOf('EmployeeDetails', module)
  .add('CHOOSE_MODE', () => (
    <EmployeeDetails
      employee={{
        _links: { self: { href: "https://localhost:4007/v1/employees/1bc78e1a-4dfa-36ed-1847ed6ab3a1"} },
        status: "CHOOSE_MODE"
      }}/>
  ))
  .add('START_PLACE', () => (
    <EmployeeDetails
      employee={{
        _links: { self: { href: "https://localhost:4007/v1/employees/1bc78e1a-4dfa-36ed-1847ed6ab3a1"} },
        status: "START_PLACE"
      }}/>
  ))
  .add('GO_TO_LOCATION', () => (
    <EmployeeDetails
      employee={{
        _links: { self: { href: "https://localhost:4007/v1/employees/1bc78e1a-4dfa-36ed-1847ed6ab3a1"} },
        status: "GO_TO_LOCATION",
        state: {
          currentStock: "https://localhost:4004/v1/stock/12409dw-124a-124-g12r1f2",
          currentLocation: "https://localhost:4006/v1/locations/135109fa-12120-124c-1245-1251125fa"
        }
      }}/>
  ))
  .add('PLACE', () => (
    <EmployeeDetails
      employee={{
        _links: { self: { href: "https://localhost:4007/v1/employees/1bc78e1a-4dfa-36ed-1847ed6ab3a1"} },
        status: "PLACE",
        state: {
          currentStock: "https://localhost:4004/v1/stock/12409dw-124a-124-g12r1f2",
          currentLocation: "https://localhost:4006/v1/locations/135109fa-12120-124c-1245-1251125fa",
          quantityToPlace: 30
        }
      }}/>
  ))
  .add('CONFIRM_PLACE', () => (
    <EmployeeDetails
      employee={{
        _links: { self: { href: "https://localhost:4007/v1/employees/1bc78e1a-4dfa-36ed-1847ed6ab3a1"} },
        status: "CONFIRM_PLACE",
        state: {
          currentStock: "https://localhost:4004/v1/stock/12409dw-124a-124-g12r1f2",
          currentLocation: "https://localhost:4006/v1/locations/135109fa-12120-124c-1245-1251125fa",
          quantityToPlace: 30,
          statedQuantity: 25
        }
      }}/>
  ));

storiesOf('LocationDetails', module)
  .add('with all', () => (
    <LocationDetails
      location={data.locations[0]}
      data={data}/>
  ));

storiesOf('ManagerView', module)
  .add('with all', () => (
    <ManagerView
      data={data}/>
  ));
