<template>
  <div class="hotel">
    <div class="details" v-for="i in hotels" :key="i._id">
      <div v-if="id === i._id">
        <div class="image">
          <v-img
            width="100%"
            height="450"
            :src="require('@/assets/ba.jpg')"
            class="white--text pl-7 d-flex align-center justify-center"
          >
            <h1>{{ i.name }}</h1>
            <div class="subtitle" style="width: 60%">{{ i.desc }}</div>
            <div class="location" style="margin-top: 2rem">
              <v-icon color="white" class="mr-3" size="40"
                >mdi-card-account-mail</v-icon
              >
              {{ i.email }} - {{ i.phoneNo }}
            </div>
          </v-img>
        </div>

        <cart-items-list v-if="user.status == 'client'" />

        <div class="main-content">
          <div class="d-flex justify-space-between mb-4" style="width: 60%">
            <h2 class="mb-4">Menu Items</h2>
            <div
              class="add-hotel"
              v-if="isAuthenticated && user.status == 'admin'"
            >
              <new-menu-item />
            </div>
          </div>
          <div v-for="item in menus" :key="item._id">
            <div
              class="list-item d-flex justify-space-between align-center mb-5"
              v-if="id === item.hotelId"
            >
              <div class="subtitle">
                <p class="subtitle">{{ item.name }}</p>
              </div>
              <div>
                <p>Ksh. {{ item.price }}</p>
                <div class="d-flex align-center" v-if="isAuthenticated">
                  <div class="admin-ops" v-if="user.status == 'admin'">
                    <v-btn
                      text
                      color="error"
                      @click.prevent="deleteItem(item._id)"
                    >
                      <i class="bx bx-trash bx-sm"></i>
                    </v-btn>
                    <v-btn
                      text
                      color="success"
                      @click.prevent="editItem(item._id)"
                    >
                      <i class="bx bx-pencil bx-sm" />
                    </v-btn>
                  </div>
                  <v-btn
                    v-else
                    outlined
                    color="warning"
                    @click="addToBag(item._id)"
                    :loading="isLoading"
                  >
                    <i class="bx bxs-cart-alt bx-sm"></i>Add to Cart
                  </v-btn>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="footer">
          <app-footer />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  components: {
    "new-menu-item": require("./forms/new-menu-item.vue").default,
    "cart-items-list": require("../components/cart-items-list.vue").default,
  },

  data() {
    return {
      id: this.$route.params.Hid,
      disabled: true,
      menus: null,
    };
  },

  computed: {
    ...mapGetters(["isAuthenticated", "hotels", "user", "isLoading"]),
  },

  created() {
    this.getMenuItems();
  },

  methods: {
    ...mapActions(["addItemToCart", "loadCartItems"]),
    ...mapGetters(["menuItems"]),

    async getMenuItems() {
      const items = await this.menuItems();
      if (items) {
        this.menus = items;
      }
    },

    async addToBag(itemId) {
      await this.addItemToCart(itemId);
      this.loadCartItems();
    },

    deleteItem(id) {
      console.log(id);
    },
  },
};
</script>

<style scoped>
.main-content {
  margin: 3rem;
}

.list-item {
  width: 60%;
}
</style>
