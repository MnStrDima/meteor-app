import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';



import './user.html';

Template.user.helpers({
    isBanned() {
        return this.isBanned;
    },
    email() {
        return this.emails[0].address;
    }
});

Template.user.events({
    'click .toggle-ban'() {
        Meteor.call('allUsers.setIsBanned', this._id, !this.isBanned);

    },
});