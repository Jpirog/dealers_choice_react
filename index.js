console.log("You're in!");
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const {seedTestData} = require('./db/db');

const app = express();
module.exports = app;
// logging:
app.use(morgan('dev'));
// body parsing:
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// serve css when asked
//app.use(express.static(path.join(__dirname, 'public')));
// static file serving
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.static(path.join(__dirname, 'dist')))
app.use(express.static(path.join(__dirname, 'node_modules', 'css')))
// api main route
app.use('/api', require('./api'))


// send the initial HTML file
app.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, 'client', 'index.html'))
})

async function startServer() {
  const port = 3111;
  try{
    await seedTestData();
    app.listen(port, () => {
      console.log(`Server started and listening on port ${port}`)
    })
  }
  catch(ex){
    console.log("Exception in main index.js", ex);
  }
} 

startServer();
