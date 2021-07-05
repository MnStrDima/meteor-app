Router.route('/', function () {
    this.render('body');
});

Router.route('/users', {
    name: 'usersList',
    waitOn: function () {
        return Meteor.subscribe('usersList');
    },
    data: function () {
        return Meteor.users.find({});
    }
});