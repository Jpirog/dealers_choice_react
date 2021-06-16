console.log("IN API/INDEX")

const router = require('express').Router()

const clientRoutes = require('./client')
router.use('/client', clientRoutes)

const portfolioRoutes = require('./portfolio')
router.use('/portfolio', portfolioRoutes)

const stockRoutes = require('./stock')
router.use('/stock', stockRoutes)

const stockDataRoutes = require('./stockdata')
router.use('/stockdata', stockDataRoutes)

module.exports = router
