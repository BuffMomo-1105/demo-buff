<template>
  <b-form-group :class="formGroupClass">
    <validation-provider
      :name="labelName"
      :rules="rules"
      v-slot="validationContext"
    >
      <label :id="`label-${labelFor}`" :for="labelFor">
        <span v-html="computedLabel" />
      </label>
      <b-form-select
        :id="labelFor"
        :state="getValidationState(validationContext)"
        aria-describedby="input-feedback"
        v-model="computedInputData"
        :options="options"
        :class="inputClass"
      >
        <template #first>
          <b-form-select-option :value="null" disabled>
            {{ defaultOption }}
          </b-form-select-option>
        </template>
      </b-form-select>
      <b-form-invalid-feedback id="input-feedback">
        {{ validationContext.errors[0] }}
      </b-form-invalid-feedback>
    </validation-provider>
  </b-form-group>
</template>
<script>
import { ValidationProvider } from "vee-validate";
export default {
  props: {
    rules: {
      type: Object,
      required: false,
      default: null,
    },
    labelName: {
      type: String,
      required: true,
    },
    labelFor: {
      type: String,
      required: true,
    },
    inputName: {
      type: String,
      required: true,
    },
    defaultOption: {
      type: String,
      required: false,
      default: "Select Option",
    },
    vmodel: {
      required: true,
    },
    options: {
      type: Array,
      required: true,
    },
    formGroupClass: {
      type: String,
      required: false,
    },
    inputClass: {
      type: String,
      required: false,
    },
  },
  components: {
    ValidationProvider,
  },
  computed: {
    computedLabel() {
      if (this.rules && this.rules.required) {
        return this.labelName + "<span class='input-required'>*</span>";
      }
      return this.labelName;
    },
    computedInputData: {
      get: function () {
        return this.vmodel;
      },
      set: function (value) {
        this.$emit("update:vmodel", value);
      },
    },
  },
  methods: {
    getValidationState({ dirty, validated, valid = null }) {
      return dirty || validated ? valid : null;
    },
  },
};
</script>
<style>
.input-required {
  color: red;
}
</style>
