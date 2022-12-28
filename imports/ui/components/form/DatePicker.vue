<template>
  <div :class="formGroupClass">
    <validation-provider
      :name="label ? label.toLowerCase() : validationLabel.toLowerCase()"
      :rules="rules"
      v-slot="validationContext"
    >
      <div>
        <label v-if="label">
          {{ label }}
          <span class="required-indc" v-if="rules.required"> * </span>
        </label>
      </div>
      <date-picker
        aria-describedby="input-feedback"
        :input-class="
          validationContext.errors[0]
            ? `invalid-date-picker ${inputClass}`
            : inputClass
        "
        :placeholder="computedPlaceholder"
        v-model="computedInputData"
        :format="dateFormat"
        value-type="format"
        :state="getValidationState(validationContext)"
        :disabled-date="getDisabledDates"
      />
      <div class="error-text">
        <span>{{
          validationContext.errors[0]
            ? validationContext.errors[0]
            : apiErrors && Object.keys(apiErrors).length
            ? apiErrors[
                apiErrorKey ? apiErrorKey : label.toString().toLowerCase()
              ][0]
            : ""
        }}</span>
      </div>
    </validation-provider>
  </div>
</template>
<script>
import DatePicker from "vue2-datepicker";
export default {
  name: "InputDatePicker",
  props: {
    apiErrors: {
      // Object with server side error flags
      required: false,
      default: () => {},
    },
    apiErrorKey: {
      // key pointing to particular entry in apiError Object
      required: false,
      default: "",
    },
    label: {
      required: false,
      default: "",
    },
    placeholder: {
      required: false,
      default: "",
    },
    dateFormat: {
      required: false,
      default: "YYYY-MM-DD",
    },
    formGroupClass: {
      required: false,
      default: "col-xxl-6 col-xl-6 col-lg-6 col-md-6 mb-3",
    },
    vmodel: {
      required: true,
    },
    rules: {
      type: Object,
      required: false,
      default: null,
    },
    validationLabel: {
      //For specifying {field} in error message if there is no label
      required: false,
      default: "date",
    },
    disableDateType: {
      required: false,
    },
    inputClass: {
      type: String,
      required: false,
    },
  },
  components: {
    DatePicker,
  },
  computed: {
    computedPlaceholder() {
      if (this.placeholder) {
        return this.placeholder;
      }
      if (this.label || this.validationLabel) {
        return "Choose " + (this.label ? this.label : this.validationLabel);
      }
      return "";
    },
    computedInputData: {
      get() {
        return this.vmodel;
      },
      set(value) {
        this.$emit("update:vmodel", value);
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
    getDisabledDates(date) {
      /**
       * If dates need to be disabled ,
       * logic need to be updated adding case statement in switch block
       * checking disabledDateType props
       */
      if (!this.disableDateType) {
        //no need to disable
        return "";
      }
      let today = new Date();
      let nextday = new Date(today.getTime() + 24 * 60 * 60 * 1000);
      today.setHours(0, 0, 0, 0);
      nextday.setHours(0, 0, 0, 0);
      switch (this.disableDateType) {
        case "disable-upto-today":
          return date < nextday;
        case "disable-upto-yesterday":
          return date < today;
        case "disable-future-dates":
          return date > today;
        default:
          return "";
      }
    },
  },
};
</script>
<style>
.input-required {
  color: #dc3545 !important;
}
.invalid-feedback {
  display: block;
}
.invalid-date-picker {
  border-color: #dc3545 !important;
  padding-right: calc(1.5em + 0.75rem) !important;
  background-repeat: no-repeat !important;
  background-position: right calc(0.375em + 0.1875rem) center !important;
  background-size: calc(0.75em + 0.375rem) calc(0.75em + 0.375rem) !important;
}
.valid-date-picker {
  border-color: #198754;
  padding-right: calc(1.5em + 0.75rem);
  background-repeat: no-repeat;
  background-position: right calc(0.375em + 0.1875rem) center;
  background-size: calc(0.75em + 0.375rem) calc(0.75em + 0.375rem);
}
.mx-input:disabled,
.mx-input.disabled {
  color: #000;
  background-color: none;
  border-color: #ccc;
  cursor: not-allowed;
}
.error-text {
  width: 100%;
  margin-top: 0.25rem;
  font-size: 0.875em;
  color: #dc3545;
}
.mx-datepicker {
  width: 100% !important;
}
</style>
