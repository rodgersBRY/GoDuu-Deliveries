import axios from "axios";

const setError = (err) => {
  commit("setLoading", false);
  let error = err.error.data.message;
  commit("setError", error);
};

export default {
  state: {
    orders: [],
  },

  mutations: {
    setOrders(state, payload) {
      state.orders = payload;
    },

    addToOrders(state, payload) {
      state.orders.push(payload);
    },

    clearOrders(state) {
      state.orders = [];
    },
  },

  actions: {
    async loadOrders({ commit }) {
      commit("setLoading", true);

      try {
        const res = await axios.get("/user/orders");

        commit("setOrders", res.data.orders);
        commit("clearError");
        commit("setLoading", false);
      } catch (err) {
        setError(err);
      }
    },

    async makeOrder({ commit }) {
      commit("setLoading", true);

      try {
        const res = await axios.post("/user/order");
        console.log(res.data.result);

        commit("addToOrders", res.data.result);
        commit("clearCart");
        commit("clearError");
        commit("setLoading", false);
      } catch (err) {
        setError(err);
      }
    },
  },

  getters: {
    orders: (state) => state.orders,
  },
};
