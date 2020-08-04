
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const events = require('./events');

const con = mysql.createConnection({
  host: "localhost",
  user: "taskassigner",
  password: "password",
  database:'taskassigner'
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  // let sql = `INSERT INTO task(task,status) VALUES("Get up early in morning","inprocess") `;
  // con.query(sql, function (err, result) {
  //   if (err) throw err;
  //   console.log("inserted in table!!");
  // });
});

const port = process.env.PORT || 8080;

const app =express()
  .use(cors())
  .use(bodyPaser.json())
  .use(events(con));


  app.listen(port, () => {
    console.log(`Express server listening on port ${port}`);
  });