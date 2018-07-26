"use strict";

const customers = require("./customers");
const products = require("./products");
const orders = require("./orders");
const locations = require("./locations");
const stock = require("./stock");
const employees = require("./employees");

module.exports = {
  customers,
  products,
  orders,
  locations,
  stock,
  employees
};
