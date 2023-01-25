<template>
  <div class="new-hotel">
    <v-btn :color="color" :icon="icon" dark @click="dialog = true">
      <slot />
    </v-btn>
    <v-dialog v-model="dialog" width="40%" persistent>
      <form @submit.prevent="submit" enctype="multipart/form-data">
        <v-card class="pa-7">
          <div class="mb-5 d-flex justify-space-between">
            <h2>Add New Hotel</h2>
            <v-btn class="x-btn" color="red" icon dark @click="closeDialog">
              <i class="bx bx-x bx-sm"></i>
            </v-btn>
          </div>
          <div class="subtitle mb-5">
            <p>Enter your hotel details for customers to view your hotel</p>
          </div>
          <v-card flat class="form mb-3 py-3" width="100%">
            <v-text-field
              type="text"
              dense
              autofocus
              label="Hotel Name"
              class="input"
              v-model="form.name"
              color="teal"
            />
            <v-text-field
              type="email"
              dense
              label="E-Mail"
              class="input"
              v-model="form.email"
              color="teal"
              placeholder="hotel@example.com"
            />
            <v-text-field
              type="text"
              dense
              label="Business Number"
              class="input"
              v-model="form.phoneNo"
              color="teal"
              placeholder="0712345678"
            />
            <v-btn outlined color="teal" @click="onPickFile">
              Upload Image <i class="ml-3 bx bx-upload bx-sm"></i>
            </v-btn>
            <input
              type="file"
              accept="image/*"
              style="display: none"
              ref="fileInput"
              @change="onFileSelected"
              name="image"
            />
          </v-card>

          <div
            class="preview_block"
            :style="{ 'background-image': `url(${imageUrl})` }"
          ></div>
          <v-card-actions>
            <v-spacer />
            <v-btn color="warning" outlined type="submit" :loading="isLoading">
              {{ this.edit ? "EDIT" : "ADD" }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </form>
    </v-dialog>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  props: {
    hotel: {
      type: Object,
      required: false,
    },
    edit: {
      type: Boolean,
    },
    icon: {
      required: false,
    },
    color: {
      type: String,
    },
  },

  data() {
    return {
      dialog: false,
      imageUrl: "",
      form: this.hotel
        ? { _id: this.hotel._id, ...this.hotel }
        : {
            name: "",
            email: "",
            phoneNo: "",
            image: null,
          },
    };
  },

  computed: {
    ...mapGetters(["isLoading", "error"]),
  },

  methods: {
    ...mapActions(["newHotel", "updateHotel"]),

    submit() {
      if (this.edit) {
        this.updateHotel(this.form);
        this.closeDialog();
      } else {
        this.newHotel(this.form);
        this.closeDialog();
      }
    },

    onPickFile() {
      this.$refs.fileInput.click();
    },

    closeDialog() {
      this.form = {
        name: "",
        email: "",
        phoneNo: "",
        image: null,
      };
      this.imageUrl = "";

      this.dialog = false;
      this.$store.dispatch("fetchOwnerHotels");
    },

    onFileSelected(e) {
      let files = e.target.files;
      // let filename = files[0].name;
      const fileReader = new FileReader();
      fileReader.addEventListener("load", () => {
        this.imageUrl = fileReader.result;
      });
      fileReader.readAsDataURL(files[0]);
      this.form.image = files[0];
    },
  },
};
</script>

<style lang="sass">
.preview_block
  display: block
  cursor: pointer
  width: 300px
  height: 280px
  margin: 0 auto 20px
  background-position: center center
  background-size: cover
</style>
