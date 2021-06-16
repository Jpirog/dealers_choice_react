const express = require('express');
const router = express.Router()
const { Stock } = require('../db/db')

router.get('/', async (req, res, next) => {
  try {
    console.log('********** in stock/api')
    res.send(await Stock.findAll())
    }
  catch(ex) {
    next(ex);
  }
});

module.exports = router
