var Friends = {

  list: {},

  toggleList: function (clickedFriend) {
    if (this.list[clickedFriend] === undefined) {
      this.list[clickedFriend] = clickedFriend;
    } else {
      delete this.list[clickedFriend];
    }

    this.toggleStatus(clickedFriend);
  },

  toggleStatus: function (clickedFriend) {

    $('.username').filter(function () {
      return $(this).text() === clickedFriend;
    }).toggleClass('friend');
  }
};

