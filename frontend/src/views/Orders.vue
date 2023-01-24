<template>
  <div class="orders">
    <v-sheet class="item-list pa-5">
      <v-list two-line>
        <p class="title">Previous Orders</p>
        <v-divider class="mt-2" color="black" />

        <div v-for="(order, i) in orders" :key="i" class="mt-5">
          <section
            v-for="(ord, i) in order.items"
            :key="i"
            class=" px-4 d-flex justify-space-between align-center"
          >
            <p class="" style="width: 50%">{{ ord.name }}</p>
            <p class="">{{ ord.quantity }}</p>
            <p></p>
          </section>
          <!-- <v-list-item v-for="ord in order.items" :key="ord._id">
            <v-list-item-content>
              <h3 class="subtitle grey--text">{{ ord.name }}</h3>
            </v-list-item-content>
            <v-list-item-content class="ml-7">
              <p class="subtitle grey--text">{{ ord.quantity }} piece(s)</p>
            </v-list-item-content>
            <v-list-item-content>

            </v-list-item-content>
          </v-list-item> -->

          <section class="total-div grey lighten-3 py-0">
            <v-list-item-content>
              {{ order.createdAt | convertDate }}
            </v-list-item-content>
            <v-list-item-content class="ml-11 title">
              <span>Total amount:</span> Ksh. {{ order.price }}
            </v-list-item-content>
            <!-- <v-list-item-content>
              <i class="bx bx-up-arrow-alt bx-sm"></i>
            </v-list-item-content> -->
          </section>
        </div>
      </v-list>
    </v-sheet>

    <div class="footer">
      <app-footer />
    </div>
  </div>
</template>

<script>
import { format } from "date-fns";
import { mapGetters } from "vuex";

export default {
  filters: {
    convertDate(val) {
      return format(new Date(val), "Pp");
    },
  },

  created() {
    this.$store.dispatch("loadOrders");
  },
  
  computed: {
    ...mapGetters(["orders"]),
  },
};
</script>

<style scoped>
.item-list {
  width: 60%;
  margin: 4rem auto;
}

.total-div {
  border-bottom: 1px solid black;
  padding-left: 10px;
  display: flex;
  align-items: center;
  color: rgb(133, 119, 119);
}
</style>
