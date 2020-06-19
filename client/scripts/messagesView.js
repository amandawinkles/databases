var MessagesView = {

  $chats: $('#chats'),

  initialize: function () {
    Friends.toggleStatus();
  },

  render: function (data) {
    // console.log('newMessage', data)
    //append $chats with messageView render function
    //loop through data.results = array of nested objects
    _.each(data, function (userObj) {
      var objMessage = userObj;
      Message = {};
      Message.username = objMessage.username;
      Message.text = objMessage.text;
      Message.roomname = objMessage.roomname;
      MessagesView.renderMessage(Message);
    });
  },

  renderMessage: function (message) {
    $('#chats').append(MessageView.render(message));
  },

  handleClick: function(event) {
    let username = $(event.target).data('username');
    if (!username) {
      return;
    }
    Friends.toggleStatus(username, MessagesView.render);
  }
};