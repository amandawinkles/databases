var Sequelize = require('sequelize');
//var sequalize = new Sequalize('chat', 'student', 'student');
var db = new Sequalize('chat', 'student', 'student'); //database, user, pw

//define mappings between model and table
var Message = db.define('Message', {
  message: Sequalize.STRING,
  // don't add the timestamp attributes (updatedAt, createdAt)
  timestamps: false
});

var User = db.define('User', {
  name: Sequalize.STRING,
  timestamps: false
});

var Room = db.define('Room', {
  roomname: Sequalize.STRING,
  timestamps: false
});

//add a foreign key and singular association mixins to the source
//add userID and roomID to Message table
Message.belongsTo(User);
Message.belongsTo(Room);
//adds a foreign key to target and plural association mixins to the source
User.hasMany(Message);
Room.hasMany(Message);

// create the tables
//add {force: true} as parameter to drop table, then re-create it when table exists in db
Message.sync();
User.sync();
Room.sync();

exports.Message = Message;
exports.User = User;
exports.Room = Room;


