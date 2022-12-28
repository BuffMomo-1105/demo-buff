import Vue from "vue";
import router from "../imports/ui/routes/index";
import VueMeteorTracker from "vue-meteor-tracker";
import App from "../imports/ui/App.vue";

//bootstrap
import { BootstrapVue, BootstrapVueIcons } from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

import "../client/main.css";
import "vue2-datepicker/index.css";

//utils
import "../imports/ui/utils/validator";
import "../imports/ui/utils/components";
import "../imports/ui/utils/global";

//store
import store from "../imports/ui/store";

Meteor.startup(() => {
  Vue.use(VueMeteorTracker);
  Vue.use(BootstrapVue);
  Vue.use(BootstrapVueIcons);
  new Vue({
    router,
    store,
    render: (h) => h(App),
  }).$mount("#app");
});
