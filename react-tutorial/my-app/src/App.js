import React, { Component } from 'react';
import './App.css';
import StockList from './StockList';
import TotalBalance from './TotalBalance';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import ReactPullToRefresh from 'react-pull-to-refresh';
import Subheader from 'material-ui/Subheader';

import request from 'request';

import * as firebase from 'firebase';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
      code: '',
      name: '',
      avgBuyPrice: 0,
      numberOfSharesHeld: 0,
      currentPrice: 0,
      previousPrice: 0,
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  handleTouchTap() {
    console.log('touch tap');
  }

  handleSubmit = () => {
    this.setState({open: false});

    fetch('https://www.quandl.com/api/v3/datasets/TSE/' + this.state.code + '.json?api_key=v3fax8Loj-uCxGHas9w3&start_date=2017-07-30')
      .then(response => response.json())
      .then(json => {
        const stocksRef = firebase.database().ref().child('stocks');
        stocksRef.push({
            code: this.state.code,
            name: this.state.name,
            avgBuyPrice: this.state.avgBuyPrice,
            numberOfSharesHeld: this.state.numberOfSharesHeld,
            currentPrice: json.dataset.data[0][4],
            previousPrice: json.dataset.data[1][4],
          },
        );
        this.setState({
          code: '',
          name: '',
          avgBuyPrice: 0,
          numberOfSharesHeld: 0,
          currentPrice: 0,
          previousPrice: 0,
        });
      });
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleRefresh(resolve, reject) {
    let self = this;
    console.log(this);
    setTimeout(function () {
      self.refreshStockData() ? resolve() : reject();
    }, 500);
  }

  refreshStockData() {
    const stocksRef = firebase.database().ref().child('stocks');
    let updates = {};
    let list = [];
    stocksRef.once('value').then((snap) => {
      list = snap.val();
      const stocks = Object.keys(list).map(key=> Object.assign(list[key], {key}));
      stocks.map((stock) => {
        fetch(`https://us-central1-cloud-api-2e3ec.cloudfunctions.net/api/stocks/${stock.code}`)
          .then(response => response.text())
          .then(text => text.split('\n'))
          .then(str => str.slice(8, str.length-1))
          .then(str => str[str.length-1].split(','))
          .then((str) => {
            console.log(str[1]);
            updates['/stocks/' + stock.key] = {
              avgBuyPrice: stock.avgBuyPrice,
              code: stock.code,
              currentPrice: str[1],
              name: stock.name,
              numberOfSharesHeld: stock.numberOfSharesHeld,
              previousPrice: stock.previousPrice,
            };
            firebase.database().ref().update(updates);
          });
      });
    });
    return true;
  }

  render() {
    const actions = [
        <FlatButton
          label="Cancel"
          primary={true}
          onTouchTap={this.handleClose}
        />,
        <FlatButton
          label="Submit"
          primary={true}
          keyboardFocused={true}
          onTouchTap={this.handleSubmit}
        />,
      ];

    return (
      <div className="App">
        <AppBar
          title="Stock Holder"
          iconElementRight={<FlatButton label="Add" onTouchTap={this.handleOpen} />}
        /> 
        <ReactPullToRefresh
          onRefresh={(s,v) => {this.handleRefresh(s,v)}}
          className="PulltoRefresh"
          style={{
          textAlign: 'center'
        }}>
          <div className="refresh-touch-area">
            <Subheader>Pull to Refresh</Subheader>
            <TotalBalance /> 
          </div>
        </ReactPullToRefresh>
        <Dialog
          title="株登録"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          <TextField name="code" floatingLabelText="株コード" value={this.state.code} onChange={this.handleInputChange} />
          <TextField name="name" floatingLabelText="名称" value={this.state.name} onChange={this.handleInputChange} />
          <TextField name="avgBuyPrice" floatingLabelText="購入金額" value={this.state.avgBuyPrice} onChange={this.handleInputChange} />
          <TextField name="numberOfSharesHeld" floatingLabelText="購入株数" value={this.state.numberOfSharesHeld} onChange={this.handleInputChange}/>
        </Dialog>
        <StockList />
      </div>
    );
  }
}

export default App;
