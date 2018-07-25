import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import cloneDeep from 'lodash.clonedeep';
import jp from 'jsonpath/jsonpath.min.js';

class StockItemDetails extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      item: this.props.item || {}
    };

    this.state.item.product = this.state.item.product || this.props.data.products && this.props.data.products[0] && this.props.data.products[0]._links.self.href;
  }

  componentDidMount() {
    if (this.props.onChange) {
      this.props.onChange(this.state.item);
    }
  }

  handleChange(field, e) {
    let copy = cloneDeep(this.state.item);
    jp.value(copy, field, e.target.value);
    this.setState({
      item: copy
    }, () => {
      if (this.props.onChange) {
        this.props.onChange(copy);
      }
    });
  }

  render() {
    let fields = [];
    let productOptions = this.props.data && this.props.data.products ?
      this.props.data.products.map(v => (
        <option
          key={v._links.self.href}
          value={v._links.self.href}>
          {v.name}
        </option>
      )) : [];

    fields.push((
      <FormGroup>
        <ControlLabel>Product</ControlLabel>
        <FormControl
          value={this.state.item.product}
          componentClass='select'
          onChange={e => this.handleChange('$.product', e)}>
            {productOptions}
        </FormControl>
      </FormGroup>
    ));

    fields.push((
      <FormControl
        type="text"
        value={this.state.item.quantity}
        placeholder="Quantity"
        onChange={e => this.handleChange('$.quantity', {
          target: {
            value: Number(e.target.value)
          }
        })}
      />
    ));

    return (
      <form>
        {fields}
      </form>
    );
  }
}

StockItemDetails.propTypes = {
  data: PropTypes.object,
  item: PropTypes.object,

  onChange: PropTypes.func
};

export default StockItemDetails;
