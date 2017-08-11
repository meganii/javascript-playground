var fs = require('fs');
var parse = require('csv-parse');
var fetch = require('node-fetch');
var firebase = require('firebase');

var config = {
  apiKey: "AIzaSyAqDRj_DgKmzDY2u518QM6YvniV4FMQdUM",
  authDomain: "stockholder-bd2d8.firebaseapp.com",
  databaseURL: "https://stockholder-bd2d8.firebaseio.com",
  projectId: "stockholder-bd2d8",
  storageBucket: "stockholder-bd2d8.appspot.com",
  messagingSenderId: "837411185118"
};
firebase.initializeApp(config);

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function demo(index, code, name, numberOfSharesHeld, avgBuyPrice) {
  console.log('Taking a break...');
  await sleep(3000*index);
  
  fetch('https://www.quandl.com/api/v3/datasets/TSE/' + code + '.json?api_key=v3fax8Loj-uCxGHas9w3&start_date=2017-07-30')
      .then(function(response){ return response.json()})
      .then(function(json) {      
        var stocksRef = firebase.database().ref().child('/stocks');
        stocksRef.push({
            code: code,
            name: name,
            avgBuyPrice: avgBuyPrice,
            numberOfSharesHeld: numberOfSharesHeld,
            currentPrice: json.dataset.data[0][4],
            previousPrice: json.dataset.data[1][4],
          },
        );
      });
  console.log(code);
  console.log('Two second later');
}

var parser = parse({delimiter: ','}, function(err, data){
  data.map(function(dat, index){
    var code = dat[0].replace('.T','');
    var name = dat[2];
    var numberOfSharesHeld = dat[3];
    var avgBuyPrice = dat[4];

    demo(index, code, name, numberOfSharesHeld, avgBuyPrice);

    // fetch('https://www.quandl.com/api/v3/datasets/TSE/' + code + '.json?api_key=v3fax8Loj-uCxGHas9w3&start_date=2017-07-30')
    //   .then(function(response){ return response.json()})
    //   .then(function(json) {
        
    //     var stocksRef = firebase.database().ref().child('/react');
    //     stocksRef.push({
    //         code: code,
    //         name: name,
    //         avgBuyPrice: avgBuyPrice,
    //         numberOfSharesHeld: numberOfSharesHeld,
    //         currentPrice: json.dataset.data[0][4],
    //         previousPrice: json.dataset.data[1][4],
    //       },
    //     );
    //   });
  })
});

fs.createReadStream(__dirname+'/data_3.csv').pipe(parser);


