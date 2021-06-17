const express = require('express');
const router = express.Router()
const { Stock } = require('../db/db')

router.delete('/:id', async (req, res, next) => {
  const id = Number(req.params.id)
  try{
    await Stock.destroy({
      where: { id:id }
    })
    res.sendStatus(200)
  }
  catch(ex){
    console.log("ERROR deleting stock", id, ex)
  }
  }
);

router.post('/', async (req, res, next) => {
  const id = Number(req.body)
  try{
    const _data = await Stock.create(req.body)
    res.status(201);
    console.log('=====ID: ', _data.dataValues)
    res.send(_data.dataValues)
  }
  catch(ex){
    console.log("ERROR adding stock", req.body, ex)
  }
  }
);

module.exports = router
