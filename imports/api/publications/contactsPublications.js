import { Meteor } from 'meteor/meteor';
import { ContactsCollection } from '../collections/ContactsCollection';

Meteor.publish('contacts', function publishContacts() {
  return ContactsCollection.find({ userId: this.userId });
});