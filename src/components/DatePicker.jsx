import React from 'react';
import _DatePicker from 'react-datepicker';
import moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';

// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';

class DatePicker extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      selected: moment(this.props.selected) || moment()
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    if (this.props.onChange) {
      this.props.onChange(this.state.selected);
    }
  }

  handleChange(date) {
    if (this.props.onChange) {
      this.props.onChange(date);
    }
    this.setState({
      selected: date
    });
  }

  render() {
    return <_DatePicker
        selected={this.state.selected}
        onChange={this.handleChange}
    />;
  }
}

export default DatePicker;
