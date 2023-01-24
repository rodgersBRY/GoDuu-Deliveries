<template>
  <div class="home">
    <div
      class="add-hotel mt-7 d-flex justify-end mx-12"
      v-if="isAuthenticated && user.status == 'admin'"
    >
      <new-hotel color="teal">
        <i class="bx bx-plus bx-sm"></i>
        New Hotel
      </new-hotel>
    </div>

    <!-- list of hotels -->
    <div class="main-content">
      <v-layout row wrap>
        <p class="grey--text display-1" v-if="!hotels">Add hotels</p>
        <v-card
          v-else
          flat
          width="500"
          class="my-3 mx-10"
          v-for="ht in hotels"
          :key="ht._id"
        >
          <v-list-item three-line @click="toHotel(ht._id)">
            <v-list-item-content>
              <v-list-item-subtitle class="font-weight-thin overline mb-4">
                {{ ht.phoneNo }}
              </v-list-item-subtitle>
              <v-list-item-subtitle
                class="font-weight-light text-subtitle-3 mb-4"
              >
                {{ ht.email }}
              </v-list-item-subtitle>
              <v-list-item-title class="font-weight-black headline mb-1">
                {{ ht.name }}
              </v-list-item-title>
            </v-list-item-content>

            <v-list-item-avatar
              tile
              size="130"
              color="grey lighten-2 d-flex justify-center"
            >
              <img
                src="https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fww1.prweb.com%2Fprfiles%2F2016%2F01%2F30%2F13226857%2FEsperanza_0001x.JPG&f=1&nofb=1"
                alt="profile image"
              />
            </v-list-item-avatar>
          </v-list-item>
          <div
            class="list-actions grey lighten-3 pr-3 py-1"
            v-if="isAuthenticated && user.status == 'admin'"
          >
            <v-row no-gutters>
              <v-spacer />
              <v-btn icon class="mr-7" @click="removeHotel(ht._id)">
                <v-icon>mdi-delete</v-icon>
              </v-btn>
              <new-hotel :hotel="ht" :edit="true" :icon="true" color="grey darken-2">
                <v-icon>mdi-pencil</v-icon>
              </new-hotel>
            </v-row>
          </div>
        </v-card>
      </v-layout>
    </div>

    <!-- footer -->
    <div class="footer">
      <app-footer />
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Home",

  components: {
    "new-hotel": require("../components/forms/New-hotel.vue").default,
  },

  created() {
    this.$store.dispatch("fetchHotels");
  },

  computed: {
    ...mapGetters(["isAuthenticated", "hotels", "user"]),
  },

  methods: {
    ...mapActions([
      "loadOrders",
      "loadCartItems",
      "loadMenuItems",
      "deleteHotel",
      "editHotel",
    ]),

    toHotel(id) {
      this.$router.push({ name: "Hotel", params: { Hid: id } });
    },

    async removeHotel(id) {
      await this.deleteHotel(id);
      alert("Hotel deleted successfully!");
    },

    updateHotel(id) {
      this.editHotel(id);
    },
  },
};
</script>

<style lang="sass">
.main-content
  padding: 3rem 5rem
</style>
