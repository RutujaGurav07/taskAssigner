
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const events = require('./src/events');

const con = mysql.createConnection({
  host: "localhost",
  user: "taskassigner",
  password: "password",
  database: 'taskassigner'  
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");

});

const port = process.env.PORT || 8080;

const app = express()
  .use(cors())
  .use(bodyParser.json())
  .use(events(con));


app.listen(port, () => {
  console.log(`Express server listening on port ${port}`);
});