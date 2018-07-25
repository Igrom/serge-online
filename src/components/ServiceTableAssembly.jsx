import React from 'react';
import { Route, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Notification } from 'react-notification';

import ServiceTable from './ServiceTable.jsx';
import ServiceTableNavigator from './ServiceTableNavigator.jsx';
import ItemDialog from './ItemDialog.jsx';

import cloneDeep from 'lodash.clonedeep';

class ServiceTableAssembly extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedItemIndex: null,
      modalMode: null,
      showModal: false,
      showAlert: false,
      alertMessage: ""
    };

    this.alertTimeout = null;

    this.onChange = this.onChange.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleModify = this.handleModify.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleModalAccept = this.handleModalAccept.bind(this);
    this.handleModalReject = this.handleModalReject.bind(this);
  }

  handleAdd(e) {
    this.setState({
      selectedItemIndex: null,
      showModal: true,
      modalMode: 'add'
    });
  }

  handleModify(e) {
    if (this.state.selectedItemIndex === null) {
      return;
    }

    console.log(this.props.data[this.props.noun.plural][this.state.selectedItemIndex]);

    this.setState({
      showModal: true,
      modalMode: 'modify'
    });
  }

  handleDelete(e) {
    if (this.state.selectedItemIndex === null) {
      return;
    }

    let toDelete = this.props.data[this.props.noun.plural][this.state.selectedItemIndex];

    this.props.client.delete(toDelete._links.self.href)
      .then(() => {
        clearTimeout(this.alertTimeout);

        this.setState({
          alertMessage: 'Operation successful',
          showAlert: true
        });

        this.alertTimeout = setTimeout(() => {
          this.setState({
            showAlert: false
          });
        }, 3000);
      })
      .catch(err => {
      clearTimeout(this.alertTimeout);

      this.setState({
        alertMessage: err.message,
        showAlert: true
      });

      this.alertTimeout = setTimeout(() => {
        this.setState({
          showAlert: false
        });
      }, 3000);
    });
  }

  handleModalAccept(modalItem) {
    let copy = cloneDeep(modalItem);
    let promise = null;
    if (this.state.modalMode === 'add') {
      promise = this.props.client.add(copy);
    } else {
      delete copy.id;
      delete copy._links;
      promise = this.props.client.update(modalItem._links.self.href, copy);
    }

    promise
      .then(() => {
        clearTimeout(this.alertTimeout);

        this.setState({
          alertMessage: 'Operation successful',
          showAlert: true,
          showModal: false,
          modalMode: null
        });

        this.alertTimeout = setTimeout(() => {
          this.setState({
            showAlert: false
          });
        }, 3000);
      })
      .catch(err => {
      clearTimeout(this.alertTimeout);

      this.setState({
        alertMessage: err.message,
        showAlert: true
      });

      this.alertTimeout = setTimeout(() => {
        this.setState({
          showAlert: false
        });
      }, 3000);
    });

  }

  handleModalReject() {
    this.setState({
      showModal: false,
      modalMode: null
    });
  }

  onChange(index) {
    this.setState({selectedItemIndex: index });
  }

  render() {
    return (
      <div className="ServiceTableAssembly">
        <ServiceTableNavigator
          className="ServiceTableAssembly-Navigator"
          noun={this.props.noun}
          supportAdd={this.props.supportAdd}
          supportModify={this.props.supportModify}
          supportDelete={this.props.supportDelete}
          handleAdd={this.handleAdd}
          handleModify={this.handleModify}
          handleDelete={this.handleDelete}/>
        <ServiceTable
          className="ServiceTableAssembly-Table"
          data={this.props.data[this.props.noun.plural].map(obj => JSON.parse(JSON.stringify(obj)))}
          onChange={this.onChange}/>
        <ItemDialog
          onAccept={this.handleModalAccept}
          onReject={this.handleModalReject}
          noun={this.props.noun}
          show={this.state.showModal}
          data={this.props.data}
          item={this.props.data[this.props.noun.plural][this.state.selectedItemIndex]}/>
        <Notification
          isActive={this.state.showAlert}
          message={this.state.alertMessage}/>
      </div>
    );
  }
}

ServiceTableAssembly.propTypes = {
  client: PropTypes.object,
  data: PropTypes.object,
  supportAdd: PropTypes.bool,
  supportModify: PropTypes.bool,
  supportDelete: PropTypes.bool,
  noun: PropTypes.shape({
    singular: PropTypes.string,
    plural: PropTypes.string
  }).isRequired
};

export default ServiceTableAssembly;
