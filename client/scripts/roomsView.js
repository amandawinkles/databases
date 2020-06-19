var RoomsView = {

  $button: $('#rooms button'),
  $select: $('#rooms select'),

  //if roomname === undefined, roomname = 'lobby'

  initialize: function () {
    Rooms.add();

  },

  render: function (arrayOfObj) {
    // arrayOfObj = data.result [{}, {}, {}]
    //append #rooms select with RoomView render function
    var listOfRooms = [];
    arrayOfObj.forEach(function (obj) {
      if (obj.roomname && !listOfRooms.includes(RoomView.render({ roomname: obj.roomname }))) {
        listOfRooms.push({ roomname: obj.roomname }); // list of individual objects [{roomname: "all"}, {roomname: "room1"}]
      }
    });
    // iterate over list of rooms
    for (var roomObj of listOfRooms) {
      // passing each obj with an individual roomname property to the "renderRoom" function"
      RoomsView.renderRoom(roomObj);
    }
    return listOfRooms;
  },

  renderRoom: function (room) {
    // console.log(room);
    roomname = room.roomname;
    $('#rooms select').append(RoomView.render(roomname));
  }
};



// var RoomsView = {

//   $button: $('#rooms button'),
//   $select: $('#rooms select'),

//   initialize: function () {
//     this.$select.change(function() {
//       MessagesView.render(RoomsView.$select.val());
//     });

//     this.$button.on('click', function() {
//       let newRoom = prompt('Add Room:');
//       Rooms.add(newRoom);

//     });

//   },

//   render: function () {

//     const data = Messages.results;

//     for (let i = 0; i < data.length; i++) {

//       if (data[i].roomname === undefined) {
//         data[i].roomname = 'lobby';
//       }
//       let trimmedRoom = data[i].roomname.trim();
//       if (Rooms.roomList[trimmedRoom] === undefined) {
//         let room = _.escape(trimmedRoom);
//         Rooms.roomList[room] = room;
//         Rooms.add(room);
//       }
//     }
//     MessagesView.render(RoomsView.$select.val());
//   },

//   renderRoom: function (room) {
//     this.$select.append(`<option value="${ room }">${ room }</option>`);
//   }


// };