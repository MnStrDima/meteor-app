import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

import '../../ui/body';
import '../../ui/usersList'

FlowRouter.route('/', {
    name: "home",
    action() {
        BlazeLayout.render('body');
    },
});

FlowRouter.route('/users', {
    name: "users",
    action() {
        BlazeLayout.render('usersList');
    },
});