const { SergeCustomersClient } = require('serge-customers-client');
const { SergeLocationsClient } = require('serge-locations-client');
const { SergeOrdersClient } = require('serge-orders-client');
const { SergeProductsClient } = require('serge-products-client');
const { SergeShipmentsClient } = require('serge-shipments-client');
const { SergeSourcesClient } = require('serge-sources-client');
const { SergeStockClient } = require('serge-stock-client');

const sergeCustomersClient = new SergeCustomersClient("http://localhost:4000");
const sergeLocationsClient = new SergeLocationsClient("http://localhost:4006");
const sergeOrdersClient = new SergeOrdersClient("http://localhost:4003");
const sergeProductsClient = new SergeProductsClient("http://localhost:4002");
const sergeShipmentsClient = new SergeShipmentsClient("http://localhost:4005");
const sergeSourcesClient = new SergeSourcesClient("http://localhost:4001");
const sergeStockClient = new SergeStockClient("http://localhost:4004");

export {
  sergeCustomersClient,
  sergeLocationsClient,
  sergeOrdersClient,
  sergeProductsClient,
  sergeShipmentsClient,
  sergeSourcesClient,
  sergeStockClient
};
