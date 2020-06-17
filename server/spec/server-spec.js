/* You'll need to have MySQL running and your Node server running
 * for these tests to pass. */

var mysql = require('mysql');
var request = require('request'); // You might need to npm install the request module!
var expect = require('chai').expect;

describe('Persistent Node Chat Server', function() {
  var dbConnection;

  beforeEach(function(done) {
    dbConnection = mysql.createConnection({
      user: 'student',
      password: 'student',
      database: 'chat'
    });
    dbConnection.connect();


       var messagesTable = "messages"; // TODO: fill this out
       var userTable = "users";
       var roomsTable = "rooms";

    /* Empty the db table before each test so that multiple tests
     * (or repeated runs of the tests) won't screw each other up: */
    // dbConnection.query('truncate ' + messagesTable, done);
    // dbConnection.query('truncate ' + userTable, done);
    // dbConnection.query('truncate ' + roomsTable, done);
  });

  afterEach(function() {
    dbConnection.end();
  });

  xit('Should insert posted messages to the DB', function(done) {
    // Post the user to the chat server.
    request({
      method: 'POST',
      uri: 'http://127.0.0.1:3000/classes/users',
      json: { username: 'Valjean' }
    }, function () {
      // Post a message to the node chat server:
      request({
        method: 'POST',
        uri: 'http://127.0.0.1:3000/classes/messages',
        json: {
          username: 'Valjean',
          message: 'In mercy\'s name, three days is all I need.',
          roomname: 'Hello'
        }
      }, function () {
        // Now if we look in the database, we should find the
        // posted message there.

        // TODO: You might have to change this test to get all the data from
        // your message table, since this is schema-dependent.
        var queryString = 'SELECT * FROM messages';
        var queryArgs = [];

        dbConnection.query(queryString, queryArgs, function(err, results) {
          // Should have one result:
          expect(results.length).to.equal(1);

          // TODO: If you don't have a column named text, change this test.
          expect(results[0].message).to.equal('In mercy\'s name, three days is all I need.');

          done();
        });
      });
    });
  });

  it('Should output all messages from the DB', function(done) {
    // Let's insert a message into the db
    //Create Query Strings for 3 insert statements (user, room, message table)
       var queryStringMessages = "INSERT INTO messages SET ?";
       var queryStringRooms = "INSERT INTO rooms SET ?";
       var queryStringUsers = "INSERT INTO users SET ?";

       var queryArgs = [];
       //{message: 'teaadfafas', user: user, room: room}


    // TODO - The exact query string and query args to use
    // here depend on the schema you design, so I'll leave
    // them up to you. */

    dbConnection.query(queryStringRooms, {roomname: 'main'}, function (error, results, fields) {
      if (error) throw error;
      console.log(results.insertId);
      var room = results.insertId;
    });


    dbConnection.query(queryStringUsers, {name: 'Valjean'}, function (error, results, fields) {
      if (error) throw error;
      console.log(results.insertId);
      var user = results.insertId;
    });

    //execute db query to select test date from tables to verify test
    dbConnection.query(queryStringMessages, {message: 'Men like you can never change!', user: user, room: room}, function(err) {
      if (err) { throw err; }

      // Now query the Node chat server and see if it returns
      // the message we just inserted:
      request('http://127.0.0.1:3000/classes/messages', function(error, response, body) {
        var messageLog = JSON.parse(body);
        expect(messageLog[0].message).to.equal('Men like you can never change!');
        expect(messageLog[0].roomname).to.equal('main');
        expect(messageLog[0].name).to.equal('Valjean');
        done();
      });
    });
  });
});