module.exports = [
  {
    _links: {
      self: {
        href: "https://manager.serge.sowinski.blue/v1/employees/1"
      }
    },
    status: "CONFIRM_PLACE",
    state: {
      currentStock: "https://localhost:4004/v1/stock/12409dw-124a-124-g12r1f2",
      currentLocation: "https://localhost:4006/v1/locations/135109fa-12120-124c-1245-1251125fa",
      quantityToPlace: 30,
      statedQuantity: 25
    }
  },
  {
    _links: {
      self: {
        href: "https://manager.serge.sowinski.blue/v1/employees/2"
      }
    },
    status: "GO_TO_LOCATION",
    state: {
      currentStock: "https://localhost:4004/v1/stock/12409dw-124a-124-g12r1f2",
      currentLocation: "https://localhost:4006/v1/locations/135109fa-12120-124c-1245-1251125fa",
    }
  }

];
