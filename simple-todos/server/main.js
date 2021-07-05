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

Meteor.publish('usersList', function () {
  return Meteor.users.find({});
});