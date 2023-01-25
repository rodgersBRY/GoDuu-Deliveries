import axios from "axios";

export default {
  state: {
    hotels: [],
  },

  mutations: {
    setHotels(state, payload) {
      state.hotels = payload;
    },

    addHotel(state, payload) {
      state.hotels.push(payload);
    },

    deleteHotel(state, payload) {
      let hotels = state.hotels.filter((hotel) => hotel._id !== payload);
      state.hotels = hotels;
    },

    updateHotel(state, payload) {
      const hotelIndex = state.hotels.findIndex(
        (hotel) => hotel._id === payload._id
      );
      state.hotels = [
        ...state.hotels.slice(0, hotelIndex),
        payload,
        ...state.hotels.slice(hotelIndex++),
      ];
    },
    
    clearHotels(state) {
      state.hotels = [];
    },
  },

  actions: {
    async fetchHotels({ commit }) {
      commit("setLoading", true);

      try {
        const res = await axios.get("/hotels");
        commit("setHotels", res.data.hotels);
        commit("clearError");
        commit("setLoading", false);
      } catch (err) {
        commit("setLoading", false);
        commit("setError", err.response.data.message);
      }
    },

    async fetchOwnerHotels({ commit }) {
      commit("setLoading", true);

      try {
        const res = await axios.get("/hotels/owner");
        console.log(res.data);
        commit("setHotels", res.data);
        commit("clearError");
        commit("setLoading", false);
      } catch (err) {
        commit("setLoading", false);
        commit("setError", err.response.data.message);
      }
    },

    async newHotel({ commit }, payload) {
      commit("setLoading", true);
      try {
        const res = await axios.post("/admin/hotel/add", payload);

        commit("addHotel", res.data.hotel);
        commit("clearError");
        commit("setLoading", false);
      } catch (err) {
        commit("setLoading", false);
        commit("setError", err.response.data.message);
      }
    },

    async deleteHotel({ commit }, id) {
      commit("setLoading", true);

      try {
        await axios.delete(`/admin/hotel/${id}`);
        commit("deleteHotel", id);
        commit("clearError");
        commit("setLoading", false);
      } catch (err) {
        commit("setLoading", false);
        commit("setError", err.response.data.message);
      }
    },

    async updateHotel({ commit }, payload) {
      commit("setLoading", true);

      try {
        await axios.put(`/admin/hotel/${payload._id}`, payload);
        commit("updateHotel", payload);
        commit("clearError");
        commit("setLoading", false);
      } catch (err) {
        commit("setLoading", false);
        commit("setError", err.response.data.message);
      }
    },
  },

  getters: {
    hotels: (state) => state.hotels,
  },
};
