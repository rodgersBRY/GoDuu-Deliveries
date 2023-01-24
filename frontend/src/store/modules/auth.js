import Axios from "axios";

export default {
  state: {
    user: null,
    token: localStorage.getItem("token") || "",
  },

  mutations: {
    setUser(state, payload) {
      state.user = payload.user;
      state.token = payload.token;
    },

    logout(state) {
      state.user = null;
      state.token = "";
      state.error = null;
    },
  },

  actions: {
    // auto logout user
    setLogoutTimer({ commit }) {
      setTimeout(() => {
        commit("clearError");
        commit("clearCart");
        commit("clearOrders");
        commit("logout");
        localStorage.removeItem("token");
        delete Axios.defaults.headers.common["Authorization"];
      }, 3600 * 1000);
    },

    async register({ dispatch, commit }, payload) {
      commit("setLoading", true);

      try {
        await Axios.put("/auth/register", payload);

        let userForm = new FormData();
        userForm.append("name", payload.name);
        userForm.append("email", payload.email);
        userForm.append("phoneNo", payload.phoneNo);
        userForm.append("password", payload.password);
        userForm.append("status", payload.status);

        await dispatch("Login", userForm);
        commit("clearError");
        commit("setLoading", false);
      } catch (err) {
        commit("setLoading", false);
        commit("setError", err.response.data.message);
      }
    },

    async Login({ commit, dispatch }, User) {
      commit("setLoading", true);

      try {
        const res = await Axios.post("/auth/login", {
          email: User.get("email"),
          password: User.get("password"),
        });

        let token = res.data.token;
        localStorage.setItem("token", token);
        Axios.defaults.headers.common["Authorization"] = token;

        commit("setUser", { user: res.data.loadedUser, token: token });
        commit("clearError");
        
        dispatch("setLogoutTimer");
        commit("setLoading", false);
      } catch (err) {
        commit("setLoading", false);
        commit("setError", err.response.data.message);
        localStorage.removeItem("token");
      }
    },

    async Logout({ commit }) {
      commit("setLoading", false);
      commit("clearError");
      commit("clearCart");
      commit("clearOrders");
      commit("logout");
      localStorage.removeItem("token");
      delete Axios.defaults.headers.common["Authorization"];
    },
  },

  getters: {
    isAuthenticated: (state) => !!state.user,
    user: (state) => state.user,
  },
};
