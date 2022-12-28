import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store";

Vue.use(VueRouter);
const routes = [
  {
    path: "/",
    name: "Home",
    meta: { requiresAuth: true },
    redirect: { name: "Contacts" },
  },
  {
    path: "/contacts",
    name: "Contacts",
    meta: { requiresAuth: true },
    component: () =>
      import(/* webpackChunkName: "home" */ "../pages/contacts/index.vue"),
  },
  {
    path: "/login",
    name: "Login",
    meta: { requiresAuth: false },
    component: () =>
      import(/* webpackChunkName: "home" */ "../pages/auth/LoginPage.vue"),
  },
  {
    path: "/register",
    name: "Register",
    meta: { requiresAuth: false },
    component: () =>
      import(/* webpackChunkName: "home" */ "../pages/auth/RegisterPage.vue"),
  },
  {
    path: "/contact/:id/detail",
    name: "Contact Details",
    meta: { requiresAuth: true },
    component: () =>
      import(
        /* webpackChunkName: "home" */ "../pages/contacts/ContactDetails.vue"
      ),
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});
router.beforeEach((to, from, next) => {
  let isAuth = store.state.isAuth;
  if (to.meta.requiresAuth && !isAuth) {
    next({ name: "Login" });
  } else {
    next();
  }
});
export default router;
