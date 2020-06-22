/* You'll need to have MySQL running and your Node server running
 * for these tests to pass. */

var mysql = require('mysql');
var request = require('request'); // You might need to npm install the request module!
var expect = require('chai').expect;


describe('Persistent Node Chat Server', function () {
  var dbConnection;

  beforeEach(function (done) {
    dbConnection = mysql.createConnection({
      user: 'student',
      password: 'student',
      database: 'chat',
      multipleStatements: true
    });
    dbConnection.connect();

    var tables = ['messages', 'users', 'rooms'];

    dbConnection.query('SET FOREIGN_KEY_CHECKS=0', function (error) {
      if (error) { throw error; }
      dbConnection.query('truncate table ??; truncate table ??; truncate table ??;', tables, function (error) {
        if (error) { throw error; }
        dbConnection.query('SET FOREIGN_KEY_CHECKS=1', function (error) {
          if (error) { throw error; }
          done();
        });
      });
    });
    //done();
  });


  afterEach(function () {
    dbConnection.end();
  });

  it('Should insert posted messages to the DB', function (done) {
    // Post the user to the chat server.
    request({
      method: 'POST',
      uri: 'http://127.0.0.1:3000/classes/users',
      json: { username: 'Valjean' }
    }, function () {
      // Post the room to the chat server.
      request({
        method: 'POST',
        uri: 'http://127.0.0.1:3000/classes/rooms',
        json: { roomname: 'main' }
      }, function () {
        // Post a message to the node chat server:
        request({
          method: 'POST',
          uri: 'http://127.0.0.1:3000/classes/messages',
          json: {
            username: 'Valjean',
            message: 'In mercy\'s name, three days is all I need.',
            roomname: 'main'
          } //insert into messages (message, room, user) value (message, (select id from rooms where rooms.name = 'main'), (select id from users w)
        }, function () {

          // Now if we look in the database, we should find the
          // posted message there.

          // TODO: You might have to change this test to get all the data from
          // your message table, since this is schema-dependent.
          var queryString = 'SELECT * FROM messages';
          var queryArgs = [];

          dbConnection.query(queryString, queryArgs, function (err, results) {
            // Should have one result:
            expect(results.length).to.equal(1);

            // TODO: If you don't have a column named text, change this test.
            expect(results[0].message).to.equal('In mercy\'s name, three days is all I need.');

            done();
          });
        });
      });
    });
  });

  it('Should output all messages from the DB', function (done) {
    // Let's insert a message into the db
    //Create Query Strings for 3 insert statements (user, room, message table)
    var queryStringMessages = 'INSERT INTO messages SET ?';
    var queryStringRooms = 'INSERT INTO rooms SET ?';
    var queryStringUsers = 'INSERT INTO users SET ?';

    var queryArgs = { message: 'Men like you can never change!' };


    // TODO - The exact query string and query args to use
    // here depend on the schema you design, so I'll leave
    // them up to you. */

    dbConnection.query(queryStringRooms, { roomname: 'main' }, function (error, results, fields) {
      if (error) { throw error; }
      //console.log(results.insertId);
      queryArgs.room = results.insertId;

      dbConnection.query(queryStringUsers, { name: 'Valjean' }, function (error, results, fields) {
        if (error) { throw error; }
        //console.log(results.insertId);
        queryArgs.user = results.insertId;

        //execute db query to select test date from tables to verify test
        dbConnection.query(queryStringMessages, queryArgs, function (err) {
          if (err) { throw err; }

          // Now query the Node chat server and see if it returns
          // the message we just inserted:
          request('http://127.0.0.1:3000/classes/messages', function (error, response, body) {
            var messageLog = JSON.parse(body);
            expect(messageLog[0].message).to.equal('Men like you can never change!');
            expect(messageLog[0].roomname).to.equal('main');
            expect(messageLog[0].name).to.equal('Valjean');
            done();
          });
        });
      });
    });
  });

  it('Should not insert duplicate roomnames to the DB', function (done) {
    //2x post requests, 1x get request
    //get request should bring back 1 record in array
    console.log('Beginning of test ------------->');
    request({
      method: 'POST',
      uri: 'http://127.0.0.1:3000/classes/rooms',
      json: { roomname: 'main' }
    }, function () {
      console.log('second post requestxoxoxox');
      request({
        method: 'POST',
        uri: 'http://127.0.0.1:3000/classes/rooms',
        json: { roomname: 'main' }
      }, function () {
        console.log('reached select function --------->');
        var queryString = 'SELECT * FROM rooms WHERE roomname = ?';
        var queryArgs = ['main'];
        dbConnection.query(queryString, queryArgs, function (error, results, fields) {
          if (error) { throw error; }
          console.log('query results', results);
          expect(results.length).to.equal(1);
          done();
        });
      });
    });
  });

  it ('Should not insert duplicate username to the DB', function(done) {
    request({
      method: 'POST',
      uri: 'http://127.0.0.1:3000/classes/rooms',
      json: { username: 'Valjean' }
    }, function () {
      request({
        method: 'POST',
        uri: 'http://127.0.0.1:3000/classes/rooms',
        json: { username: 'Valjean' }
      }, function () {
        var queryString = 'SELECT * FROM users WHERE name = ?';
        var queryArgs = ['Valjean'];
        dbConnection.query(queryString, queryArgs, function (error, results, fields) {
          if (error) { throw error; }
          expect(results.length).to.equal(1);
          done();
        });
      });
    });
  });

  it ('Should return status code 200 for successful request', function(done) {
    request('http://127.0.0.1:3000/classes/')
      .get('/messages')
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
});