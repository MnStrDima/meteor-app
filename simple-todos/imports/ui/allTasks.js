import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { ReactiveVar } from 'meteor/reactive-var';

import { Tasks } from '../api/tasks';

import './task.js';
import './allTasks.html';

Template.allTasks.onCreated(function allTasksOnCreated() {
    this.state = new ReactiveDict();
    Meteor.subscribe('tasks');

    const instance = this;
    instance.loaded = new ReactiveVar(0);
    instance.limit = new ReactiveVar(2);
    instance.autorun(function () {
        let limit = instance.limit.get();
        let subscription = instance.subscribe('tasks', limit);
        if (subscription.ready()) {
            instance.loaded.set(limit);
        }
    });
    instance.allTasks = function () {
        return Tasks.find({}, { sort: { createdAt: -1 }, limit: instance.loaded.get() });
    }
    instance.incompleteTasks = function () {
        return Tasks.find({ checked: { $ne: true } }, { sort: { createdAt: -1 }, limit: instance.loaded.get() });
    }
    instance.hasMoreTasks = function () {
        return Template.instance().allTasks().count() >= Template.instance().limit.get();
    }
});

Template.allTasks.helpers({
    tasks() {
        const instance = Template.instance();
        if (instance.state.get('hideCompleted')) {
            return instance.incompleteTasks();
        }
        return instance.allTasks();
    },
    incompleteCount() {
        return Tasks.find({ checked: { $ne: true } }).count();
    },
    hasMoreTasks: function () {
        let hasMoreTasks = Template.instance().hasMoreTasks();
        return (hasMoreTasks) ? {} : { disabled: 'disabled' };
    }

});

Template.allTasks.events({
    'submit .new-task'(event) {
        // Prevent default browser form submit
        event.preventDefault();

        // Get value from form element
        const target = event.target;
        const text = target.text.value;

        // Insert a task into the collection
        Meteor.call('tasks.insert', text);

        // Clear form
        target.text.value = '';
    },

    'change .hide-completed input'(event, instance) {
        instance.state.set('hideCompleted', event.target.checked);
    },

    'click .loadmore-btn'(event, instance) {
        event.preventDefault();
        let limit = instance.limit.get();
        limit += 2;
        instance.limit.set(limit);
    },
});