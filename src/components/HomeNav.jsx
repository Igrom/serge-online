import React from 'react';
import { Link } from 'react-router-dom';
import { Glyphicon } from 'react-bootstrap';

import HomeCard from './HomeCard';


class HomeNav extends React.Component {
  render() {
    return (
      <div>
        <nav>
          <h2>What would you like to do?</h2>
          <div className="HomeNav">
            <HomeCard
              route="/sources"
              icon={(<Glyphicon glyph="user"/>)}
              text="Manage sources"/>
            <HomeCard
              route="/products"
              icon={(<Glyphicon glyph="tags"/>)}
              text="Manage products"/>
            <HomeCard
              route="/shipments"
              icon={(<Glyphicon glyph="road"/>)}
              text="Manage shipments"/>
            <HomeCard
              route="/stock"
              icon={(<Glyphicon glyph="align-justify"/>)}
              text="Manage stock"/>
            <HomeCard
              route="/locations"
              icon={(<Glyphicon glyph="log-out"/>)}
              text="Manage locations"/>
            <HomeCard
              route="/customers"
              icon={(<Glyphicon glyph="briefcase"/>)}
              text="Manage customers"/>
            <HomeCard
              route="/orders"
              icon={(<Glyphicon glyph="shopping-cart"/>)}
              text="Manage orders"/>
            <HomeCard
              route="/manager"
              icon={( <Glyphicon glyph="asterisk"/>)}
              text="Manager"/>
          </div>
        </nav>
      </div>
    );
  }
}

export default HomeNav;
