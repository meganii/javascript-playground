import React, { Component } from 'react';
import './Stock.css';
import {ListItem} from 'material-ui/List';
import TrendingUp from 'material-ui/svg-icons/action/trending-up';
import TrendingDown from 'material-ui/svg-icons/action/trending-down';
import {blue500, red500, greenA200} from 'material-ui/styles/colors';

import StockIndicator from './StockIndicator';

class Stock extends Component {

  constructor() {
    super();
    this.state = {
      data: []
    };
  }


  // componentDidMount() {
  //   // this.loadData();
  // }
  loadData() {
    // fetch('https://www.quandl.com/api/v3/datasets/TSE/' + this.props.code + '.json?api_key=v3fax8Loj-uCxGHas9w3&start_date=2017-07-30')
    fetch('./'+ this.props.code + '.json')
      .then(response => response.json())
      .then(json => {
        console.log(json);
        this.setState({
          data: json,
        });
        console.log(this.state.data.dataset.name);
      });
  }

  render() {
    // if (this.state.data.length == 0) {
    //   return null;
    // };

    const currentPrice = this.props.currentPrice;
    const previousPrice = this.props.previousPrice;
    const profitAndLoss = (currentPrice - this.props.avgBuyPrice) * this.props.numberOfSharesHeld;
    return (
      <ListItem
        key={this.props.index}
        className="Stock"
        primaryText={this.props.name}
        secondaryText={this.props.code + "\n 損益: " + String(profitAndLoss).replace( /(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')}
        secondaryTextLines={2}
        leftIcon={<div className="rightIcon">A</div>}
        rightAvatar={
          <div className="rightAvator">
            <StockIndicator
              currentPrice={currentPrice}
              previousPrice={previousPrice}
              avgBuyPrice={this.props.avgBuyPrice}
              numberOfSharesHeld={this.props.numberOfSharesHeld}
            />
          </div>
        }
      >
      </ListItem>
    );
  }
}

export default Stock;
