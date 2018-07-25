import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import cloneDeep from 'lodash.clonedeep';
import jp from 'jsonpath/jsonpath.min.js';

import DatePicker from './DatePicker';
import DropdownSelectArray from './DropdownSelectArray';

class ShipmentsItemDetails extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      item: this.props.item || {}
    };

    this.state.item.source = this.state.item.source || this.props.data.sources && this.props.data.sources[0] && this.props.data.sources[0]._links.self.href;
    this.state.item.stock = this.state.item.stock || [];
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
      <FormGroup>
        <ControlLabel>Expected by</ControlLabel>
        <FormControl
          selected={this.state.item.expectedBy}
          componentClass={DatePicker}
          onChange={date => this.handleChange('$.expectedBy', {
            target: {
              value: date._d.toISOString()
            }
          })}/>
      </FormGroup>
    ));

    fields.push((
      <DropdownSelectArray
        label="Stock"
        data={this.state.item.stock.map(v => ({
          value: v
        }))}
        options={this.props.data.stock.map(v => ({
          value: v._links.self.href,
          label: v._links.self.href,
        }))}
        onChange={arr => this.handleChange('$.stock', {
          target: { value: arr.map(v => v.value) }
        })}/>
    ));

    return (
      <form>
        {fields}
      </form>
    );
  }
}

ShipmentsItemDetails.propTypes = {
  data: PropTypes.object,
  item: PropTypes.object,

  onChange: PropTypes.func
};

export default ShipmentsItemDetails;
