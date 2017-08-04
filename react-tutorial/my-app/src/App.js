import React, { Component } from 'react';
import './App.css';
import StockList from './StockList'

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Stock Holder</h2>
        </div>
        <div className="Stocks">
          <StockList />
        </div>
      </div>
    );
  }
}

export default App;
