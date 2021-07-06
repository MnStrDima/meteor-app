import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';



import './user.html';

Template.user.helpers({
    isBanned() {
        return this.owner === Meteor.userId();
    },
});

Template.user.events({
    'click .toggle-ban'() {
        // Set the checked property to the opposite of its current value
        // Meteor.call('tasks.setChecked', this._id, !this.checked);

    },
});