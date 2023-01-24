<template>
  <v-app>
    <div class="nav-bar">
      <v-app-bar dark color="teal" class="app-bar">
        <div class="logo" @click="$router.push('/')">
          <v-img
            width="170"
            class="logo-img"
            :src="require('@/assets/logo1.png')"
          ></v-img>
        </div>

        <v-spacer />

        <div class="cart d-flex align-center">
          <v-avatar size="55" color="warning" class="mr-16 text-center">
            <img
              v-if="isAuthenticated"
              src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fdm0qx8t0i9gc9.cloudfront.net%2Fthumbnails%2Fvideo%2Fr6uQGb9%2Freal-cuban-people-and-emotions-portrait-of-sad-senior-hispanic-man-looking-at-camera-worried-old-black-grandfather-with-mustache-and-hat-from-havana-cuba-close-up-of-face_han-yjel_thumbnail-1080_06.png&f=1&nofb=1"
              alt="profile pic"
            />
            <v-icon v-else>mdi-account</v-icon>
          </v-avatar>

          <section class="non-admin" v-if="isAuthenticated && user.status !== 'admin'">
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-badge
                  :content="totalCartItems || 0"
                  :value="totalCartItems > 0"
                  class="mr-3"
                  color="orange"
                  overlap
                >
                  <v-btn icon dark v-bind="attrs" v-on="on" to="/cart">
                    <i class="bx bx-cart bx-sm"></i>
                  </v-btn>
                </v-badge>
              </template>
              <span>Cart</span>
            </v-tooltip>
<!-- 
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn icon dark class="mr-3" v-bind="attrs" v-on="on">
                  <i class="bx bx-bell bx-sm"></i>
                </v-btn>
              </template>
              <span>Notifications</span>
            </v-tooltip> -->

            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  icon
                  dark
                  class="mr-3"
                  v-bind="attrs"
                  v-on="on"
                  :to="{ name: 'Orders' }"
                >
                  <i class="bx bx-shopping-bag bx-sm"></i>
                </v-btn>
              </template>
              <span>Orders</span>
            </v-tooltip>
          </section>
        </div>

        <v-spacer />

        <span v-if="isAuthenticated">
          <a class="nav-link" @click="logout">Logout</a>
        </span>
        <span v-else>
          <router-link
            tag="li"
            class="nav-link"
            active-class="active"
            to="/login"
            >Login</router-link
          >
          |
          <router-link
            tag="li"
            class="nav-link"
            active-class="active"
            to="/register"
            >Register</router-link
          >
        </span>
      </v-app-bar>
    </div>
    <router-view />
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "App",

  computed: {
    ...mapGetters(["isAuthenticated", "cartItems", "user"]),

    totalCartItems() {
      return this.cartItems.length;
    },
  },

  methods: {
    logout() {
      this.$store.dispatch("Logout");
      this.$router.push("/login");
    },
  },
};
</script>

<style scoped>
.app-bar {
  position: relative;
  z-index: 5;
}

.logo {
  position: relative;
  top: 1rem;
}

.logo-img {
  cursor: pointer;
}

.nav-link {
  list-style-type: none;
}

.nav-link {
  display: inline-block;
  text-decoration: none;
  color: white;
  cursor: pointer;
  margin: 0 1rem;
}

.nav-link:hover,
.nav-link.active {
  color: rgb(74, 77, 80);
}
</style>
