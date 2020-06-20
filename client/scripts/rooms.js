var Rooms = {

  roomList: {},

  add: function () {

    $('#rooms button').on('click', function () {
      var roomObj = {
        roomname: document.getElementById('roomText').value,
      };
      RoomsView.renderRoom(roomObj);
      $('#roomText').val('');
    });
  }
};