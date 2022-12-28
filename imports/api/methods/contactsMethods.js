import { check } from "meteor/check";
import { ContactsCollection } from "../collections/ContactsCollection";

function isLogin(userId) {
  if (!userId) {
    throw new Meteor.Error("Not authorized.");
  }
}
function checkData(contactData) {
  check(contactData, {
    first_name: String,
    last_name: String,
    address: String,
    email: String,
    phone: String,
    city: String,
    zip: String,
    state: String,
    dob: String,
    gender: String,
  });
}
Meteor.methods({
  "contacts.insert"(contactData) {
    checkData(contactData);
    isLogin(this.userId);
    contactData["userId"] = this.userId;
    contactData["createdAt"] = new Date();
    ContactsCollection.insert({ ...contactData });
  },

  "contacts.remove"(id) {
    check(id, String);

    if (!this.userId) {
      throw new Meteor.Error("Not authorized.");
    }
    if (!ContactsCollection.findOne({ _id: id, userId: this.userId })) {
      throw new Meteor.Error("Access denied.");
    }
    ContactsCollection.remove(id);
  },

  "contacts.update"(id, data) {
    check(id, String);

    const {
      first_name,
      last_name,
      address,
      email,
      phone,
      state,
      zip,
      city,
      dob,
      gender,
    } = { ...data };
    const updatedData = {
      first_name: first_name,
      last_name: last_name,
      address: address,
      email: email,
      phone: phone,
      state: state,
      zip: zip,
      city: city,
      dob: dob,
      gender: gender,
    };
    checkData(updatedData);
    isLogin(this.userId);
    if (!ContactsCollection.findOne({ _id: id, userId: this.userId })) {
      throw new Meteor.Error("Access denied.");
    }
    ContactsCollection.update(
      { _id: id },
      {
        $set: { ...updatedData },
      }
    );
  },
});
