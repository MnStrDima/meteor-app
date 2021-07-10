import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { ReactiveVar } from 'meteor/reactive-var';

// import { Users } from '../api/users';

import './usersList.html';
import './user.js';

Template.usersList.onCreated(function usersListOnCreated() {
    this.state = new ReactiveDict();
    Meteor.subscribe('allUsers');

    const instance = this;
    instance.loaded = new ReactiveVar(0);
    instance.limit = new ReactiveVar(5);
    instance.autorun(function () {
        let limit = instance.limit.get();
        let subscription = instance.subscribe('allUsers', limit);
        if (subscription.ready()) {
            instance.loaded.set(limit);
        }
    });
    instance.allUsers = function () {
        return Meteor.users.find({}, { sort: { createdAt: -1 }, limit: instance.loaded.get() });
    }
    instance.hasMoreUsers = function () {
        return Template.instance().allUsers().count() >= Template.instance().limit.get();
    }
});

Template.usersList.helpers({
    users() {
        const instance = Template.instance();
        Meteor.users.find().forEach(user => { console.log(user) })
        return instance.allUsers();
    },
    usersCount() {
        return Meteor.users.find().count();
    },
    hasMoreUsers: function () {
        let hasMoreUsers = Template.instance().hasMoreUsers();
        return (hasMoreUsers) ? {} : { disabled: 'disabled' };
    }

});

Template.usersList.events({
    'click .loadmore-btn'(event, instance) {
        event.preventDefault();
        let limit = instance.limit.get();
        limit += 5;
        instance.limit.set(limit);
    },
});