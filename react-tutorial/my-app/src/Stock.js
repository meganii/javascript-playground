import React, { Component } from 'react';
import './Stock.css';
import {ListItem} from 'material-ui/List';
import TrendingUp from 'material-ui/svg-icons/action/trending-up';
import TrendingDown from 'material-ui/svg-icons/action/trending-down';
import {blue500, red500, greenA200} from 'material-ui/styles/colors';

class Stock extends Component {
  render() {
    return (
      <ListItem 
        className="Stock"
        primaryText={this.props.name}
        secondaryText={this.props.code + ':' + this.props.price}
        secondaryTextLines={2}
        leftIcon={<div className="rightIcon">A</div>}
        rightAvatar={
          <div className="rightAvator">
            <TrendingUp color={red500} />
            <div>+{this.props.price}</div>
            <div>(700)</div>
          </div>}
      >
      </ListItem>
    );
  }
}

export default Stock;
