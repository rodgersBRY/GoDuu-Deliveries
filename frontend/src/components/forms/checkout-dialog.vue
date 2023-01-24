<template>
  <div class="checkout">
    <v-btn
      depressed
      dark
      class="mr-4"
      color="teal"
      @click="dialog = true"
      :disabled="totalPrice === 0"
    >
      Checkout & Order
    </v-btn>
    <v-dialog v-model="dialog" width="40%" persistent>
      <v-card class="pa-7">
        <div class="mb-5 d-flex justify-space-between">
          <h2>Checkout & Place your Order</h2>
          <v-btn class="x-btn" color="red" icon dark @click="dialog = false">
            <i class="bx bx-x bx-sm"></i>
          </v-btn>
        </div>
        <div class="subtitle mb-5">
          <p>
            Do you want to proceed to checkout and place your order with us?
          </p>
        </div>

        <v-card-actions>
          <v-spacer />
          <v-btn color="error" text @click="dialog = false">cancel</v-btn>
          <v-btn text :loading="isLoading" @click.stop="orderNow">submit</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  props: ["checkout", "totalPrice"],
  data() {
    return {
      dialog: false,
    };
  },

  computed: {
    ...mapGetters(["isLoading"]),
  },

  methods: {
    orderNow() {
      this.$store
        .dispatch("makeOrder")
        .then(() => {
          this.dialog = false;
          this.$router.push("/");
        })
        .catch((err) => {
          console.log(err.data);
        });
      // await this.makeOrder();
    },
  },
};
</script>
