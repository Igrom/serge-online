import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap';

class DropdownSelect extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      value: this.props.value || this.props.options[0] && this.props.options[0].value || "",
      count: this.props.count || 0
    };

    this.handleChange = this.handleChange.bind(this);
    this.onDelete = this.onDelete.bind(this);
  }

  componentDidMount() {
    if (this.props.onChange) {
      this.props.onChange(this.state);
    }
  }

  handleChange(field, value) {
    this.setState({
      [field]: value
    }, () => {
      if (this.props.onChange) {
        this.props.onChange(this.state);
      }
    });
  }

  onDelete() {
    if (this.props.onDelete) {
      this.props.onDelete();
    }
  }

  render() {
    let options = this.props.options ? this.props.options.map((v, index) => (
      <option
        key={index}
        value={v.value}>
        {v.label}
      </option>
    )) : [];

    return (
      <FormGroup>
        <FormControl
          value={this.state.value}
          componentClass='select'
          className="DropdownSelect-Close"
          onChange={e => this.handleChange("value", e.target.value)}>
          {options}
        </FormControl>
        <FormControl
          value={this.state.count}
          type="text"
          className="DropdownSelect-Counter"
          onChange={e => this.handleChange("count", Number(e.target.value))}/>
        <Button
          onClick={this.onDelete}
          bsStyle="danger">X</Button>
      </FormGroup>
    );
  }
}

DropdownSelect.propTypes = {
  options: PropTypes.array.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  count: PropTypes.number,
  onChange: PropTypes.func,
  onDelete: PropTypes.func
};

export default DropdownSelect;
