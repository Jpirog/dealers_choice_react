const express = require('express');
const router = express.Router()
const { Client, Portfolio } = require('../db/db')

router.get('/', async (req, res, next) => {
  try {
    res.send(await Client.findAll({
      include: {
        model: Portfolio
      },
      order: [['name','ASC']]
    }))
    }
  catch(ex) {
    next(ex);
  }
});

module.exports = router
