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
    // do some async code here
    if (true) {
      console.log("update");
      resolve();
    } else {
      reject();
    }
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
          onRefresh={this.handleRefresh}
          className="PulltoRefresh"
          style={{
            textAlign: 'center'
        }}>
          <TotalBalance />
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
          <div className="Stocks">
            <StockList />
          </div>
        </ReactPullToRefresh> 
      </div>
    );
  }
}

export default App;
