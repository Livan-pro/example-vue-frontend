import Vue from "vue";
import VueRouter from "vue-router";

import Step1SelectAts from "./pages/Step1SelectAts";
import Step2Solution from "./pages/Step2Solution";

Vue.use(VueRouter);

const routes = [
  {
    path: "/select-ats",
    component: Step1SelectAts,
    meta: {
      step: {
        number: 1,
        title: "Какая у вас АТС?",
        next: "/result",
        nextDisabled: (state) => state.selectedAts < 0,
        beforeNext: async (store) => await store.dispatch("sendSelectedAts"),
      },
    },
  },
  {
    path: "/result",
    component: Step2Solution,
    meta: {
      step: {
        number: 2,
        title: "Вы получите следующие функции",
        prev: "/select-ats",
        prevLabel: "Подходящие решения",
      },
    },
  },
  { path: "*", redirect: "/select-ats" },
];

export const router = new VueRouter({
  routes,
});
