var App = {

  $spinner: $('.spinner img'),

  username: 'anonymous',
  roomname: 'lobby', //roomname set to lobby if undefined --> roomsView.js

  initialize: function() {
    App.username = window.location.search.substr(10);

    FormView.initialize();
    RoomsView.initialize();
    MessagesView.initialize();

    // Fetch initial batch of messages
    App.startSpinner();
    App.fetch(App.stopSpinner);

  },

  fetch: function(callback = ()=>{}) {

    httpRequests.readAll((data) => {
      // examine the response from the server request:
      console.log(data);

      //let arrayOfObj = data;
      MessagesView.render(data);
      RoomsView.render(data);
      // RoomsView.filterRooms(arrayOfObj);
      callback();
    });
    // setTimeout(() => {
    //   App.clearMessages();
    //   App.fetch();
    // }, 20000);
  },

  clearMessages: function() {
    $('#chats').html('');
  },

  startSpinner: function() {
    App.$spinner.show();
    FormView.setStatus(true);
  },

  stopSpinner: function() {
    App.$spinner.fadeOut('fast');
    FormView.setStatus(false);
  }
};