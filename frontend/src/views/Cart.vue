<template>
  <div class="cart">
    <v-sheet class="item-list pa-5" elevation="3">
      <v-list>
        <v-list-item>
          <v-list-item-content>
            <h3 class="headline">Item</h3>
          </v-list-item-content>
          <v-list-item-content>
            <h3 class="headline">Price</h3>
          </v-list-item-content>
          <v-list-item-content>
            <h3 class="headline">Quantity</h3>
          </v-list-item-content>
          <v-list-item-content>
            <!-- <h3 class="headline">Quantity</h3> -->
          </v-list-item-content>
        </v-list-item>
        <v-divider class="mt-2" />

        <v-list-item class="mt-2" v-for="item in cartItems" :key="item._id">
          <v-list-item-content>
            <v-list-item-title v-text="item.name"></v-list-item-title>
          </v-list-item-content>
          <v-list-item-content>
            <v-list-item-title>{{ item.quantity }}</v-list-item-title>
          </v-list-item-content>
          <v-list-item-content>
            <v-list-item-title>Ksh. {{ item.price }}</v-list-item-title>
          </v-list-item-content>
          <v-list-item-content>
            <v-icon color="error" small @click="removeFromCart(item._id)">
              mdi-close
            </v-icon>
          </v-list-item-content>
        </v-list-item>

        <v-list-item class="mt-16">
          <v-list-item-content>
            <v-list-item-title>Total Price</v-list-item-title>
          </v-list-item-content>
          <v-list-item-content>
            <v-list-item-subtitle class="title">
              Ksh. {{ totalPrice }}
            </v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-content>
            <v-list-item-subtitle class="title"></v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-content>
            <v-list-item-title v-show="totalPrice == 0">
              Go ahead and shop
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <div class="actions d-flex justify-end mt-10">
        <checkout-order-btn :totalPrice="totalPrice" />

        <v-btn
          depressed
          :disabled="totalPrice === 0"
          dark
          color="warning"
          @click="clearCart"
        >
          Clear Cart
        </v-btn>
      </div>
    </v-sheet>

    <div class="footer">
      <app-footer />
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  components: {
    "checkout-order-btn": require("@/components/forms/checkout-dialog.vue")
      .default,
  },

  created() {
    this.$store.dispatch('loadCartItems')
  },

  computed: {
    ...mapGetters(["cartItems", "isLoading"]),

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
    ...mapActions(["removeCartItem", "clearCart"]),

    removeFromCart(id) {
      this.removeCartItem(id);
    },
  },
};
</script>

<style lang="sass">
.item-list
  width: 60%
  margin: 4rem auto
</style>
