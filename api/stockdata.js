const express = require('express');
const router = express.Router()
//const { Stock } = require('../db/db')

const request = require('request');
//console.log('IN STOCKDATA')
const fs = require('fs');
const { Router } = require('express');
//const { url } = require('inspector');

// get the API key for getting stock and company information
let apiKey;
const getApiKey = async () => {
await fs.readFile('./apikey', 'utf8' , (err, data) => {
  if (err) {
    console.error('CANNOT READ API KEY', err)
    return
  }
  console.log('1 API KEY=',data)
  apiKey = data;
  console.log('2 API KEY=',apiKey)
})
}


let stockData;
const getStockData = async () => {
  await getApiKey();
  const url = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&interval=5min&symbol=MSI&apikey=${apiKey}`
  //console.log('AFTER CALL', url)
  await request.get({
    url: url,
    json: true,
    headers: {'User-Agent': 'request'}
  }, (err, req, data) => {
    //console.log(data);
    
  stockData= data;
  })
}

router.get('/', async (req, res, next) => {
  try {
    await getStockData();
    //console.log('********** in stockdata/api', stockData)
    res.send(stockData)
    }
  catch(ex) {
    next(ex);
  }
});


module.exports = router
