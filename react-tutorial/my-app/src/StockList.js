import React, { Component } from 'react';
import Stock from './Stock';
import './StockList.css';
import List from 'material-ui/List';
import Divider from 'material-ui/Divider';


class StockList extends Component {
  render() {
    const data = {
      stocks: [
        {name: 'トーソー', price: 100, code: '5956', avgBuyPrice: 400, numberOfSharesHeld: 100},
        {name: '伊藤園', price: 100, code: '2593', avgBuyPrice: 5000, numberOfSharesHeld: 100},
        {name: 'あんしん保証', price: 300, code: '7183', avgBuyPrice: 550, numberOfSharesHeld: 100},
      ]
    };
    const stockList = data.stocks.map((stock,index) =>
      <div className="StockItem">
        <Stock index={index} name={stock.name} price={stock.price} code={stock.code}/>
        <Divider />
      </div>
    );

    return (
      <List className="StockList">
        {stockList}
      </List>
    );
  }
}

export default StockList;
