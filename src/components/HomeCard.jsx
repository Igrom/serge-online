import React from 'react';
import { Link } from 'react-router-dom';
import { Image } from 'react-bootstrap';

class AppHeader extends React.Component {

  render() {
    return (
      <Link to={this.props.route} className="HomeCard card card-1">
          <div>
            {this.props.icon}
          </div>
          <span>{this.props.text}</span>
      </Link>
    );
  }
}

export default AppHeader;
