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
