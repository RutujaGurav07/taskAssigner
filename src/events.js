const express = require('express');


function createRouter(db) {
  const router = express.Router();

  router.get('/event', function (req, res, next) {
    db.query(
      'SELECT * FROM task',
      (error, results) => {
        if (error) {
          console.log(error);
          res.status(500).json({ status: 'error' });
        } else {
          res.status(200).json(results);
        }
      }
    );
  });



  router.post('/event', (req, res, next) => {
    
    db.query(
      'INSERT INTO task (task ,status) VALUES (?,?)',
      [req.body.task,req.body.status],
      
      (error) => {
        if (error) {
          console.error(error);
          res.status(500).json({ status: 'error' });
        } else {
          res.status(200).json({ status: 'ok' });
        }
      }
    );
   
  });

    router.put('/event/:task', function (req, res, next) {
      db.query(
        'UPDATE task SET task = ? , status = ? WHERE task = ?',
        [ req.body.task, req.body.status, req.params.task],
        
        (error) => {
          if (error) {
            res.status(500).json({status: 'error'});
          } else {
            res.status(200).json({status: 'update done'});
          }
        }
      );
      console.log(req.params.task);
      console.log(req.body.status);
      console.log(req.body.task);
      console.log('break');
    });

  return router;
}
module.exports = createRouter;