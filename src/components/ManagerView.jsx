import React from 'react';
import { Route, Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import EmployeeDetails from './EmployeeDetails';
import LocationDetails from './LocationDetails';

class ManagerView extends React.Component {
  render() {
    let employeeDetails = this.props.data.employees.map(employee => (
      <div className="card card-1 ManagerView-EmployeeDetails">
      <EmployeeDetails
        employee={employee}/>
      </div>
    ));

    let locationDetails = this.props.data.locations
      .sort((a, b) => a._links.self.href > b._links.self.href)
      .map(location => (
      <div className="card card-4 ManagerView-LocationDetails">
      <LocationDetails
        location={location}
        data={this.props.data}/>
      </div>
    ));

    return (
      <div className="ManagerView">
        <h3>Employees</h3>
        {employeeDetails.length
          ? employeeDetails
          : <p>No active employees</p>}
        <h3 style={{clear: "both"}}>Warehouse status</h3>
        {locationDetails.length
          ? locationDetails
          : <p>No configured locations</p>}
      </div>
    );
  }
}

ManagerView.propTypes = {
  data: PropTypes.object.isRequired
};

export default ManagerView;
