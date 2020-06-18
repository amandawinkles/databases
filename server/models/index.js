var db = require('../db');

module.exports = {
  messages: {
    // a function which produces all the messages
    get: function (callback) {
      var qString = 'SELECT messages.id, messages.message, users.name, rooms.roomname FROM messages LEFT OUTER JOIN users LEFT OUTER JOIN rooms ON messages.user = users.id AND messages.room = rooms.id ORDER BY messages.id DESC';
      db.query(qString, (err, results) => {
        callback(err, results);
      });
    },
    // a function which can be used to insert a message into the database
    post: function (postParameters, callback) {
      var qString = 'INSERT INTO messages (message, user, room) \ VALUES (?, SELECT users.id FROM users WHERE name = ? limit 1), ?)';
      db.query(qString, postParameters, (err, results) => {
        callback(err, results);
      });
    }
  },

  users: {
    // Ditto as above.
    get: function () {
      var qString = 'SELECT * FROM users';
      db.query(qString, (err, results) => {
        callback(err, results);
      });
    },
    post: function () {
      var qString = 'INSERT INTO users.name VALUES (?)';
      db.query(qString, postParameters, (err, results) => {
        callback(err, results);
      });
    }
  }
};

