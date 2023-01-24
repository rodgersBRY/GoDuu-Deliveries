import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import Axios from "axios";
import { store } from "./store";
import vuetify from "./plugins/vuetify";

import Footer from "./components/Footer.vue";

Axios.defaults.withCredentials = false;
Axios.defaults.baseURL = "http://localhost:4000";

// Auto authentication
const token = localStorage.getItem("token");
if (token) {
  Axios.defaults.headers.common["Authorization"] = token;
}

Axios.interceptors.response.use(undefined, (err) => {
  return new Promise((_, reject) => {
    if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
      store.dispatch("logout");
    }
    reject(err);
  });
});

Vue.component("app-footer", Footer);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
