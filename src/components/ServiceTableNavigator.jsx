import React from 'react';
import { Route, Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

class ServiceTableNavigator extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      supportAdd: typeof this.props.supportAdd === "undefined" ? true : this.props.supportAdd,
      supportModify: typeof this.props.supportModify === "undefined" ? true : this.props.supportModify,
      supportDelete: typeof this.props.supportDelete === "undefined" ? true : this.props.supportDelete
    };
  }

  handleAdd(e) {
    if (this.props.handleAdd) {
      this.props.handleAdd(e);
    }
  }

  handleModify(e) {
    if (this.props.handleModify) {
      this.props.handleModify(e);
    }
  }

  handleDelete(e) {
    if (this.props.handleDelete) {
      this.props.handleDelete(e);
    }
  }

  render() {
    let buttons = [];

    if (this.state.supportAdd) {
      buttons.push(<Button
        className="ServiceTableNavigatorButton">
          Add new {this.props.noun.singular}
        </Button>);
    }

    if (this.state.supportModify) {
      buttons.push(<Button
        className="ServiceTableNavigatorButton">
          Modify selected {this.props.noun.singular}
        </Button>);
    }

    if (this.state.supportDelete) {
      buttons.push(<Button
        className="ServiceTableNavigatorButton">
          Delete selected {this.props.noun.singular}
        </Button>);
    }

    return (
      <div className="ServiceTableNavigator card card-1">
        <center>
          {buttons}
        </center>
      </div>
    );
  }
}

ServiceTableNavigator.propTypes = {
  supportAdd: PropTypes.bool,
  supportModify: PropTypes.bool,
  supportDelete: PropTypes.bool,
  handleAdd: PropTypes.func,
  handleModify: PropTypes.func,
  handleDelete: PropTypes.func,
  noun: PropTypes.shape({
    singular: PropTypes.string,
    plural: PropTypes.string
  }).isRequired
};

export default ServiceTableNavigator;
