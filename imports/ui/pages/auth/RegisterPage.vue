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
            <p>This is demo CRM Register page. Enjoy every moment.</p>
          </div>
        </div>
        <div class="col-lg-6 col-md-6">
          <div class="auth-form-wrap login-form">
            <div class="auth-linkBtn text-end">
              <router-link to="/login">Sign In</router-link>
            </div>
            <div class="auth-form">
              <h2>Sign Up</h2>
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
                    :rules="{ required: true, email: true }"
                    labelFor="email"
                    labelName="Email"
                    inputName="email"
                    formGroupClass="form-group mb-3"
                    placeholder="Enter your email"
                    :vmodel.sync="form.email"
                  />

                  <input-text
                    :rules="{ required: true, min: 8 }"
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
                      Register
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
export default {
  name: "Register",
  data() {
    return {
      form: {
        username: "",
        password: "",
        email: "",
      },
      loginLoader: false,
    };
  },
  mounted() {},
  methods: {
    handleLogin() {
      this.loginLoader = true;
      Meteor.call("users.create", this.form, (err, res) => {
        if (err) {
          this.$notify(err.reason, "error");
        } else {
          this.$notify("Registered successfully.");
          this.$router.push("/login");
        }
        this.loginLoader = false;
      });
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
