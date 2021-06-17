const express = require('express');
const router = express.Router()
const { Portfolio, Stock, Client } = require('../db/db')

router.get('/:id', async (req, res, next) => {
  try {
    res.send(await Portfolio.findAll({
      where: {id: req.params.id},
      include: [Stock, Client],
      order: [[Stock,'datePurchased','ASC']]
      }
    ))
    }
  catch(ex) {
    next(ex);
  }
});

module.exports = router
