var RoomsView = {

  $button: $('#rooms button'),
  $select: $('#rooms select'),

  initialize: function () {
    Rooms.add();
  },

  render: function (data) {
    data.forEach(function (message) {
      message.roomname = message.roomname || 'lobby';
      let cleanedName = message.roomname.trim();
      message.roomname = cleanedName;
      if (Rooms.roomList[cleanedName] === undefined) {
        Rooms.roomList[cleanedName] = cleanedName;
        RoomsView.renderRoom(message);
      }
    });
  },

  renderRoom: function (room) {
    $('#rooms select').append(RoomView.render(room));
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