import { Meteor } from 'meteor/meteor';

import { Tasks } from '../imports/api/tasks';

const insertTask = taskText => Tasks.insert({ text: taskText });


Meteor.startup(() => {
  if (Tasks.find().count() === 0) {
    [
      'First Task',
      'Second Task',
      'Third Task',
      'Fourth Task',
      'Fifth Task',
      'Sixth Task',
      'Seventh Task'
    ].forEach(insertTask);
  };
});

Accounts.config({
  defaultFieldSelector: {
    username: 1,
    emails: 1,
    createdAt: 1,
    isBanned: 1,
    profile: 1,
    services: 1
  }
});