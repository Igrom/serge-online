import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import cloneDeep from 'lodash.clonedeep';
import jp from 'jsonpath/jsonpath.min.js';

class ProductsItemDetails extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      item: this.props.item || {}
    };

    this.state.item.source = this.state.item.source || this.props.data.sources && this.props.data.sources[0] && this.props.data.sources[0]._links.self.href;
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
    let sourceOptions = this.props.data && this.props.data.sources ?
      this.props.data.sources.map(v => (
        <option
          key={v._links.self.href}
          value={v._links.self.href}>
          {v.name}
        </option>
      )) : [];

    fields.push((
      <FormControl
        type="text"
        value={this.state.item.name}
        placeholder="Name"
        onChange={e => this.handleChange('$.name', e)}
      />
    ));


    fields.push((
      <FormGroup>
        <ControlLabel>Source</ControlLabel>
        <FormControl
          value={this.state.item.source}
          componentClass='select'
          onChange={e => this.handleChange('$.source', e)}>
            {sourceOptions}
        </FormControl>
      </FormGroup>
    ));

    fields.push((
      <FormControl
        type="text"
        value={this.state.item.minimumOrderableQuantity}
        placeholder="Minimum orderable quantity"
        onChange={e => this.handleChange('$.minimumOrderableQuantity', {
          target: {
            value: Number(e.target.value)
          }
        })}
      />
    ));

    fields.push((
      <FormControl
        type="text"
        value={this.state.item.batchQuantity}
        placeholder="Batch quantity"
        onChange={e => this.handleChange('$.batchQuantity', {
          target: {
            value: Number(e.target.value)
          }
        })}
      />
    ));

    fields.push((
      <FormControl
        type="text"
        value={this.state.item.daysToShip}
        placeholder="Days to ship"
        onChange={e => this.handleChange('$.daysToShip', {
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

ProductsItemDetails.propTypes = {
  data: PropTypes.object,
  item: PropTypes.object,

  onChange: PropTypes.func
};

export default ProductsItemDetails;
