import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import '../src/styles/App.css';

import ServiceTable from '../src/components/ServiceTable.jsx'
import ServiceTableNavigator from '../src/components/ServiceTableNavigator.jsx'
import ServiceTableAssembly from '../src/components/ServiceTableAssembly.jsx'

let serviceTableData = [
  {
    id: 1,
    name: "Object 1",
    email: "object1@example.com"
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

storiesOf('ServiceTable', module)
  .add('with nothing', () => (
    <ServiceTable/>
  ))
  .add('with data', () => (
    <ServiceTable
      data={serviceTableData}/>
  ));

storiesOf('ServiceTableNavigator', module)
  .add('with all', () => (
    <ServiceTableNavigator
      noun={serviceInformation.noun}/>
  ))
  .add('without delete', () => (
    <ServiceTableNavigator
      noun={serviceInformation.noun}
      supportDelete={false}/>
  ))
  .add('without modify and delete', () => (
    <ServiceTableNavigator
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
      noun={serviceInformation.noun}/>
  ));
