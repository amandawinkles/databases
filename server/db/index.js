var Sequelize = require('sequelize');
//var sequalize = new Sequalize('chat', 'student', 'student');
var db = new Sequelize('chat', 'student', 'student', {
  host: 'localhost',
  dialect: 'mysql'
});

//define mappings between model and table
var Message = db.define('Message', {
  message: Sequelize.STRING
}, {timestamps: false} );

var User = db.define('User', {
  name: Sequelize.STRING
}, {timestamps: false} );

var Room = db.define('Room', {
  roomname: Sequelize.STRING
}, {timestamps: false} );

//add a foreign key and singular association mixins to the source
//add userID and roomID to Message table
Message.belongsTo(User); //, { as: 'user', foreignKey: 'userid'}//, { foreignKey: { allowNull: false } }
Message.belongsTo(Room);//, { foreignKey: { allowNull: false } }
//adds a foreign key to target and plural association mixins to the source
User.hasMany(Message);
Room.hasMany(Message);

// create the tables
//add {force: true} as parameter to drop table, then re-create it when table exists in db
User.sync();
Room.sync();
Message.sync();

exports.Message = Message;
exports.User = User;
exports.Room = Room;
exports.db = db;


