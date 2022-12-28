<template>
  <nav>
    <div class="brand-logo">Demo</div>
    <div class="nav-list">
      <ul class="d-flex flex-wrap">
        <li class="mx-4 p-2">
          <strong>{{ currentUser }}</strong>
        </li>
        <li class="mx-4 p-2 logout-btn" @click="logOut">LogOut</li>
      </ul>
    </div>
  </nav>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  name: "NavBar",
  methods: {
    ...mapMutations(["updateAuthState", "updateUserState"]),
    logOut() {
      Meteor.logout();
      this.$store.commit("updateAuthState", false);
      this.$store.commit("updateUserState", null);
      this.$router.push("/login");
    },
  },
  computed: {
    currentUser() {
      let user = this.$store.getters.userGetter;
      if (user) {
        return `${user.username} (${user.emails[0].address})`;
      } else {
        return "loading...";
      }
    },
  },
};
</script>

<style>
nav {
  padding: 6px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  display: flex !important;
  justify-content: space-between;
  flex-wrap: wrap;
  color: black;
}
.logout-btn {
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  opacity: 0.6;
  border-radius: 10%;
  cursor: pointer;
}
.logout-btn:hover {
  opacity: 1;
}
nav .brand-logo {
  align-items: center;
  display: flex;
}
li {
  list-style: none;
}
nav ul {
  margin: auto;
}
</style>
