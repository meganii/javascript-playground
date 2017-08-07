import React, { Component } from 'react';
import Stock from './Stock';
import './StockList.css';
import List from 'material-ui/List';
import Divider from 'material-ui/Divider';

import * as firebase from 'firebase';

class StockList extends Component {

  constructor(){
    super();
    this.state = {
      stocks: [],
    }
  }

  componentDidMount() {
    const stocksRef = firebase.database().ref('/stocks');
    let list = [];
    stocksRef.on('value', snap => {
      list = snap.val();
      const stocks = Object.keys(list).map((key)=> {
        return Object.assign(list[key], {key});
      });
      console.log(stocks);
      this.setState({
        stocks: stocks
      })
    });

    
  }

  render() {
    // const data = {
    //   stocks: [
    //     {name: 'トーソー', price: 100, code: '5956', avgBuyPrice: 449, numberOfSharesHeld: 100},
    //     {name: '伊藤園', price: 100, code: '2593', avgBuyPrice: 5000, numberOfSharesHeld: 100},
    //     {name: 'あんしん保証', price: 300, code: '7183', avgBuyPrice: 550, numberOfSharesHeld: 100},
    //     {name: 'ダスキン', price: 300, code: '4665', avgBuyPrice: 2050, numberOfSharesHeld: 100},
    //   ]
    // };
    const stockList = this.state.stocks.map((stock,index) =>
      <div className="StockItem">
        <Stock 
          index={index} 
          stockKey={stock.key}
          name={stock.name}
          code={stock.code}
          avgBuyPrice={stock.avgBuyPrice}
          numberOfSharesHeld={stock.numberOfSharesHeld}
          currentPrice={stock.currentPrice}
          previousPrice={stock.previousPrice}
        />
        <Divider />
      </div>
    );

    return (
      <div className="view">
        <List className="StockList">
          {stockList}
        </List>
      </div>
    );
  }
}

export default StockList;
