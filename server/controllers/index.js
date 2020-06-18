var models = require('../models');

module.exports = {
  messages: {
    // a function which handles a get request for all messages
    get: function (req, res) {
      models.messages.get((err, results) => {
        if (err) {
          console.log(err);
        } else {
          //send with results string as json object
          res.json(results);
        }
      });
    },
    // a function which handles posting a message to the database
    post: function (req, res) {
      var postParameters = [req.body.message, req.body.user, req.body.room];
      models.messages.post(postParameters, (err, results) => {
        if (err) {
          console.log(err);
        } else {
          //set http response status- the request has succeeded and has led to the creation of a message post
          res.sendStatus(201);
        }
      });
    }
  },

  users: {
    // Ditto as above
    get: function (req, res) {
      models.users.get((err, results) => {
        if (err) {
          console.log(err);
        } else {
          res.json(results);
        }
      });
    },
    post: function (req, res) {
      var postParameters = [req.body.user];
      models.users.post(postParameters, (err, results) => {
        if (err) {
          console.log(err);
        } else {
          res.sendStatus(201);
        }
      });
    }
  }
};

