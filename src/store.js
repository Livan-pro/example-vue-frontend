import Vue from "vue";
import Vuex, { Store } from "vuex";
import { apiUrl } from "config";
Vue.use(Vuex);

export const store = new Store({
  state: {
    selectedAts: +(localStorage.getItem("selectedAts") ?? -2),
    atsList: [],
    solution: null,
  },
  mutations: {
    selectAts(state, value) {
      state.selectedAts = value;
      localStorage.setItem("selectedAts", value);
    },
    setAtsList(state, value) {
      state.atsList = value;
    },
    setSolution(state, value) {
      state.solution = value;
    },
  },
  actions: {
    async loadAtsList(ctx) {
      try {
        const response = await fetch(`${apiUrl}/ats-list.json`);
        const list = await response.json();
        ctx.commit("setAtsList", list);
      } catch (err) {
        console.error("Error while fetching ats list:", err);
      }
    },
    async sendSelectedAts(ctx) {
      try {
        await fetch(`${apiUrl}/send-ats?ats=${ctx.state.selectedAts}`);
      } catch (err) {
        console.error("Error while sending selected ats:", err);
      }
    },
    async loadSolution(ctx) {
      try {
        const response = await fetch(`${apiUrl}/get-solution.json`);
        const solution = await response.json();
        ctx.commit("setSolution", solution);
      } catch (err) {
        console.error("Error while fetching solution:", err);
      }
    },
  },
});
