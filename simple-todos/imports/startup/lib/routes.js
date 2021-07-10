import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

import '../../ui/allTasks.js';
import '../../ui/usersList.js'

FlowRouter.route('/', {
    name: "home",
    action() {
        BlazeLayout.render('allTasks');
    },
});

FlowRouter.route('/users', {
    name: "users",
    action() {
        BlazeLayout.render('usersList');
    },
});