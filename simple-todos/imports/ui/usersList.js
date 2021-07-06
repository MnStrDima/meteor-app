import './usersList.html';
import './user.js';

const users = Meteor.users.find();
console.log(users);