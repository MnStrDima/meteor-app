import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

if (Meteor.isServer) {
    Meteor.publish('allUsers', function tasksPublication(limit) {
        return Meteor.users.find({}, {
            fields: { emails: 1, username: 1, createdAt: 1, isBanned: 1 }, sort: { createdAt: -1 }, limit: limit
        });
    });

    Accounts.validateLoginAttempt(function (options) {
        const user = options.user;
        if (user.isBanned) {
            throw new Meteor.Error(403, "You are banned!");
        } else {
            return true;
        }
    });
}

Meteor.methods({
    'allUsers.setIsBanned'(userId, setIsBanned) {
        check(userId, String);
        check(setIsBanned, Boolean);

        if (!this.userId) {
            throw new Meteor.Error('not-authorized');
        }

        Meteor.users.update(userId, { $set: { isBanned: setIsBanned } });
    }
});