const express = require('express');
const router = express.Router()
const { Portfolio, Stock, Client } = require('../db/db')
//console.log(Client)

router.get('/:id', async (req, res, next) => {
  try {
    console.log('********** in portfolio/api ==>', req.params.id)
    res.send(await Portfolio.findAll({
      where: {id: req.params.id},
      include: [Stock, Client]
      }
    ))
    }
  catch(ex) {
    next(ex);
  }
});

module.exports = router
