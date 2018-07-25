import React from 'react';
import { Route } from 'react-router-dom';
import { Button, Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';

import CustomersItemDetails from './CustomersItemDetails';
import LocationsItemDetails from './LocationsItemDetails';
import OrdersItemDetails from './OrdersItemDetails';
import ProductsItemDetails from './ProductsItemDetails';
import ShipmentsItemDetails from './ShipmentsItemDetails';
import SourcesItemDetails from './SourcesItemDetails';
import StockItemDetails from './StockItemDetails';

const components = {
  customers: CustomersItemDetails,
  locations: LocationsItemDetails,
  orders: OrdersItemDetails,
  products: ProductsItemDetails,
  shipments: ShipmentsItemDetails,
  sources: SourcesItemDetails,
  stock: StockItemDetails
};

class ItemDialog extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      item: this.props.item
    };

    this.onAccept = this.onAccept.bind(this);
    this.onReject = this.onReject.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(item) {
    this.setState({
      item
    });
  }

  onAccept() {
    if (this.props.onAccept) {
      this.props.onAccept(this.state.item);
    }
  }

  onReject() {
    if (this.props.onReject) {
      this.props.onReject();
    }
  }

  render() {
    let SpecificComponent = components[this.props.noun.plural];
    return (
      <div className="ItemDialog">
        <Modal show={this.props.show} onHide={this.onReject}>
          <Modal.Header closeButton>
            <Modal.Title>Item details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <SpecificComponent
            data={this.props.data}
            item={this.props.item}
            onChange={this.handleChange}/>
          </Modal.Body>
          <Modal.Footer>
            <Button bsStyle='primary' onClick={this.onAccept}>Save</Button>
            <Button onClick={this.onReject}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

ItemDialog.propTypes = {
  data: PropTypes.object,
  item: PropTypes.object,
  noun: PropTypes.object,
  show: PropTypes.bool,

  onAccept: PropTypes.func,
  onReject: PropTypes.func
};

export default ItemDialog;
