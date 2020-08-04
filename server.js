
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
  let sql = `CREATE TABLE task (task_id INT AUTO_INCREMENT PRIMARY KEY, task TEXT,status VARCHAR(100) )`;
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("The task table is created!!");
  });
});