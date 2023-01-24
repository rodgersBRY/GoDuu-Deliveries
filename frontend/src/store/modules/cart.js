import axios from "axios";

export default {
  state: {
    cartItems: [],
  },

  mutations: {
    setCartItems(state, payload) {
      state.cartItems = payload;
    },

    addCartItem(state, payload) {
      state.cartItems.push(payload);
    },

    updateCartItems(state, payload) {
      state.cartItems = payload;
    },

    clearCart(state) {
      state.cartItems = [];
    },
  },

  actions: {
    async loadCartItems({ commit }) {
      commit("setLoading", true);

      try {
        const res = await axios.get("/user/cart");
        const items = res.data.cartItems;
        commit("setCartItems", items);
        commit("clearError");
        commit("setLoading", false);
      } catch (err) {
        commit("setLoading", false);
        let error = err.error.data.message;
        commit("setError", error);
      }
    },

    async addItemToCart({ commit }, payload) {
      commit("setLoading", true);
      const itemId = payload;

      try {
        const res = await axios.post(`/user/cart/add/${itemId}`);
        const items = res.data.cart.items;
        commit("addCartItem", items);
        commit("clearError");
        commit("setLoading", false);
      } catch (err) {
        commit("setLoading", false);
        let error = err.error.data.message;
        commit("setError", error);
      }
    },

    async removeCartItem({ commit }, cartItem) {
      commit("setLoading", true);
      const itemId = cartItem;

      try {
        const res = await axios.delete(`/user/cart/${itemId}`);
        commit("updateCartItems", res.data.cartItems);
        commit("clearError");
        commit("setLoading", false);
      } catch (err) {
        commit("setLoading", false);
        let error = err.error.data.message;
        commit("setError", error);
      }
    },

    async clearCart({ commit }) {
      commit("setLoading", true);

      try {
        await axios.post("/user/cart/clear");
        commit("clearCart");
        commit("setLoading", false);
      } catch (err) {
        commit("setLoading", false);
        let error = err.error.data.message;
        commit("setError", error);
      }
    },
  },

  getters: {
    cartItems: (state) => state.cartItems,
  },
};
