<template>
  <div class="memberInformation mt-4">
    <button class="edit-btn" @click="openEditModal('add-contact')">Edit</button>
    <div class="text-center mt-4">
      <h3>{{ contact.first_name }} {{ contact.last_name }}</h3>
      <div class="d-flex flex-wrap justify-content-around">
        <span class="memberCntc">
          <i class="fas fa-envelope"></i>
          {{ contact.email }}
        </span>
        <span class="memberCntc">
          <i class="fas fa-phone"></i>
          {{ contact.phone }}
        </span>
      </div>
    </div>
    <div class="light-bg">
      <div class="memberDetail_lists">
        <ul>
          <li>
            <span class="strong">Gender:</span>
            <span>{{ contact.gender }}</span>
          </li>
          <li>
            <span class="strong">DOB:</span>
            <span>{{ contact.dob }}</span>
          </li>
          <li>
            <span class="strong">Phone</span>
            <span> {{ contact.phone }} </span>
          </li>
        </ul>
      </div>
    </div>

    <h4>Address Information</h4>
    <div class="light-bg">
      <div class="memberDetail_lists">
        <ul>
          <li>
            <span class="strong">Address:</span>
            <span> {{ contact.address }} </span>
          </li>
          <li>
            <span class="strong">City:</span>
            <span> {{ contact.city }} </span>
          </li>
          <li>
            <span class="strong">State:</span>
            <span> {{ contact.state }}</span>
          </li>
          <li>
            <span class="strong">ZIP Code:</span>
            <span> {{ contact.zip }}</span>
          </li>
        </ul>
      </div>
    </div>
    <div class="d-flex flex-wrap justify-content-between">
      <button class="back-btn">
        <router-link to="/contacts" class="text-white"> Back </router-link>
      </button>
      <button class="del-btn" @click="openConfirm">Delete</button>
    </div>
    <add-contact-modal :currentContact="contact" />
  </div>
</template>
<script>
import { ContactsCollection } from "../../../api/collections/ContactsCollection";
import AddContactModal from "./partials/AddContactModal.vue";
import { Meteor } from "meteor/meteor";
export default {
  name: "ContactDetails",
  components: {
    AddContactModal,
  },
  data: () => ({
    contact_id: "",
  }),
  mounted() {
    this.contact_id = this.$route.params.id;
  },
  methods: {
    openEditModal(modalId) {
      this.$bvModal.show(modalId);
    },
    openConfirm() {
      this.$bvModal
        .msgBoxConfirm("Are you sure to delete this contact?", {
          title: "Please Confirm",
          size: "sm",
          buttonSize: "sm",
          okVariant: "danger",
          okTitle: "YES",
          cancelTitle: "NO",
          footerClass: "p-2",
          hideHeaderClose: false,
          centered: true,
        })
        .then(() => {
          this.deleteContact();
        });
    },
    deleteContact() {
      Meteor.call("contacts.remove", this.$route.params.id, (err, res) => {
        if (err) {
          this.$notify(err.error, "error");
        } else {
          this.$notify("Contact removed successfully.");
          this.$router.push("/contacts");
        }
      });
    },
  },
  meteor: {
    $subscribe: {
      contacts: [],
    },
    contact() {
      if (!this.currentUser) {
        return [];
      }
      let data = ContactsCollection.findOne({
        _id: this.$route.params.id,
      });
      return data;
    },
    currentUser() {
      return Meteor.user();
    },
  },
};
</script>
<style src="../../assets/css/contact-detail.css" scoped></style>
<style>
.valid-icon {
  width: 4% !important;
}
.edit-btn,
.back-btn,
.del-btn {
  background: linear-gradient(#0cf, #1597b8 49%, #0567bc);
  border-radius: 6px;
  color: #fff;
  border: none;
  padding: 5px 10px;
  border: 0px;
  outline: none;
  font-size: 14px;
  transition: all ease 0.6s;
  box-shadow: inherit;
  float: right;
}
.back-btn,
.del-btn {
  font-size: 16px;
  width: 20%;
  margin-top: 2rem;
}
.del-btn {
  background: #b92929;
}
</style>
