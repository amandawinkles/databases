var FormView = {

  $form: $('form'),

  initialize: function () {
    FormView.$form.on('submit', FormView.handleSubmit);
  },

  handleSubmit: function (event) {
    // Stop the browser from submitting the form
    event.preventDefault();

    if ($('#message').val()) {
      var newMessage = {};
      newMessage.username = App.username;
      newMessage.roomname = $('#select option:selected').text() || 'Lobby';
      newMessage.text = document.getElementById('message').value;
      Parse.create(newMessage);
      // puts the prepending element at the first index.
      $('#chats').prepend(MessageView.render(newMessage));
      document.getElementById('send').reset();
    }
    console.log('click!');
  },

  setStatus: function (active) {
    var status = active ? 'true' : null;
    FormView.$form.find('input[type=submit]').attr('disabled', status);
  }
};