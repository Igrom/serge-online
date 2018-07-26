"use strict";

const main = async () => {
  const clients = require("./clients");

  let customersIds = [
    "84297468-cd74-4866-b5b1-7964f8fd570e",
    "dad11af6-aab5-4248-9c02-e87285eafe5c",
    "681a1015-45d1-48b1-8acb-200a265107d8"
  ];
  let customers = [
    { name: 'Ropucha S.A.' },
    { name: 'Sklep osiedlowy Szarańcza' },
    { name: 'Centrum handlowe Unreal' }
  ];

  for (let i = 0; i < customers.length; i++) {
    await clients.sergeCustomersClient.update(customersIds[i], customers[i]);
  }
  await new Promise((r) => { setTimeout(r, 100)});

  let sourcesIds = [
    "ef2a9778-f4bb-4892-9e95-6a1a7a6f4a64",
    "ec299944-5d15-49a2-9ed5-66b3deab7d9a",
    "9c28d1a5-4102-41ec-ac64-6b30c1ac3c59",
  ];
  let sources = [
    { name: 'IAESTE' },
    { name: 'Major Foods Inc.' },
    { name: 'Babka' }
  ];

  for (let i = 0; i < sources.length; i++) {
    await clients.sergeSourcesClient.update(sourcesIds[i], sources[i]);
  }
  await new Promise((r) => { setTimeout(r, 100)});

  let productsIds = [
    "e4d53b94-c05c-401a-8cc3-db2cfff67821",
    "5c6bd679-0dda-41d6-b2b8-beb5ef308412",
    "901f0499-0953-4a64-90d5-619c6cbb9f92",
    "90f3bc4e-e4e1-4125-896c-18f07d766251",
  ];
  let products = [
    {
      name: 'IAESTE Cookie',
      source: `http://localhost:4001/v1/sources/${sourcesIds[0]}`,
      minimumOrderableQuantity: 10,
      batchQuantity: 60,
      daysToShip: 1,
    },
    {
      name: 'IAESTE Cake',
      source: `http://localhost:4001/v1/sources/${sourcesIds[0]}`,
      minimumOrderableQuantity: 15,
      batchQuantity: 70,
      daysToShip: 2,
    },
    {
      name: 'Corn Flakes',
      source: `http://localhost:4001/v1/sources/${sourcesIds[1]}`,
      minimumOrderableQuantity: 20,
      batchQuantity: 100,
      daysToShip: 1,
    },
    {
      name: 'High Grade Coffee',
      source: `http://localhost:4001/v1/sources/${sourcesIds[2]}`,
      minimumOrderableQuantity: 15,
      batchQuantity: 40,
      daysToShip: 3,
    }
  ];

  for (let i = 0; i < products.length; i++) {
    await clients.sergeProductsClient.update(productsIds[i], products[i]);
  }
  await new Promise((r) => { setTimeout(r, 100)});

  let ordersIds = [
    "2cc858fc-4fd2-4b06-b398-6842eda3044c",
    "df209199-cb8c-4802-824d-6e5d4658e4f6",
    "f1e511c2-eb46-49ac-be1b-91414783ddf6",
  ];
  let orders = [
    {
      customer: `http://localhost:4000/v1/customers/${customersIds[0]}`,
      expectedBy: '2018-08-20T00:00:00.000Z',
      products: [
        {
          product: `http://localhost:4002/v1/products/${productsIds[0]}`,
          quantity: 50
        },
        {
          product: `http://localhost:4002/v1/products/${productsIds[1]}`,
          quantity: 30
        },
        {
          product: `http://localhost:4002/v1/products/${productsIds[2]}`,
          quantity: 30
        },
        {
          product: `http://localhost:4002/v1/products/${productsIds[3]}`,
          quantity: 40
        }
      ]
    },
    {
      customer: `http://localhost:4000/v1/customers/${customersIds[1]}`,
      expectedBy: '2018-08-22T00:00:00.000Z',
      products: [
        {
          product: `http://localhost:4002/v1/products/${productsIds[0]}`,
          quantity: 60
        },
        {
          product: `http://localhost:4002/v1/products/${productsIds[1]}`,
          quantity: 20
        },
        {
          product: `http://localhost:4002/v1/products/${productsIds[2]}`,
          quantity: 10
        }
      ]
    },
    {
      customer: `http://localhost:4000/v1/customers/${customersIds[2]}`,
      expectedBy: '2018-08-25T00:00:00.000Z',
      products: [
        {
          product: `http://localhost:4002/v1/products/${productsIds[0]}`,
          quantity: 20
        },
        {
          product: `http://localhost:4002/v1/products/${productsIds[2]}`,
          quantity: 60
        },
        {
          product: `http://localhost:4002/v1/products/${productsIds[3]}`,
          quantity: 70
        }
      ]
    }
  ];

  for (let i = 0; i < orders.length; i++) {
    await clients.sergeOrdersClient.update(ordersIds[i], orders[i]);
  }
  await new Promise((r) => { setTimeout(r, 100)});

  let locationsIds = [
    "1",
    "2",
    "3",
    "4"
  ];
  let locations = [
    { code: "174", stock: [] },
    { code: "556", stock: [] },
    { code: "312", stock: [] },
    { code: "049", stock: [] },
  ];

  for (let i = 0; i < locations.length; i++) {
    await clients.sergeLocationsClient.update(locationsIds[i], locations[i]);
  }
};

main();
