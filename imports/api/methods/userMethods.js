import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";
import { Accounts } from "meteor/accounts-base";

Meteor.methods({
  "users.create"(userData) {
    const { username, email, password } = { ...userData };
    check(username,String);
    check(email,String);
    check(password,String);
    if (Accounts.findUserByUsername(username)||Accounts.findUserByEmail(email)) {
        throw new Meteor.Error('User already exists.');
    }
    Accounts.createUser({
        username: username,
        email: email,
        password: password,
      });
  },
});
