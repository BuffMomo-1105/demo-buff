<template>
  <simple-page>
    <template #table>
      <div class="d-flex justify-content-between">
        <div>
          <h3>Contacts</h3>
        </div>
        <div>
          <button @click="openModal('add-contact')" class="add-btn">
            Add Contact
          </button>
        </div>
      </div>
      <add-contact-modal />
      <simple-table :columns="columns">
        <template #tableBody>
          <tbody>
            <tr v-if="contacts.length == 0" colspan="10" class="text-center">
              No any Contacts.
            </tr>
            <tr
              v-for="item in contacts"
              :key="item.name"
              @click="goToDetail(item)"
              class="contact-row"
            >
              <td>{{ item.first_name }}</td>
              <td>{{ item.email }}</td>
              <td>{{ item.phone }}</td>
              <td>{{ item.dob }}</td>
              <td>{{ item.gender }}</td>
              <td>{{ item.address }}</td>
              <td>{{ item.city }}</td>
              <td>{{ item.state }}</td>
              <td>{{ item.zip }}</td>
              <td>
                <span @click="goToDetail(item)" class="view-btn"> View </span>
              </td>
            </tr>
          </tbody>
        </template>
      </simple-table>
    </template>
  </simple-page>
</template>

<script>
import SimplePage from "../../components/main-components/SimplePage.vue";
import SimpleTable from "../../components/main-components/SimpleTable.vue";
import AddContactModal from "./partials/AddContactModal.vue";
import { ContactsCollection } from "../../../api/collections/ContactsCollection";
export default {
  components: { SimplePage, SimpleTable, AddContactModal },
  data: () => ({
    columns: [
      "Name",
      "Email",
      "Phone",
      "Date of Birth",
      "Gender",
      "Address",
      "City",
      "State",
      "Zip Code",
      "Action",
    ],
  }),
  methods: {
    openModal(modalId) {
      // alert(modalId)
      this.$bvModal.show(modalId);
    },
    goToDetail(item) {
      this.$router.push(`/contact/${item._id}/detail`);
    },
  },
  meteor: {
    $subscribe: {
      contacts: [],
    },
    contacts() {
      if (!this.currentUser) {
        return [];
      }
      let data = ContactsCollection.find(
        {},
        { sort: { createdAt: -1 } }
      ).fetch();
      return data;
    },
    currentUser() {
      return Meteor.user();
    },
  },
};
</script>
<style>
.add-btn {
  margin-bottom: 1rem;
  float: right;
}
.contact-row {
  cursor: pointer;
}
.view-btn {
  color: blue;
}
.view-btn:hover {
  text-decoration: underline;
  color: black;
}
</style>
