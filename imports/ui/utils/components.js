import Vue from "vue";

// form components
import Datepicker from "../components/form/DatePicker.vue";
import InputSelect from "../components/form/InputSelect.vue";
import InputText from "../components/form/InputText.vue";

// customlayout components
import SimplePage from "../components/main-components/SimplePage.vue";
import SimpleTable from "../components/main-components/SimpleTable.vue";

Vue.component("date-picker", Datepicker);
Vue.component("input-text", InputText);
Vue.component("input-select", InputSelect);
Vue.component("simple-page", SimplePage);
Vue.component("simple-table", SimpleTable);
