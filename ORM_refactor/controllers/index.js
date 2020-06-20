var db = require('../db');

module.exports = {
  messages: {
    get: function (req, res) {
      //search for multiple elements in the database
      db.Message.findAll({ include: [db.User, db.Room] })
        .then((messages) => {
          res.json(messages);
        });
    },
    post: function (req, res) {
      //check if a certain element already exists in the db, create if doesn't exist
      db.User.findOrCreate({
        where: { username: req.body.username }
      }) //spread instead of then? for working w/array
        .spread((user) => {
          db.Message.create({
            userid: user.get('id'),
            message: req.body.message,
            roomname: req.body.roomname
          })
            .then((message) => {
              //if found, not created, sendStatus(200)
              res.sendStatus(201);
            });
        });
    }
  },

  users: {
    get: function (req, res) {
      db.User.findAll()
        .then((users) => {
          res.json(users);
        });
    },
    post: function (req, res) {
      db.User.findOrCreate({
        where: { username: req.body.username }
      })
        .spread((user) => {
          //if newly created, sendStatus(201)
          res.sendStatus(200);
        });
    }
  },

  rooms: {
    get: function (req, res) {
      db.Room.findAll()
        .then((rooms) => {
          res.json(rooms);
        });
    },
    post: function (req, res) {
      db.User.findOrCreate({
        where: { username: req.body.username }
      })
        .spread((room) => {
          //if newly created, sendStatus(201)
          res.sendStatus(200);
        });
    }
  }
};

// db.Message.findOrCreate({
//   user.id: user.get('id'),
//   message: req.body.message,
//   roomname: req.body.roomname
// })