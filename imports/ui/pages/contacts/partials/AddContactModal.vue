<template>
  <b-modal
    id="add-contact"
    centered
    :title="modalTitle"
    size="lg"
    hide-footer
    no-close-on-backdrop
    @close="onModalClose"
  >
    <ValidationObserver ref="observer" v-slot="{ handleSubmit }">
      <form
        @submit.stop.prevent="handleSubmit(addContact)"
        class="d-flex flex-wrap"
      >
        <input-text
          :rules="{ required: true }"
          labelFor="first_name"
          labelName="First Name"
          inputName="text"
          formGroupClass="form-group col-xxl-6 col-lg-6 col-md-6 mb-3"
          placeholder="Enter First Name"
          :vmodel.sync="form.first_name"
        />
        <input-text
          :rules="{ required: true }"
          labelFor="last_name"
          labelName="Last Name"
          inputName="text"
          formGroupClass="form-group col-xxl-6 col-lg-6 col-md-6 mb-3"
          placeholder="Enter Last Name"
          :vmodel.sync="form.last_name"
        />
        <input-text
          :rules="{ required: true, email: true }"
          labelFor="email"
          labelName="Email"
          inputName="email"
          inputType="email"
          formGroupClass="form-group col-xxl-6 col-lg-6 col-md-6 mb-3"
          placeholder="Enter Email"
          :vmodel.sync="form.email"
        />
        <input-text
          :rules="{ required: true, digits: 10 }"
          labelFor="phone"
          labelName="Phone"
          inputName="phone"
          inputType="text"
          formGroupClass="form-group col-xxl-6 col-lg-6 col-md-6 mb-3"
          placeholder="Enter Phone"
          :vmodel.sync="form.phone"
        />
        <input-select
          :rules="{ required: true }"
          labelFor="gender"
          labelName="Gender"
          inputName="gender"
          :vmodel.sync="form.gender"
          :options="genderOptions"
          defaultOption="Select Your Gender"
          formGroupClass="col-xxl-6 col-lg-6 col-md-6 mb-3"
          inputClass="form-control"
        />
        <date-picker
          :vmodel.sync="form.dob"
          :rules="{ required: true }"
          label="Date of Birth"
          date-format="MM/DD/YYYY"
          disable-date-type="disable-future-dates"
          form-group-class="form-group col-xxl-6 col-lg-6 col-md-6 mb-3"
          inputClass="form-control"
        />
        <input-text
          :rules="{ required: true }"
          labelFor="address"
          labelName="Address"
          inputName="username"
          inputType="text"
          formGroupClass="form-group col-xxl-6 col-lg-6 col-md-6 mb-3"
          placeholder="Enter Address"
          :vmodel.sync="form.address"
        />
        <input-text
          :rules="{ required: true }"
          labelFor="city"
          labelName="City"
          inputName="city"
          inputType="text"
          formGroupClass="form-group col-xxl-6 col-lg-6 col-md-6 mb-3"
          placeholder="Enter City"
          :vmodel.sync="form.city"
        />
        <input-text
          :rules="{ required: true }"
          labelFor="state"
          labelName="State"
          inputName="state"
          inputType="text"
          formGroupClass="form-group col-xxl-6 col-lg-6 col-md-6 mb-3"
          placeholder="Enter State"
          :vmodel.sync="form.state"
        />
        <input-text
          :rules="{ required: true, numeric: true }"
          labelFor="zip_code"
          labelName="Zip Code"
          inputName="zip_code"
          inputType="text"
          formGroupClass="form-group col-xxl-6 col-lg-6 col-md-6 mb-3"
          placeholder="Enter Zip Code"
          :vmodel.sync="form.zip"
        />

        <div class="form-group w-100 d-flex justify-content-center">
          <button type="submit" class="add-btn w-75">
            <b-spinner v-if="showLoader" small></b-spinner>
            {{ modalButton }}
          </button>
        </div>
      </form>
    </ValidationObserver>
  </b-modal>
</template>

<script>
import { Meteor } from "meteor/meteor";
const contact = {
  first_name: "",
  last_name: "",
  address: "",
  city: "",
  zip: "",
  state: "",
  email: "",
  phone: "",
  gender: null,
  dob: "",
};
export default {
  name: "AddContact",
  props: {
    currentContact: { required: false, default: null },
  },
  data: () => ({
    form: { ...contact },
    showLoader: false,
    genderOptions: ["Male", "Female", "Others"],
    contact_id: null,
  }),
  computed: {
    modalTitle() {
      return this.currentContact ? "Edit Contact" : "Add Contact";
    },
    modalButton() {
      return this.currentContact ? "Edit" : "Add";
    },
  },
  methods: {
    onModalClose() {
      if (!this.contact_id) {
        this.form = { ...contact };
      }
    },
    updateDetail(val) {
      if (val) {
        this.form = val;
        this.contact_id = val._id;
      } else {
        this.form = { ...contact };
        this.contact_id = null;
      }
    },
    addContact() {
      this.showLoader = true;
      if (this.currentContact) {
        Meteor.call(
          "contacts.update",
          this.contact_id,
          this.form,
          (err, res) => {
            if (err) {
              this.$notify(err.reason, "error");
            } else {
              this.$notify("Contact Updated successfully.");
            }
            this.showLoader = false;
            this.$bvModal.hide("add-contact");
          }
        );
      } else {
        Meteor.call("contacts.insert", this.form, (err, res) => {
          if (err) {
            this.$notify(err.error, "error");
          } else {
            this.$notify("New Contact Added successfully.");
            this.form = { ...contact };
          }
          this.showLoader = false;
          this.$bvModal.hide("add-contact");
        });
      }
    },
  },
  watch: {
    currentContact: {
      deep: true,
      handler(val) {
        this.updateDetail(val);
      },
    },
  },
};
</script>
<style></style>
