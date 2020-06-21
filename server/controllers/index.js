var db = require('../db');

module.exports = {
  messages: {
    get: function (req, res) {
      //read the whole table, search for multiple elements in the database
      db.Message.findAll({ include: [db.User, db.Room] })
        .then((messages) => {
          res.json(messages);
        });
    },

    post: function (req, res) {
      //check if a certain element already exists in the db, create if doesn't exist
      db.User.findOrCreate({
        where: { name: req.body.username }
      }) //spread instead of then? for working w/array
        .spread((user) => {
          console.log('roooooooooooomaname', req.body.roomname);
          db.Message.create({
            userId: user.get('id'),
            message: req.body.message,
            roomId: req.body.roomid
          })
            .then((message, created) => {
              //if found, not created, sendStatus(200)
              res.sendStatus(created ? 201 : 200);
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
      //db.users.post()
      // db.User.post({
      //   where: { name: req.body.username }
      // })
      db.User.findOrCreate({
        where: { name: req.body.username }
      })
        .spread((user) => {
          //if newly created, sendStatus(201)//created ? 201 : 200
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
      db.Room.findOrCreate({
        where: { roomname: req.body.roomname }
      })
        .spread((room) => { //Unknown column 'room' in 'field list'
          //if newly created, sendStatus(201)
          res.sendStatus(200);
        });
    }
  }
};

// module.exports = {
//   messages: {
//     get: function (req, res) {
//       //read the whole table, search for multiple elements in the database
//       db.Message.findAll({ include: [db.User, db.Room] })
//         .then((messages) => {
//           res.json(messages);
//         });
//     },

//     post: function (req, res) {
//       //check if a certain element already exists in the db, create if doesn't exist
//       db.User.findOrCreate({
//         where: { name: req.body.username }
//       }) //spread instead of then? for working w/array
//         .spread((user) => {
//           console.log('roooooooooooomaname', req.body.roomname);
//           db.Message.create({
//             userid: user.get('id'),
//             message: req.body.message,
//             roomname: req.body.roomname
//           })
//             .then((message, created) => {
//               //if found, not created, sendStatus(200)
//               res.sendStatus(created ? 201 : 200);
//             });
//         });
//     }
//   },

//   users: {
//     get: function (req, res) {
//       db.User.findAll()
//         .then((users) => {
//           res.json(users);
//         });
//     },
//     post: function (req, res) {
//       //db.users.post()
//       // db.User.post({
//       //   where: { name: req.body.username }
//       // })
//       db.User.findOrCreate({
//         where: { name: req.body.username }
//       })
//         .spread((user) => {
//           //if newly created, sendStatus(201)//created ? 201 : 200
//           res.sendStatus(200);
//         });
//     }
//   },

//   rooms: {
//     get: function (req, res) {
//       db.Room.findAll()
//         .then((rooms) => {
//           res.json(rooms);
//         });
//     },
//     post: function (req, res) {
//       db.Room.findOrCreate({
//         where: { roomname: req.body.roomname }
//       })
//         .spread((room) => { //Unknown column 'room' in 'field list'
//           //if newly created, sendStatus(201)
//           res.sendStatus(200);
//         });
//     }
//   }
// };



// post: async function (req, res) {
    //   try {
    //     const UserObj = await db.User.findOrCreate({
    //       where: { name: req.body.username }
    //     });
    //     console.log('uuuuusssseeer', UserObj);

    //     const RoomObj = await db.Room.findOrCreate({
    //       where: { roomname: req.body.roomname }
    //     });

    //     const MessageObj = await db.Message.create({
    //       raw: true,
    //       UserID: UserObj.get('id'), //UserObj.get('id')//UserObj.getDataValue('id')//this.dataValues[key]
    //       message: req.body.message,
    //       RoomID: RoomObj.dataValues.id
    //     });
    //     console.log('uuuuusssseeer', UserObj, 'rrrrroooooooom', RoomObj);
    //     //console.log('user obj data values:------->', UserObj.dataValues);
    //     // if (MessageObj) {
    //     //   res.sendStatus(200);
    //     // }
    //   } catch(err) {
    //     console.log(err);
    //   }
    // }


// module.exports = {
//   messages: {
//     get: function (req, res) {
//       //search for multiple elements in the database
//       db.Message.findAll({ include: [db.User, db.Room] })
//         .then((messages) => {
//           res.json(messages);
//         });
//     },

//     post: async function (req, res) {
//       const UserObj = await db.User.findOrCreate({
//         where: { name: req.body.username }
//       });

//       const RoomObj = await db.Room.findOrCreate({
//         where: { roomname: req.body.roomname }
//       });

//       // const MessageObj = await db.Message.create({
//       //   UserID: UserObj.dataValues.id, //UserObj.get('id')
//       //   message: req.body.message,
//       //   RoomID: RoomObj.dataValues.id
//       // });
//       console.log(UserObj, RoomObj);
//       console.log('user boj data values:------->', UserObj.dataValues);
//       if (MessageObj) {
//         res.sendStatus(200);
//       }
//     }
//   },


//   //check if a certain element already exists in the db, create if doesn't exist
//   //   db.User.findOrCreate({
//   //     where: { name: req.body.username }
//   //   })
//   //     .then((user) => {
//   //       console.log('user-------', user);
//   //       db.Message.create({
//   //         UserID: user.dataValues.id,
//   //         message: req.body.message,
//   //         RoomID: req.body.roomname
//   //       })
//   //         .then((message) => {
//   //           //if found, not created, sendStatus(200)
//   //           res.sendStatus(201);
//   //         });
//   //     });
//   // }