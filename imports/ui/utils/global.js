import "vue-toast-notification/dist/theme-sugar.css";
import Vue from "vue";
import VueToast from "vue-toast-notification";

Vue.prototype.$notify = (message, type = "success", position = "top-right") => {
    const vm = new Vue();
    
    let typeTitle;
    typeTitle = type == "danger" ? "error" : type;
    vm.$toast.open({
        message: message,
        type: typeTitle.toLowerCase(),
        duration: 5000,
        dismissible: true,
        position: position,
    });
};

Vue.use(VueToast);