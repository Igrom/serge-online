const routes = {
  "/customers": "Customers",
  "/locations": "Locations",
  "/manager": "Manager",
  "/orders": "Orders",
  "/products": "Products",
  "/shipments": "Shipments",
  "/sources": "Sources",
  "/stock": "stock",
  "/": "Main"
};

const terms = {
  customers: {
    singular: "customer",
    plural: "customers"
  },
  locations: {
    singular: "location",
    plural: "locations"
  },
  orders: {
    singular: "order",
    plural: "orders"
  },
  products: {
    singular: "product",
    plural: "products"
  },
  shipments: {
    singular: "shipment",
    plural: "shipments"
  },
  sources: {
    singular: "source",
    plural: "sources"
  },
  stock: {
    singular: "stock",
    plural: "stock"
  },
}

export default {
  routes,
  terms
};
