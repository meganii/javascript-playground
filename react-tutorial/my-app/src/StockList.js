import React, { Component } from 'react';
import Stock from './Stock';
import './StockList.css';
import List from 'material-ui/List';
import Divider from 'material-ui/Divider';


class StockList extends Component {
  render() {
    const data = {
      stocks: [
        {name: 'とーそー', price: 100, code: '2456T'},
        {name: '伊藤園', price: 100, code: '2345T'},
        {name: 'あんしん保証', price: 300, code: '1124T'},
      ]
    };
    const stockList = data.stocks.map((stock) =>
      <div className="StockItem">
        <Stock name={stock.name} price={stock.price} code={stock.code}/>
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
