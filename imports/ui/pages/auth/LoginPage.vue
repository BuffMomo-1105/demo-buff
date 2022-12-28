<template>
  <div class="authWrapper">
    <div class="container">
      <div class="row whiteBG-wrap">
        <div class="col-lg-6 col-md-6 no-padding">
          <div class="left-bg-wrapper text-center">
            <div class="loginImage">
              <!-- <img src="../../assets/img/login1.png" alt="image-fluid" > -->
            </div>
            <h2>Welcome to Demo CRM</h2>
            <p>This is demo CRM. Enjoy every moment.</p>
          </div>
        </div>
        <div class="col-lg-6 col-md-6">
          <div class="auth-form-wrap login-form">
            <div class="auth-linkBtn text-end">
              <!-- <router-link to="/login">Login</router-link> -->
              <router-link to="/register">Sign Up</router-link>
            </div>
            <div class="auth-form">
              <h2>Log In</h2>
              <ValidationObserver ref="observer" v-slot="{ handleSubmit }">
                <form @submit.stop.prevent="handleSubmit(handleLogin)">
                  <input-text
                    :rules="{ required: true }"
                    labelFor="username"
                    labelName="Username"
                    inputName="username"
                    formGroupClass="form-group mb-3"
                    placeholder="Enter your username"
                    :vmodel.sync="form.username"
                  />

                  <input-text
                    :rules="{ required: true }"
                    labelFor="password"
                    labelName="Password"
                    inputName="username"
                    inputType="password"
                    formGroupClass="form-group mb-3"
                    placeholder="Enter your password"
                    :vmodel.sync="form.password"
                  />

                  <div class="form-group mb-4">
                    <button type="submit" class="submit-btn">
                      <b-spinner v-if="loginLoader" small></b-spinner>
                      Login
                    </button>
                  </div>
                </form>
              </ValidationObserver>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapMutations } from "vuex";
export default {
  name: "LoginPage",
  data() {
    return {
      form: {
        username: "",
        password: "",
      },
      loginLoader: false,
    };
  },
  mounted() {},
  methods: {
    ...mapMutations(["updateAuthState"]),
    handleLogin() {
      this.loginLoader = true;
      Meteor.loginWithPassword(
        this.form.username,
        this.form.password,
        (err, res) => {
          if (err) {
            this.$notify(err.reason, "error");
          } else {
            this.$notify("Log in successfully.");
            this.$store.commit("updateAuthState", true);
            this.$router.push("/");
          }
          this.loginLoader = false;
        }
      );
    },
  },
};
</script>
<style src="../../assets/css/auth.css" scoped></style>
<style>
#label-username,
#label-password {
  font-size: 16px !important;
  color: #909090 !important;
  margin-bottom: 10px !important;
}
#username,
#password {
  font-size: 14px !important;
  padding: 12px 15px !important;
}
.loginImage {
  width: 80px;
  margin: 0 auto;
}
.loginImage img {
  width: 100px;
}
</style>
<style scoped>
.issue-link {
  text-decoration: underline !important;
  font-weight: 600 !important;
}
</style>
