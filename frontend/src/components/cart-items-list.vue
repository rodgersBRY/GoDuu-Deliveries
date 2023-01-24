<template>
  <div class="absolute">
    <v-sheet elevation="3" width="350" class="pa-3" style="border-radius: 7px;">
      <h3>Cart Items</h3>
      <v-list>
        <v-list-item v-if="cartItems.length != 0">
          <v-list-item-content>
            <v-list-item-title class="grey--text">
              Product
            </v-list-item-title>
          </v-list-item-content>
          <v-list-item-content class="ml-10">
            <v-list-item-title class="grey--text">
              Price
            </v-list-item-title>
          </v-list-item-content>
          <v-list-item-content class="ml-10">
            <v-list-item-title class="grey--text">
              Quantity
            </v-list-item-title>
          </v-list-item-content>
          <v-list-item-content class="ml-10"> </v-list-item-content>
        </v-list-item>

        <div class="no-items pl-4" v-else>
          <p>Your cart items will show up here</p>
        </div>

        <v-list-item v-for="item in cartItems" :key="item.id">
          <v-list-item-content>
            <v-list-item-title>
              {{ item.name }}
            </v-list-item-title>
          </v-list-item-content>
          <v-list-item-content class="ml-1">
            <v-list-item-subtitle> Ksh. {{ item.price }} </v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-content class="ml-1">
            <v-list-item-subtitle>
              {{ item.quantity }}
            </v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-content>
            <v-btn text @click="removeFromCart(item._id)">
              <i class="bx bx-x bx-sm"></i>
            </v-btn>
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>

        <div class="mt-5 pl-5 d-flex justify-space-between align-center">
          <div class="total title">Ksh. {{ totalPrice }}</div>
          <checkout-order-btn :totalPrice="totalPrice" />
        </div>
      </v-list>
    </v-sheet>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  components: {
    "checkout-order-btn": require("./forms/checkout-dialog.vue").default,
  },

  computed: {
    ...mapGetters(["cartItems"]),

    totalPrice() {
      var items = this.cartItems;
      var total = 0;
      for (let i = 0; i < items.length; i++) {
        total += items[i].price * items[i].quantity;
      }
      return total;
    },
  },

  methods: {
    removeFromCart(id) {
      this.$store.dispatch("removeCartItem", id);
    },
  },
};
</script>

<style scoped>
.absolute {
  position: absolute;
  top: 25%;
  right: 10%;
}
</style>
