<template>
  <div class="footer">
    <div class="newsletter d-flex justify-space-between px-7 py-10">
      <div class="logo">
        <v-img width="200" :src="require('../assets/logo1.png')"></v-img>
      </div>

      <div class="subscribe">
        <h4>New to MloFaster?</h4>
        <p class="subtitle">
          Subcsribe to our newsletter to get updates on offers
        </p>
        <div class="d-flex">
          <input type="email" name="email" placeholder="email" class="input" />
          <v-btn dark depressed class="ml-3" color="warning">
            <i class="bx bx-right-arrow-alt bx-sm"></i>
          </v-btn>
        </div>
      </div>
      <div class="app-store">
        <h4>Download the App</h4>
      </div>
    </div>
    <div class="the-rest">
      <div class="d-flex justify-space-around pa-5">
        <div class="about">
          <h4>ABOUT MLOFASTER</h4>
          <ul>
            <li>About Us</li>
            <li>Terms and Conditions</li>
            <li>Privacy Policy</li>
          </ul>
        </div>
        <div class="make-money">
          <h4>MAKE MONEY WITH MLOFASTER</h4>
          <ul>
            <li>Sell on MloFaster</li>
            <li>Become a Delivery Agent</li>
          </ul>
        </div>
        <div class="top-hotels">
          <h4>TOP HOTELS</h4>
          <ul>
            <li>Black Africa</li>
            <li>Da Place</li>
            <li>Hotel De' Aliance</li>
            <li></li>
            <li></li>
          </ul>
        </div>
      </div>
      <v-divider />
      <div class="payments d-flex justify-space-around">
        <div class="join-us text-center">
          <h4>JOIN US ON</h4>
          <ul class="mt-6">
            <li>
              <v-btn icon color="white">
                <i class="bx bxl-facebook bx-sm"></i>
              </v-btn>
            </li>
            <li>
              <v-btn icon color="white">
                <i class="bx bxl-youtube bx-sm"></i>
              </v-btn>
            </li>
            <li>
              <v-btn icon color="white">
                <i class="bx bxl-instagram bx-sm"></i>
              </v-btn>
            </li>
          </ul>
        </div>
        <div class="payment-methods text-center">
          <h4>PAYMENT METHODS</h4>
          <ul>
            <li>
              <i class="bx bxl-visa bx-md"></i>
              <p>VISA</p>
            </li>
            <li>
              <i class="bx bxl-mastercard bx-md"></i>
              <p>MasterCard</p>
            </li>
            <li>
              <i class="bx bxs-memory-card bx-md"></i>
              <p>MPesa</p>
            </li>
          </ul>
        </div>
      </div>
      <div class="copyright text-center py-5">
          <div class="year">
              copyright &copy; {{ year }}
          </div>
          <div class="developer">
              Developed by <span>Mawira</span>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      year: new Date().getFullYear(),
    };
  },
};
</script>

<style scoped>
.newsletter {
  background-color: rgb(63, 101, 138);
  color: white;
}

.the-rest {
  background-color: rgb(69, 110, 151);
  color: white;
}

.about ul,
.make-money ul,
.top-hotels ul {
  list-style: none;
}

.about ul li,
.make-money ul li,
.top-hotels ul li {
  list-style: none;
  margin: 5px 0;
  cursor: pointer;
}

.payments {
  padding: 2rem 0;
}

.payments ul {
  list-style: none;
}

.payments li {
  display: inline-block;
  margin: 5px 4rem;
}

.join-us {
  margin-right: 4rem;
}

.input {
  border-radius: 5px;
  border: 1px solid white;
  padding: 2px 7px;
  width: 70%;
  outline: none;
  color: white;
}
</style>
