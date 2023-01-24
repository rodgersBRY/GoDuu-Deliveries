import axios from "axios";

function setError(err) {
  commit("setLoading", false);
  commit("setError", err.response.data.message);
}

export default {
  state: {
    menuItems: [],
  },

  mutations: {
    setMenuItems(state, payload) {
      state.menuItems = payload;
    },

    createMenuItem(state, payload) {
      state.menuItems.push(payload);
    },

    removeMenuItem(state, payload) {
      let items = state.menuItems.filter((id) => id !== payload);
      state.menuItems = items;
    },

    clearMenuItems(state) {
      state.menuItems = [];
    },
  },

  actions: {
    async loadMenuItems({ commit }) {
      commit("setLoading", true);

      try {
        const items = await axios.get("/hotels/menu-items");
        commit("setMenuItems", items.data.menuItems);
        commit("clearError");
        commit("setLoading", false);
      } catch (err) {
        setError(err);
      }
    },

    async createMenuItem({ commit }, payload) {
      const hotelId = payload.id;
      commit("setLoading", true);

      try {
        const menuItem = await axios.post(
          `/admin/hotel/${hotelId}/add-item`,
          payload
        );
        commit("createMenuItem", menuItem.data.menuItem);
        commit("clearError");
        commit("setLoading", false);
      } catch (err) {
        setError(err);
      }
    },
  },

  getters: {
    menuItems: (state) => state.menuItems,
  },
};
