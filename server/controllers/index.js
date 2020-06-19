var models = require('../models');


module.exports = {
  messages: {
    // a function which handles a get request for all messages
    get: function (req, res) {
      models.messages.get(function (err, results) {
        if (err) {
          console.log(err);
        } else {
          //send with results string as json object
          //res.sendStatus(200);
          res.json(results);
        }
      });
    },
    // a function which handles posting a message to the database
    post: function (req, res) {
      //var postParameters = [req.body.message, req.body.username, req.body.roomname];
      models.messages.post(req.body, function (err, results) {
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
      models.users.get(function (err, results) {
        if (err) {
          console.log(err);
        } else {
          res.sendStatus(200);
          res.json(results);
        }
      });
    },
    post: function (req, res) {

      var postParameters = [req.body.username];

      models.users.post(postParameters, function (err, results) {
        if (err) {
          console.log(err);
        } else {
          res.sendStatus(201);
        }
      });
    }
  },

  rooms: {
    get: function (req, res) {
      models.rooms.get(function (err, results) {
        if (err) {
          console.log(err);
        } else {
          res.sendStatus(200);
          res.json(results);
        }
      });
    },
    post: function (req, res) {
      var postParameters = [req.body.roomname];
      models.rooms.post(postParameters, function (err, results) {
        if (err) {
          console.log(err);
        } else {
          res.sendStatus(201);
        }
      });
    }
  }
};

