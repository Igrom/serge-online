import React from 'react';
import PropTypes from 'prop-types';

class EmployeeDetails extends React.Component {
  render() {
    let employeeHeader = (
      <h4>Employee id: <strong>{this.props.employee._links.self.href.match(/[^\/]+$/)[0]}</strong></h4>
    );

    let employeeStatus = null;

    switch (this.props.employee.status) {
      case "CHOOSE_MODE":
        employeeStatus = (
          <div>
            <p>State: <strong>Choose mode</strong></p>
          </div>
        );
        break;

      case "START_PLACE":
        employeeStatus = (
          <div>
            <p>State: <strong>Scan a pallet</strong></p>
          </div>
        );
        break;

      case "GO_TO_LOCATION":
        employeeStatus = (
          <div>
            <p>State: <strong>Go to location {this.props.employee.state.currentLocation.match(/[^\/]+$/)[0]}</strong></p>
            <p>Selected stock: <strong>{this.props.employee.state.currentStock.match(/[^\/]+$/)[0]}</strong></p>
          </div>
        );
        break;

      case "PLACE":
        employeeStatus = (
          <div>
            <p>State: <strong>Place {this.props.employee.state.quantityToPlace} cases</strong></p>
            <p>Location: <strong>{this.props.employee.state.currentLocation.match(/[^\/]+$/)[0]}</strong></p>
            <p>Selected stock: <strong>{this.props.employee.state.currentStock.match(/[^\/]+$/)[0]}</strong></p>
          </div>
        );
        break;

      case "CONFIRM_PLACE":
        employeeStatus = (
          <div>
            <p>State: <strong>Confirm insufficient amount (expected: {this.props.employee.state.quantityToPlace}, got: {this.props.employee.state.statedQuantity})</strong></p>
            <p>Location: <strong>{this.props.employee.state.currentLocation.match(/[^\/]+$/)[0]}</strong></p>
            <p>Selected stock: <strong>{this.props.employee.state.currentStock.match(/[^\/]+$/)[0]}</strong></p>
          </div>
        );
        break;

      default:
        employeeStatus = (
          <div>
            <p>State: <strong>Inactive</strong></p>
          </div>
        );
        break;

    };

    return (
      <div>
        {employeeHeader}
        {employeeStatus}
      </div>
    );
  }
}

EmployeeDetails.propTypes = {
  employee: PropTypes.object.isRequired
};


export default EmployeeDetails;
