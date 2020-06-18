var db = require('../db');

module.exports = {
  messages: {
    // a function which produces all the messages
    get: function (callback) {
      var qString = 'SELECT messages.id, messages.message, users.name, rooms.roomname FROM messages LEFT OUTER JOIN users ON messages.user = users.id LEFT OUTER JOIN rooms ON messages.room = rooms.id ORDER BY messages.id DESC';

      db.query(qString, function(err, results) {
        callback(err, results);
      });
    },

    // a function which can be used to insert a message into the database
    post: function (postParameters, callback) {
      var qString = 'INSERT INTO messages (message, user, room) VALUES (?, (SELECT users.id FROM users WHERE name = ?), (SELECT rooms.id FROM rooms WHERE roomname = ?))'; //values will be (postParameters)  - postParameters = [req.body.message, req.body.user, req.body.room];
      db.query(qString, postParameters, function(err, results) {
        callback(err, results);
      });
    }
  },

  users: {
    // Ditto as above.
    get: function (callback) {
      var qString = 'SELECT * FROM users';
      db.query(qString, function(err, results) {
        callback(err, results);
      });
    },
    post: function (postParameters, callback) {
      var qString = 'INSERT INTO users (name) VALUES (?)';
      db.query(qString, postParameters, function(err, results) {
        callback(err, results);
      });
    }
  },

  rooms: {
    get: function (callback) {
      var qString = 'SELECT * FROM rooms';
      db.query(qString, function(err, results) {
        callback(err, results);
      });
    },
    post: function (postParameters, callback) {
      var qString = 'INSERT INTO rooms (roomname) VALUES (?)';
      db.query(qString, postParameters, function(err, results) {
        callback(err, results);
      });
    }
  }
};

