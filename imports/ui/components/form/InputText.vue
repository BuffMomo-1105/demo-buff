<template>
  <b-form-group :class="formGroupClass">
    <validation-provider
      :name="labelName.toLowerCase()"
      :rules="rules"
      v-slot="validationContext"
    >
      <template v-if="labelFor != ''">
        <label :id="`label-${labelFor}`" :for="labelFor">
          <span v-html="computedLabel" />
        </label>
      </template>
      <b-form-input
        :id="labelFor"
        :type="inputType"
        :state="getValidationState(validationContext)"
        aria-describedby="input-feedback"
        v-model="computedInputData"
        :readonly="readonly"
        :placeholder="computedPlaceholder"
        :class="computedInputClass"
      ></b-form-input>
      <b-form-invalid-feedback
        :id="`${labelFor}-feedback`"
        :class="`${labelFor}-feedback`"
      >
        {{ errorField ? errorField[0] : validationContext.errors[0] }}
      </b-form-invalid-feedback>
    </validation-provider>
  </b-form-group>
</template>
<script>
import { ValidationProvider } from "vee-validate";
export default {
  props: {
    readonly: {
      type: Boolean,
      required: false,
      default: false,
    },
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
    inputType: {
      type: String,
      required: false,
      default: "text",
    },
    inputName: {
      type: String,
      required: false,
    },
    vmodel: {
      required: true,
    },
    placeholder: {
      type: String,
      required: false,
      default: "",
    },
    formGroupClass: {
      type: String,
      required: false,
    },
    inputClass: {
      type: String,
      required: false,
    },
    apiErrors: {
      required: false,
    },
  },
  components: {
    ValidationProvider,
  },
  computed: {
    computedInputClass() {
      return this.apiErrors && this.apiErrors[this.labelFor]
        ? `is-invalid ${this.inputClass}`
        : this.inputClass;
    },
    errorField() {
      return this.apiErrors
        ? this.apiErrors[this.labelFor]
          ? this.apiErrors[this.labelFor]
          : null
        : null;
    },
    computedPlaceholder() {
      if (this.placeholder == "") {
        return `Enter ${this.labelName}`;
      }
      return this.placeholder;
    },
    computedLabel() {
      if (this.rules && this.rules.required) {
        return this.labelName + "<span class='input-required'> * </span>";
      }
      return this.labelName ? this.labelName : "";
    },
    computedInputData: {
      get: function () {
        return this.vmodel;
      },
      set: function (value) {
        this.$emit("update:vmodel", value ? value : "");
      },
    },
  },
  methods: {
    getValidationState({ dirty, validated, valid = null }) {
      if (this.rules) {
        return dirty || validated ? valid : null;
      }
      return null;
    },
  },
};
</script>
<style>
.input-required {
  color: red !important;
}
</style>
