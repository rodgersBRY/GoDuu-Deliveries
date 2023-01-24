<template>
  <div class="new-hotel">
    <v-btn color="teal" dark @click="dialog = true">
      <i class="bx bx-plus bx-sm"></i>
      New Menu Item
    </v-btn>
    <v-dialog v-model="dialog" width="500" persistent>
      <form @submit.prevent="addMenu">
        <v-card class="pa-8">
          <div class="mb-5 d-flex justify-space-between">
            <h2>Add New Menu Item</h2>
            <v-btn class="x-btn" color="red" icon dark @click="dialog = false">
              <i class="bx bx-x bx-sm"></i>
            </v-btn>
          </div>
          <div class="subtitle mb-5">
            <p>Enter new menu item to your hotel</p>
          </div>
          <v-card flat class="my-10">
            <v-text-field
              type="text"
              dense
              label="Item Name"
              class="input"
              v-model="form.name"
              color="teal"
            />
            <v-text-field
              type="text"
              dense
              label="Item Price"
              class="input"
              v-model="form.price"
              color="teal"
            />
          </v-card>
          <v-card-actions>
            <v-spacer />
            <v-btn color="warning" text type="submit" :loading="isLoading"
              >Add to Menu</v-btn
            >
          </v-card-actions>
        </v-card>
      </form>
    </v-dialog>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "new-menu-item",
  data() {
    return {
      dialog: false,

      form: {
        name: "",
        price: "",
        id: this.$route.params.Hid,
      },
    };
  },

  computed: {
    ...mapGetters(["isLoading"]),
  },

  methods: {
    ...mapActions(["createMenuItem"]),

    async addMenu() {
      try {
        await this.createMenuItem(this.form);
        this.form.name = "";
        this.form.price = "";
        this.dialog = false;
      } catch (e) {
        throw Error(e);
      }
    },
  },
};
</script>

<style scoped></style>
