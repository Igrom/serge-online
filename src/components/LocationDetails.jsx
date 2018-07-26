import React from 'react';
import PropTypes from 'prop-types';

class LocationDetails extends React.Component {
  render() {
    let locationHeader = (
      <h4>Location id: <strong>{this.props.location._links.self.href.match(/[^\/]+$/)[0]}</strong></h4>
    );

    let locationStatus = this.props.location.order
      ? (<p>Order assigned to location: <strong>{this.props.location.order.match(/[^\/]+$/)[0]}</strong></p>)
      : (<p>No order assigned to location</p>);

    let locationOrder = this.props.data.orders.find(order => order._links.self.href === this.props.location.order);

    let locationCompletion = null;
    let storedProducts = null;
    let expectedProducts = null;

    if (this.props.location.order) {
      storedProducts = this.props.location.stock
        .map(stock => ({ product: this.props.data.stock.find(s => s._links.self.href === stock.stock).product, quantity: stock.quantity }))
        .reduce((acc, val) => {
          if (acc.find(item => item.product === val.product)) {
            acc.find(item => item.product === val.product).quantity += val.quantity;
          } else {
            acc.push(val);
          }
          return acc;
        }, []);

      expectedProducts = locationOrder.products;

      console.log('stored', storedProducts);
      console.log('expected', expectedProducts);


      let locationCompletionEntries = expectedProducts
        .map(expectedProduct => {
          let productName = this.props.data.products.find(product => product._links.self.href === expectedProduct.product).name;
          let storedProduct = storedProducts.find(sp => sp.product === expectedProduct.product);

          return (
            <p>{productName} (id {expectedProduct.product.match(/[^\/]+$/)[0]}): <strong>{storedProduct ? storedProduct.quantity : 0} / {expectedProduct.quantity}</strong></p>
          );
        });

      locationCompletion = (
        <div>
          {locationCompletionEntries}
        </div>
      );
    }

    return (
      <div>
        {locationHeader}
        {locationStatus}
        {locationCompletion}
      </div>
    );
  }
}

LocationDetails.propTypes = {
  location: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired
};

export default LocationDetails;
