<template>
  <div>
    <nav-bar v-if="showNavBar" />
    <router-view />
  </div>
</template>

<script>
import NavBar from "./partials/NavBar.vue";
export default {
  name: "Layout",
  components: {
    NavBar,
  },
  computed: {
    showNavBar() {
      return this.$route.meta.requiresAuth;
    },
  },
};
</script>

<style scoped></style>
