import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap';

import DropdownSelect from './DropdownSelect';

class DropdownSelectArray extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: props.data && props.data
        .map(v => Object.assign({}, v, { key: Math.random().toString() })) || []
    };

    this.handleAdd = this.handleAdd.bind(this); this.handleChange = this.handleChange.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.reportChange = this.reportChange.bind(this);
  }

  handleAdd() {
    let obj = {
      key: Math.random().toString()
    };

    this.setState({
      data: this.state.data.concat(obj)
    }, this.reportChange);
  }

  handleChange(index, obj) {
    this.setState({
      data: [
        ...this.state.data.slice(0, index),
        Object.assign({}, this.state.data[index], obj),
        ...this.state.data.slice(index + 1)
      ]
    }, this.reportChange);
  }

  handleDelete(index) {
    this.setState({
      data: [
        ...this.state.data.slice(0, index),
        ...this.state.data.slice(index + 1)
      ]
    }, () => this.reportChange());
  }

  reportChange() {
    if (this.props.onChange) {
      this.props.onChange(this.state.data.map(v => ({
        value: v.value,
        count: v.count
      })));
    }
  }

  render() {
    let entries = this.state.data.map((v, index) => (
      <DropdownSelect
        key={v.key}
        options={this.props.options}
        value={v.value}
        count={v.count}
        onChange={obj => this.handleChange(index, obj)}
        onDelete={() => this.handleDelete(index)}/>
    ));

    return (
      <div>
        <ControlLabel>{this.props.label}</ControlLabel>
        {entries}
        <Button bsStyle="success" onClick={this.handleAdd}>Add new</Button>
      </div>
    );
  }
}

DropdownSelectArray.propTypes = {
  data: PropTypes.array,
  label: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
};

export default DropdownSelectArray;
