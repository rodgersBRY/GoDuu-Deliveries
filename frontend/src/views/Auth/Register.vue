<template>
  <div class="register">
    <form @submit.prevent="submit">
      <v-card class="form">
        <v-card-title class="headline">Sign Up</v-card-title>
        <v-card-text>Create an account and order with MloFaster</v-card-text>

        <div>
          <v-text-field
            autofocus
            label="Name"
            dense
            v-model="form.name"
            color="teal"
          />
          <v-text-field
            label="Phone Number"
            dense
            v-model="form.phoneNo"
            color="teal"
          />
          <v-text-field
            label="E-Mail"
            type="email"
            dense
            v-model="form.email"
            color="teal"
          />
          <v-select
            :items="roles"
            label="Status"
            dense
            v-model="form.status"
            color="teal"
          ></v-select>
          <v-text-field
            label="Password"
            type="password"
            dense
            v-model="form.password"
            color="teal"
          />
          <v-text-field
            label="Confirm Password"
            type="password"
            v-model="form.confirmPass"
            :color="passwordMatch ? 'teal' : 'red'"
          />
          <!-- <span v-show="passwordMatch">passwords do not match</span> -->
        </div>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="teal darken-1" text type="submit" :loading="isLoading">
            Register
          </v-btn>
        </v-card-actions>
      </v-card>
    </form>

    <div class="footer">
      <app-footer />
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      form: {
        name: "",
        email: "",
        phoneNo: "",
        password: "",
        status: "",
        confirmPass: "",
      },
      roles: ["admin", "client"],
    };
  },

  computed: {
    ...mapGetters(["user", "isLoading","error"]),
    
    passwordMatch() {
      return this.form.password === this.form.confirmPass;
    },
  },

  watch: {
    user(val) {
      if (val !== null && val !== undefined) {
        this.$router.push("/");
      }
    },
  },

  methods: {
    ...mapActions(["register", "loadCartItems"]),

    async submit() {
      try {
        await this.register(this.form);
        this.loadCartItems;
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<style lang="sass">
.form
  width: 40%
  margin: 4rem auto
  padding: 0 2rem
</style>
